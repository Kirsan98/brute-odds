# brute-odds — Design

**Date :** 2026-08-13
**Statut :** design validé, en attente de relecture avant plan d'implémentation

## 1. Objectif

Afficher, sur la page arène de [LaBrute](https://brute.eternaltwin.org), une estimation
de la probabilité de victoire contre chacun des adversaires proposés, afin de choisir
son combat en connaissance de cause.

Usage personnel, pour l'auteur et ses proches. Aucune publication, aucun hébergement.

## 2. Non-objectifs (v1)

- Comparaison libre de deux brutes arbitraires par nom.
- Simulation du tournoi quotidien.
- Toute automatisation d'action en jeu : l'outil est en lecture seule et ne joue aucun coup.

Ces points sont écartés de la v1, pas du projet.

## 3. Contraintes établies (vérifiées dans le code amont)

Le jeu est un remake open source : [Zenoo/labrute](https://github.com/Zenoo/labrute),
monorepo TypeScript `client` / `server` / `core`. Tout ce qui suit a été lu dans le
dépôt, pas supposé.

| Fait | Source | Conséquence |
|---|---|---|
| Le combat est stochastique (crits, esquives, contres) | `fightMethods.ts` | La réponse est une probabilité, estimée par Monte-Carlo. Pas de formule analytique. |
| `getFighters()` est synchrone et sans dépendance à Prisma | `server/src/utils/fight/getFighters.ts:145` | Le moteur est rejouable hors serveur. |
| `generateFight.ts` est entrelacé avec la BDD (achievements, logs, `handleStats`) | `generateFight.ts` | On ne le réutilise pas : on rejoue nous-mêmes sa boucle (l. 259-350). |
| `fightMethods.ts` fait 2 675 lignes et importe des enums *runtime* de `@labrute/prisma` | `fightMethods.ts:1-20` | Réimplémenter serait une dérive garantie. On vendorise. |
| `@labrute/prisma` déclare `"browser": "index-browser.js"` | `prisma/package.json` | Le build navigateur expose les enums sans client BDD → bundlable avec esbuild `--platform=browser`. |
| L'API refuse les appels externes (`{"message":"Invalid CSRF token"}`) | `securityCheck.ts` | En-têtes prédictibles + version + fingerprint + cookie `browserId` requis. D'où le choix du userscript, qui vit dans le contexte de la page. |

## 4. Décisions

1. **Forme :** userscript navigateur (Tampermonkey / Violentmonkey).
2. **Périmètre v1 :** page arène uniquement.
3. **Moteur :** vendorisé depuis le dépôt amont — fidélité par construction,
   resynchronisation par `git pull` + rebuild.

## 5. Architecture

Trois modules, chacun testable isolément, dépendances strictement descendantes.

### `engine/`

Le moteur vendorisé. Interface unique :

```ts
simulateOnce(brute: Brute, opponent: Brute, modifiers: Modifiers): 'win' | 'loss'
```

Ne connaît ni le DOM, ni le réseau, ni le Monte-Carlo. Réplique la séquence exacte du
serveur, dans cet ordre :

```
b1 = getCalculatedBrute(rawBrute, modifiers)      // Fights.ts:121-122
b2 = getCalculatedBrute(rawOpponent, modifiers)
fighters = getFighters({ team1: { brutes:[b1], backups, bosses: [] },
                         team2: { brutes:[b2], backups, bosses: [] },
                         modifiers, clanFight: false })
fighterArrives(...) pour chaque combattant non-remplaçant
applySpy(...)  // uniquement en 1v1, donc toujours ici
saboteur(...)
boucle: orderFighters → playFighterTurn → checkDeaths, tant que !loser && turn < 2000
        overtime à partir de turn > 1000
```

Deux points de fidélité à ne pas rater, tous deux lus dans le code serveur :

- **Retry.** `Fights.ts:155` réessaie jusqu'à 10 fois quand `generateFight` lève
  (`Fight not finished`). Un combat qui échoue n'est donc **pas** une défaite : il est
  rejoué. Le simulateur doit faire pareil, sous peine de biaiser les estimations vers le bas.
- **`achievementsStore` et `stats`** ne sont que des accumulateurs. On passe des stubs.

### `odds/`

```ts
estimate(brute, opponent, modifiers, n): { winRate: number, ci: number, samples: number }
```

Appelle `simulateOnce` n fois, renvoie le taux et l'intervalle de confiance à 95 %.
Ne dépend que de `engine`, et l'accepte par injection pour être testable avec un
moteur bouchonné.

### `userscript/`

Interception réseau, orchestration dans un Web Worker, injection DOM. **Ne contient
aucune règle de jeu.**

## 6. Acquisition des données

Le userscript n'émet pas d'appels de son propre chef dans le cas nominal : il
intercepte (patch de `window.fetch`) les réponses que le client fait déjà.

| Source | Contenu | Rôle |
|---|---|---|
| `POST /api/user/authenticate` | **Toutes** les brutes du compte, en données complètes (`Users.ts:235`, `include` sans `select`), **plus** les `modifiers` actifs | Nos brutes + les modificateurs du jour |
| `GET /api/brute/<nom>/get-opponents/<niveau>` | Les adversaires proposés, avec stats, `skills`, `weapons`, `pets` (`getOpponents.ts`) | Les adversaires |

Le second point résout le **multi-brutes** : le nom est dans l'URL, donc chaque réponse
est auto-identifiante. Aucune notion de « brute courante » à deviner, et changer de
brute dans la SPA déclenche naturellement un nouvel appel avec le bon nom.

**Péremption.** `authenticate` n'est appelé qu'à l'ouverture de session : une montée de
niveau en cours de session rendrait notre copie obsolète. On maintient donc un cache
indexé par nom de brute, alimenté par **toutes** les sources qui passent, la plus
récente gagnant : `authenticate`, `/for-hook` (page cellule) et la réponse de
`/level-up` — qui renvoie la brute mise à jour.

## 7. La compétence `backup` (renfort)

`generateFight.ts:218-227` : si une brute possède `backup`, le serveur tire au hasard
**une autre brute du même compte, de niveau strictement inférieur**, et l'ajoute au combat.
Ignorer ce mécanisme fausserait lourdement les combats concernés.

- **Notre brute :** reproduit à l'identique — `authenticate` nous donne déjà toutes nos
  brutes ; on filtre `level <` et on tire au hasard.
- **Adversaire :** nécessite ses autres brutes. Deux appels supplémentaires, **uniquement
  si l'adversaire possède `backup`** :
  1. `GET /api/brute/<nom>/for-hook` → son `userId` (absent du payload d'arène) ;
  2. `GET /api/user/<userId>/profile` → toutes ses brutes avec stats, `skills`,
     `weapons`, `pets` (`Users.getProfile`).

Ces deux requêtes sont celles que le site émet lui-même sur ses pages cellule et profil.
Pour qu'elles passent `securityCheck`, le userscript **rejoue les en-têtes capturés** sur
une requête interceptée valide, plutôt que de tenter de les reconstruire.

**Repli :** si le profil est inaccessible (compte banni, requête en échec), l'estimation
est calculée sans le renfort adverse et **marquée comme approximative** dans l'affichage.
Un chiffre silencieusement faux est le seul résultat inacceptable.

## 8. Précision et performance

Le résultat est affiché comme l'estimation qu'il est : `63 % ± 3`, jamais `63,4 %`.

Le nombre de simulations sera **calibré après mesure réelle** du coût d'un combat — aucun
chiffre n'est avancé ici, il n'a pas encore été mesuré. Cible : sous ~2 s pour l'ensemble
des adversaires, calcul en Web Worker pour ne pas figer la page, affichage progressif au
fil des résultats.

**Risque de performance identifié :** les fonctions du moteur empilent des `steps`
d'animation dont nous n'avons aucun usage. Sur des milliers de combats, l'allocation puis
le rejet de ces objets peut dominer le temps de calcul. À mesurer avant d'optimiser ;
si le coût est réel, vider `fightData.steps` périodiquement pendant la boucle.

## 9. Vérification

Un simulateur faux qui affiche un chiffre crédible est pire que pas de simulateur du tout.

1. **Test en or.** Rejouer un vrai combat de l'historique et vérifier que notre
   `getFighters()` produit **exactement** les mêmes `initialFighters` que ceux stockés par
   le serveur. Valide la partie la plus piégeuse — modificateurs, familiers, tiers d'armes —
   par comparaison directe avec la vérité du jeu.
2. **Tests unitaires** de `odds` avec un moteur bouchonné : un moteur qui gagne 3 fois sur 4
   doit produire 75 % à l'intervalle de confiance près.
3. **Calibration.** Comparer les taux prédits aux résultats réellement observés sur
   l'historique de combats.

**Limite assumée :** le RNG du serveur n'est pas rejouable. On ne peut donc pas prouver
qu'un combat donné se déroule à l'identique — seulement que les combattants construits et
les distributions de résultats sont les bons.

## 10. Risques

| Risque | Traitement |
|---|---|
| La boucle rejouée diverge de `generateFight` | Test en or + relecture ligne à ligne ; c'est le seul endroit où une erreur serait invisible |
| Le jeu monte de version et le moteur vendorisé dérive | `git pull` + rebuild ; le test en or détecte la dérive |
| Les enums Prisma passent mal dans le bundle navigateur | Atténué : `"browser": "index-browser.js"` existe, à confirmer au premier build |
| Renfort adverse non résolu | Estimation explicitement marquée comme approximative |

## 11. Licence

Le dépôt amont interdit l'usage commercial. Le cadre ici — outil personnel, partage
d'un fichier `.user.js` entre proches, aucune publication — n'entre pas en conflit avec
cette clause. Mentionné pour mémoire, pas comme un obstacle.

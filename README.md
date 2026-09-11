# brute-odds

Userscript qui affiche, sous chaque adversaire de l'arène de [LaBrute](https://brute.eternaltwin.org),
la probabilité que votre brute gagne le combat, désigne celui qu'il faut choisir, et
conseille les montées de niveau.

```
ANTOINE101            EFKOEPZ
Niveau 1              Niveau 1
  53 % ± 2              48 % ± 2 · meilleur
```

À la montée de niveau, un panneau compare les deux destins proposés, sur le combat de
demain **et** sur les dix niveaux à venir :

```
Montée de niveau de Sam
comparé sur 12 adversaires réels du vivier

  arme sai : 58 % ± 1 demain, 62 % ± 1 dans 10 niveaux  <- à prendre
  +2 strength : 51 % ± 1 demain, 50 % ± 1 dans 10 niveaux

écart net sur le long terme
```

Le chiffre n'est pas une formule : c'est le **moteur de combat du jeu lui-même** qui rejoue
2 000 combats contre chaque adversaire, dans un Web Worker pour que la page reste fluide.

---

## Installation

### 1. Installer Tampermonkey

Un userscript ne s'exécute pas tout seul : il faut l'extension qui le fait tourner.

**Firefox est recommandé** — depuis quelques versions, Chrome exige en plus d'activer un
réglage pour autoriser les userscripts.

- Firefox : [Tampermonkey sur addons.mozilla.org](https://addons.mozilla.org/fr/firefox/addon/tampermonkey/)
- Chrome : [Tampermonkey sur le Chrome Web Store](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo),
  puis `chrome://extensions` → détails de Tampermonkey → activer **« Autoriser les scripts utilisateur »**

### 2. Construire le script

Le moteur de combat n'est **pas** redistribué dans ce dépôt : `npm run vendor` va le
chercher chez l'amont, à un SHA épinglé. Il n'existe donc pas de fichier prêt à l'emploi,
le build est obligatoire.

```bash
npm i
npm run vendor   # récupère le moteur de combat
npm run build    # produit dist/brute-odds.user.js
```

### 3. Installer le script

Le plus fiable est le copier-coller — glisser le fichier bute sur les permissions
d'accès aux fichiers locaux selon les navigateurs.

```bash
xclip -selection clipboard < dist/brute-odds.user.js
```

Puis dans Tampermonkey : **Créer un nouveau script** → **Ctrl+A**, **Suppr** →
**Ctrl+V** → **Ctrl+S**.

Attention à ne rien copier d'autre entre ces deux étapes, le presse-papiers ne garde
qu'une chose à la fois.

### 4. Vérifier

Sur https://brute.eternaltwin.org, l'icône Tampermonkey doit afficher un **badge « 1 »** :
le script tourne sur la page. Rendez-vous ensuite dans l'arène — un `…` apparaît sous
chaque adversaire, puis se change en pourcentage, teinté du rouge au vert. Survolez une
carte : l'infobulle donne l'intervalle exact, la durée médiane du combat et les points de
vie qui vous resteraient en cas de victoire.

**Mise à jour :** rejouer `npm run build`, puis recoller le contenu dans le script
existant du tableau de bord Tampermonkey.

---

## Sur quoi le pourcentage est fondé

### Les données viennent du jeu, pas de la page

Le script enveloppe `window.fetch` et lit au passage les réponses de l'API : votre brute,
les adversaires proposés, les modificateurs d'événement en cours. Ce sont les objets exacts
que le serveur emploie pour lancer un vrai combat — pas les valeurs lues à l'écran.

### Une simulation est un vrai combat

Le moteur amont est appelé dans le même ordre que le serveur : `getCalculatedBrute` et
`getFighters` construisent les combattants — points de vie, armes avec leurs tiers,
compétences, familiers, renforts — puis la boucle de tours les fait s'affronter jusqu'à ce
qu'un camp tombe.

Le renfort, quand la compétence est présente, est **retiré au hasard à chaque combat**
parmi les brutes éligibles, exactement comme le fait le serveur. Le figer une fois pour
toutes donnerait la probabilité de gagner *avec ce renfort-là*, ce qui n'est pas la même
question.

### Le pourcentage est un décompte, l'intervalle un sondage

Sur 2 000 combats, la proportion de victoires converge vers la vraie probabilité. Le `± 2`
qui l'accompagne est l'intervalle de confiance à 95 %, **en points de pourcentage** : ±2,2
points autour de 50 %, ±1,3 point autour de 90 %.

L'intervalle est celui de **Wilson**, pas celui de Wald. La différence ne se voit qu'aux
extrêmes, et c'est là qu'elle compte : `1.96 × √(p(1-p)/n)` vaut exactement zéro quand la
proportion touche 0 ou 1, et annoncerait « 100 % ± 0 » sur un sans-faute. La vraie borne
basse, sur 2 000 tirages sans défaite, est vers 99,8 %. Wilson la donne ; l'infobulle
affiche les deux bornes.

Le nombre de tirages vient d'une mesure, pas d'une intuition : `npm run bench` mesure des
brutes nues **et** des brutes réelles équipées (0,031 contre 0,061 ms par combat). Les six
adversaires sont calculés en parallèle, un worker par cœur disponible moins un.

**Un tiers du temps de simulation a été retiré sans toucher au moteur.** `getFighters`
clone chaque arme et chaque compétence avec `structuredClone`, une vingtaine de fois par
combat ; c'est un sérialiseur générique, très cher pour copier de petits objets plats. Le
temps du calcul, il est remplacé par une copie taillée pour ces objets : 0,084 ms par
combat devient 0,061. La substitution est vérifiée champ à champ contre l'implémentation
native, sur les tables d'armes et de compétences du jeu.

### Le même chiffre pour la même situation

Le moteur du jeu tire son hasard de `Math.random`. Le temps d'une estimation, il est
remplacé par un générateur dont la graine ne dépend que des combattants et des
modificateurs. Sans cela, revenir sur l'arène affichait 52 %, puis 49 %, puis 54 % pour un
adversaire qui n'avait pas bougé. Le chiffre est maintenant stable, et c'est l'intervalle
qui dit ce qu'on ignore encore.

### Le calcul va où la décision se joue

Le budget de simulation n'est pas réparti à parts égales. Une première salve de 1 500
combats situe les six adversaires ; affiner celui qui est déjà classé dernier ne
changerait aucune décision. Seuls les prétendants, ceux dont l'intervalle touche encore
celui du meilleur, reçoivent une seconde salve de 6 000 combats. Les deux se cumulent en
une seule estimation, plus fine là où elle sert : départager les deux premiers.

Le conseil de montée de niveau suit la même logique, en plus insistant : si la première
salve ne sépare pas les deux destins, il en relance une de 5 000 combats par adversaire
et par destin. Un adversaire mal choisi coûte un combat, une compétence mal choisie reste
pour toujours.

### Conseiller de montée de niveau

Le jeu propose deux destins. Le script applique chacun à votre brute avec
`updateBruteData`, **la fonction du serveur elle-même**, puis simule les deux versions.
C'est elle qui sait qu'une compétence ne fait pas que s'ajouter (elle modifie les
statistiques), qu'un familier coûte des points de vie, qu'une arme déjà possédée monte
d'un tier. Réécrire ces règles aurait été le meilleur moyen de conseiller un choix sur un
jeu qui n'existe pas.

Le conseil se lit sur deux horizons.

**Demain**, chaque destin est mesuré contre les adversaires de référence. C'est rapide et
c'est souvent suffisant.

**Dans dix niveaux**, chaque destin est prolongé : la brute monte dix paliers, en tirant
à chaque fois les deux destins que le jeu proposerait (`getLevelUpChoices`) et en en
prenant un à pile ou face, et la brute d'arrivée est jugée contre les mêmes références.
Cent cinquante avenirs par destin. Le choix se fait à pile ou face et ce n'est pas un
pis-aller : donner aux deux destins la même distribution de suites, c'est mesurer ce que
chacun vaut en moyenne sur tous les avenirs possibles. Une politique plus maligne ferait
entrer mes idées sur le jeu dans le résultat, alors qu'ici seules les règles parlent.

C'est le long terme qui décide, parce que c'est lui qui correspond à ce qu'on engage : un
combat mal choisi se rattrape demain, une compétence reste pour toujours. Le court terme
ne tranche que si les avenirs simulés ne séparent pas les deux destins ; et si aucun des
deux ne tranche, le panneau le dit au lieu de faire semblant.

Les adversaires de référence de la brute future restent ceux d'aujourd'hui : on ne connaît
pas ceux de dans dix niveaux. C'est une toise, pas une prédiction, et les deux destins
sont mesurés à la même.

Les deux destins sont reconnus à la forme de la réponse réseau, pas à son URL, comme les
résultats de combat. Si le jeu change sa route, le conseil continue de tomber.

### Le vivier d'adversaires

`getOpponents.ts` tire les six adversaires **au hasard uniformément** parmi les brutes de
votre niveau, complétées par des niveaux inférieurs à moins de deux crans. Les six du jour
sont donc un échantillon aléatoire de la population que vous affrontez : le script les
garde, visite après visite. Au bout d'une semaine, un conseil ne dépend plus du tirage
d'un seul jour mais de centaines d'adversaires réels.

`bruteOdds.pool()` dit de combien d'adversaires le conseil dispose, `bruteOdds.forgetPool()`
efface. Rien ne sort du navigateur, et rien n'est demandé au serveur : ce sont les réponses
que le jeu envoie déjà.

### Quand le chiffre est marqué approximatif

Un `~` et la mention `(renfort inconnu)` signalent que le vivier de renfort de l'adversaire
n'a pas pu être résolu. L'estimation reste affichée, mais elle ignore un facteur réel.

---

## Ce qui est prouvé, et ce qui ne l'est pas

**Prouvé :** la construction des combattants. Le test en or
(`tests/engine/golden.test.ts`) compare nos combattants à ceux qu'un vrai combat du serveur
a réellement produits, sur les vingt champs qu'il stocke — identifiants, rang, statistiques,
armes et compétences avec leurs tiers. La capture de référence oppose deux brutes de niveau
16, l'une à sept armes et trois compétences, l'autre à cinq compétences. C'est là qu'une
erreur serait à la fois probable et invisible.

**En cours de vérification :** que la boucle de combat rejoue fidèlement le jeu. Le
générateur aléatoire du serveur n'est pas rejouable : on ne peut pas rejouer *un* combat
coup pour coup. Seule une calibration sur des combats réels peut trancher, et elle se
remplit maintenant toute seule : chaque combat lancé depuis l'arène est confronté au
chiffre annoncé avant lui. Dans la console du navigateur :

```js
bruteOdds.calibration()
```

```
37 combats mesurés, 24 gagnés
score de Brier : 0.183 (0 = parfait, 0,25 = pile ou face)

annoncé   observé   combats
  22 %      25 %         8
  48 %      45 %        11
  71 %      69 %        13
  93 %      80 %         5
```

Un simulateur fidèle aligne les deux colonnes. Un écart franc et persistant sur une tranche
est le signe que la boucle diverge du jeu, et c'est exactement ce qu'aucun test unitaire ne
pouvait dire. `bruteOdds.records()` donne le détail, `bruteOdds.reset()` efface. Rien ne
sort du navigateur : la mesure vit dans le stockage local de la page.

**Non couvert par le test en or :** les familiers et les renforts. Les brutes de la capture
de référence n'en ont pas. Élargir la couverture ne demande qu'un combat capturé où l'un ou
l'autre intervient.

**Une estimation, pas une prédiction.** Un combat annoncé à 90 % se perd une fois sur dix.
C'est le sens du chiffre, pas un défaut.

---

## Mettre à jour le moteur

Quand le jeu change ses règles de combat, il faut resynchroniser :

1. changer `UPSTREAM_SHA` dans [`scripts/vendor.sh`](scripts/vendor.sh) ;
2. `npm run vendor && npm test`.

Le test en or détecte la dérive. **Un échec est un vrai échec** : il signifie que la
simulation ne dit plus ce que dit le jeu, pas qu'il faut ajuster l'assertion.

Un workflow hebdomadaire ([`.github/workflows/upstream.yml`](.github/workflows/upstream.yml))
compare le SHA épinglé à `main` en amont et ouvre une issue quand les deux divergent. Il ne
resynchronise rien : c'est une alerte, la décision reste manuelle.

---

## Développement

```bash
npm test         # tests unitaires (Vitest)
npm run typecheck
npm run bench    # coût d'un combat simulé, pour calibrer le nombre de tirages
npm run build
```

### Organisation

| Dossier | Rôle |
|---|---|
| `src/engine/` | Un combat simulé, un destin appliqué, une carrière prolongée, à partir du moteur vendorisé |
| `src/odds/` | Le Monte-Carlo, son intervalle, son hasard reproductible, son clone rapide, les carrières, la calibration |
| `src/worker/` | Le protocole qui sort le calcul du fil principal |
| `src/userscript/` | Interception réseau, cache, renforts, vivier, pool de workers, salves, affichage, conseil |
| `vendor/` | Le moteur amont — non versionné, produit par `npm run vendor` |

Les frontières entre ces dossiers ne sont pas qu'une convention de revue :
[`tests/architecture.test.ts`](tests/architecture.test.ts) échoue si `engine/` touche au
navigateur, si `odds/` remonte vers `userscript/`, ou si un module qui fait quelque chose
n'a pas de fichier de test.

[`tests/e2e/userscript.test.ts`](tests/e2e/userscript.test.ts) traverse la chaîne entière
dans jsdom : réponse réseau interceptée, renforts résolus, calcul délégué à un worker qui
exécute le vrai protocole, badge peint, combat confronté à son annonce.

### Deux fichiers `tsconfig`, et pourquoi

Le paquet `@labrute/prisma` a deux visages : `index.d.ts` porte les types, `index-browser.js`
porte les enums exécutables hors serveur. `tsconfig.json` sert `tsc`, qui n'exécute rien et
veut les types ; `tsconfig.runtime.json` sert les outils qui exécutent, et vise la face
navigateur — comme le font déjà `vitest.config.ts` et `scripts/build.mjs`.

### Le code vendorisé et `tsc`

Le moteur amont est écrit pour le serveur du jeu : il importe un contexte Prisma et
OpenTelemetry qu'on ne vendorise pas. Comme `exclude` ne filtre que les fichiers d'entrée et
jamais ceux qu'on importe, `scripts/vendor.sh` préfixe chaque `.ts` récupéré d'un
`// @ts-nocheck`. Les options du compilateur restent strictes, et les types exportés par le
moteur continuent de contrôler notre code.

---

## Licence et attribution

Voir [NOTICE.md](NOTICE.md) et [LICENSE](LICENSE). Le moteur amont est sous PolyForm
Noncommercial 1.0.0 : ce projet hérite de ses termes, **usage non commercial uniquement**.
Aucune affiliation avec Motion Twin, EternalTwin ou les auteurs de LaBrute.

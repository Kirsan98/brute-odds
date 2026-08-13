# brute-odds

Userscript qui affiche, sous chaque adversaire de l'arène de [LaBrute](https://brute.eternaltwin.org),
la probabilité que votre brute gagne le combat.

```
ANTOINE101            EFKOEPZ
Niveau 1              Niveau 1
  53 % ± 2              48 % ± 2
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
chaque adversaire, puis se change en pourcentage.

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

Sur 2 000 combats, la proportion de victoires converge vers la vraie probabilité :

```
winRate = victoires / 2000
ci      = 1.96 × √(winRate × (1 - winRate) / 2000)
```

Le `± 2` est l'intervalle de confiance à 95 %, **en points de pourcentage** : ±2,2 points
autour de 50 %, ±1,3 point autour de 90 %. Il est planché à 1 — un « ± 0 » serait un
mensonge.

Le nombre de 2 000 vient d'une mesure, pas d'une intuition : `npm run bench` donne environ
0,045 ms par combat, soit une demi-seconde pour les six adversaires.

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

**Non prouvé :** que la boucle de combat rejoue fidèlement le jeu. Le générateur aléatoire
du serveur n'est pas rejouable — on ne peut pas rejouer *un* combat coup pour coup, seulement
constater que les distributions se ressemblent. Seule une calibration sur des combats réels
pourrait le confirmer, et elle n'est pas encore faite.

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

Rien n'avertit encore qu'une nouvelle version existe en amont — la vérification est
manuelle.

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
| `src/engine/` | Un combat simulé, à partir du moteur vendorisé |
| `src/odds/` | Le Monte-Carlo et son intervalle de confiance |
| `src/worker/` | Le protocole qui sort le calcul du fil principal |
| `src/userscript/` | Interception réseau, cache, renforts, affichage |
| `vendor/` | Le moteur amont — non versionné, produit par `npm run vendor` |

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

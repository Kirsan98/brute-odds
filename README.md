# brute-odds

Userscript qui affiche, sous chaque adversaire de l'arène de [LaBrute](https://brute.eternaltwin.org),
la probabilité que votre brute gagne le combat.

Le chiffre n'est pas une formule : c'est le **vrai moteur de combat du jeu**, vendorisé depuis
[Zenoo/labrute](https://github.com/Zenoo/labrute), qui rejoue 2 000 combats contre chaque
adversaire dans un Web Worker. La page reste fluide, le calcul se fait à côté.

```
Adversaire        63 % ± 3
```

Le `± 3` est l'intervalle de confiance à 95 % : avec 2 000 tirages, la vraie valeur est à
quelques points près. Un `~` et la mention `(renfort inconnu)` signalent une estimation
dégradée, quand le pool de renfort de l'adversaire n'a pas pu être résolu.

**C'est une estimation statistique, pas une prédiction.** Un combat annoncé à 90 % se perd
une fois sur dix — c'est le sens du chiffre, pas un bug.

## Installation

```bash
npm i
npm run vendor   # récupère le moteur de combat amont
npm run build    # produit dist/brute-odds.user.js
```

Puis glisser `dist/brute-odds.user.js` dans Tampermonkey (ou ouvrir le fichier, l'extension
propose l'installation).

Le moteur n'est pas redistribué dans ce dépôt : `npm run vendor` le récupère chez l'amont, à un
SHA épinglé. Le build est donc indispensable, il n'y a pas de fichier prêt à l'emploi.

## Mettre à jour le moteur

Quand le jeu change ses règles de combat, il faut resynchroniser :

1. changer `UPSTREAM_SHA` dans `scripts/vendor.sh` ;
2. `npm run vendor && npm test`.

Le test en or (`tests/engine/golden.test.ts`) compare notre construction des combattants à
celle d'un vrai combat renvoyé par le serveur : c'est lui qui détecte une dérive. **Un échec
est un vrai échec** — il veut dire que la simulation ne dit plus la même chose que le jeu, pas
qu'il faut ajuster l'assertion.

## Développement

```bash
npm test         # tests unitaires (Vitest)
npm run typecheck
npm run bench    # mesure le coût d'un combat simulé, pour calibrer le nombre de tirages
npm run build
```

## Licence et attribution

Voir [NOTICE.md](NOTICE.md) et [LICENSE](LICENSE). Le moteur amont est sous PolyForm
Noncommercial 1.0.0 : ce projet hérite de ses termes, usage non commercial uniquement. Aucune
affiliation avec Motion Twin, EternalTwin ou les auteurs de LaBrute.

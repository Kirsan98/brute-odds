#!/usr/bin/env bash
set -euo pipefail

# SHA amont épinglé. Pour mettre à jour le moteur : changer cette valeur,
# relancer `npm run vendor`, puis `npm test` (le test en or détecte les dérives).
UPSTREAM_SHA="881520a841de8f2b1fd35f4927bf33aabec5273a"
UPSTREAM_URL="https://github.com/Zenoo/labrute.git"
DEST="vendor/labrute"

rm -rf "$DEST"
mkdir -p "$DEST"
git -C "$DEST" init -q
git -C "$DEST" remote add origin "$UPSTREAM_URL"
git -C "$DEST" config core.sparseCheckout true
# LICENSE est indispensable : la tâche 10 en a besoin pour l'attribution.
# tsconfig.json (racine du monorepo) est indispensable : core/tsconfig.json
# l'étend via "extends": "../tsconfig.json", sans lui la résolution TS échoue.
printf '%s\n' 'core/' 'prisma/' 'server/src/utils/' 'LICENSE' 'tsconfig.json' > "$DEST/.git/info/sparse-checkout"
git -C "$DEST" fetch --depth 1 origin "$UPSTREAM_SHA" -q
git -C "$DEST" checkout -q FETCH_HEAD
echo "Moteur vendorisé depuis $UPSTREAM_SHA"

# brute-odds Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Afficher sur la page arène de LaBrute une estimation Monte-Carlo de la probabilité de victoire contre chaque adversaire proposé.

**Architecture :** Un userscript navigateur qui intercepte les réponses API que le client fait déjà, rejoue le vrai moteur de combat du jeu (vendorisé depuis `Zenoo/labrute`) N fois dans un Web Worker, et injecte le résultat dans le DOM. Trois modules à dépendances descendantes : `engine` (règles du jeu, vendorisées) → `odds` (Monte-Carlo) → `userscript` (réseau + DOM).

**Tech Stack :** TypeScript, Vitest, esbuild, Web Worker. Aucun framework.

**Spec :** `docs/superpowers/specs/2026-08-13-brute-odds-design.md`

## Global Constraints

- **Node ≥ 20**, npm. Pas de pnpm (le monorepo amont l'utilise, nous non : on ne construit pas son workspace).
- **Le code amont n'est jamais commité.** `vendor/` est gitignoré et reconstruit par `npm run vendor`, épinglé à un SHA.
- **`engine/` ne connaît ni le DOM ni le réseau. `odds/` ne connaît que `engine`. `userscript/` ne contient aucune règle de jeu.** Toute violation de ces frontières est un échec de revue.
- **Aucune estimation silencieusement approximative** : si une donnée manque (renfort adverse non résolu), le résultat est marqué comme approximatif jusque dans l'affichage.
- **Affichage :** toujours `X % ± Y`, jamais de décimale. Le résultat est une estimation, il doit en avoir l'air.
- **Aucune action de jeu n'est jamais émise.** Le userscript est en lecture seule : ni combat lancé, ni montée de niveau, ni requête `PATCH`/`PUT`/`DELETE`.
- **Dépôt public** (`Kirsan98/brute-odds`) : l'attribution du code amont et sa licence doivent être présentes (Tâche 10).

---

### Task 1: Squelette du projet et vendorisation du moteur

C'est la tâche la plus risquée du plan, donc elle est première : elle prouve que les enums Prisma du jeu se chargent hors du serveur. Si ça échoue, tout le reste est à repenser.

**Files:**
- Create: `package.json`, `tsconfig.json`, `.gitignore`, `vitest.config.ts`, `scripts/vendor.sh`
- Test: `tests/vendor.test.ts`

**Interfaces:**
- Consumes: rien.
- Produces: les alias `@labrute/core` et `@labrute/prisma` résolus par Vitest et esbuild ; le dossier `vendor/labrute/`.

- [ ] **Step 1: Initialiser le projet**

```bash
cd ~/Documents/perso/brute-odds
npm init -y
npm pkg set type=module engines.node=">=20"
npm i -D typescript vitest esbuild @types/node
```

- [ ] **Step 2: Écrire `.gitignore`**

```
node_modules/
vendor/
dist/
```

- [ ] **Step 3: Écrire `scripts/vendor.sh`**

Clone creux et superficiel : on ne récupère que les sources nécessaires, pas les milliers d'images du client.

```bash
#!/usr/bin/env bash
set -euo pipefail

# SHA amont épinglé. Pour mettre à jour le moteur : changer cette valeur,
# relancer `npm run vendor`, puis `npm test` (le test en or détecte les dérives).
UPSTREAM_SHA="main"
UPSTREAM_URL="https://github.com/Zenoo/labrute.git"
DEST="vendor/labrute"

rm -rf "$DEST"
mkdir -p "$DEST"
git -C "$DEST" init -q
git -C "$DEST" remote add origin "$UPSTREAM_URL"
git -C "$DEST" config core.sparseCheckout true
# LICENSE est indispensable : la tâche 10 en a besoin pour l'attribution.
printf '%s\n' 'core/' 'prisma/' 'server/src/utils/' 'LICENSE' > "$DEST/.git/info/sparse-checkout"
git -C "$DEST" fetch --depth 1 origin "$UPSTREAM_SHA" -q
git -C "$DEST" checkout -q FETCH_HEAD
echo "Moteur vendorisé depuis $UPSTREAM_SHA"
```

```bash
chmod +x scripts/vendor.sh
npm pkg set scripts.vendor="bash scripts/vendor.sh"
npm pkg set scripts.test="vitest run"
```

- [ ] **Step 4: Récupérer le moteur et épingler le SHA réel**

```bash
npm run vendor
git -C vendor/labrute rev-parse HEAD
```

Remplacer `UPSTREAM_SHA="main"` par le SHA affiché, pour que la vendorisation soit reproductible.

- [ ] **Step 5: Écrire `vitest.config.ts` avec les alias**

Le moteur importe `@labrute/core` et `@labrute/prisma`. On les fait pointer vers les sources vendorisées — et pour Prisma vers le **build navigateur**, qui expose les enums sans le client base de données.

```ts
import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

const r = (p: string) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig({
  resolve: {
    alias: [
      { find: '@labrute/core', replacement: r('./vendor/labrute/core/src/index.ts') },
      { find: '@labrute/prisma', replacement: r('./vendor/labrute/prisma/index-browser.js') },
    ],
  },
  test: { environment: 'node' },
});
```

- [ ] **Step 6: Écrire le test qui échoue**

`tests/vendor.test.ts` :

```ts
import { describe, expect, it } from 'vitest';
import { SkillName, WeaponName } from '@labrute/prisma';
import { SkillByName, WeaponByName } from '@labrute/core';

describe('vendorisation du moteur', () => {
  it('expose les enums Prisma hors du serveur', () => {
    expect(SkillName.backup).toBe('backup');
    expect(WeaponName.knife).toBe('knife');
  });

  it('expose les tables de données du core', () => {
    expect(SkillByName[SkillName.backup]).toBeDefined();
    expect(WeaponByName[WeaponName.knife]).toBeDefined();
  });
});
```

- [ ] **Step 7: Lancer le test**

Run: `npm test`
Attendu : PASS. Si les enums ne se chargent pas, c'est le risque n°3 du spec qui se matérialise — ne pas contourner en réimplémentant les enums à la main, investiguer la résolution de l'alias.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: squelette du projet et vendorisation du moteur de combat"
```

---

### Task 2: `engine/simulateOnce` — un combat simulé

**Files:**
- Create: `src/engine/simulateOnce.ts`, `src/engine/types.ts`, `tests/fixtures/makeBrute.ts`
- Test: `tests/engine/simulateOnce.test.ts`

**Interfaces:**
- Consumes: les alias de la Tâche 1.
- Produces:
  - `type RawBrute` (`src/engine/types.ts`) : la forme de brute renvoyée par l'API du jeu.
  - `simulateOnce(brute: RawBrute, opponent: RawBrute, modifiers: Modifiers, backups?: { own?: RawBrute; opponent?: RawBrute }): 'win' | 'loss'`
  - `makeBrute(overrides?: Partial<RawBrute>): RawBrute` (fixture de test).

- [ ] **Step 1: Écrire `src/engine/types.ts`**

Ce jeu de champs n'est pas arbitraire : c'est exactement celui que le serveur sélectionne dans `getOpponents.ts` avant de le passer au combat, donc il suffit.

```ts
import type { Brute } from '@labrute/prisma';

export type RawBrute = Pick<Brute,
  | 'id' | 'userId' | 'name' | 'gender' | 'level' | 'xp' | 'ranking' | 'pupilsCount'
  | 'hpStat' | 'hpModifier' | 'hpValue'
  | 'strengthStat' | 'strengthModifier' | 'strengthValue'
  | 'speedStat' | 'speedModifier' | 'speedValue'
  | 'agilityStat' | 'agilityModifier' | 'agilityValue'
  | 'body' | 'colors' | 'skills' | 'weapons' | 'pets' | 'eventId'>;
```

- [ ] **Step 2: Écrire la fixture `tests/fixtures/makeBrute.ts`**

```ts
import { Gender } from '@labrute/prisma';
import type { RawBrute } from '../../src/engine/types.js';

let counter = 0;

export const makeBrute = (overrides: Partial<RawBrute> = {}): RawBrute => {
  counter += 1;
  return {
    id: `brute-${counter}`,
    userId: `user-${counter}`,
    name: `Brute${counter}`,
    gender: Gender.male,
    level: 10,
    xp: 0,
    ranking: 10,
    pupilsCount: 0,
    hpStat: 0, hpModifier: 1, hpValue: 60,
    strengthStat: 0, strengthModifier: 1, strengthValue: 10,
    speedStat: 0, speedModifier: 1, speedValue: 10,
    agilityStat: 0, agilityModifier: 1, agilityValue: 10,
    body: '0'.repeat(11),
    colors: '0'.repeat(33),
    skills: [],
    weapons: [],
    pets: [],
    eventId: null,
    ...overrides,
  } as RawBrute;
};
```

- [ ] **Step 3: Écrire le test qui échoue**

`tests/engine/simulateOnce.test.ts` :

```ts
import { describe, expect, it } from 'vitest';
import { simulateOnce } from '../../src/engine/simulateOnce.js';
import { makeBrute } from '../fixtures/makeBrute.js';

describe('simulateOnce', () => {
  it('rend un vainqueur pour deux brutes identiques', () => {
    const result = simulateOnce(makeBrute(), makeBrute(), {});
    expect(['win', 'loss']).toContain(result);
  });

  it('donne un avantage net à une brute très supérieure', () => {
    const faible = makeBrute({ strengthValue: 1, hpValue: 20, speedValue: 1, agilityValue: 1 });
    const fort = makeBrute({ strengthValue: 100, hpValue: 500, speedValue: 100, agilityValue: 100 });
    const victoires = Array.from({ length: 50 }, () => simulateOnce(fort, faible, {}))
      .filter((r) => r === 'win').length;
    expect(victoires).toBeGreaterThan(40);
  });
});
```

- [ ] **Step 4: Lancer le test pour vérifier qu'il échoue**

Run: `npm test`
Attendu : FAIL, `simulateOnce` n'existe pas.

- [ ] **Step 5: Écrire `src/engine/simulateOnce.ts`**

Réplique de `generateFight.ts:259-350`, amputée de tout ce qui touche la base. Le `while` de retry reproduit `Fights.ts:155` : un combat qui lève n'est **pas** une défaite.

```ts
import { getCalculatedBrute, type Modifiers } from '@labrute/core';
import { getFighters } from '../../vendor/labrute/server/src/utils/fight/getFighters.js';
import {
  checkDeaths, fighterArrives, orderFighters, playFighterTurn, saboteur,
} from '../../vendor/labrute/server/src/utils/fight/fightMethods.js';
import { applySpy } from '../../vendor/labrute/server/src/utils/fight/applySpy.js';
import type { DetailedFight } from '../../vendor/labrute/server/src/utils/fight/generateFight.js';
import type { RawBrute } from './types.js';

const MAX_RETRIES = 10;

const runFight = (
  brute: RawBrute, opponent: RawBrute, modifiers: Modifiers,
  backups: { own?: RawBrute; opponent?: RawBrute },
): 'win' | 'loss' => {
  const b1 = getCalculatedBrute(brute, modifiers);
  const b2 = getCalculatedBrute(opponent, modifiers);

  const fighters = getFighters({
    team1: {
      brutes: [b1],
      backups: backups.own ? [getCalculatedBrute(backups.own, modifiers)] : [],
      bosses: [],
    },
    team2: {
      brutes: [b2],
      backups: backups.opponent ? [getCalculatedBrute(backups.opponent, modifiers)] : [],
      bosses: [],
    },
    modifiers,
    clanFight: false,
  });

  const fightData = {
    modifiers,
    fighters,
    initialFighters: [],
    steps: [],
    initiative: 0,
    winner: null,
    loser: null,
    overtime: false,
  } as unknown as DetailedFight;

  const stats = {};
  const achievements = {};

  fightData.fighters.forEach((f) => {
    if (f.type === 'brute' && f.master) return;
    fighterArrives(fightData, f);
  });

  orderFighters(fightData);
  const mains = fightData.fighters.filter((f) => f.type === 'brute' && !f.master);
  mains.forEach((f) => {
    const foe = mains.find((o) => o.id !== f.id);
    if (foe) applySpy(fightData, f, foe);
  });

  saboteur(fightData, achievements);

  let turn = 0;
  while (!fightData.loser && turn < 2000) {
    orderFighters(fightData);
    if (!fightData.fighters[0]) break;
    fightData.initiative = fightData.fighters[0].initiative;
    if (turn > 1000) fightData.overtime = true;
    playFighterTurn(fightData, stats, achievements);
    checkDeaths(fightData, stats);
    fightData.steps.length = 0; // on ne consomme pas les animations
    turn += 1;
  }

  if (!fightData.loser) throw new Error('Fight not finished');

  const loser = fightData.fighters.find((f) => f.id === fightData.loser);
  if (!loser) throw new Error('No loser found');

  return loser.team === 'L' ? 'loss' : 'win';
};

export const simulateOnce = (
  brute: RawBrute, opponent: RawBrute, modifiers: Modifiers,
  backups: { own?: RawBrute; opponent?: RawBrute } = {},
): 'win' | 'loss' => {
  let lastError: unknown;
  for (let attempt = 0; attempt < MAX_RETRIES; attempt += 1) {
    try {
      return runFight(brute, opponent, modifiers, backups);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
};
```

- [ ] **Step 6: Lancer les tests**

Run: `npm test`
Attendu : PASS.

Si l'import échoue sur l'extension `.js` (le code amont écrit `./generateFight.js` pour un fichier `.ts`), ajouter à `vitest.config.ts` un plugin `resolveId` qui remappe `.js` → `.ts` dans `vendor/`. Ne pas modifier les sources vendorisées : elles doivent rester rejouables à l'identique après un `npm run vendor`.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(engine): simulation d'un combat unique avec le moteur du jeu"
```

---

### Task 3: Test en or — notre construction est-elle celle du serveur ?

C'est la tâche qui distingue un simulateur juste d'un simulateur crédible. Elle compare notre construction de combattants à celle qu'a réellement produite le serveur.

**Files:**
- Create: `tests/fixtures/real-fight.json` (capture manuelle), `tests/engine/golden.test.ts`
- Modify: `src/engine/simulateOnce.ts` (extraire `buildFighters`)

**Interfaces:**
- Consumes: `simulateOnce` (Tâche 2).
- Produces: `buildFighters(brute, opponent, modifiers, backups)` exporté depuis `src/engine/simulateOnce.ts`.

- [ ] **Step 1: Capturer un vrai combat (étape humaine — Kirsan)**

Dans le navigateur, connecté au jeu :
1. Ouvrir un combat déjà joué depuis l'historique de la brute.
2. Onglet Réseau, repérer l'appel `GET /api/fight/<id>`.
3. Enregistrer la réponse JSON dans `tests/fixtures/real-fight.json`.
4. Enregistrer aussi les deux brutes du combat telles que renvoyées par l'API (`/api/brute/<nom>/for-hook`) dans `tests/fixtures/real-brute-1.json` et `real-brute-2.json`.

Sans ces trois fichiers, la tâche ne peut pas être faite : ne pas la simuler avec des données inventées, ça viderait le test de son sens.

- [ ] **Step 2: Extraire `buildFighters` de `simulateOnce.ts`**

Sortir de `runFight` les lignes allant de `getCalculatedBrute` à l'appel `getFighters` inclus, dans une fonction exportée `buildFighters(brute, opponent, modifiers, backups)` qui renvoie le tableau de combattants. `runFight` l'appelle désormais. Aucun changement de comportement.

- [ ] **Step 3: Écrire le test qui échoue**

`tests/engine/golden.test.ts` — le combat stocké côté serveur contient les combattants **réduits** (`generateFight.ts:368-400`), on applique donc la même réduction avant de comparer.

```ts
import { describe, expect, it } from 'vitest';
import fight from '../fixtures/real-fight.json' with { type: 'json' };
import brute1 from '../fixtures/real-brute-1.json' with { type: 'json' };
import brute2 from '../fixtures/real-brute-2.json' with { type: 'json' };
import { buildFighters } from '../../src/engine/simulateOnce.js';
import type { RawBrute } from '../../src/engine/types.js';

describe('test en or', () => {
  it('reconstruit les combattants exactement comme le serveur', () => {
    const fighters = buildFighters(brute1 as RawBrute, brute2 as RawBrute, fight.modifiers ?? {});

    const nôtres = fighters.map((f) => ({
      name: f.name, type: f.type, maxHp: f.maxHp,
      strength: f.strength, agility: f.agility, speed: f.speed,
    })).sort((a, b) => a.name.localeCompare(b.name));

    const serveur = (fight.fighters as typeof nôtres).map((f) => ({
      name: f.name, type: f.type, maxHp: f.maxHp,
      strength: f.strength, agility: f.agility, speed: f.speed,
    })).sort((a, b) => a.name.localeCompare(b.name));

    expect(nôtres).toEqual(serveur);
  });
});
```

- [ ] **Step 4: Lancer le test**

Run: `npm test`
Attendu : PASS. **Un échec ici est un vrai échec, pas un test à ajuster.** Il signifie que notre construction diverge du serveur — corriger `buildFighters`, jamais l'assertion.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "test(engine): test en or contre un combat réel du serveur"
```

---

### Task 4: `odds/estimate` — le Monte-Carlo

**Files:**
- Create: `src/odds/estimate.ts`
- Test: `tests/odds/estimate.test.ts`

**Interfaces:**
- Consumes: `simulateOnce` par **injection** (pour être testable sans le moteur).
- Produces: `estimate(fight: FightInput, n: number, sim?: Simulator): Estimation` avec
  `type Estimation = { winRate: number; ci: number; samples: number; approximate: boolean }`.

- [ ] **Step 1: Écrire le test qui échoue**

```ts
import { describe, expect, it } from 'vitest';
import { estimate } from '../../src/odds/estimate.js';
import { makeBrute } from '../fixtures/makeBrute.js';

const input = { brute: makeBrute(), opponent: makeBrute(), modifiers: {}, backups: {} };

describe('estimate', () => {
  it('retrouve le taux d\'un moteur bouchonné', () => {
    let i = 0;
    const sim = () => (i++ % 4 === 0 ? 'loss' as const : 'win' as const);
    const r = estimate(input, 1000, sim);
    expect(r.winRate).toBeCloseTo(0.75, 2);
    expect(r.samples).toBe(1000);
  });

  it('resserre l\'intervalle de confiance quand n grandit', () => {
    const sim = () => (Math.random() < 0.5 ? 'win' as const : 'loss' as const);
    expect(estimate(input, 2000, sim).ci).toBeLessThan(estimate(input, 100, sim).ci);
  });

  it('propage le caractère approximatif de l\'entrée', () => {
    const sim = () => 'win' as const;
    expect(estimate({ ...input, approximate: true }, 10, sim).approximate).toBe(true);
  });
});
```

- [ ] **Step 2: Lancer le test pour vérifier qu'il échoue**

Run: `npm test`
Attendu : FAIL, `estimate` n'existe pas.

- [ ] **Step 3: Écrire `src/odds/estimate.ts`**

```ts
import { simulateOnce } from '../engine/simulateOnce.js';
import type { RawBrute } from '../engine/types.js';
import type { Modifiers } from '@labrute/core';

export type FightInput = {
  brute: RawBrute;
  opponent: RawBrute;
  modifiers: Modifiers;
  backups?: { own?: RawBrute; opponent?: RawBrute };
  approximate?: boolean;
};

export type Estimation = {
  winRate: number;
  ci: number;
  samples: number;
  approximate: boolean;
};

export type Simulator = (
  brute: RawBrute, opponent: RawBrute, modifiers: Modifiers,
  backups: { own?: RawBrute; opponent?: RawBrute },
) => 'win' | 'loss';

export const estimate = (
  input: FightInput,
  n: number,
  sim: Simulator = simulateOnce,
): Estimation => {
  let wins = 0;
  for (let i = 0; i < n; i += 1) {
    if (sim(input.brute, input.opponent, input.modifiers, input.backups ?? {}) === 'win') {
      wins += 1;
    }
  }
  const winRate = wins / n;
  // Intervalle de confiance à 95 % d'une proportion binomiale.
  const ci = 1.96 * Math.sqrt((winRate * (1 - winRate)) / n);
  return { winRate, ci, samples: n, approximate: input.approximate ?? false };
};
```

- [ ] **Step 4: Lancer les tests**

Run: `npm test`
Attendu : PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(odds): estimation Monte-Carlo avec intervalle de confiance"
```

---

### Task 5: Mesurer, puis calibrer N

Le spec laisse volontairement N ouvert faute de mesure. Cette tâche le mesure et le fixe.

**Files:**
- Create: `scripts/bench.ts`, `src/odds/config.ts`
- Modify: `docs/superpowers/specs/2026-08-13-brute-odds-design.md` (§8, remplacer « à calibrer » par la valeur mesurée)

**Interfaces:**
- Produces: `SIMULATIONS: number` exporté depuis `src/odds/config.ts`.

- [ ] **Step 1: Écrire `scripts/bench.ts`**

```ts
import { performance } from 'node:perf_hooks';
import { simulateOnce } from '../src/engine/simulateOnce.js';
import { makeBrute } from '../tests/fixtures/makeBrute.js';

const a = makeBrute();
const b = makeBrute();
const N = 2000;

for (let i = 0; i < 200; i += 1) simulateOnce(a, b, {}); // chauffe

const t0 = performance.now();
for (let i = 0; i < N; i += 1) simulateOnce(a, b, {});
const perFight = (performance.now() - t0) / N;

console.log(`${perFight.toFixed(3)} ms par combat`);
console.log(`6 adversaires x 1000 simulations = ${(perFight * 6000 / 1000).toFixed(1)} s`);
```

```bash
npm i -D tsx
npm pkg set scripts.bench="tsx scripts/bench.ts"
```

- [ ] **Step 2: Mesurer**

Run: `npm run bench`
Noter le coût réel par combat.

- [ ] **Step 3: Choisir N et l'écrire dans `src/odds/config.ts`**

Règle de décision, à appliquer avec le chiffre mesuré : prendre le plus grand N tel que `coût × N × 6 ≤ 2 s`, plafonné à 2000 (au-delà, l'intervalle de confiance gagne moins de 0,5 point et le temps double).

```ts
// Valeur issue de la mesure de scripts/bench.ts — voir §8 du spec.
export const SIMULATIONS = /* valeur mesurée */ 0;
```

Remplacer `0` par la valeur retenue. Ne pas laisser `0`.

- [ ] **Step 4: Reporter la valeur dans le spec**

Mettre à jour le §8 du spec : remplacer « sera calibré après mesure réelle » par la valeur retenue, le coût mesuré par combat, et la machine de mesure.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "perf: mesure du coût d'un combat et calibration du nombre de simulations"
```

---

### Task 6: Le Web Worker

**Files:**
- Create: `src/worker/worker.ts`, `src/worker/protocol.ts`
- Test: `tests/worker/protocol.test.ts`

**Interfaces:**
- Consumes: `estimate`, `SIMULATIONS`.
- Produces:
  - `type WorkerRequest = { id: string; input: FightInput }`
  - `type WorkerResponse = { id: string; estimation: Estimation }`
  - `handleRequest(req: WorkerRequest): WorkerResponse` (pure, testable sans navigateur).

- [ ] **Step 1: Écrire le test qui échoue**

```ts
import { describe, expect, it } from 'vitest';
import { handleRequest } from '../../src/worker/protocol.js';
import { makeBrute } from '../fixtures/makeBrute.js';

describe('protocole du worker', () => {
  it('renvoie une estimation portant l\'identifiant de la requête', () => {
    const res = handleRequest({
      id: 'abc',
      input: { brute: makeBrute(), opponent: makeBrute(), modifiers: {} },
    }, () => 'win');
    expect(res.id).toBe('abc');
    expect(res.estimation.winRate).toBe(1);
  });
});
```

- [ ] **Step 2: Lancer le test pour vérifier qu'il échoue**

Run: `npm test`
Attendu : FAIL, `handleRequest` n'existe pas.

- [ ] **Step 3: Écrire `src/worker/protocol.ts`**

```ts
import { estimate, type Estimation, type FightInput, type Simulator } from '../odds/estimate.js';
import { SIMULATIONS } from '../odds/config.js';

export type WorkerRequest = { id: string; input: FightInput };
export type WorkerResponse = { id: string; estimation: Estimation };

export const handleRequest = (req: WorkerRequest, sim?: Simulator): WorkerResponse => ({
  id: req.id,
  estimation: estimate(req.input, SIMULATIONS, sim),
});
```

- [ ] **Step 4: Écrire `src/worker/worker.ts`**

```ts
import { handleRequest, type WorkerRequest } from './protocol.js';

self.onmessage = (event: MessageEvent<WorkerRequest>) => {
  self.postMessage(handleRequest(event.data));
};
```

- [ ] **Step 5: Lancer les tests**

Run: `npm test`
Attendu : PASS.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(worker): protocole de calcul hors du fil principal"
```

---

### Task 7: Interception réseau et cache multi-brutes

**Files:**
- Create: `src/userscript/intercept.ts`, `src/userscript/store.ts`
- Test: `tests/userscript/store.test.ts`

**Interfaces:**
- Consumes: `RawBrute`.
- Produces:
  - `store.putBrutes(brutes: RawBrute[])`, `store.getBrute(name: string): RawBrute | undefined`
  - `store.putOwnBrutes(brutes: RawBrute[])`, `store.getOwnBrutes(): RawBrute[]` — nos brutes à nous, distinctes des brutes simplement croisées
  - `store.putModifiers(m: Modifiers)`, `store.getModifiers(): Modifiers`
  - `store.putOpponents(bruteName: string, opponents: RawBrute[])`, `store.getOpponents(bruteName)`
  - `store.putHeaders(h: Record<string, string>)`, `store.getHeaders()`
  - `installInterceptor(onArena: (bruteName: string) => void): void`

- [ ] **Step 1: Écrire le test qui échoue**

```ts
import { beforeEach, describe, expect, it } from 'vitest';
import { store } from '../../src/userscript/store.js';
import { makeBrute } from '../fixtures/makeBrute.js';

describe('store', () => {
  beforeEach(() => store.reset());

  it('indexe les brutes par nom, plusieurs par compte', () => {
    const a = makeBrute({ name: 'SamIsGuey' });
    const b = makeBrute({ name: 'AutreBrute' });
    store.putBrutes([a, b]);
    expect(store.getBrute('SamIsGuey')?.id).toBe(a.id);
    expect(store.getBrute('AutreBrute')?.id).toBe(b.id);
  });

  it('la donnée la plus récente écrase la précédente', () => {
    store.putBrutes([makeBrute({ name: 'SamIsGuey', level: 10 })]);
    store.putBrutes([makeBrute({ name: 'SamIsGuey', level: 11 })]);
    expect(store.getBrute('SamIsGuey')?.level).toBe(11);
  });

  it('sépare les adversaires par brute', () => {
    store.putOpponents('SamIsGuey', [makeBrute({ name: 'X' })]);
    store.putOpponents('AutreBrute', [makeBrute({ name: 'Y' })]);
    expect(store.getOpponents('SamIsGuey')?.[0]?.name).toBe('X');
    expect(store.getOpponents('AutreBrute')?.[0]?.name).toBe('Y');
  });
});
```

- [ ] **Step 2: Lancer le test pour vérifier qu'il échoue**

Run: `npm test`
Attendu : FAIL, `store` n'existe pas.

- [ ] **Step 3: Écrire `src/userscript/store.ts`**

```ts
import type { Modifiers } from '@labrute/core';
import type { RawBrute } from '../engine/types.js';

const brutes = new Map<string, RawBrute>();
const opponents = new Map<string, RawBrute[]>();
const ownNames = new Set<string>();
let modifiers: Modifiers = {};
let headers: Record<string, string> = {};

export const store = {
  putBrutes: (list: RawBrute[]) => list.forEach((b) => brutes.set(b.name, b)),
  getBrute: (name: string) => brutes.get(name),
  // Seule l'authentification garantit qu'une brute est bien la nôtre.
  putOwnBrutes: (list: RawBrute[]) => {
    list.forEach((b) => {
      brutes.set(b.name, b);
      ownNames.add(b.name);
    });
  },
  getOwnBrutes: (): RawBrute[] => Array.from(ownNames)
    .map((n) => brutes.get(n))
    .filter((b): b is RawBrute => !!b),
  putOpponents: (bruteName: string, list: RawBrute[]) => opponents.set(bruteName, list),
  getOpponents: (bruteName: string) => opponents.get(bruteName),
  putModifiers: (m: Modifiers) => { modifiers = m; },
  getModifiers: () => modifiers,
  putHeaders: (h: Record<string, string>) => { headers = h; },
  getHeaders: () => headers,
  reset: () => {
    brutes.clear();
    opponents.clear();
    ownNames.clear();
    modifiers = {};
    headers = {};
  },
};
```

- [ ] **Step 4: Écrire `src/userscript/intercept.ts`**

L'URL des adversaires porte le nom de la brute : c'est ce qui rend le multi-brutes non ambigu.

```ts
import { store } from './store.js';

const OPPONENTS = /\/api\/brute\/([^/]+)\/get-opponents\//;
const HOOK = /\/api\/brute\/([^/]+)\/for-hook/;

export const installInterceptor = (onArena: (bruteName: string) => void) => {
  const original = window.fetch;

  window.fetch = async (...args: Parameters<typeof fetch>) => {
    const response = await original(...args);
    const url = typeof args[0] === 'string' ? args[0] : (args[0] as Request).url;

    // On mémorise des en-têtes valides pour nos propres requêtes (cf. tâche 8).
    const init = args[1];
    if (init?.headers) {
      store.putHeaders(Object.fromEntries(new Headers(init.headers).entries()));
    }

    try {
      if (url.includes('/api/user/authenticate')) {
        const data = await response.clone().json();
        store.putOwnBrutes(data.user.brutes);
        store.putModifiers(data.modifiers);
      } else if (HOOK.test(url)) {
        store.putBrutes([await response.clone().json()]);
      } else if (url.includes('/level-up')) {
        store.putBrutes([await response.clone().json()]);
      } else {
        const match = OPPONENTS.exec(url);
        if (match?.[1]) {
          const bruteName = decodeURIComponent(match[1]);
          store.putOpponents(bruteName, await response.clone().json());
          onArena(bruteName);
        }
      }
    } catch {
      // Une réponse illisible ne doit jamais casser la page du jeu.
    }

    return response;
  };
};
```

- [ ] **Step 5: Lancer les tests**

Run: `npm test`
Attendu : PASS.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(userscript): interception réseau et cache indexé par brute"
```

---

### Task 8: La compétence `backup` (renfort)

**Files:**
- Create: `src/userscript/resolveBackups.ts`
- Modify: `src/userscript/intercept.ts` (ajout de `fetchProfileBrutes`, étape 4)
- Test: `tests/userscript/resolveBackups.test.ts`

**Interfaces:**
- Consumes: `store`, `RawBrute`.
- Produces: `resolveBackups(brute, opponent, deps): Promise<{ own?: RawBrute; opponent?: RawBrute; approximate: boolean }>`
  où `deps = { ownBrutes: () => RawBrute[]; fetchProfileBrutes: (name: string) => Promise<RawBrute[]> }`.

- [ ] **Step 1: Écrire le test qui échoue**

```ts
import { describe, expect, it } from 'vitest';
import { resolveBackups } from '../../src/userscript/resolveBackups.js';
import { makeBrute } from '../fixtures/makeBrute.js';

const deps = (mine: ReturnType<typeof makeBrute>[], theirs: ReturnType<typeof makeBrute>[]) => ({
  ownBrutes: () => mine,
  fetchProfileBrutes: async () => theirs,
});

describe('resolveBackups', () => {
  it('ne renforce personne sans la compétence', async () => {
    const r = await resolveBackups(makeBrute(), makeBrute(), deps([], []));
    expect(r.own).toBeUndefined();
    expect(r.approximate).toBe(false);
  });

  it('choisit un renfort de niveau strictement inférieur parmi nos brutes', async () => {
    const moi = makeBrute({ name: 'Moi', level: 10, skills: ['backup'] as never });
    const petite = makeBrute({ name: 'Petite', level: 5 });
    const grande = makeBrute({ name: 'Grande', level: 20 });
    const r = await resolveBackups(moi, makeBrute(), deps([moi, petite, grande], []));
    expect(r.own?.name).toBe('Petite');
  });

  it('marque approximatif si le profil adverse est inaccessible', async () => {
    const foe = makeBrute({ level: 10, skills: ['backup'] as never });
    const r = await resolveBackups(makeBrute(), foe, {
      ownBrutes: () => [],
      fetchProfileBrutes: async () => { throw new Error('403'); },
    });
    expect(r.approximate).toBe(true);
    expect(r.opponent).toBeUndefined();
  });
});
```

- [ ] **Step 2: Lancer le test pour vérifier qu'il échoue**

Run: `npm test`
Attendu : FAIL, `resolveBackups` n'existe pas.

- [ ] **Step 3: Écrire `src/userscript/resolveBackups.ts`**

Le critère reproduit `generateFight.ts:218-227` : même compte, autre brute, niveau strictement inférieur, tirage au hasard.

```ts
import { SkillName } from '@labrute/prisma';
import type { RawBrute } from '../engine/types.js';

type Deps = {
  ownBrutes: () => RawBrute[];
  fetchProfileBrutes: (bruteName: string) => Promise<RawBrute[]>;
};

const hasBackup = (b: RawBrute) => (b.skills as string[]).includes(SkillName.backup);

const pick = (candidates: RawBrute[], self: RawBrute) => {
  const eligible = candidates.filter((c) => c.id !== self.id && c.level < self.level);
  if (!eligible.length) return undefined;
  return eligible[Math.floor(Math.random() * eligible.length)];
};

export const resolveBackups = async (
  brute: RawBrute,
  opponent: RawBrute,
  deps: Deps,
): Promise<{ own?: RawBrute; opponent?: RawBrute; approximate: boolean }> => {
  const own = hasBackup(brute) ? pick(deps.ownBrutes(), brute) : undefined;

  if (!hasBackup(opponent)) return { own, opponent: undefined, approximate: false };

  try {
    return { own, opponent: pick(await deps.fetchProfileBrutes(opponent.name), opponent), approximate: false };
  } catch {
    return { own, opponent: undefined, approximate: true };
  }
};
```

- [ ] **Step 4: Écrire l'implémentation réelle de `fetchProfileBrutes`**

Dans `src/userscript/intercept.ts`, ajouter — elle rejoue les en-têtes capturés, seule façon de passer `securityCheck` :

```ts
export const fetchProfileBrutes = async (bruteName: string): Promise<RawBrute[]> => {
  const headers = store.getHeaders();
  const hook = await fetch(`/api/brute/${encodeURIComponent(bruteName)}/for-hook`, { headers });
  if (!hook.ok) throw new Error(`for-hook ${hook.status}`);
  const { userId } = await hook.json();
  if (!userId) throw new Error('userId absent');

  const profile = await fetch(`/api/user/${userId}/profile`, { headers });
  if (!profile.ok) throw new Error(`profile ${profile.status}`);
  return (await profile.json()).brutes;
};
```

- [ ] **Step 5: Lancer les tests**

Run: `npm test`
Attendu : PASS.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(userscript): résolution du renfort pour les deux camps"
```

---

### Task 9: Injection dans la page arène

**Files:**
- Create: `src/userscript/inject.ts`
- Test: `tests/userscript/inject.test.ts`

**Interfaces:**
- Consumes: `Estimation`.
- Produces: `renderOdds(name: string, estimation: Estimation | 'pending'): void`, `formatOdds(e: Estimation): string`.

- [ ] **Step 1: Installer l'environnement DOM de test**

```bash
npm i -D jsdom
npm pkg set scripts.test="vitest run"
```

Ajouter `environmentMatchGlobs: [['tests/userscript/inject.test.ts', 'jsdom']]` au bloc `test` de `vitest.config.ts`.

- [ ] **Step 2: Écrire le test qui échoue**

```ts
// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest';
import { formatOdds, renderOdds } from '../../src/userscript/inject.js';

describe('affichage', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="MuiGrid-item"><span>Adversaire1</span></div>
      <div class="MuiGrid-item"><span>Adversaire2</span></div>`;
  });

  it('formate une estimation sans fausse précision', () => {
    expect(formatOdds({ winRate: 0.634, ci: 0.031, samples: 1000, approximate: false }))
      .toBe('63 % ± 3');
  });

  it('signale explicitement une estimation approximative', () => {
    expect(formatOdds({ winRate: 0.5, ci: 0.03, samples: 1000, approximate: true }))
      .toBe('~50 % ± 3 (renfort inconnu)');
  });

  it('injecte le résultat dans la carte du bon adversaire', () => {
    renderOdds('Adversaire2', { winRate: 0.42, ci: 0.02, samples: 1000, approximate: false });
    const cards = document.querySelectorAll('.MuiGrid-item');
    expect(cards[0].textContent).not.toContain('%');
    expect(cards[1].textContent).toContain('42 % ± 2');
  });

  it('remplace le résultat au lieu de l\'empiler', () => {
    const e = { winRate: 0.42, ci: 0.02, samples: 1000, approximate: false };
    renderOdds('Adversaire1', e);
    renderOdds('Adversaire1', { ...e, winRate: 0.55 });
    expect(document.querySelectorAll('.brute-odds').length).toBe(1);
  });
});
```

- [ ] **Step 3: Lancer le test pour vérifier qu'il échoue**

Run: `npm test`
Attendu : FAIL, `inject.js` n'existe pas.

- [ ] **Step 4: Écrire `src/userscript/inject.ts`**

Les cartes d'adversaires sont des `BruteButton` dans un `Grid item` MUI, sans attribut stable : on ancre donc sur le **nom**, qu'on connaît déjà par l'interception.

```ts
import type { Estimation } from '../odds/estimate.js';

export const formatOdds = (e: Estimation): string => {
  const pct = Math.round(e.winRate * 100);
  const ci = Math.max(1, Math.round(e.ci * 100));
  return e.approximate
    ? `~${pct} % ± ${ci} (renfort inconnu)`
    : `${pct} % ± ${ci}`;
};

// Correspondance exacte sur un nœud de texte : `includes` confondrait
// « Sam » avec « Sam2 » et afficherait le score sur la mauvaise carte.
const findCard = (name: string): Element | null => {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    if (node.textContent?.trim() === name) {
      const card = (node.parentElement as Element | null)?.closest('.MuiGrid-item');
      if (card) return card;
    }
    node = walker.nextNode();
  }
  return null;
};

export const renderOdds = (name: string, estimation: Estimation | 'pending') => {
  const card = findCard(name);
  if (!card) return;

  card.querySelector('.brute-odds')?.remove();

  const badge = document.createElement('div');
  badge.className = 'brute-odds';
  badge.style.cssText = 'text-align:center;font-weight:700;padding:2px 0;';
  badge.textContent = estimation === 'pending' ? '…' : formatOdds(estimation);
  card.appendChild(badge);
};
```

- [ ] **Step 5: Lancer les tests**

Run: `npm test`
Attendu : PASS.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(userscript): affichage des probabilités sur les cartes d'adversaires"
```

---

### Task 10: Assemblage, build et publication

**Files:**
- Create: `src/userscript/main.ts`, `scripts/build.mjs`, `LICENSE`, `NOTICE.md`, `README.md`
- Modify: `package.json`

**Interfaces:**
- Consumes: tout ce qui précède.
- Produces: `dist/brute-odds.user.js`, installable dans Tampermonkey.

- [ ] **Step 1: Écrire `src/userscript/main.ts`**

```ts
import { installInterceptor, fetchProfileBrutes } from './intercept.js';
import { resolveBackups } from './resolveBackups.js';
import { renderOdds } from './inject.js';
import { store } from './store.js';
import type { WorkerResponse } from '../worker/protocol.js';

const worker = new Worker(URL.createObjectURL(
  new Blob([WORKER_SOURCE], { type: 'application/javascript' }),
));

const pending = new Map<string, string>();

worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
  const name = pending.get(event.data.id);
  if (name) {
    renderOdds(name, event.data.estimation);
    pending.delete(event.data.id);
  }
};

const onArena = async (bruteName: string) => {
  const brute = store.getBrute(bruteName);
  const opponents = store.getOpponents(bruteName);
  if (!brute || !opponents) return;

  for (const opponent of opponents) {
    renderOdds(opponent.name, 'pending');

    const backups = await resolveBackups(brute, opponent, {
      ownBrutes: () => store.getOwnBrutes(),
      fetchProfileBrutes,
    });

    const id = `${bruteName}:${opponent.name}`;
    pending.set(id, opponent.name);
    worker.postMessage({
      id,
      input: {
        brute,
        opponent,
        modifiers: store.getModifiers(),
        backups: { own: backups.own, opponent: backups.opponent },
        approximate: backups.approximate,
      },
    });
  }
};

installInterceptor((bruteName) => { void onArena(bruteName); });
```

`WORKER_SOURCE` est un identifiant global remplacé au build par `define` (étape 2) : il n'existe pas à l'exécution, c'est le code du worker inséré comme chaîne. Déclarer `declare const WORKER_SOURCE: string;` en haut du fichier pour TypeScript.

- [ ] **Step 2: Écrire `scripts/build.mjs`**

Le worker est embarqué comme chaîne de caractères pour tenir dans un fichier unique.

```js
import { build } from 'esbuild';
import { writeFile } from 'node:fs/promises';

const alias = {
  '@labrute/core': './vendor/labrute/core/src/index.ts',
  '@labrute/prisma': './vendor/labrute/prisma/index-browser.js',
};

const common = { bundle: true, format: 'iife', platform: 'browser', alias, write: false };

const worker = await build({ ...common, entryPoints: ['src/worker/worker.ts'] });
const workerSource = worker.outputFiles[0].text;

const main = await build({
  ...common,
  entryPoints: ['src/userscript/main.ts'],
  define: { WORKER_SOURCE: JSON.stringify(workerSource) },
});

const header = `// ==UserScript==
// @name         brute-odds
// @namespace    https://github.com/Kirsan98/brute-odds
// @version      1.0.0
// @description  Probabilite de victoire en arene sur LaBrute
// @match        https://brute.eternaltwin.org/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

`;

await writeFile('dist/brute-odds.user.js', header + main.outputFiles[0].text);
console.log('dist/brute-odds.user.js écrit');
```

```bash
mkdir -p dist
npm pkg set scripts.build="node scripts/build.mjs"
```

- [ ] **Step 3: Construire et vérifier**

Run: `npm run build`
Attendu : `dist/brute-odds.user.js` existe et pèse plus de 100 Ko (le moteur est dedans).

```bash
node -e "const s=require('fs').readFileSync('dist/brute-odds.user.js','utf8'); if(!s.includes('==UserScript==')) throw new Error('en-tete manquant'); console.log(Math.round(s.length/1024)+' Ko');"
```

- [ ] **Step 4: Écrire l'attribution — obligatoire, le dépôt est public**

`NOTICE.md` :

```markdown
# Attribution

Ce projet embarque, au moment du build, du code de [Zenoo/labrute](https://github.com/Zenoo/labrute)
(le moteur de combat de LaBrute), récupéré par `npm run vendor` et non redistribué dans ce dépôt.

La licence amont interdit l'usage commercial. Ce projet est un outil personnel, sans usage
commercial ni affiliation avec Motion Twin, EternalTwin ou les auteurs de LaBrute.
```

Écrire `LICENSE` en reprenant la licence du dépôt amont (`vendor/labrute/LICENSE`) et en la citant explicitement comme licence héritée.

- [ ] **Step 5: Écrire `README.md`**

Doit contenir : ce que fait l'outil, l'installation (`npm i && npm run vendor && npm run build`, puis glisser `dist/brute-odds.user.js` dans Tampermonkey), la mise à jour du moteur (changer `UPSTREAM_SHA`, relancer `npm run vendor && npm test`), et l'avertissement que le résultat est une estimation statistique.

- [ ] **Step 6: Câbler le typecheck**

Sans ça, rien ne vérifie les types du projet : Vitest et esbuild effacent les types sans les contrôler. L'annotation `DetailedFight` de la tâche 2, censée faire échouer la compilation quand l'amont change de forme, ne sert à rien tant que `tsc` ne tourne pas.

Déjà fait, en marge de la tâche 8 : les `paths` (posés en tâche 5) ont été réparés — TypeScript 7 a supprimé `baseUrl`, ce qui faisait échouer `tsc` avant même de vérifier une ligne — puis `npm run typecheck` a été câblé. Il ne reste ici qu'à vérifier que la commande passe toujours.

Écart assumé sur la consigne ci-dessous : `exclude` ne filtre que les fichiers d'entrée, jamais ceux qu'on importe, donc il ne sort pas le moteur du périmètre de `tsc`. C'est `scripts/vendor.sh` qui préfixe chaque `.ts` vendorisé d'un `// @ts-nocheck` après le checkout. Les options du compilateur restent strictes, et les types exportés par le moteur continuent de contrôler notre code — seules les erreurs *internes* au code amont (contexte Prisma, OpenTelemetry, non vendorisés) sont tues.

Vérifier au passage que les alias de `tsconfig.json`, `vitest.config.ts` et `scripts/build.mjs` désignent bien les trois mêmes chemins : trois outils, trois formats de configuration, une seule vérité. Une divergence ferait tester, mesurer et livrer trois codes différents.

Run: `npm run typecheck`
Attendu : aucune erreur sur `src/`. Si le code vendorisé produit des erreurs qui lui sont propres, l'exclure du périmètre via `include`/`exclude` plutôt que d'assouplir les options du compilateur.

- [ ] **Step 7: Vérification finale**

Run: `npm test && npm run typecheck && npm run build`
Attendu : tous les tests passent, aucune erreur de type, le build produit le fichier.

- [ ] **Step 7: Commit et publication**

```bash
git add -A
git commit -m "feat: userscript complet, build et attribution"
git push
```

- [ ] **Step 8: Validation manuelle (étape humaine — Kirsan)**

Installer le userscript, ouvrir la page arène, vérifier que : un pourcentage apparaît sous chaque adversaire, la page reste fluide, changer de brute recalcule bien avec la bonne brute, et le jeu fonctionne normalement (l'interception ne casse rien).

Puis lancer la **calibration** du spec §9.3 : noter les prédictions, jouer les combats, comparer. Un écart systématique est un bug, pas de la malchance.

---

## Auto-revue

**Couverture du spec :** §5 `engine` → T2 ; §5 `odds` → T4 ; §5 `userscript` → T7/T9/T10 ; §6 acquisition et multi-brutes → T7 ; §6 péremption → T7 (branches `for-hook` et `level-up`) ; §7 renfort → T8 ; §8 précision et calibration de N → T5 ; §8 risque des `steps` → T2 (`steps.length = 0`) ; §9.1 test en or → T3 ; §9.2 tests unitaires → T4 ; §9.3 calibration → T10 étape 8 ; §11 licence → T10 étape 4.

**Point laissé ouvert et assumé :** la valeur de `SIMULATIONS` est déterminée par la mesure de la T5, pas devinée ici. La règle de décision est écrite, le chiffre ne l'est pas — c'est le seul endroit du plan où c'est intentionnel.

**Dépendance humaine :** la T3 est bloquée tant que les trois fixtures ne sont pas capturées. Aucune autre tâche n'en dépend, l'implémentation peut donc avancer en parallèle, mais **le plan n'est pas terminé sans elle** : c'est la seule preuve que le simulateur dit vrai.

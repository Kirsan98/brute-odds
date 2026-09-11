import { performance } from 'node:perf_hooks';
import { simulateOnce } from '../src/engine/simulateOnce.js';
import { withFastClone } from '../src/odds/fastClone.js';
import { careerValue } from '../src/odds/rollout.js';
import {
  CAREER_CHUNKS, CAREER_FIGHTS, CAREER_LEVELS, CAREER_TRAJECTORIES, REFERENCE_COUNT,
} from '../src/odds/config.js';
import { makeBrute } from '../tests/fixtures/makeBrute.js';
import type { RawBrute } from '../src/engine/types.js';
import brute1 from '../tests/fixtures/real-brute-1.json' with { type: 'json' };
import brute2 from '../tests/fixtures/real-brute-2.json' with { type: 'json' };

const N = 2000;
const WARMUP = 200;
const OPPONENTS = 6;
const BUDGET_MS = 2000;

// Les combats sont mesurés dans les conditions du calcul réel : `estimate` pose le
// clone rapide le temps de ses tirages, le banc fait pareil.
const measure = (label: string, a: RawBrute, b: RawBrute) => withFastClone(() => {
  for (let i = 0; i < WARMUP; i += 1) simulateOnce(a, b, {});

  const t0 = performance.now();
  for (let i = 0; i < N; i += 1) simulateOnce(a, b, {});
  const perFight = (performance.now() - t0) / N;

  const forArena = (perFight * N * OPPONENTS) / 1000;
  console.log(
    `${label.padEnd(28)} ${perFight.toFixed(3)} ms/combat`
    + `   ${N} x ${OPPONENTS} adversaires = ${forArena.toFixed(2)} s`
    + `   budget ${BUDGET_MS} ms tenu : ${forArena * 1000 <= BUDGET_MS ? 'oui' : 'NON'}`,
  );
  return perFight;
});

// Le spec demandait de remesurer sur des brutes équipées : les brutes par défaut n'ont
// ni arme, ni compétence, ni familier, et livrent un combat volontairement bon marché.
// La capture du test en or oppose deux brutes de niveau 16, sept armes et trois
// compétences contre cinq compétences. C'est ce coût-là qui décide de SIMULATIONS.
const nues = measure('brutes nues', makeBrute(), makeBrute());
const équipées = measure(
  'brutes réelles équipées',
  brute1 as unknown as RawBrute,
  brute2 as unknown as RawBrute,
);

console.log(`\nrapport équipées / nues : x${(équipées / nues).toFixed(1)}`);
console.log(
  'plus grand N tenant le budget sur brutes équipées : '
  + `${Math.floor(BUDGET_MS / (équipées * OPPONENTS))}`,
);

// Ce que coûte le clone natif du moteur, pour savoir si la substitution vaut encore
// la peine après une resynchronisation amont.
const t0 = performance.now();
for (let i = 0; i < N; i += 1) {
  simulateOnce(brute1 as unknown as RawBrute, brute2 as unknown as RawBrute, {});
}
const sansClone = (performance.now() - t0) / N;
console.log(`sans le clone rapide : ${sansClone.toFixed(3)} ms/combat `
  + `(x${(sansClone / équipées).toFixed(2)})`);

// Le conseil de montée de niveau : un lot de carrières, tel qu'un worker le reçoit.
// La brute d'arrivée a dix niveaux de plus, donc plus d'armes et de compétences : son
// combat coûte plus cher que celui d'aujourd'hui, et c'est ce coût-là qui compte.
const références = Array.from(
  { length: REFERENCE_COUNT },
  () => brute2 as unknown as RawBrute,
);

const t1 = performance.now();
careerValue({
  brute: brute1 as unknown as RawBrute,
  references: références,
  modifiers: {},
  levels: CAREER_LEVELS,
  trajectories: Math.ceil(CAREER_TRAJECTORIES / CAREER_CHUNKS),
  fightsPerTrajectory: CAREER_FIGHTS,
});
const lot = performance.now() - t1;

console.log(`\nun lot de carrières : ${(lot / 1000).toFixed(2)} s `
  + `(${Math.ceil(CAREER_TRAJECTORIES / CAREER_CHUNKS)} avenirs x ${CAREER_FIGHTS} combats)`);
console.log('conseil complet, deux destins x '
  + `${CAREER_CHUNKS} lots sur les workers : environ ${(lot / 1000).toFixed(2)} s`);

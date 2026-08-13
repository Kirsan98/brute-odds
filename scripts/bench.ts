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

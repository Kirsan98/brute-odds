import type { Modifiers } from '@labrute/core';
import { rollout } from '../engine/career.js';
import { simulateOnce } from '../engine/simulateOnce.js';
import type { RawBrute } from '../engine/types.js';
import { summarize, type Estimation, type Simulator } from './estimate.js';
import { hashSeed, withSeededRandom } from './rng.js';
import { withFastClone } from './fastClone.js';

export type CareerInput = {
  brute: RawBrute;
  /** Contre quoi la brute future est jugée. */
  references: RawBrute[];
  modifiers: Modifiers;
  /** Nombre de niveaux montés avant de mesurer. */
  levels: number;
  /** Nombre d'avenirs tirés. C'est la moyenne sur ces avenirs qui est la réponse. */
  trajectories: number;
  /** Combats joués par avenir. */
  fightsPerTrajectory: number;
  round?: number;
};

const seedOf = (input: CareerInput): number => hashSeed([
  input.brute.id,
  input.brute.level,
  input.brute.skills.join(','),
  input.brute.weapons.join(','),
  input.references.map((r) => r.id).sort().join(','),
  `carrière${input.levels}x${input.trajectories}x${input.round ?? 0}`,
].join('|'));

/**
 * Ce que vaut une brute dans dix niveaux, et non demain.
 *
 * Le conseil myope compare deux destins sur le combat suivant. Il ne voit ni la
 * compétence qui ne paiera qu'au niveau 40, ni la synergie avec ce qu'on prendra plus
 * tard. On tire donc, pour chaque destin, des centaines d'avenirs entiers, et on mesure
 * la force de la brute arrivée au bout.
 *
 * Les adversaires de référence restent ceux d'aujourd'hui : on ne connaît pas ceux de
 * dans dix niveaux. C'est une toise, pas une prédiction, et les deux destins sont
 * mesurés à la même.
 */
export const careerValue = (
  input: CareerInput,
  sim: Simulator = simulateOnce,
): Estimation => withFastClone(() => withSeededRandom(seedOf(input), () => {
  let wins = 0;
  let samples = 0;
  let turnsTotal = 0;
  let hpLeftTotalOnWin = 0;

  if (!input.references.length) {
    return summarize({
      wins: 0, samples: 0, turnsTotal: 0, hpLeftTotalOnWin: 0, approximate: true,
    });
  }

  for (let t = 0; t < input.trajectories; t += 1) {
    const future = rollout(input.brute, input.levels);

    for (let f = 0; f < input.fightsPerTrajectory; f += 1) {
      // Les références défilent à tour de rôle : chaque avenir est jugé sur le même
      // éventail d'adversaires, pas sur celui que le hasard lui aurait donné.
      const opponent = input.references[f % input.references.length]!;
      const outcome = sim(future, opponent, input.modifiers, {});

      samples += 1;
      turnsTotal += outcome.turns;
      if (outcome.result === 'win') {
        wins += 1;
        hpLeftTotalOnWin += outcome.hpLeft;
      }
    }
  }

  return summarize({
    wins, samples, turnsTotal, hpLeftTotalOnWin, approximate: false,
  });
}));

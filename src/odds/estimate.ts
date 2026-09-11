import { simulateOnce } from '../engine/simulateOnce.js';
import type { BackupPools, FightOutcome, RawBrute } from '../engine/types.js';
import type { Modifiers } from '@labrute/core';
import { wilson } from './interval.js';
import { hashSeed, withSeededRandom } from './rng.js';
import { withFastClone } from './fastClone.js';

export type FightInput = {
  brute: RawBrute;
  opponent: RawBrute;
  modifiers: Modifiers;
  backups?: BackupPools;
  approximate?: boolean;
  /** Numéro de salve. Une deuxième salve sur le même affrontement doit tirer autre
   *  chose que la première, sinon elle ne fait que répéter le même résultat. */
  round?: number;
};

/** Les compteurs bruts, seuls additionnables : deux salves sur le même affrontement se
 *  cumulent en une estimation plus fine, au lieu d'en donner deux imprécises. */
export type Tally = {
  wins: number;
  samples: number;
  turnsTotal: number;
  hpLeftTotalOnWin: number;
  approximate: boolean;
};

export type Estimation = Tally & {
  winRate: number;
  /** Demi-largeur de l'intervalle de Wilson, en fraction (0,022 = 2,2 points). */
  ci: number;
  /** Bornes de l'intervalle de Wilson à 95 %. */
  lo: number;
  hi: number;
  /** Durée moyenne d'un combat, en actions jouées. */
  meanTurns: number;
  /** Points de vie restants moyens quand on gagne, en fraction du maximum. */
  hpLeftOnWin: number;
};

export type Simulator = (
  brute: RawBrute, opponent: RawBrute, modifiers: Modifiers,
  backups: BackupPools,
) => FightOutcome;

/** La graine ne dépend que de ce qui décide du combat : mêmes combattants, même chiffre.
 *  Une montée de niveau ou un changement de modificateur la fait changer, donc le
 *  chiffre est recalculé pour de bon. */
export const seedOf = (input: FightInput): number => hashSeed([
  input.brute.id,
  input.opponent.id,
  Object.keys(input.modifiers).sort().join(','),
  (input.backups?.own ?? []).map((b) => b.id).sort().join(','),
  (input.backups?.opponent ?? []).map((b) => b.id).sort().join(','),
  `salve${input.round ?? 0}`,
].join('|'));

export const summarize = (tally: Tally): Estimation => {
  const winRate = tally.samples > 0 ? tally.wins / tally.samples : 0;
  const { lo, hi, half } = wilson(tally.wins, tally.samples);

  return {
    ...tally,
    winRate,
    ci: half,
    lo,
    hi,
    meanTurns: tally.samples > 0 ? tally.turnsTotal / tally.samples : 0,
    hpLeftOnWin: tally.wins > 0 ? tally.hpLeftTotalOnWin / tally.wins : 0,
  };
};

/** Deux salves du même affrontement n'en font qu'une. */
export const combine = (a: Tally, b: Tally): Estimation => summarize({
  wins: a.wins + b.wins,
  samples: a.samples + b.samples,
  turnsTotal: a.turnsTotal + b.turnsTotal,
  hpLeftTotalOnWin: a.hpLeftTotalOnWin + b.hpLeftTotalOnWin,
  approximate: a.approximate || b.approximate,
});

export const estimate = (
  input: FightInput,
  n: number,
  sim: Simulator = simulateOnce,
): Estimation => withFastClone(() => withSeededRandom(seedOf(input), () => {
  let wins = 0;
  let hpLeftTotalOnWin = 0;
  let turnsTotal = 0;

  for (let i = 0; i < n; i += 1) {
    const outcome = sim(input.brute, input.opponent, input.modifiers, input.backups ?? {});
    turnsTotal += outcome.turns;
    if (outcome.result === 'win') {
      wins += 1;
      hpLeftTotalOnWin += outcome.hpLeft;
    }
  }

  return summarize({
    wins,
    samples: n,
    turnsTotal,
    hpLeftTotalOnWin,
    approximate: input.approximate ?? false,
  });
}));

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

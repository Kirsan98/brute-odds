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

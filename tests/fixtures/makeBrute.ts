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

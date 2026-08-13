import type { Brute } from '@labrute/prisma';

/**
 * La forme de brute renvoyée par l'API du jeu — exactement le jeu de champs
 * que le serveur sélectionne dans `getOpponents.ts` avant de le passer au combat.
 */
/**
 * Les renforts possibles de chaque camp, pas ceux qui viendront : le serveur en retire
 * un au hasard à chaque combat (`generateFight.ts:219-232`), donc chaque simulation
 * doit refaire son propre tirage.
 */
export type BackupPools = { own?: RawBrute[]; opponent?: RawBrute[] };

export type RawBrute = Pick<Brute,
  | 'id' | 'userId' | 'name' | 'gender' | 'level' | 'xp' | 'ranking' | 'pupilsCount'
  | 'hpStat' | 'hpModifier' | 'hpValue'
  | 'strengthStat' | 'strengthModifier' | 'strengthValue'
  | 'speedStat' | 'speedModifier' | 'speedValue'
  | 'agilityStat' | 'agilityModifier' | 'agilityValue'
  | 'body' | 'colors' | 'skills' | 'weapons' | 'pets' | 'eventId'>;

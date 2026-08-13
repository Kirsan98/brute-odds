import type { Brute } from '@labrute/prisma';

/**
 * La forme de brute renvoyée par l'API du jeu — exactement le jeu de champs
 * que le serveur sélectionne dans `getOpponents.ts` avant de le passer au combat.
 */
export type RawBrute = Pick<Brute,
  | 'id' | 'userId' | 'name' | 'gender' | 'level' | 'xp' | 'ranking' | 'pupilsCount'
  | 'hpStat' | 'hpModifier' | 'hpValue'
  | 'strengthStat' | 'strengthModifier' | 'strengthValue'
  | 'speedStat' | 'speedModifier' | 'speedValue'
  | 'agilityStat' | 'agilityModifier' | 'agilityValue'
  | 'body' | 'colors' | 'skills' | 'weapons' | 'pets' | 'eventId'>;

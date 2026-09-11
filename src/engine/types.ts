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

/**
 * Ce qu'un combat simulé rapporte. Le vainqueur est la réponse ; la durée et les points
 * de vie restants disent *comment* on gagne, ce qu'un pourcentage seul ne dit pas.
 */
export type FightOutcome = {
  result: 'win' | 'loss';
  /** Actions jouées avant la chute d'un camp (un tour de la boucle du moteur). */
  turns: number;
  /** Points de vie restants de notre brute, en fraction de son maximum. */
  hpLeft: number;
};

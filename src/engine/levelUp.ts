import type { LevelUpChoice } from '@labrute/core';
import { updateBruteData } from '../../vendor/labrute/server/src/utils/brute/updateBruteData.js';
import type { RawBrute } from './types.js';

/**
 * Un choix de destin appliqué à une brute, par la fonction du serveur elle-même
 * (`updateBruteData`). C'est elle qui décide de ce que vaut une compétence : les
 * modificateurs de statistiques, le malus de PV d'un familier, le passage d'une arme
 * au tier supérieur. La réécrire aurait été le meilleur moyen de conseiller un choix
 * sur des règles qui ne sont pas celles du jeu.
 */
export const applyChoice = (brute: RawBrute, choice: LevelUpChoice): RawBrute => (
  updateBruteData(
    // `updateBruteData` lit deux champs que l'API d'arène ne renvoie pas, et ne s'en
    // sert que pour le compte de combats quotidiens, sans effet sur un combat simulé.
    { fightsLeft: 0, lastFight: null, ...brute } as never,
    choice as never,
  ) as unknown as RawBrute
);

/** Ce qu'on affiche pour désigner un choix. Le jeu traduit ces noms à l'écran ; ici on
 *  garde ceux du moteur, qui sont sans ambiguïté. */
export const describeChoice = (choice: LevelUpChoice): string => {
  if (choice.type === 'skill') return `compétence ${choice.skill}`;
  if (choice.type === 'weapon') return `arme ${choice.weapon}`;
  if (choice.type === 'pet') return `familier ${choice.pet}`;

  const parts = [
    choice.stat1 ? `+${choice.stat1Value ?? 0} ${choice.stat1}` : '',
    choice.stat2 ? `+${choice.stat2Value ?? 0} ${choice.stat2}` : '',
  ].filter(Boolean);

  return parts.join(' / ') || 'choix inconnu';
};

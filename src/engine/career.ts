import { getLevelUpChoices } from '@labrute/core';
import { applyChoice } from './levelUp.js';
import type { RawBrute } from './types.js';

/**
 * Une carrière simulée : la brute monte de `levels` niveaux, en tirant à chaque palier
 * les deux destins que le jeu proposerait (`getLevelUpChoices`) et en en prenant un.
 *
 * Le choix se fait à pile ou face, et ce n'est pas un pis-aller. Comparer deux destins
 * en leur donnant la même suite de choix aléatoires pour la suite, c'est mesurer ce que
 * chacun vaut *en moyenne sur tous les avenirs possibles*. Une politique plus maligne
 * ferait plutôt entrer mes idées sur le jeu dans le résultat, ce qui est exactement ce
 * qu'on veut éviter : ici, seules les règles du jeu parlent.
 */
export const rollout = (brute: RawBrute, levels: number): RawBrute => {
  let current = brute;

  for (let i = 0; i < levels; i += 1) {
    const choices = getLevelUpChoices(current);
    const choice = choices[Math.random() < 0.5 ? 0 : 1];
    if (!choice) break;
    current = applyChoice(current, choice);
  }

  return current;
};

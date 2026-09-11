import type { LevelUpChoice } from '@labrute/core';

/**
 * Reconnaît la paire de destins que le jeu propose à la montée de niveau, à sa forme
 * plutôt qu'à son URL : deux objets typés `skill`, `weapon`, `pet` ou `stats`, chacun
 * portant ce qu'il donne. Même méthode que pour les combats, même raison : la route
 * peut changer, la forme des données non.
 */
const TYPES = new Set(['skill', 'weapon', 'pet', 'stats']);

const estUnChoix = (value: unknown): value is LevelUpChoice => {
  const choice = value as Record<string, unknown> | null;
  if (!choice || typeof choice !== 'object') return false;
  if (typeof choice.type !== 'string' || !TYPES.has(choice.type)) return false;

  if (choice.type === 'skill') return typeof choice.skill === 'string';
  if (choice.type === 'weapon') return typeof choice.weapon === 'string';
  if (choice.type === 'pet') return typeof choice.pet === 'string';
  return typeof choice.stat1 === 'string';
};

export const asLevelUpChoices = (payload: unknown): LevelUpChoice[] | null => {
  const data = payload as Record<string, unknown> | null | undefined;
  const list = Array.isArray(data) ? data : data?.choices ?? data?.destinyChoices;
  if (!Array.isArray(list) || list.length !== 2) return null;

  return list.every(estUnChoix) ? list as LevelUpChoice[] : null;
};

/** Le nom de la brute concernée, tel que le jeu le met dans ses URL d'API. */
const BRUTE_IN_URL = /\/api\/brute\/([^/]+)\//;

export const bruteNameIn = (url: string): string | undefined => {
  const match = BRUTE_IN_URL.exec(url);
  return match?.[1] ? decodeURIComponent(match[1]) : undefined;
};

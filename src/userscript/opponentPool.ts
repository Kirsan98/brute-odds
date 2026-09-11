import { ARENA_OPPONENTS_MAX_GAP } from '@labrute/core';
import type { RawBrute } from '../engine/types.js';
import type { StorageLike } from './calibrationLog.js';

/**
 * Le vivier d'adversaires réels, accumulé au fil des visites.
 *
 * `getOpponents.ts` tire les six adversaires **au hasard uniformément** parmi les brutes
 * du même niveau, complétées par des niveaux inférieurs à moins de deux crans. Les six
 * du jour sont donc un échantillon aléatoire de la population qu'on affronte : les
 * garder, visite après visite, revient à échantillonner cette population pour de bon.
 * Au bout d'une semaine, un conseil ne dépend plus du tirage d'un jour.
 */
const KEY = 'brute-odds:opponents';
const MAX_POOL = 400;

/** On ne garde que les champs dont le moteur a besoin : le reste de la réponse d'API
 *  triplerait la place occupée sans rien apporter au combat. */
const FIELDS: (keyof RawBrute)[] = [
  'id', 'userId', 'name', 'gender', 'level', 'xp', 'ranking', 'pupilsCount',
  'hpStat', 'hpModifier', 'hpValue',
  'strengthStat', 'strengthModifier', 'strengthValue',
  'speedStat', 'speedModifier', 'speedValue',
  'agilityStat', 'agilityModifier', 'agilityValue',
  'body', 'colors', 'skills', 'weapons', 'pets', 'eventId',
];

export const trim = (brute: RawBrute): RawBrute => Object.fromEntries(
  FIELDS.filter((field) => brute[field] !== undefined).map((field) => [field, brute[field]]),
) as RawBrute;

export type OpponentPool = {
  /** Retient les adversaires d'une visite, la version la plus récente gagnant. */
  remember: (opponents: RawBrute[]) => void;
  /** Un échantillon étalé sur tout le vivier, pour le niveau demandé. */
  sample: (level: number, count: number) => RawBrute[];
  size: () => number;
  reset: () => void;
};

export const createOpponentPool = (storage: StorageLike): OpponentPool => {
  const read = (): RawBrute[] => {
    try {
      const raw = storage.getItem(KEY);
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed as RawBrute[] : [];
    } catch {
      return [];
    }
  };

  const write = (pool: RawBrute[]) => {
    try {
      storage.setItem(KEY, JSON.stringify(pool.slice(-MAX_POOL)));
    } catch {
      // Stockage plein ou refusé : le vivier est un bonus, il ne casse rien.
    }
  };

  return {
    remember: (opponents) => {
      if (!opponents.length) return;
      const pool = read().filter((known) => !opponents.some((o) => o.id === known.id));
      write([...pool, ...opponents.map(trim)]);
    },

    sample: (level, count) => {
      // Les mêmes bornes que le jeu : même niveau, ou jusqu'à deux crans en dessous.
      const éligibles = read().filter(
        (b) => b.level <= level && b.level >= level - ARENA_OPPONENTS_MAX_GAP,
      );
      if (éligibles.length <= count) return éligibles;

      // Un échantillon étalé plutôt que les derniers vus : le vivier entier compte,
      // pas seulement la dernière visite. Le pas est fixe, donc l'échantillon est
      // le même d'un appel à l'autre, et le conseil reste reproductible.
      const pas = éligibles.length / count;
      return Array.from(
        { length: count },
        (_, i) => éligibles[Math.floor(i * pas)]!,
      );
    },

    size: () => read().length,
    reset: () => {
      try {
        storage.removeItem(KEY);
      } catch {
        // idem
      }
    },
  };
};

import type { Modifiers } from '@labrute/core';
import type { RawBrute } from '../engine/types.js';

const brutes = new Map<string, RawBrute>();
const opponents = new Map<string, RawBrute[]>();
const ownNames = new Set<string>();
let modifiers: Modifiers = {};
let headers: Record<string, string> = {};

export const store = {
  putBrutes: (list: RawBrute[]) => list.forEach((b) => brutes.set(b.name, b)),
  getBrute: (name: string) => brutes.get(name),
  // Seule l'authentification garantit qu'une brute est bien la nôtre.
  putOwnBrutes: (list: RawBrute[]) => {
    list.forEach((b) => {
      brutes.set(b.name, b);
      ownNames.add(b.name);
    });
  },
  getOwnBrutes: (): RawBrute[] => Array.from(ownNames)
    .map((n) => brutes.get(n))
    .filter((b): b is RawBrute => !!b),
  putOpponents: (bruteName: string, list: RawBrute[]) => opponents.set(bruteName, list),
  getOpponents: (bruteName: string) => opponents.get(bruteName),
  putModifiers: (m: Modifiers) => { modifiers = m; },
  getModifiers: () => modifiers,
  putHeaders: (h: Record<string, string>) => { headers = h; },
  getHeaders: () => headers,
  reset: () => {
    brutes.clear();
    opponents.clear();
    ownNames.clear();
    modifiers = {};
    headers = {};
  },
};

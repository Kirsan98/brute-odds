import { describe, expect, it } from 'vitest';
import { skills, weapons } from '@labrute/core';
import { withFastClone } from '../../src/odds/fastClone.js';

const native = structuredClone;

/** Une copie n'est bonne que si elle est indiscernable de celle du navigateur, et
 *  vraiment détachée de l'original : le moteur écrit dans les armes qu'il a clonées. */
const clonePar = <T>(value: T) => withFastClone(() => structuredClone(value));

describe('clone rapide', () => {
  it('copie à l\'identique tout ce que le moteur clone vraiment', () => {
    // Ce sont exactement les objets que `getFighters` clone, un par un, à chaque combat.
    [...Object.values(skills), ...Object.values(weapons)].forEach((entry) => {
      expect(clonePar(entry)).toEqual(native(entry));
    });
  });

  it('détache la copie de l\'original, en profondeur', () => {
    const original = { a: 1, b: { c: [1, 2, { d: 'x' }] } };
    const copie = clonePar(original);

    expect(copie).toEqual(original);
    expect(copie.b).not.toBe(original.b);
    expect(copie.b.c[2]).not.toBe(original.b.c[2]);
  });

  it('traite comme le natif les valeurs qui ne sont pas des objets plats', () => {
    const original = {
      date: new Date('2026-01-02T03:04:05Z'),
      map: new Map([['a', 1]]),
      set: new Set([1, 2]),
      nul: null,
      indéfini: undefined,
      texte: 'x',
      nombre: 0,
      booléen: false,
    };

    expect(clonePar(original)).toEqual(native(original));
  });

  it('ne se perd pas dans un objet cyclique', () => {
    const cyclique: Record<string, unknown> = { a: 1 };
    cyclique.moi = cyclique;

    expect(() => clonePar(cyclique)).not.toThrow();
  });

  it('rend le clone natif à qui de droit, même si fn lève', () => {
    expect(() => withFastClone(() => { throw new Error('boum'); })).toThrow('boum');
    expect(globalThis.structuredClone).toBe(native);
  });
});

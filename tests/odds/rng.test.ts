import { describe, expect, it } from 'vitest';
import { hashSeed, mulberry32, withSeededRandom } from '../../src/odds/rng.js';

describe('hasard reproductible', () => {
  it('rend la même suite pour la même graine', () => {
    const a = mulberry32(42);
    const b = mulberry32(42);
    const suiteA = Array.from({ length: 5 }, a);
    expect(Array.from({ length: 5 }, b)).toEqual(suiteA);
  });

  it('rend une suite différente pour une graine différente', () => {
    expect(mulberry32(1)()).not.toBe(mulberry32(2)());
  });

  it('reste dans [0, 1[', () => {
    const next = mulberry32(7);
    for (let i = 0; i < 1000; i += 1) {
      const value = next();
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });

  it('ne s\'agglutine pas dans un coin de l\'intervalle', () => {
    const next = mulberry32(3);
    const draws = Array.from({ length: 10000 }, next);
    const moyenne = draws.reduce((s, v) => s + v, 0) / draws.length;
    expect(moyenne).toBeGreaterThan(0.48);
    expect(moyenne).toBeLessThan(0.52);
  });

  it('donne des graines distinctes à des clés distinctes', () => {
    expect(hashSeed('a|b')).not.toBe(hashSeed('b|a'));
    expect(hashSeed('même')).toBe(hashSeed('même'));
  });

  it('remet Math.random en place, y compris quand fn lève', () => {
    const original = Math.random;

    const tirages = withSeededRandom(1, () => [Math.random(), Math.random()]);
    expect(Math.random).toBe(original);
    expect(withSeededRandom(1, () => [Math.random(), Math.random()])).toEqual(tirages);

    expect(() => withSeededRandom(1, () => { throw new Error('boum'); })).toThrow('boum');
    expect(Math.random).toBe(original);
  });
});

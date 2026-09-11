import { describe, expect, it } from 'vitest';
import { wilson } from '../../src/odds/interval.js';

const wald = (wins: number, n: number) => {
  const p = wins / n;
  return 1.96 * Math.sqrt((p * (1 - p)) / n);
};

describe('intervalle de Wilson', () => {
  it('reste proche de Wald là où Wald avait raison', () => {
    const { half } = wilson(1000, 2000);
    expect(half).toBeCloseTo(wald(1000, 2000), 3);
  });

  it('ne s\'effondre pas sur un sans-faute, là où Wald annonçait ± 0', () => {
    expect(wald(2000, 2000)).toBe(0);

    const { lo, hi, half } = wilson(2000, 2000);
    expect(hi).toBe(1);
    expect(lo).toBeGreaterThan(0.99);
    expect(lo).toBeLessThan(1);
    expect(half).toBeGreaterThan(0);
  });

  it('ne s\'effondre pas davantage sur un zéro pointé', () => {
    const { lo, hi } = wilson(0, 2000);
    expect(lo).toBe(0);
    expect(hi).toBeGreaterThan(0);
    expect(hi).toBeLessThan(0.01);
  });

  it('encadre toujours la proportion observée', () => {
    [0, 1, 37, 999, 2000].forEach((wins) => {
      const { lo, hi } = wilson(wins, 2000);
      expect(lo).toBeLessThanOrEqual(wins / 2000);
      expect(hi).toBeGreaterThanOrEqual(wins / 2000);
    });
  });

  it('se resserre quand les tirages se multiplient', () => {
    expect(wilson(500, 1000).half).toBeLessThan(wilson(50, 100).half);
  });

  it('ne prétend rien sans tirage', () => {
    expect(wilson(0, 0)).toEqual({ lo: 0, hi: 1, half: 0.5 });
  });
});

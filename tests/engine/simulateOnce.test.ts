import { describe, expect, it, vi } from 'vitest';
import { retry, simulateOnce } from '../../src/engine/simulateOnce.js';
import { makeBrute } from '../fixtures/makeBrute.js';

describe('simulateOnce', () => {
  it('rend un vainqueur pour deux brutes identiques', () => {
    const result = simulateOnce(makeBrute(), makeBrute(), {});
    expect(['win', 'loss']).toContain(result);
  });

  it('donne un avantage net à une brute très supérieure', () => {
    const faible = makeBrute({ strengthValue: 1, hpValue: 20, speedValue: 1, agilityValue: 1 });
    const fort = makeBrute({ strengthValue: 100, hpValue: 500, speedValue: 100, agilityValue: 100 });
    const victoires = Array.from({ length: 50 }, () => simulateOnce(fort, faible, {}))
      .filter((r) => r === 'win').length;
    expect(victoires).toBeGreaterThan(40);
  });
});

describe('retry', () => {
  it('renvoie le résultat dès qu\'un appel réussit, sans épuiser les tentatives', () => {
    const fn = vi.fn()
      .mockImplementationOnce(() => { throw new Error('échec 1'); })
      .mockImplementationOnce(() => { throw new Error('échec 2'); })
      .mockImplementationOnce(() => 'ok');

    expect(retry(fn, 10)).toBe('ok');
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('relève la dernière erreur après exactement `times` tentatives si aucune ne réussit', () => {
    const fn = vi.fn()
      .mockImplementationOnce(() => { throw new Error('échec 1'); })
      .mockImplementationOnce(() => { throw new Error('échec 2'); })
      .mockImplementation(() => { throw new Error('échec final'); });

    expect(() => retry(fn, 5)).toThrow('échec final');
    expect(fn).toHaveBeenCalledTimes(5);
  });
});

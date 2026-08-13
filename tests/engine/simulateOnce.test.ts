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

describe('renfort', () => {
  const moi = makeBrute({ level: 20, skills: ['backup'] as never, hpValue: 100, strengthValue: 10 });
  const foe = makeBrute({
    level: 20, hpValue: 200, strengthValue: 25, speedValue: 15, agilityValue: 15,
  });
  const nul = makeBrute({
    level: 1, hpValue: 5, strengthValue: 1, speedValue: 1, agilityValue: 1,
  });
  const colosse = makeBrute({
    level: 19, hpValue: 600, strengthValue: 120, speedValue: 40, agilityValue: 40,
  });

  const tauxAvec = (pool: ReturnType<typeof makeBrute>[]) => Array
    .from({ length: 400 }, () => simulateOnce(moi, foe, {}, { own: pool }))
    .filter((r) => r === 'win').length / 400;

  // Le serveur retire un renfort à chaque combat. Tirer une seule fois pour toutes les
  // simulations rendrait le taux du vivier égal à celui de l'un des deux renforts ;
  // il doit au contraire tomber entre les deux.
  it('retire un renfort par combat, pas un pour toute l\'estimation', () => {
    const avecNul = tauxAvec([nul]);
    const avecColosse = tauxAvec([colosse]);
    const avecLesDeux = tauxAvec([nul, colosse]);

    expect(avecNul).toBeLessThan(0.05);
    expect(avecColosse).toBeGreaterThan(0.6);
    expect(avecLesDeux).toBeGreaterThan(0.2);
    expect(avecLesDeux).toBeLessThan(0.55);
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

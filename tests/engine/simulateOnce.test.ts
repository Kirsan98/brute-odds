import { describe, expect, it } from 'vitest';
import { simulateOnce } from '../../src/engine/simulateOnce.js';
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

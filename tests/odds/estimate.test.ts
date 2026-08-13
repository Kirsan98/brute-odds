import { describe, expect, it } from 'vitest';
import { estimate } from '../../src/odds/estimate.js';
import { makeBrute } from '../fixtures/makeBrute.js';

const input = { brute: makeBrute(), opponent: makeBrute(), modifiers: {}, backups: {} };

describe('estimate', () => {
  it('retrouve le taux d\'un moteur bouchonné', () => {
    let i = 0;
    const sim = () => (i++ % 4 === 0 ? 'loss' as const : 'win' as const);
    const r = estimate(input, 1000, sim);
    expect(r.winRate).toBeCloseTo(0.75, 2);
    expect(r.samples).toBe(1000);
  });

  it('resserre l\'intervalle de confiance quand n grandit', () => {
    const sim = () => (Math.random() < 0.5 ? 'win' as const : 'loss' as const);
    expect(estimate(input, 2000, sim).ci).toBeLessThan(estimate(input, 100, sim).ci);
  });

  it('propage le caractère approximatif de l\'entrée', () => {
    const sim = () => 'win' as const;
    expect(estimate({ ...input, approximate: true }, 10, sim).approximate).toBe(true);
  });
});

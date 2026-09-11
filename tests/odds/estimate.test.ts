import { describe, expect, it } from 'vitest';
import { combine, estimate, seedOf } from '../../src/odds/estimate.js';
import type { FightOutcome } from '../../src/engine/types.js';
import { makeBrute } from '../fixtures/makeBrute.js';

const input = { brute: makeBrute(), opponent: makeBrute(), modifiers: {}, backups: {} };

const outcome = (result: 'win' | 'loss', turns = 10, hpLeft = 0.5): FightOutcome => (
  { result, turns, hpLeft }
);

describe('estimate', () => {
  it('retrouve le taux d\'un moteur bouchonné', () => {
    let i = 0;
    const sim = () => outcome(i++ % 4 === 0 ? 'loss' : 'win');
    const r = estimate(input, 1000, sim);
    expect(r.winRate).toBeCloseTo(0.75, 2);
    expect(r.samples).toBe(1000);
  });

  it('resserre l\'intervalle de confiance quand n grandit', () => {
    const sim = () => outcome(Math.random() < 0.5 ? 'win' : 'loss');
    expect(estimate(input, 2000, sim).ci).toBeLessThan(estimate(input, 100, sim).ci);
  });

  it('propage le caractère approximatif de l\'entrée', () => {
    const sim = () => outcome('win');
    expect(estimate({ ...input, approximate: true }, 10, sim).approximate).toBe(true);
  });

  // Wald donnait « 100 % ± 0 » sur un sans-faute, ce qui est faux : sur 2000 tirages,
  // la vraie borne basse est vers 99,8 %.
  it('garde un intervalle non nul quand toutes les simulations vont du même côté', () => {
    const r = estimate(input, 2000, () => outcome('win'));
    expect(r.winRate).toBe(1);
    expect(r.ci).toBeGreaterThan(0);
    expect(r.lo).toBeGreaterThan(0.99);
    expect(r.lo).toBeLessThan(1);
    expect(r.hi).toBe(1);
  });

  it('rapporte la durée moyenne et les PV restants des combats gagnés', () => {
    const durations = [4, 8, 30];
    let i = 0;
    // Un combat perdu sur deux, avec des PV restants qui ne doivent pas être comptés.
    const sim = () => {
      const turns = durations[i % durations.length]!;
      const won = i % 2 === 0;
      i += 1;
      return outcome(won ? 'win' : 'loss', turns, won ? 0.4 : 0);
    };

    const r = estimate(input, 6, sim);
    expect(r.meanTurns).toBe(14);
    expect(r.hpLeftOnWin).toBeCloseTo(0.4, 5);
  });

  // Deux salves sur le même affrontement doivent valoir une seule estimation plus fine.
  it('cumule deux salves au lieu d\'en garder deux imprécises', () => {
    let i = 0;
    const deuxSurCinq = () => outcome(i++ % 5 < 2 ? 'win' : 'loss');

    const première = estimate(input, 500, deuxSurCinq);
    const seconde = estimate({ ...input, round: 1 }, 500, deuxSurCinq);
    const total = combine(première, seconde);

    expect(total.samples).toBe(1000);
    expect(total.wins).toBe(400);
    expect(total.winRate).toBeCloseTo(0.4, 10);
    // Même taux, deux fois plus de tirages : l'intervalle se resserre.
    expect(première.winRate).toBeCloseTo(0.4, 10);
    expect(total.ci).toBeLessThan(première.ci);
    expect(total.meanTurns).toBe(première.meanTurns);
  });

  it('propage le doute sur le renfort quand une seule salve en souffre', () => {
    const nette = estimate(input, 10, () => outcome('win'));
    const douteuse = estimate({ ...input, approximate: true, round: 1 }, 10, () => outcome('win'));

    expect(combine(nette, douteuse).approximate).toBe(true);
  });

  // Sans décalage de salve, la seconde recopierait la première : mêmes graines, mêmes
  // tirages, aucune information nouvelle.
  it('tire autre chose à la salve suivante', () => {
    expect(seedOf(input)).not.toBe(seedOf({ ...input, round: 1 }));
  });

  // Sans graine, revenir sur l'arène affichait 52 %, puis 49 %, pour la même situation.
  it('rend deux fois le même chiffre pour la même situation', () => {
    const sim = () => outcome(Math.random() < 0.6 ? 'win' : 'loss');
    expect(estimate(input, 500, sim).winRate).toBe(estimate(input, 500, sim).winRate);
  });

  it('rend un chiffre différent dès que les combattants changent', () => {
    const other = { ...input, opponent: makeBrute() };
    expect(seedOf(input)).not.toBe(seedOf(other));
  });

  it('rend Math.random à qui de droit, même si le moteur lève', () => {
    const original = Math.random;
    expect(() => estimate(input, 3, () => { throw new Error('boum'); })).toThrow('boum');
    expect(Math.random).toBe(original);
  });
});

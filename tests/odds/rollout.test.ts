import { describe, expect, it, vi } from 'vitest';
import { careerValue, type CareerInput } from '../../src/odds/rollout.js';
import type { FightOutcome } from '../../src/engine/types.js';
import { makeBrute } from '../fixtures/makeBrute.js';

const outcome = (result: 'win' | 'loss'): FightOutcome => ({ result, turns: 10, hpLeft: 0.5 });

const input = (overrides: Partial<CareerInput> = {}): CareerInput => ({
  brute: makeBrute({ level: 10 }),
  references: [makeBrute({ level: 10 }), makeBrute({ level: 10 })],
  modifiers: {},
  levels: 3,
  trajectories: 5,
  fightsPerTrajectory: 4,
  ...overrides,
});

describe('valeur d\'une carrière', () => {
  it('joue autant de combats qu\'annoncé', () => {
    const sim = vi.fn(() => outcome('win'));
    const r = careerValue(input(), sim);

    expect(sim).toHaveBeenCalledTimes(20);
    expect(r.samples).toBe(20);
    expect(r.winRate).toBe(1);
  });

  // Chaque avenir doit être jugé sur le même éventail d'adversaires, sans quoi on
  // comparerait des trajectoires chanceuses à des trajectoires malchanceuses.
  it('fait défiler les références à tour de rôle', () => {
    const vus: string[] = [];
    careerValue(input({ trajectories: 1, fightsPerTrajectory: 4 }), (_b, opponent) => {
      vus.push(opponent.name);
      return outcome('win');
    });

    expect(new Set(vus).size).toBe(2);
    expect(vus[0]).not.toBe(vus[1]);
    expect(vus[0]).toBe(vus[2]);
  });

  it('mesure la brute d\'arrivée, pas celle du départ', () => {
    const niveaux: number[] = [];
    careerValue(input({ levels: 7 }), (brute) => {
      niveaux.push(brute.level);
      return outcome('win');
    });

    expect(new Set(niveaux)).toEqual(new Set([17]));
  });

  it('tire un avenir différent par trajectoire', () => {
    const brutes = new Set<string>();
    careerValue(input({ trajectories: 8, fightsPerTrajectory: 1 }), (brute) => {
      brutes.add(JSON.stringify(brute));
      return outcome('win');
    });

    expect(brutes.size).toBeGreaterThan(4);
  });

  it('rend deux fois le même chiffre pour la même demande', () => {
    let i = 0;
    const sim = () => outcome(i++ % 3 === 0 ? 'loss' : 'win');

    expect(careerValue(input(), sim).winRate).toBe(careerValue(input(), sim).winRate);
  });

  // Les lots sont là pour occuper plusieurs workers : deux lots qui tireraient les
  // mêmes avenirs ne feraient que payer deux fois le même calcul.
  it('tire d\'autres avenirs au lot suivant', () => {
    // La même demande, au lot près : sinon on comparerait deux brutes différentes.
    const base = input({ trajectories: 10, fightsPerTrajectory: 1 });
    const avenirs = (round: number) => {
      const vus: string[] = [];
      careerValue({ ...base, round }, (brute) => {
        vus.push(JSON.stringify(brute));
        return outcome('win');
      });
      return vus;
    };

    expect(avenirs(0)).not.toEqual(avenirs(1));
    expect(avenirs(0)).toEqual(avenirs(0));
  });

  it('ne prétend rien sans adversaire de référence', () => {
    const sim = vi.fn(() => outcome('win'));
    const r = careerValue(input({ references: [] }), sim);

    expect(sim).not.toHaveBeenCalled();
    expect(r.samples).toBe(0);
    expect(r.approximate).toBe(true);
  });
});

import { describe, expect, it } from 'vitest';
import { brier, formatReport, reliability, type Prediction } from '../../src/odds/calibration.js';

const record = (predicted: number, won: boolean, index: number): Prediction => ({
  fightId: `f${index}`, brute: 'Sam', opponent: 'Foe', predicted, won,
});

const serie = (predicted: number, wins: number, total: number, offset = 0) => Array
  .from({ length: total }, (_, i) => record(predicted, i < wins, offset + i));

describe('calibration', () => {
  it('donne un Brier nul à une prévision toujours juste et certaine', () => {
    expect(brier([record(1, true, 0), record(0, false, 1)])).toBe(0);
  });

  it('donne un Brier de 1 à une prévision toujours fausse et certaine', () => {
    expect(brier([record(1, false, 0), record(0, true, 1)])).toBe(1);
  });

  it('donne 0,25 à qui annonce pile ou face sur tout', () => {
    expect(brier(serie(0.5, 5, 10))).toBeCloseTo(0.25, 10);
  });

  it('ne prétend rien sans combat', () => {
    expect(brier([])).toBe(0);
    expect(reliability([])).toEqual([]);
    expect(formatReport([])).toContain('aucun combat');
  });

  it('range les combats par tranche et compare annoncé et observé', () => {
    // 10 combats annoncés à 70 %, 7 gagnés : la tranche doit tomber juste.
    const buckets = reliability(serie(0.7, 7, 10));
    expect(buckets).toHaveLength(1);
    expect(buckets[0]?.count).toBe(10);
    expect(buckets[0]?.predicted).toBeCloseTo(0.7, 10);
    expect(buckets[0]?.observed).toBeCloseTo(0.7, 10);
  });

  it('sépare les tranches et laisse de côté celles qui sont vides', () => {
    const buckets = reliability([...serie(0.1, 1, 10), ...serie(0.9, 9, 10, 100)]);
    expect(buckets.map((b) => b.count)).toEqual([10, 10]);
    expect(buckets[0]?.observed).toBeCloseTo(0.1, 10);
    expect(buckets[1]?.observed).toBeCloseTo(0.9, 10);
  });

  it('range une prévision à 100 % dans la dernière tranche, pas au-delà', () => {
    expect(reliability([record(1, true, 0)])).toHaveLength(1);
  });

  it('rend un bilan lisible', () => {
    const report = formatReport(serie(0.7, 7, 10));
    expect(report).toContain('10 combats mesurés, 7 gagnés');
    expect(report).toContain('score de Brier : 0.210');
    expect(report).toContain('70 %');
  });
});

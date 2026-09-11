import { describe, expect, it } from 'vitest';
import { createCalibrationLog, type StorageLike } from '../../src/userscript/calibrationLog.js';
import { asFightResult } from '../../src/userscript/fightResult.js';
import realFight from '../fixtures/real-fight.json' with { type: 'json' };

const memoryStorage = (): StorageLike & { dump: () => string | null } => {
  let value: string | null = null;
  return {
    getItem: () => value,
    setItem: (_key, next) => { value = next; },
    removeItem: () => { value = null; },
    dump: () => value,
  };
};

const fight = (id: string, winner: string, loser: string) => ({ id, winner, loser });

describe('journal de calibration', () => {
  it('ne retient qu\'un combat dont l\'issue avait été annoncée', () => {
    const log = createCalibrationLog(memoryStorage());
    expect(log.record(fight('f1', 'Inconnu', 'Autre'))).toBeNull();
    expect(log.records()).toEqual([]);
  });

  it('compte une victoire quand notre brute l\'emporte', () => {
    const log = createCalibrationLog(memoryStorage());
    log.remember('Sam', 'Foe', 0.7);

    expect(log.record(fight('f1', 'Sam', 'Foe'))).toMatchObject({
      brute: 'Sam', opponent: 'Foe', predicted: 0.7, won: true,
    });
  });

  it('compte une défaite quand notre brute tombe', () => {
    const log = createCalibrationLog(memoryStorage());
    log.remember('Sam', 'Foe', 0.7);

    expect(log.record(fight('f1', 'Foe', 'Sam'))).toMatchObject({
      brute: 'Sam', opponent: 'Foe', predicted: 0.7, won: false,
    });
  });

  // La page rejoue son historique de combats : sans garde-fou, un même combat gonflerait
  // la mesure à chaque passage.
  it('ne compte jamais deux fois le même combat', () => {
    const log = createCalibrationLog(memoryStorage());
    log.remember('Sam', 'Foe', 0.7);

    expect(log.record(fight('f1', 'Sam', 'Foe'))).not.toBeNull();
    expect(log.record(fight('f1', 'Sam', 'Foe'))).toBeNull();
    expect(log.records()).toHaveLength(1);
  });

  it('survit à la session, et s\'oublie sur demande', () => {
    const storage = memoryStorage();
    const première = createCalibrationLog(storage);
    première.remember('Sam', 'Foe', 0.7);
    première.record(fight('f1', 'Sam', 'Foe'));

    const seconde = createCalibrationLog(storage);
    expect(seconde.records()).toHaveLength(1);
    expect(seconde.report()).toContain('1 combats mesurés');

    seconde.reset();
    expect(seconde.records()).toEqual([]);
  });

  it('repart de zéro plutôt que de casser sur un stockage corrompu', () => {
    const storage = memoryStorage();
    storage.setItem('brute-odds:calibration', 'ceci n\'est pas du json');
    const log = createCalibrationLog(storage);

    expect(log.records()).toEqual([]);
    log.remember('Sam', 'Foe', 0.7);
    expect(log.record(fight('f1', 'Sam', 'Foe'))).not.toBeNull();
  });

  it('ne casse pas quand le stockage refuse d\'écrire', () => {
    const log = createCalibrationLog({
      getItem: () => null,
      setItem: () => { throw new Error('quota dépassé'); },
      removeItem: () => { throw new Error('refusé'); },
    });
    log.remember('Sam', 'Foe', 0.7);

    expect(() => log.record(fight('f1', 'Sam', 'Foe'))).not.toThrow();
    expect(() => log.reset()).not.toThrow();
  });

  it('mesure un vrai combat du serveur, tel qu\'il arrive du réseau', () => {
    const log = createCalibrationLog(memoryStorage());
    const result = asFightResult(realFight);
    expect(result).not.toBeNull();

    log.remember('LeH_', 'LUISVENTURA', 0.35);
    expect(log.record(result!)).toMatchObject({
      brute: 'LeH_', opponent: 'LUISVENTURA', predicted: 0.35, won: false,
    });
  });
});

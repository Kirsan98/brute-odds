import { describe, expect, it } from 'vitest';
import { createOpponentPool, trim } from '../../src/userscript/opponentPool.js';
import type { StorageLike } from '../../src/userscript/calibrationLog.js';
import { makeBrute } from '../fixtures/makeBrute.js';

const memoryStorage = (): StorageLike => {
  let value: string | null = null;
  return {
    getItem: () => value,
    setItem: (_key, next) => { value = next; },
    removeItem: () => { value = null; },
  };
};

const auNiveau = (level: number, count: number) => Array.from(
  { length: count },
  () => makeBrute({ level }),
);

describe('vivier d\'adversaires', () => {
  it('retient les adversaires d\'une visite', () => {
    const pool = createOpponentPool(memoryStorage());
    pool.remember(auNiveau(10, 6));

    expect(pool.size()).toBe(6);
    expect(pool.sample(10, 6)).toHaveLength(6);
  });

  it('accumule les visites sans compter deux fois la même brute', () => {
    const pool = createOpponentPool(memoryStorage());
    const six = auNiveau(10, 6);

    pool.remember(six);
    pool.remember(six);
    pool.remember(auNiveau(10, 6));

    expect(pool.size()).toBe(12);
  });

  it('garde la version la plus fraîche d\'une brute déjà vue', () => {
    const pool = createOpponentPool(memoryStorage());
    const brute = makeBrute({ level: 10, strengthValue: 10 });

    pool.remember([brute]);
    pool.remember([{ ...brute, strengthValue: 40 }]);

    expect(pool.size()).toBe(1);
    expect(pool.sample(10, 1)[0]?.strengthValue).toBe(40);
  });

  // Mêmes bornes que le jeu : même niveau, complété jusqu'à deux crans en dessous.
  it('ne propose que des adversaires du bon niveau', () => {
    const pool = createOpponentPool(memoryStorage());
    pool.remember([
      ...auNiveau(10, 3), ...auNiveau(9, 2), ...auNiveau(8, 2),
      ...auNiveau(7, 5), ...auNiveau(11, 5),
    ]);

    const niveaux = pool.sample(10, 20).map((b) => b.level).sort((a, b) => a - b);
    expect(niveaux).toEqual([8, 8, 9, 9, 10, 10, 10]);
  });

  it('étale son échantillon sur tout le vivier, sans le limiter aux derniers vus', () => {
    const pool = createOpponentPool(memoryStorage());
    const cent = auNiveau(10, 100);
    pool.remember(cent);

    const échantillon = pool.sample(10, 10);
    expect(échantillon).toHaveLength(10);
    // Un échantillon étalé contient forcément des brutes vues tôt.
    expect(échantillon.map((b) => b.id)).toContain(cent[0]?.id);
    expect(new Set(échantillon.map((b) => b.id)).size).toBe(10);
  });

  it('rend le même échantillon d\'un appel à l\'autre', () => {
    const pool = createOpponentPool(memoryStorage());
    pool.remember(auNiveau(10, 50));

    expect(pool.sample(10, 8).map((b) => b.id)).toEqual(pool.sample(10, 8).map((b) => b.id));
  });

  it('rend ce qu\'il a quand le vivier est plus petit que demandé', () => {
    const pool = createOpponentPool(memoryStorage());
    pool.remember(auNiveau(10, 3));

    expect(pool.sample(10, 12)).toHaveLength(3);
    expect(pool.sample(99, 12)).toEqual([]);
  });

  // Le stockage local n'est pas extensible : on n'y met que ce qui sert au combat.
  it('ne garde que les champs dont le moteur a besoin', () => {
    const gras = {
      ...makeBrute({ level: 10 }),
      destinyPath: ['a', 'b'], victories: 12, user: { name: 'x' },
    };
    const maigre = trim(gras as never);

    expect(maigre).not.toHaveProperty('destinyPath');
    expect(maigre).not.toHaveProperty('user');
    expect(maigre.hpValue).toBe(gras.hpValue);
    expect(maigre.skills).toEqual(gras.skills);
  });

  it('repart de zéro plutôt que de casser sur un stockage corrompu', () => {
    const storage = memoryStorage();
    storage.setItem('brute-odds:opponents', 'pas du json');
    const pool = createOpponentPool(storage);

    expect(pool.size()).toBe(0);
    expect(() => pool.remember(auNiveau(10, 2))).not.toThrow();
    expect(pool.size()).toBe(2);
  });

  it('s\'oublie sur demande', () => {
    const pool = createOpponentPool(memoryStorage());
    pool.remember(auNiveau(10, 6));
    pool.reset();

    expect(pool.size()).toBe(0);
  });
});

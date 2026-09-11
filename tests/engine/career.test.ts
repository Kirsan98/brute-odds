import { describe, expect, it } from 'vitest';
import { rollout } from '../../src/engine/career.js';
import { withSeededRandom } from '../../src/odds/rng.js';
import type { RawBrute } from '../../src/engine/types.js';
import { makeBrute } from '../fixtures/makeBrute.js';
import brute1 from '../fixtures/real-brute-1.json' with { type: 'json' };

const réelle = brute1 as unknown as RawBrute;

describe('carrière simulée', () => {
  it('monte la brute d\'autant de niveaux qu\'on demande', () => {
    expect(rollout(makeBrute({ level: 10 }), 10).level).toBe(20);
    expect(rollout(makeBrute({ level: 10 }), 0).level).toBe(10);
  });

  it('laisse la brute de départ intacte', () => {
    const départ = makeBrute({ level: 10, strengthStat: 20 });
    const avant = JSON.stringify(départ);

    rollout(départ, 10);

    expect(JSON.stringify(départ)).toBe(avant);
  });

  // Chaque palier applique un vrai destin du jeu : au bout de dix niveaux, la brute a
  // forcément gagné en puissance, en équipement ou les deux.
  it('rend une brute plus forte que celle de départ', () => {
    const après = rollout(réelle, 10);
    const puissance = (b: RawBrute) => b.strengthValue + b.speedValue
      + b.agilityValue + b.hpValue + b.weapons.length + b.skills.length;

    expect(puissance(après)).toBeGreaterThan(puissance(réelle));
  });

  it('tire des avenirs différents, et les mêmes à graine égale', () => {
    const a = withSeededRandom(1, () => rollout(réelle, 10));
    const b = withSeededRandom(1, () => rollout(réelle, 10));
    const c = withSeededRandom(2, () => rollout(réelle, 10));

    expect(JSON.stringify(a)).toBe(JSON.stringify(b));
    expect(JSON.stringify(a)).not.toBe(JSON.stringify(c));
  });

  it('explore vraiment plusieurs avenirs, pas toujours le même', () => {
    const avenirs = new Set(Array.from(
      { length: 20 },
      (_, i) => withSeededRandom(i, () => JSON.stringify(rollout(réelle, 10))),
    ));

    expect(avenirs.size).toBeGreaterThan(10);
  });
});

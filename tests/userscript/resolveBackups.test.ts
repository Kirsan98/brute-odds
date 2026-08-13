import { describe, expect, it } from 'vitest';
import { resolveBackups } from '../../src/userscript/resolveBackups.js';
import { makeBrute } from '../fixtures/makeBrute.js';

const deps = (mine: ReturnType<typeof makeBrute>[], theirs: ReturnType<typeof makeBrute>[]) => ({
  ownBrutes: () => mine,
  fetchProfileBrutes: async () => theirs,
});

describe('resolveBackups', () => {
  it('ne renforce personne sans la compétence', async () => {
    const r = await resolveBackups(makeBrute(), makeBrute(), deps([], []));
    expect(r.own).toEqual([]);
    expect(r.approximate).toBe(false);
  });

  // Le serveur retire un renfort à chaque combat : figer un choix ici donnerait une
  // probabilité conditionnée à ce tirage, pas la probabilité de gagner.
  it('rend tous les éligibles, pas un choisi', async () => {
    const moi = makeBrute({ name: 'Moi', level: 10, skills: ['backup'] as never });
    const petite = makeBrute({ name: 'Petite', level: 5 });
    const moyenne = makeBrute({ name: 'Moyenne', level: 9 });
    const grande = makeBrute({ name: 'Grande', level: 20 });

    const r = await resolveBackups(moi, makeBrute(), deps([moi, petite, moyenne, grande], []));

    expect(r.own.map((b) => b.name).sort()).toEqual(['Moyenne', 'Petite']);
  });

  it('écarte la brute elle-même et celles de niveau supérieur ou égal', async () => {
    const moi = makeBrute({ name: 'Moi', level: 10, skills: ['backup'] as never });
    const egale = makeBrute({ name: 'Égale', level: 10 });

    const r = await resolveBackups(moi, makeBrute(), deps([moi, egale], []));

    expect(r.own).toEqual([]);
  });

  it('marque approximatif si le profil adverse est inaccessible', async () => {
    const foe = makeBrute({ level: 10, skills: ['backup'] as never });
    const r = await resolveBackups(makeBrute(), foe, {
      ownBrutes: () => [],
      fetchProfileBrutes: async () => { throw new Error('403'); },
    });
    expect(r.approximate).toBe(true);
    expect(r.opponent).toEqual([]);
  });
});

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
    expect(r.own).toBeUndefined();
    expect(r.approximate).toBe(false);
  });

  it('choisit un renfort de niveau strictement inférieur parmi nos brutes', async () => {
    const moi = makeBrute({ name: 'Moi', level: 10, skills: ['backup'] as never });
    const petite = makeBrute({ name: 'Petite', level: 5 });
    const grande = makeBrute({ name: 'Grande', level: 20 });
    const r = await resolveBackups(moi, makeBrute(), deps([moi, petite, grande], []));
    expect(r.own?.name).toBe('Petite');
  });

  it('marque approximatif si le profil adverse est inaccessible', async () => {
    const foe = makeBrute({ level: 10, skills: ['backup'] as never });
    const r = await resolveBackups(makeBrute(), foe, {
      ownBrutes: () => [],
      fetchProfileBrutes: async () => { throw new Error('403'); },
    });
    expect(r.approximate).toBe(true);
    expect(r.opponent).toBeUndefined();
  });
});

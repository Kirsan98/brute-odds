import { beforeEach, describe, expect, it } from 'vitest';
import { store } from '../../src/userscript/store.js';
import { makeBrute } from '../fixtures/makeBrute.js';

describe('store', () => {
  beforeEach(() => store.reset());

  it('indexe les brutes par nom, plusieurs par compte', () => {
    const a = makeBrute({ name: 'SamIsGuey' });
    const b = makeBrute({ name: 'AutreBrute' });
    store.putBrutes([a, b]);
    expect(store.getBrute('SamIsGuey')?.id).toBe(a.id);
    expect(store.getBrute('AutreBrute')?.id).toBe(b.id);
  });

  it('la donnée la plus récente écrase la précédente', () => {
    store.putBrutes([makeBrute({ name: 'SamIsGuey', level: 10 })]);
    store.putBrutes([makeBrute({ name: 'SamIsGuey', level: 11 })]);
    expect(store.getBrute('SamIsGuey')?.level).toBe(11);
  });

  it('sépare les adversaires par brute', () => {
    store.putOpponents('SamIsGuey', [makeBrute({ name: 'X' })]);
    store.putOpponents('AutreBrute', [makeBrute({ name: 'Y' })]);
    expect(store.getOpponents('SamIsGuey')?.[0]?.name).toBe('X');
    expect(store.getOpponents('AutreBrute')?.[0]?.name).toBe('Y');
  });
});

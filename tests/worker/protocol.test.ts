import { describe, expect, it } from 'vitest';
import { handleRequest } from '../../src/worker/protocol.js';
import { makeBrute } from '../fixtures/makeBrute.js';

const request = {
  id: 'abc',
  input: { brute: makeBrute(), opponent: makeBrute(), modifiers: {} },
};

describe('protocole du worker', () => {
  it('renvoie une estimation portant l\'identifiant de la requête', () => {
    const res = handleRequest(request, () => ({ result: 'win', turns: 5, hpLeft: 1 }));
    expect(res.id).toBe('abc');
    expect('estimation' in res && res.estimation.winRate).toBe(1);
  });

  // Sans réponse, la carte de l'adversaire attendrait ses points de suspension pour
  // toujours : l'échec doit revenir jusqu'à l'affichage.
  it('renvoie une erreur portée par le même identifiant plutôt que de lever', () => {
    const res = handleRequest(request, () => { throw new Error('Fight not finished'); });
    expect(res).toEqual({ id: 'abc', error: 'Fight not finished' });
  });
});

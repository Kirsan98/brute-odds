import { describe, expect, it } from 'vitest';
import { handleRequest } from '../../src/worker/protocol.js';
import { makeBrute } from '../fixtures/makeBrute.js';

describe('protocole du worker', () => {
  it('renvoie une estimation portant l\'identifiant de la requête', () => {
    const res = handleRequest({
      id: 'abc',
      input: { brute: makeBrute(), opponent: makeBrute(), modifiers: {} },
    }, () => 'win');
    expect(res.id).toBe('abc');
    expect(res.estimation.winRate).toBe(1);
  });
});

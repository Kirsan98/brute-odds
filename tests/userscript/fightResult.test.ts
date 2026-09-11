import { describe, expect, it } from 'vitest';
import { asFightResult } from '../../src/userscript/fightResult.js';
import realFight from '../fixtures/real-fight.json' with { type: 'json' };

describe('reconnaissance d\'un combat', () => {
  it('reconnaît un vrai combat du serveur', () => {
    expect(asFightResult(realFight)).toEqual({
      id: realFight.id, winner: 'LUISVENTURA', loser: 'LeH_',
    });
  });

  it('accepte aussi un combat emballé dans une enveloppe', () => {
    expect(asFightResult({ fight: realFight })?.winner).toBe('LUISVENTURA');
  });

  // Un combat de tournoi ne se joue pas dans les conditions simulées : le mesurer
  // fausserait la calibration au lieu de l'enrichir.
  it('écarte les combats de tournoi', () => {
    expect(asFightResult({ ...realFight, tournamentId: 'abc' })).toBeNull();
  });

  it('ignore tout ce qui n\'est pas un combat', () => {
    [null, undefined, 42, 'texte', [], {}, { id: 'x' },
      { id: 'x', winner: 'A', loser: 'B' }].forEach((payload) => {
      expect(asFightResult(payload)).toBeNull();
    });
  });
});

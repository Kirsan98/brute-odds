import { describe, expect, it } from 'vitest';
import { asLevelUpChoices, bruteNameIn } from '../../src/userscript/levelUpChoices.js';

const ARME = { type: 'weapon', weapon: 'sai' };
const STATS = { type: 'stats', stat1: 'strength', stat1Value: 2 };

describe('reconnaissance des destins proposés', () => {
  it('reconnaît la paire, nue ou emballée', () => {
    expect(asLevelUpChoices([ARME, STATS])).toHaveLength(2);
    expect(asLevelUpChoices({ choices: [ARME, STATS] })).toHaveLength(2);
    expect(asLevelUpChoices({ destinyChoices: [ARME, STATS] })).toHaveLength(2);
  });

  it('accepte les quatre natures de destin', () => {
    expect(asLevelUpChoices([{ type: 'skill', skill: 'armor' }, ARME])).toHaveLength(2);
    expect(asLevelUpChoices([{ type: 'pet', pet: 'dog1' }, STATS])).toHaveLength(2);
  });

  it('écarte un destin incomplet, qu\'on ne saurait pas appliquer', () => {
    expect(asLevelUpChoices([{ type: 'weapon' }, STATS])).toBeNull();
    expect(asLevelUpChoices([{ type: 'stats' }, ARME])).toBeNull();
    expect(asLevelUpChoices([{ type: 'inconnu', weapon: 'sai' }, STATS])).toBeNull();
  });

  it('ignore tout ce qui n\'est pas une paire de destins', () => {
    [null, undefined, 42, 'texte', [], [ARME], [ARME, STATS, ARME], {},
      { choices: 'non' }].forEach((payload) => {
      expect(asLevelUpChoices(payload)).toBeNull();
    });
  });

  it('retrouve la brute concernée dans l\'URL', () => {
    expect(bruteNameIn('https://x/api/brute/Sam/level-up-choices')).toBe('Sam');
    expect(bruteNameIn('https://x/api/brute/Sam%20Brute/quelque-chose')).toBe('Sam Brute');
    expect(bruteNameIn('https://x/api/user/authenticate')).toBeUndefined();
  });
});

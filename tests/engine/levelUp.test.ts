import { describe, expect, it } from 'vitest';
import type { LevelUpChoice } from '@labrute/core';
import { applyChoice, describeChoice } from '../../src/engine/levelUp.js';
import type { RawBrute } from '../../src/engine/types.js';
import { makeBrute } from '../fixtures/makeBrute.js';
import brute1 from '../fixtures/real-brute-1.json' with { type: 'json' };

const réelle = brute1 as unknown as RawBrute;

describe('choix de destin appliqué', () => {
  it('monte la brute d\'un niveau et remet son expérience à zéro', () => {
    const après = applyChoice(makeBrute({ level: 12, xp: 40 }), {
      type: 'stats', stat1: 'strength', stat1Value: 2,
    } as LevelUpChoice);

    expect(après.level).toBe(13);
    expect(après.xp).toBe(0);
  });

  it('ajoute une statistique et recalcule sa valeur de combat', () => {
    const avant = makeBrute({ strengthStat: 10, strengthModifier: 1, strengthValue: 10 });
    const après = applyChoice(avant, {
      type: 'stats', stat1: 'strength', stat1Value: 2,
    } as LevelUpChoice);

    expect(après.strengthStat).toBe(12);
    expect(après.strengthValue).toBe(12);
    expect(avant.strengthStat).toBe(10); // l'original n'est pas touché
  });

  it('ajoute les deux statistiques d\'un choix double', () => {
    const après = applyChoice(makeBrute({ speedStat: 5, agilityStat: 5 }), {
      type: 'stats', stat1: 'speed', stat1Value: 1, stat2: 'agility', stat2Value: 1,
    } as LevelUpChoice);

    expect(après.speedStat).toBe(6);
    expect(après.agilityStat).toBe(6);
  });

  it('ajoute une arme à l\'arsenal', () => {
    const après = applyChoice(réelle, { type: 'weapon', weapon: 'sai' } as LevelUpChoice);

    expect(après.weapons).toContain('sai');
    expect(après.weapons.length).toBe(réelle.weapons.length + 1);
  });

  // Une compétence ne se contente pas de s'ajouter : elle modifie les statistiques,
  // et c'est tout l'intérêt de passer par la fonction du serveur.
  it('applique les modificateurs de statistiques d\'une compétence', () => {
    const après = applyChoice(réelle, { type: 'skill', skill: 'herculeanStrength' } as LevelUpChoice);

    expect(après.skills).toContain('herculeanStrength');
    expect(après.strengthValue).toBeGreaterThan(réelle.strengthValue);
  });

  it('applique le malus de points de vie d\'un familier', () => {
    const après = applyChoice(réelle, { type: 'pet', pet: 'dog1' } as LevelUpChoice);

    expect(après.pets).toContain('dog1');
    expect(après.hpValue).toBeLessThan(réelle.hpValue);
  });

  it('nomme chaque choix sans ambiguïté', () => {
    expect(describeChoice({ type: 'skill', skill: 'armor' } as LevelUpChoice))
      .toBe('compétence armor');
    expect(describeChoice({ type: 'weapon', weapon: 'axe' } as LevelUpChoice))
      .toBe('arme axe');
    expect(describeChoice({ type: 'pet', pet: 'bear' } as LevelUpChoice))
      .toBe('familier bear');
    expect(describeChoice({
      type: 'stats', stat1: 'hp', stat1Value: 12,
    } as LevelUpChoice)).toBe('+12 hp');
    expect(describeChoice({
      type: 'stats', stat1: 'speed', stat1Value: 1, stat2: 'agility', stat2Value: 1,
    } as LevelUpChoice)).toBe('+1 speed / +1 agility');
  });
});

import { describe, expect, it } from 'vitest';
import { SkillByName, WeaponByName, type Modifiers } from '@labrute/core';
import fight from '../fixtures/real-fight.json' with { type: 'json' };
import brute1 from '../fixtures/real-brute-1.json' with { type: 'json' };
import brute2 from '../fixtures/real-brute-2.json' with { type: 'json' };
import type { DetailedFighter } from '../../vendor/labrute/server/src/utils/fight/generateFight.js';
import { buildFighters } from '../../src/engine/simulateOnce.js';
import type { RawBrute } from '../../src/engine/types.js';

/** Le serveur ne stocke pas les combattants entiers : il les réduit avant de les écrire
 *  (`generateFight.ts:369-401`). On rejoue exactement la même réduction, sinon on
 *  comparerait notre richesse à sa concision et le test échouerait pour rien. */
type Reduced = { index: number } & Record<string, unknown>;

const reduce = (fighter: DetailedFighter): Reduced => {
  const object: Reduced = {
    id: fighter.id,
    index: fighter.index,
    team: fighter.team,
    name: fighter.name,
    gender: fighter.gender,
    body: fighter.body,
    colors: fighter.colors,
    rank: fighter.rank,
    level: fighter.level,
    pupilsCount: fighter.pupilsCount,
    agility: fighter.agility,
    strength: fighter.strength,
    speed: fighter.speed,
    type: fighter.type,
    master: fighter.master,
    maxHp: fighter.maxHp,
    hp: fighter.hp,
    weapons: Object.values(fighter.weapons).reduce<Record<number, number>>((acc, weapon) => {
      acc[WeaponByName[weapon.name]] = weapon.tier;
      return acc;
    }, {}),
    skills: Object.values(fighter.skills).reduce<Record<number, number>>((acc, skill) => {
      acc[SkillByName[skill.name]] = skill.tier;
      return acc;
    }, {}),
    shield: fighter.shield,
  };

  if (fighter.size !== 1) object.size = fighter.size;
  if (fighter.eventId) object.eventId = fighter.eventId;

  return object;
};

const byIndex = (a: { index: number }, b: { index: number }) => a.index - b.index;

describe('test en or', () => {
  it('reconstruit les combattants exactement comme le serveur', () => {
    // Le combat stocke ses modificateurs en liste, le moteur les attend en dictionnaire.
    const modifiers = Object.fromEntries(
      fight.modifiers.map((modifier) => [modifier, true]),
    ) as Modifiers;

    const nôtres = buildFighters(
      brute1 as unknown as RawBrute,
      brute2 as unknown as RawBrute,
      modifiers,
    ).map(reduce).sort(byIndex);

    const serveur = (JSON.parse(fight.fighters) as { index: number }[]).sort(byIndex);

    expect(nôtres).toEqual(serveur);
  });
});

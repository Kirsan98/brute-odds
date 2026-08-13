import { describe, expect, it } from 'vitest';
import { SkillName, WeaponName } from '@labrute/prisma';
import { SkillByName, WeaponByName } from '@labrute/core';

describe('vendorisation du moteur', () => {
  it('expose les enums Prisma hors du serveur', () => {
    expect(SkillName.backup).toBe('backup');
    expect(WeaponName.knife).toBe('knife');
  });

  it('expose les tables de données du core', () => {
    expect(SkillByName[SkillName.backup]).toBeDefined();
    expect(WeaponByName[WeaponName.knife]).toBeDefined();
  });
});

import { SkillName } from '@labrute/prisma';
import type { BackupPools, RawBrute } from '../engine/types.js';

type Deps = {
  ownBrutes: () => RawBrute[];
  fetchProfileBrutes: (bruteName: string) => Promise<RawBrute[]>;
};

const hasBackup = (b: RawBrute) => (b.skills as string[]).includes(SkillName.backup);

// Mêmes critères que le serveur (`generateFight.ts:219-227`) : une autre brute du même
// joueur, de niveau strictement inférieur. Le tirage, lui, appartient au combat.
const eligible = (candidates: RawBrute[], self: RawBrute) => candidates
  .filter((candidate) => candidate.id !== self.id && candidate.level < self.level);

export const resolveBackups = async (
  brute: RawBrute,
  opponent: RawBrute,
  deps: Deps,
): Promise<Required<BackupPools> & { approximate: boolean }> => {
  const own = hasBackup(brute) ? eligible(deps.ownBrutes(), brute) : [];

  if (!hasBackup(opponent)) return { own, opponent: [], approximate: false };

  try {
    const theirs = eligible(await deps.fetchProfileBrutes(opponent.name), opponent);
    return { own, opponent: theirs, approximate: false };
  } catch {
    return { own, opponent: [], approximate: true };
  }
};

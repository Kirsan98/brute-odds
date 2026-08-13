import { SkillName } from '@labrute/prisma';
import type { RawBrute } from '../engine/types.js';

type Deps = {
  ownBrutes: () => RawBrute[];
  fetchProfileBrutes: (bruteName: string) => Promise<RawBrute[]>;
};

const hasBackup = (b: RawBrute) => (b.skills as string[]).includes(SkillName.backup);

const pick = (candidates: RawBrute[], self: RawBrute) => {
  const eligible = candidates.filter((c) => c.id !== self.id && c.level < self.level);
  if (!eligible.length) return undefined;
  return eligible[Math.floor(Math.random() * eligible.length)];
};

export const resolveBackups = async (
  brute: RawBrute,
  opponent: RawBrute,
  deps: Deps,
): Promise<{ own?: RawBrute; opponent?: RawBrute; approximate: boolean }> => {
  const own = hasBackup(brute) ? pick(deps.ownBrutes(), brute) : undefined;

  if (!hasBackup(opponent)) return { own, opponent: undefined, approximate: false };

  try {
    return { own, opponent: pick(await deps.fetchProfileBrutes(opponent.name), opponent), approximate: false };
  } catch {
    return { own, opponent: undefined, approximate: true };
  }
};

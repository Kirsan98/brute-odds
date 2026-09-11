/**
 * Reconnaît la réponse d'un combat sans connaître son URL. Le jeu peut renommer sa
 * route ; la forme de l'objet, elle, est celle que le serveur stocke (`Fight` en base) :
 * deux identifiants de brutes, un vainqueur et un vaincu, nommés.
 */
export type FightResult = { id: string; winner: string; loser: string };

const isString = (value: unknown): value is string => typeof value === 'string';

export const asFightResult = (payload: unknown): FightResult | null => {
  const data = payload as Record<string, unknown> | null | undefined;
  const fight = (data?.fight ?? data) as Record<string, unknown> | null | undefined;
  if (!fight || typeof fight !== 'object') return null;

  const { id, winner, loser, brute1Id, brute2Id, tournamentId } = fight;
  if (!isString(id) || !isString(winner) || !isString(loser)) return null;
  if (!isString(brute1Id) || !isString(brute2Id)) return null;
  // Un combat de tournoi ne se joue pas dans les conditions qu'on a simulées
  // (adversaire imposé, enchaînement de tours) : le compter fausserait la mesure.
  if (tournamentId) return null;

  return { id, winner, loser };
};

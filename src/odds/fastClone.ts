/**
 * `getFighters` clone armes et compétences avec `structuredClone`, une fois par arme et
 * par compétence, à chaque combat : une vingtaine d'appels pour deux brutes équipées.
 * `structuredClone` est un algorithme de sérialisation générique, très cher pour ce
 * qu'on lui demande ici, à savoir copier de petits objets de données plates.
 *
 * Mesure (npm run bench, brutes réelles équipées) : 0,124 ms par combat avec le clone
 * natif, 0,092 avec celui-ci. Un tiers du temps de simulation, retiré sans toucher au
 * moteur : la substitution est posée le temps du calcul, comme celle de `Math.random`.
 */

/** Au-delà, on soupçonne un cycle : `structuredClone` sait les traiter, pas nous. */
const MAX_DEPTH = 50;

const clone = <T>(value: T, native: typeof structuredClone, depth: number): T => {
  if (value === null || typeof value !== 'object') return value;
  if (depth > MAX_DEPTH) return native(value);

  if (Array.isArray(value)) {
    const copy = new Array(value.length);
    for (let i = 0; i < value.length; i += 1) copy[i] = clone(value[i], native, depth + 1);
    return copy as unknown as T;
  }

  // Tout ce qui n'est pas un objet littéral (Date, Map, Set, tableau typé) repart chez
  // l'implémentation native : on n'accélère que le cas qu'on a mesuré.
  if (Object.getPrototypeOf(value) !== Object.prototype) return native(value);

  const copy: Record<string, unknown> = {};
  const source = value as Record<string, unknown>;
  for (const key of Object.keys(source)) {
    copy[key] = clone(source[key], native, depth + 1);
  }
  return copy as T;
};

/** Exécute `fn` avec un `structuredClone` taillé pour les objets du moteur. */
export const withFastClone = <T>(fn: () => T): T => {
  const native = globalThis.structuredClone;
  if (typeof native !== 'function') return fn();

  globalThis.structuredClone = (<V>(value: V) => clone(value, native, 0)) as typeof structuredClone;
  try {
    return fn();
  } finally {
    globalThis.structuredClone = native;
  }
};

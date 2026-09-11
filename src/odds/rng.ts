/**
 * Le moteur du jeu tire son hasard de `Math.random`, sans point d'injection. Pour qu'une
 * estimation soit reproductible, on lui substitue un générateur à graine le temps du
 * calcul, puis on remet l'original en place.
 *
 * Pourquoi reproductible : sans graine, revenir sur l'arène affiche 52 %, puis 49 %, puis
 * 54 % pour le même adversaire. Le chiffre bouge alors que rien n'a bougé, et on ne sait
 * plus si c'est la brute qui a changé ou le tirage. Avec une graine dérivée des seuls
 * combattants, la même situation rend toujours le même chiffre, et l'intervalle de
 * confiance reste là pour dire ce qu'on ignore encore.
 */

/** FNV-1a 32 bits : une graine stable à partir d'une chaîne, sans dépendance. */
export const hashSeed = (key: string): number => {
  let hash = 0x811c9dc5;
  for (let i = 0; i < key.length; i += 1) {
    hash ^= key.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
};

/** mulberry32 : période suffisante pour quelques millions de tirages, deux lignes. */
export const mulberry32 = (seed: number): (() => number) => {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

/** Exécute `fn` avec `Math.random` remplacé par la suite issue de `seed`. */
export const withSeededRandom = <T>(seed: number, fn: () => T): T => {
  const original = Math.random;
  Math.random = mulberry32(seed);
  try {
    return fn();
  } finally {
    Math.random = original;
  }
};

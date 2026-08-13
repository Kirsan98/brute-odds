// Valeur issue de la mesure de scripts/bench.ts — voir §8 du spec.
// Coût mesuré ≈ 0.046 ms/combat (moyenne de 5 runs, 2000 combats chacun, après
// chauffe de 200 combats) sur brutes par défaut (makeBrute(), sans compétence,
// arme ni familier). Règle : plus grand N tel que coût × N × 6 ≤ 2 s, plafonné
// à 2000. À ce coût, même N = 2000 ne consomme que ≈ 0,55 s pour 6 adversaires
// (2000 × 6 × 0.046 ms) — très en dessous du budget de 2 s : c'est le plafond
// qui fixe N, pas le budget de temps.
export const SIMULATIONS = 2000;

/**
 * Intervalle de score de Wilson pour une proportion binomiale.
 *
 * L'intervalle de Wald (`p ± z√(p(1-p)/n)`) vaut exactement zéro quand la proportion
 * touche 0 ou 1 : 2000 victoires sur 2000 y donnent « 100 % ± 0 », ce qui est faux : la
 * vraie borne basse est vers 99,8 %. Wilson ne s'effondre pas aux extrêmes et reste
 * quasiment identique à Wald au milieu, là où l'ancien calcul avait raison.
 */
const Z = 1.96; // 95 %

export type Interval = { lo: number; hi: number; half: number };

export const wilson = (wins: number, n: number): Interval => {
  if (n <= 0) return { lo: 0, hi: 1, half: 0.5 };

  const p = wins / n;
  const z2 = Z * Z;
  const denominator = 1 + z2 / n;
  const center = (p + z2 / (2 * n)) / denominator;
  const spread = (Z / denominator) * Math.sqrt((p * (1 - p)) / n + z2 / (4 * n * n));

  // Le bornage sur `p` n'est pas cosmétique : à zéro victoire, l'arithmétique flottante
  // rend une borne basse de 1e-19 au lieu de zéro, et l'intervalle n'encadrerait plus
  // le chiffre affiché.
  const lo = Math.min(p, Math.max(0, center - spread));
  const hi = Math.max(p, Math.min(1, center + spread));
  // La demi-largeur affichée est mesurée depuis la proportion observée, qui est le
  // chiffre montré : « 63 % ± 3 » doit encadrer 63, pas le centre de Wilson.
  return { lo, hi, half: Math.max(hi - p, p - lo) };
};

/**
 * Mesure de calibration : les combats annoncés à 70 % sont-ils gagnés 70 % du temps ?
 *
 * C'est la seule vérification qui puisse dire si la boucle de combat rejouée est fidèle
 * au jeu. Le test en or prouve la construction des combattants ; rien ne prouvait le
 * déroulé. Le RNG du serveur n'étant pas rejouable, on ne peut pas comparer un combat à
 * un combat : on compare une prévision à une issue, sur beaucoup de combats réels.
 */

export type Prediction = {
  /** Identifiant du combat côté serveur, pour ne jamais compter deux fois le même. */
  fightId: string;
  brute: string;
  opponent: string;
  /** Probabilité de victoire annoncée avant le combat. */
  predicted: number;
  won: boolean;
};

/** Score de Brier : moyenne des carrés d'écart entre prévision et issue.
 *  0 = parfait, 0,25 = ce que vaut « pile ou face » sur tout, 1 = toujours faux. */
export const brier = (records: Prediction[]): number => {
  if (!records.length) return 0;
  const total = records.reduce(
    (sum, r) => sum + (r.predicted - (r.won ? 1 : 0)) ** 2,
    0,
  );
  return total / records.length;
};

export type Bucket = {
  from: number; to: number; count: number; predicted: number; observed: number;
};

/** Diagramme de fiabilité : par tranche de probabilité annoncée, le taux réellement
 *  observé. Un simulateur fidèle donne `observed ≈ predicted` dans chaque tranche. */
export const reliability = (records: Prediction[], bucketCount = 5): Bucket[] => {
  const buckets: Prediction[][] = Array.from({ length: bucketCount }, () => []);

  records.forEach((record) => {
    const index = Math.min(bucketCount - 1, Math.floor(record.predicted * bucketCount));
    buckets[index]!.push(record);
  });

  return buckets
    .map((group, index) => ({
      from: index / bucketCount,
      to: (index + 1) / bucketCount,
      count: group.length,
      predicted: group.length
        ? group.reduce((s, r) => s + r.predicted, 0) / group.length : 0,
      observed: group.length
        ? group.filter((r) => r.won).length / group.length : 0,
    }))
    .filter((bucket) => bucket.count > 0);
};

const pct = (fraction: number) => `${Math.round(fraction * 100)} %`.padStart(5);

/** Rapport lisible dans la console : c'est là que le joueur voit si l'outil dit vrai. */
export const formatReport = (records: Prediction[]): string => {
  if (!records.length) {
    return 'brute-odds : aucun combat enregistré. Lancez des combats depuis l\'arène,'
      + ' la mesure se remplit toute seule.';
  }

  const wins = records.filter((r) => r.won).length;
  const lines = [
    `${records.length} combats mesurés, ${wins} gagnés`,
    `score de Brier : ${brier(records).toFixed(3)} (0 = parfait, 0,25 = pile ou face)`,
    '',
    'annoncé   observé   combats',
  ];

  reliability(records).forEach((bucket) => {
    lines.push(`${pct(bucket.predicted)}     ${pct(bucket.observed)}   ${String(bucket.count).padStart(7)}`);
  });

  return lines.join('\n');
};

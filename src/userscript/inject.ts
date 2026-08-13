import type { Estimation } from '../odds/estimate.js';

/** Arrondi à l'entier : au-delà, on afficherait une précision que le tirage n'a pas.
 *  L'intervalle est plancher à 1 pour ne jamais promettre un « ± 0 ». */
export const formatOdds = (e: Estimation): string => {
  const pct = Math.round(e.winRate * 100);
  const ci = Math.max(1, Math.round(e.ci * 100));
  return e.approximate
    ? `~${pct} % ± ${ci} (renfort inconnu)`
    : `${pct} % ± ${ci}`;
};

// Correspondance exacte sur un nœud de texte : `includes` confondrait
// « Sam » avec « Sam2 » et afficherait le score sur la mauvaise carte.
const findCard = (name: string): Element | null => {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    if (node.textContent?.trim() === name) {
      const card = node.parentElement?.closest('.MuiGrid-item');
      if (card) return card;
    }
    node = walker.nextNode();
  }
  return null;
};

export const renderOdds = (name: string, estimation: Estimation | 'pending') => {
  const card = findCard(name);
  if (!card) return;

  // Remplacer, pas empiler : la page rejoue le rendu à chaque changement de brute.
  card.querySelector('.brute-odds')?.remove();

  const badge = document.createElement('div');
  badge.className = 'brute-odds';
  badge.style.cssText = 'text-align:center;font-weight:700;padding:2px 0;';
  badge.textContent = estimation === 'pending' ? '…' : formatOdds(estimation);
  card.appendChild(badge);
};

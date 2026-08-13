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

const paint = (name: string, estimation: Estimation | 'pending'): boolean => {
  const card = findCard(name);
  if (!card) return false;

  // Remplacer, pas empiler : la page rejoue le rendu à chaque changement de brute.
  card.querySelector('.brute-odds')?.remove();

  const badge = document.createElement('div');
  badge.className = 'brute-odds';
  badge.style.cssText = 'text-align:center;font-weight:700;padding:2px 0;';
  badge.textContent = estimation === 'pending' ? '…' : formatOdds(estimation);
  card.appendChild(badge);
  return true;
};

const awaiting = new Map<string, Estimation | 'pending'>();
let observer: MutationObserver | undefined;

const flush = () => {
  awaiting.forEach((estimation, name) => {
    if (paint(name, estimation)) awaiting.delete(name);
  });
  if (!awaiting.size) {
    observer?.disconnect();
    observer = undefined;
  }
};

/** Affiche l'estimation sur la carte de `name`, maintenant ou dès qu'elle existe :
 *  on intercepte la réponse réseau, la page ne rend ses cartes qu'ensuite. Ce qui
 *  vient d'être peint sort de la file, donc notre propre mutation ne relance rien. */
export const renderOdds = (name: string, estimation: Estimation | 'pending') => {
  if (paint(name, estimation)) return;

  awaiting.set(name, estimation);
  if (!observer) {
    observer = new MutationObserver(flush);
    observer.observe(document.body, { childList: true, subtree: true });
  }
};

/** Oublie les cartes encore attendues et débranche l'observateur. Sans ça, un nom
 *  qui n'apparaît jamais garde une prise sur un `document` que les tests ont remplacé. */
export const resetPending = () => {
  awaiting.clear();
  observer?.disconnect();
  observer = undefined;
};

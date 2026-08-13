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

const label = (estimation: Estimation | 'pending') => (
  estimation === 'pending' ? '…' : formatOdds(estimation)
);

const paint = (name: string, estimation: Estimation | 'pending') => {
  const card = findCard(name);
  if (!card) return;

  const text = label(estimation);
  const badge = card.querySelector('.brute-odds');
  // Ne rien écrire quand rien ne change : sinon notre propre mutation réveille
  // l'observateur, qui réécrit, qui le réveille — sans fin.
  if (badge?.textContent === text) return;

  badge?.remove();
  const replacement = document.createElement('div');
  replacement.className = 'brute-odds';
  replacement.style.cssText = 'text-align:center;font-weight:700;padding:2px 0;';
  replacement.textContent = text;
  card.appendChild(replacement);
};

/** Ce qu'on veut voir affiché, par adversaire — pas ce qu'on a réussi à afficher. */
const shown = new Map<string, Estimation | 'pending'>();
let observer: MutationObserver | undefined;

const repaintAll = () => shown.forEach((estimation, name) => paint(name, estimation));

/** Affiche l'estimation sur la carte de `name`, et la remet en place tant qu'on est là.
 *  Deux raisons : on lit la réponse réseau avant que la page ait rendu ses cartes, et
 *  React redessine ensuite quand bon lui semble, emportant des badges qu'il n'a pas
 *  créés. Peindre une seule fois perdait la moitié des résultats. */
export const renderOdds = (name: string, estimation: Estimation | 'pending') => {
  shown.set(name, estimation);
  paint(name, estimation);

  if (!observer) {
    observer = new MutationObserver(repaintAll);
    observer.observe(document.body, { childList: true, subtree: true });
  }
};

/** Oublie tout et débranche l'observateur — sans quoi il garde une prise sur un
 *  `document` que les tests ont remplacé. */
export const resetOdds = () => {
  shown.clear();
  observer?.disconnect();
  observer = undefined;
};

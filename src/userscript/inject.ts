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
const nameNodeIn = (root: Node, name: string): Node | null => {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    if (node.textContent?.trim() === name) return node;
    node = walker.nextNode();
  }
  return null;
};

/** La carte d'un adversaire : le plus haut ancêtre de son nom qui ne contienne le nom
 *  d'aucun autre adversaire. Aucune classe CSS là-dedans — le jeu peut renommer ses
 *  conteneurs MUI sans nous casser, et c'est exactement ce qui nous est arrivé. */
const findCard = (name: string, names: Iterable<string>): Element | null => {
  const others = [...names].filter((other) => other !== name);
  let card = nameNodeIn(document.body, name)?.parentElement ?? null;

  while (card?.parentElement && card.parentElement !== document.body) {
    const parent = card.parentElement;
    if (others.some((other) => nameNodeIn(parent, other))) break;
    card = parent;
  }
  return card;
};

const label = (estimation: Estimation | 'pending') => (
  estimation === 'pending' ? '…' : formatOdds(estimation)
);

// Posé par-dessus la carte plutôt qu'à sa suite : dans le flux, le badge d'une rangée
// passait derrière le parchemin opaque de la rangée suivante. `z-index` le remet devant
// ses voisins, `pointer-events:none` laisse la carte cliquable.
// Largeur du texte, centrée sur la carte : `left:0;right:0` prenait celle du conteneur,
// qui déborde du parchemin.
const BADGE_STYLE = 'position:absolute;left:50%;transform:translateX(-50%);'
  + 'bottom:4px;z-index:20;white-space:nowrap;padding:1px 6px;'
  + 'font-weight:700;font-size:13px;color:#000;'
  + 'background:rgba(255,255,255,.82);border-radius:3px;pointer-events:none;';

const badgesFor = (name: string) => [...document.querySelectorAll('.brute-odds')]
  .filter((badge) => badge.getAttribute('data-brute') === name);

const paint = (name: string, estimation: Estimation | 'pending') => {
  const card = findCard(name, shown.keys());
  if (!card) return;

  const text = label(estimation);
  // Le badge peut traîner ailleurs : tant qu'un seul adversaire est connu, la carte
  // trouvée est trop haute, et se précise dès que les autres noms arrivent.
  const strays = badgesFor(name);
  const placed = strays.find((badge) => badge.parentElement === card);
  // Ne rien écrire quand rien ne change : sinon notre propre mutation réveille
  // l'observateur, qui réécrit, qui le réveille — sans fin.
  if (strays.length === 1 && placed?.textContent === text) return;

  strays.forEach((badge) => badge.remove());

  if (getComputedStyle(card).position === 'static') {
    (card as HTMLElement).style.position = 'relative';
  }

  const badge = document.createElement('div');
  badge.className = 'brute-odds';
  badge.setAttribute('data-brute', name);
  badge.style.cssText = BADGE_STYLE;
  badge.textContent = text;
  card.appendChild(badge);
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
  // Tout repeindre, pas seulement `name` : un nom de plus affine la carte des autres.
  repaintAll();

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

import type { Estimation } from '../odds/estimate.js';

/** Ce qu'une carte peut afficher : une estimation, l'attente, ou l'échec du calcul. */
export type Displayed = Estimation | 'pending' | { error: string };

const isEstimation = (d: Displayed): d is Estimation => (
  d !== 'pending' && !('error' in d)
);

/** Arrondi à l'entier : au-delà, on afficherait une précision que le tirage n'a pas.
 *  L'intervalle est plancher à 1 pour ne jamais promettre un « ± 0 ». */
export const formatOdds = (e: Estimation): string => {
  const pct = Math.round(e.winRate * 100);
  const ci = Math.max(1, Math.round(e.ci * 100));
  return e.approximate
    ? `~${pct} % ± ${ci} (renfort inconnu)`
    : `${pct} % ± ${ci}`;
};

const percent = (fraction: number) => `${Math.round(fraction * 100)} %`;

/** Le détail que le badge n'a pas la place de dire, posé en infobulle sur la carte :
 *  d'où sort le chiffre, ce qu'il encadre vraiment, et à quoi ressemble le combat. */
export const formatDetail = (e: Estimation): string => [
  `${percent(e.winRate)} de victoires sur ${e.samples} combats simulés`,
  `intervalle de confiance à 95 % : ${percent(e.lo)} à ${percent(e.hi)}`,
  `durée moyenne : ${Math.round(e.meanTurns)} actions`,
  `PV restants moyens en cas de victoire : ${percent(e.hpLeftOnWin)}`,
  ...(e.approximate ? ['renfort de l\'adversaire non résolu : estimation approximative'] : []),
].join('\n');

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

const label = (displayed: Displayed, best: boolean) => {
  if (displayed === 'pending') return '…';
  if (!isEstimation(displayed)) return '× échec';
  // Le chiffre répond à « quelles sont mes chances » ; la mention répond à « lequel
  // dois-je combattre », qui est la question qu'on se pose en arrivant sur l'arène.
  return best ? `${formatOdds(displayed)} · meilleur` : formatOdds(displayed);
};

const detail = (displayed: Displayed) => {
  if (displayed === 'pending') return 'brute-odds : calcul en cours';
  return isEstimation(displayed)
    ? formatDetail(displayed)
    : `brute-odds : calcul impossible (${displayed.error})`;
};

// Posé par-dessus la carte plutôt qu'à sa suite : dans le flux, le badge d'une rangée
// passait derrière le parchemin opaque de la rangée suivante. `z-index` le remet devant
// ses voisins, `pointer-events:none` laisse la carte cliquable.
// Largeur du texte, centrée sur la carte : `left:0;right:0` prenait celle du conteneur,
// qui déborde du parchemin.
const BADGE_STYLE = 'position:absolute;left:50%;transform:translateX(-50%);'
  + 'bottom:4px;z-index:20;white-space:nowrap;padding:1px 6px;'
  + 'font-weight:700;font-size:13px;'
  + 'background:rgba(255,255,255,.82);border-radius:3px;pointer-events:none;';

/** Six cartes lues d'un coup d'œil : la teinte dit avant le chiffre où est le combat
 *  jouable. Rouge à 0 %, vert à 100 %, sombre pour rester lisible sur fond clair. */
export const colorOf = (displayed: Displayed): string => {
  if (displayed === 'pending') return '#000';
  if (!isEstimation(displayed)) return '#666';
  return `hsl(${Math.round(displayed.winRate * 120)},75%,28%)`;
};

const badgesFor = (name: string) => [...document.querySelectorAll('.brute-odds')]
  .filter((badge) => badge.getAttribute('data-brute') === name);

const paint = (name: string, displayed: Displayed) => {
  const card = findCard(name, shown.keys());
  if (!card) return;

  const best = name === bestName;
  const text = label(displayed, best);
  const color = colorOf(displayed);
  // L'infobulle vit sur la carte, pas sur le badge : le badge laisse passer les clics
  // (`pointer-events:none`), donc il ne reçoit jamais le survol. Les attributs ne sont
  // pas observés, cette écriture ne réveille pas l'observateur.
  const tip = detail(displayed);
  // La carte visée se précise à mesure que les noms arrivent. L'infobulle posée sur la
  // précédente doit partir avec le badge, sinon un conteneur entier reste survolable.
  const previous = titled.get(name);
  if (previous && previous !== card) previous.removeAttribute('title');
  titled.set(name, card);
  if (card.getAttribute('title') !== tip) card.setAttribute('title', tip);
  // Le badge peut traîner ailleurs : tant qu'un seul adversaire est connu, la carte
  // trouvée est trop haute, et se précise dès que les autres noms arrivent.
  const strays = badgesFor(name);
  const placed = strays.find((badge) => badge.parentElement === card);
  // Ne rien écrire quand rien ne change : sinon notre propre mutation réveille
  // l'observateur, qui réécrit, qui le réveille — sans fin.
  // On compare une signature qu'on a écrite nous-mêmes, pas le style relu : le
  // navigateur normalise `hsl(50,75%,28%)` en `hsl(50, 75%, 28%)`, la comparaison
  // échouerait toujours, et chaque repeinte réveillerait l'observateur qui repeint.
  if (strays.length === 1 && placed?.getAttribute('data-odds') === `${text}|${color}`) return;

  strays.forEach((badge) => badge.remove());

  if (getComputedStyle(card).position === 'static') {
    (card as HTMLElement).style.position = 'relative';
  }

  const badge = document.createElement('div');
  badge.className = 'brute-odds';
  badge.setAttribute('data-brute', name);
  badge.setAttribute('data-odds', `${text}|${color}`);
  badge.style.cssText = `${BADGE_STYLE}color:${color};`
    + (best ? 'outline:2px solid currentColor;outline-offset:1px;' : '');
  badge.textContent = text;
  card.appendChild(badge);
};

/** Ce qu'on veut voir affiché, par adversaire — pas ce qu'on a réussi à afficher. */
const shown = new Map<string, Displayed>();
/** La carte qui porte actuellement l'infobulle de chaque adversaire. */
const titled = new Map<string, Element>();
/** L'adversaire à combattre, une fois les six situés. */
let bestName: string | undefined;
let observer: MutationObserver | undefined;

const repaintAll = () => shown.forEach((displayed, name) => paint(name, displayed));

/** Affiche l'estimation sur la carte de `name`, et la remet en place tant qu'on est là.
 *  Deux raisons : on lit la réponse réseau avant que la page ait rendu ses cartes, et
 *  React redessine ensuite quand bon lui semble, emportant des badges qu'il n'a pas
 *  créés. Peindre une seule fois perdait la moitié des résultats. */
export const renderOdds = (name: string, displayed: Displayed) => {
  shown.set(name, displayed);
  // Tout repeindre, pas seulement `name` : un nom de plus affine la carte des autres.
  repaintAll();

  if (!observer) {
    observer = new MutationObserver(repaintAll);
    observer.observe(document.body, { childList: true, subtree: true });
  }
};

/** Désigne l'adversaire à combattre, ou personne. Décision de l'orchestrateur : le
 *  meilleur ne se connaît qu'une fois les six estimés. */
export const renderBest = (name: string | undefined) => {
  if (bestName === name) return;
  bestName = name;
  repaintAll();
};

/** Oublie tout et débranche l'observateur — sans quoi il garde une prise sur un
 *  `document` que les tests ont remplacé. */
export const resetOdds = () => {
  shown.clear();
  titled.clear();
  bestName = undefined;
  observer?.disconnect();
  observer = undefined;
};

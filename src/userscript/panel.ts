import type { Advice } from './advise.js';

/**
 * Le conseil de montée de niveau s'affiche dans un panneau posé sur la page, pas sur
 * les cartes du jeu. Les libellés des choix sont traduits à l'écran par le jeu, alors
 * que le moteur les nomme en anglais : les retrouver dans le DOM serait fragile pour
 * rien. Un panneau se place toujours, et se lit d'un coup.
 */
const ID = 'brute-odds-panel';

const PANEL_STYLE = 'position:fixed;right:12px;bottom:12px;z-index:2147483000;'
  + 'max-width:340px;padding:10px 12px;border-radius:6px;'
  + 'background:rgba(20,18,16,.93);color:#f2ece0;'
  + 'font:13px/1.45 system-ui,sans-serif;box-shadow:0 2px 12px rgba(0,0,0,.45);';

const ligne = (texte: string, style = '') => {
  const div = document.createElement('div');
  div.style.cssText = style;
  div.textContent = texte;
  return div;
};

const pourcent = (fraction: number) => Math.round(fraction * 100);

export const removePanel = () => document.getElementById(ID)?.remove();

export const renderAdvice = (advice: Advice | 'pending' | { error: string }) => {
  removePanel();

  const panel = document.createElement('div');
  panel.id = ID;
  panel.style.cssText = PANEL_STYLE;

  if (advice === 'pending') {
    panel.appendChild(ligne('brute-odds : montée de niveau, calcul en cours…'));
    document.body.appendChild(panel);
    return;
  }

  if ('error' in advice) {
    panel.appendChild(ligne(`brute-odds : ${advice.error}`));
    document.body.appendChild(panel);
    return;
  }

  const contre = {
    pool: `comparé sur ${advice.references} adversaires réels du vivier`,
    arena: 'comparé sur les adversaires du jour',
    mirror: 'comparé contre elle-même (aucun adversaire connu)',
  }[advice.basis];

  panel.appendChild(ligne(`Montée de niveau de ${advice.brute}`, 'font-weight:700;'));
  panel.appendChild(ligne(contre, 'opacity:.7;margin-bottom:6px;'));

  const chiffre = (e: { winRate: number; ci: number }) => (
    `${pourcent(e.winRate)} % ± ${Math.max(1, Math.round(e.ci * 100))}`
  );

  advice.options.forEach((option, index) => {
    const gagnant = index === advice.best;
    const parts = [`${option.label} : ${chiffre(option.now)} demain`];
    if (option.later) {
      parts.push(`${chiffre(option.later)} dans ${advice.horizon} niveaux`);
    }

    panel.appendChild(ligne(
      gagnant ? `${parts.join(', ')}  <- à prendre` : parts.join(', '),
      gagnant ? 'font-weight:700;color:#8bd17c;' : 'opacity:.85;',
    ));
  });

  panel.appendChild(ligne(
    advice.decisive
      ? `écart net sur le ${advice.reason}`
      : 'écart faible : les deux destins se valent presque, le conseil est fragile',
    'opacity:.7;margin-top:6px;',
  ));

  // Le panneau se referme d'un clic : il n'a rien à dire de plus une fois lu.
  panel.style.cursor = 'pointer';
  panel.title = 'cliquer pour fermer';
  panel.addEventListener('click', removePanel);

  document.body.appendChild(panel);
};

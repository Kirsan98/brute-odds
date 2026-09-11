// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { removePanel, renderAdvice } from '../../src/userscript/panel.js';
import { summarize } from '../../src/odds/estimate.js';
import type { Advice, Option } from '../../src/userscript/advise.js';

const estimation = (winRate: number) => summarize({
  wins: Math.round(winRate * 6000),
  samples: 6000,
  turnsTotal: 120000,
  hpLeftTotalOnWin: 0,
  approximate: false,
});

const option = (label: string, now: number, later: number): Option => ({
  label, now: estimation(now), later: estimation(later),
});

const advice = (overrides: Partial<Advice> = {}): Advice => ({
  brute: 'Sam',
  basis: 'pool',
  references: 12,
  horizon: 10,
  options: [option('arme sai', 0.58, 0.62), option('+2 strength', 0.51, 0.5)],
  best: 0,
  reason: 'long terme',
  decisive: true,
  ...overrides,
});

const texte = () => document.getElementById('brute-odds-panel')?.textContent ?? '';

describe('panneau de conseil', () => {
  beforeEach(() => { document.body.innerHTML = ''; });
  afterEach(removePanel);

  it('affiche les deux destins, leurs deux horizons, et celui qu\'il faut prendre', () => {
    renderAdvice(advice());

    expect(texte()).toContain('Montée de niveau de Sam');
    expect(texte()).toContain('arme sai : 58 % ± 1 demain, 62 % ± 1 dans 10 niveaux');
    expect(texte()).toContain('+2 strength : 51 % ± 1 demain, 50 % ± 1 dans 10 niveaux');
    expect(texte()).toContain('<- à prendre');
  });

  it('n\'affiche que demain tant que les carrières ne sont pas calculées', () => {
    renderAdvice(advice({
      options: [
        { label: 'arme sai', now: estimation(0.58) },
        { label: '+2 strength', now: estimation(0.51) },
      ],
      reason: 'court terme',
    }));

    expect(texte()).toContain('arme sai : 58 % ± 1 demain');
    expect(texte()).not.toContain('dans 10 niveaux');
  });

  it('dit sur quoi la comparaison est faite', () => {
    renderAdvice(advice());
    expect(texte()).toContain('12 adversaires réels du vivier');

    renderAdvice(advice({ basis: 'arena' }));
    expect(texte()).toContain('adversaires du jour');

    renderAdvice(advice({ basis: 'mirror' }));
    expect(texte()).toContain('contre elle-même');
  });

  it('dit sur quoi il tranche, et prévient quand le conseil est fragile', () => {
    renderAdvice(advice({ decisive: false }));
    expect(texte()).toContain('écart faible');

    renderAdvice(advice({ decisive: true, reason: 'long terme' }));
    expect(texte()).toContain('écart net sur le long terme');

    renderAdvice(advice({ decisive: true, reason: 'court terme' }));
    expect(texte()).toContain('écart net sur le court terme');
  });

  it('affiche l\'attente puis la remplace, sans jamais empiler deux panneaux', () => {
    renderAdvice('pending');
    expect(texte()).toContain('calcul en cours');

    renderAdvice(advice());
    expect(document.querySelectorAll('#brute-odds-panel')).toHaveLength(1);
    expect(texte()).not.toContain('calcul en cours');
  });

  it('affiche l\'échec plutôt que rien', () => {
    renderAdvice({ error: 'le calcul d\'un des choix a échoué' });
    expect(texte()).toContain('le calcul d\'un des choix a échoué');
  });

  it('se referme d\'un clic', () => {
    renderAdvice(advice());
    (document.getElementById('brute-odds-panel') as HTMLElement).click();
    expect(document.getElementById('brute-odds-panel')).toBeNull();
  });

  // Un nom de brute est écrit par un joueur : il finit dans la page, jamais en HTML.
  it('écrit les noms en texte, pas en balises', () => {
    renderAdvice(advice({ brute: '<img src=x onerror=alert(1)>' }));

    expect(document.querySelectorAll('#brute-odds-panel img')).toHaveLength(0);
    expect(texte()).toContain('<img src=x onerror=alert(1)>');
  });
});

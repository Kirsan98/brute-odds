// @vitest-environment jsdom
import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';
import {
  colorOf, formatDetail, formatOdds, renderOdds, resetOdds,
} from '../../src/userscript/inject.js';
import type { Estimation } from '../../src/odds/estimate.js';

const estimation = (overrides: Partial<Estimation> = {}): Estimation => ({
  wins: 420,
  samples: 1000,
  turnsTotal: 20000,
  hpLeftTotalOnWin: 126,
  winRate: 0.42,
  ci: 0.02,
  lo: 0.4,
  hi: 0.44,
  approximate: false,
  meanTurns: 20,
  hpLeftOnWin: 0.3,
  ...overrides,
});

describe('affichage', () => {
  beforeEach(() => {
    resetOdds();
    document.body.innerHTML = `
      <div class="MuiGrid-item"><span>Adversaire1</span></div>
      <div class="MuiGrid-item"><span>Adversaire2</span></div>`;
  });

  // L'observateur survit au test : sans ça, il se réveille sur un `document` détruit.
  afterEach(resetOdds);

  it('formate une estimation sans fausse précision', () => {
    expect(formatOdds(estimation({ winRate: 0.634, ci: 0.031 }))).toBe('63 % ± 3');
  });

  it('signale explicitement une estimation approximative', () => {
    expect(formatOdds(estimation({ winRate: 0.5, ci: 0.03, approximate: true })))
      .toBe('~50 % ± 3 (renfort inconnu)');
  });

  it('injecte le résultat dans la carte du bon adversaire', () => {
    renderOdds('Adversaire2', estimation());
    const cards = document.querySelectorAll('.MuiGrid-item');
    expect(cards[0]?.textContent).not.toContain('%');
    expect(cards[1]?.textContent).toContain('42 % ± 2');
  });

  it('remplace le résultat au lieu de l\'empiler', () => {
    const e = estimation();
    renderOdds('Adversaire1', e);
    renderOdds('Adversaire1', { ...e, winRate: 0.55 });
    expect(document.querySelectorAll('.brute-odds').length).toBe(1);
    expect(document.querySelectorAll('.MuiGrid-item')[0]?.textContent).toContain('55 %');
  });

  it('affiche un état d\'attente le temps du calcul', () => {
    renderOdds('Adversaire1', 'pending');
    expect(document.querySelector('.brute-odds')?.textContent).toBe('…');
  });

  it('ignore un nom absent de la page sans lever', () => {
    expect(() => renderOdds('Inconnu', 'pending')).not.toThrow();
    expect(document.querySelectorAll('.brute-odds').length).toBe(0);
  });

  // La page rend ses cartes après la réponse réseau qu'on intercepte : au premier
  // appel, la carte de l'adversaire n'existe pas encore.
  it('peint la carte dès qu\'elle apparaît, même demandée trop tôt', async () => {
    document.body.innerHTML = '';
    renderOdds('Tardif', estimation());
    expect(document.querySelectorAll('.brute-odds').length).toBe(0);

    document.body.innerHTML = '<div class="MuiGrid-item"><span>Tardif</span></div>';

    await vi.waitFor(() => {
      expect(document.querySelector('.brute-odds')?.textContent).toBe('42 % ± 2');
    });
  });

  // Observé en vrai : le badge visait un conteneur qui regroupait plusieurs
  // adversaires, et chaque nouveau chassait le précédent.
  it('vise la carte de l\'adversaire, pas le conteneur qui en regroupe plusieurs', () => {
    document.body.innerHTML = `
      <div class="colonne">
        <div class="carte"><span><b>Un</b></span></div>
        <div class="carte"><span><b>Deux</b></span></div>
      </div>`;
    const e = estimation();
    renderOdds('Un', e);
    renderOdds('Deux', { ...e, winRate: 0.55 });

    expect(document.querySelectorAll('.colonne > .brute-odds').length).toBe(0);
    const cartes = document.querySelectorAll('.carte');
    expect(cartes[0]?.textContent).toContain('42 %');
    expect(cartes[1]?.textContent).toContain('55 %');
    expect(document.querySelectorAll('.brute-odds').length).toBe(2);
  });

  // Le badge glissait derrière la carte de la rangée suivante, opaque et peinte après.
  it('pose le badge hors du flux, au-dessus de ses voisins', () => {
    renderOdds('Adversaire1', estimation());
    const badge = document.querySelector('.brute-odds') as HTMLElement;

    expect(badge.style.position).toBe('absolute');
    expect(badge.style.zIndex).not.toBe('');
    // Sans repère positionné, `absolute` remonterait jusqu'à la page entière.
    expect((badge.parentElement as HTMLElement).style.position).toBe('relative');
  });

  // Observé en vrai : sur 6 adversaires, 4 badges disparaissaient — la page se
  // redessinait par-dessus, et seuls les 2 derniers arrivaient après.
  it('repose le badge que la page a effacé en se redessinant', async () => {
    renderOdds('Adversaire1', estimation());
    expect(document.querySelector('.brute-odds')?.textContent).toBe('42 % ± 2');

    document.body.innerHTML = '<div class="MuiGrid-item"><span>Adversaire1</span></div>';

    await vi.waitFor(() => {
      expect(document.querySelector('.brute-odds')?.textContent).toBe('42 % ± 2');
    });
  });

  it('laisse en place un badge déjà à jour', async () => {
    renderOdds('Adversaire1', estimation());
    const badge = document.querySelector('.brute-odds');

    document.body.appendChild(document.createElement('div'));
    await new Promise((resolve) => { setTimeout(resolve, 20); });

    // Même nœud, pas un remplaçant : sans ce test, rien n'interdit à l'observateur
    // de se réveiller sur sa propre écriture, indéfiniment.
    expect(document.querySelector('.brute-odds')).toBe(badge);
    expect(document.querySelectorAll('.brute-odds').length).toBe(1);
  });

  it('dit l\'échec du calcul plutôt que de laisser tourner les points de suspension', () => {
    renderOdds('Adversaire1', { error: 'Fight not finished' });
    expect(document.querySelector('.brute-odds')?.textContent).toBe('× échec');
    expect(document.querySelectorAll('.MuiGrid-item')[0]?.getAttribute('title'))
      .toContain('Fight not finished');
  });

  it('pose le détail du calcul en infobulle de la carte', () => {
    renderOdds('Adversaire1', estimation({ winRate: 0.42, lo: 0.4, hi: 0.44 }));
    const title = document.querySelectorAll('.MuiGrid-item')[0]?.getAttribute('title');

    expect(title).toContain('1000 combats simulés');
    expect(title).toContain('40 % à 44 %');
    expect(title).toContain('durée moyenne');
  });

  // L'infobulle vit sur la carte, pas sur le badge : celui-ci laisse passer les clics,
  // donc il ne reçoit jamais le survol.
  it('laisse le badge transparent au clic', () => {
    renderOdds('Adversaire1', estimation());
    const badge = document.querySelector('.brute-odds') as HTMLElement;
    expect(badge.style.pointerEvents).toBe('none');
    expect(badge.getAttribute('title')).toBeNull();
  });

  it('détaille ce qu\'un pourcentage seul ne dit pas', () => {
    expect(formatDetail(estimation({
      winRate: 0.6, lo: 0.58, hi: 0.62, meanTurns: 24, hpLeftOnWin: 0.38,
    }))).toBe([
      '60 % de victoires sur 1000 combats simulés',
      'intervalle de confiance à 95 % : 58 % à 62 %',
      'durée moyenne : 24 actions',
      'PV restants moyens en cas de victoire : 38 %',
    ].join('\n'));
  });

  it('teinte le badge du rouge au vert selon les chances', () => {
    expect(colorOf(estimation({ winRate: 0 }))).toBe('hsl(0,75%,28%)');
    expect(colorOf(estimation({ winRate: 1 }))).toBe('hsl(120,75%,28%)');
    expect(colorOf('pending')).toBe('#000');
    expect(colorOf({ error: 'peu importe' })).toBe('#666');

    renderOdds('Adversaire1', estimation({ winRate: 1 }));
    // jsdom rend la couleur en rgb : on vérifie que le vert domine.
    const [r, v] = (document.querySelector('.brute-odds') as HTMLElement)
      .style.color.match(/\d+/g)!.map(Number);
    expect(v).toBeGreaterThan(r! * 2);
  });

  // Le badge suit la carte quand elle se précise ; l'infobulle doit suivre aussi,
  // sinon un conteneur entier reste survolable avec un chiffre périmé.
  it('retire l\'infobulle de la carte qu\'on abandonne', () => {
    document.body.innerHTML = `
      <div class="colonne">
        <div class="carte"><span>Un</span></div>
        <div class="carte"><span>Deux</span></div>
      </div>`;

    // Seul « Un » est connu : la carte trouvée englobe les deux adversaires.
    renderOdds('Un', estimation());
    const colonne = document.querySelector('.colonne') as HTMLElement;
    expect(colonne.getAttribute('title')).toContain('combats simulés');

    // « Deux » arrive : la carte de « Un » se précise, la colonne doit être rendue.
    renderOdds('Deux', estimation());
    expect(colonne.getAttribute('title')).toBeNull();
    expect(document.querySelectorAll('.carte')[0]?.getAttribute('title'))
      .toContain('combats simulés');
  });

  it('ne confond pas un nom avec un nom plus long qui le contient', () => {
    document.body.innerHTML = `
      <div class="MuiGrid-item"><span>Sam2</span></div>
      <div class="MuiGrid-item"><span>Sam</span></div>`;
    renderOdds('Sam', estimation());
    const cards = document.querySelectorAll('.MuiGrid-item');
    expect(cards[0]?.textContent).not.toContain('%');
    expect(cards[1]?.textContent).toContain('42 %');
  });
});

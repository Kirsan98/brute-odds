// @vitest-environment jsdom
import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { formatOdds, renderOdds, resetOdds } from '../../src/userscript/inject.js';

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
    expect(formatOdds({
      winRate: 0.634, ci: 0.031, samples: 1000, approximate: false,
    })).toBe('63 % ± 3');
  });

  it('signale explicitement une estimation approximative', () => {
    expect(formatOdds({
      winRate: 0.5, ci: 0.03, samples: 1000, approximate: true,
    })).toBe('~50 % ± 3 (renfort inconnu)');
  });

  it('injecte le résultat dans la carte du bon adversaire', () => {
    renderOdds('Adversaire2', {
      winRate: 0.42, ci: 0.02, samples: 1000, approximate: false,
    });
    const cards = document.querySelectorAll('.MuiGrid-item');
    expect(cards[0]?.textContent).not.toContain('%');
    expect(cards[1]?.textContent).toContain('42 % ± 2');
  });

  it('remplace le résultat au lieu de l\'empiler', () => {
    const e = {
      winRate: 0.42, ci: 0.02, samples: 1000, approximate: false,
    };
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
    renderOdds('Tardif', {
      winRate: 0.42, ci: 0.02, samples: 1000, approximate: false,
    });
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
    const e = {
      winRate: 0.42, ci: 0.02, samples: 1000, approximate: false,
    };
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
    renderOdds('Adversaire1', {
      winRate: 0.42, ci: 0.02, samples: 1000, approximate: false,
    });
    const badge = document.querySelector('.brute-odds') as HTMLElement;

    expect(badge.style.position).toBe('absolute');
    expect(badge.style.zIndex).not.toBe('');
    // Sans repère positionné, `absolute` remonterait jusqu'à la page entière.
    expect((badge.parentElement as HTMLElement).style.position).toBe('relative');
  });

  // Observé en vrai : sur 6 adversaires, 4 badges disparaissaient — la page se
  // redessinait par-dessus, et seuls les 2 derniers arrivaient après.
  it('repose le badge que la page a effacé en se redessinant', async () => {
    renderOdds('Adversaire1', {
      winRate: 0.42, ci: 0.02, samples: 1000, approximate: false,
    });
    expect(document.querySelector('.brute-odds')?.textContent).toBe('42 % ± 2');

    document.body.innerHTML = '<div class="MuiGrid-item"><span>Adversaire1</span></div>';

    await vi.waitFor(() => {
      expect(document.querySelector('.brute-odds')?.textContent).toBe('42 % ± 2');
    });
  });

  it('laisse en place un badge déjà à jour', async () => {
    renderOdds('Adversaire1', {
      winRate: 0.42, ci: 0.02, samples: 1000, approximate: false,
    });
    const badge = document.querySelector('.brute-odds');

    document.body.appendChild(document.createElement('div'));
    await new Promise((resolve) => { setTimeout(resolve, 20); });

    // Même nœud, pas un remplaçant : sans ce test, rien n'interdit à l'observateur
    // de se réveiller sur sa propre écriture, indéfiniment.
    expect(document.querySelector('.brute-odds')).toBe(badge);
    expect(document.querySelectorAll('.brute-odds').length).toBe(1);
  });

  it('ne confond pas un nom avec un nom plus long qui le contient', () => {
    document.body.innerHTML = `
      <div class="MuiGrid-item"><span>Sam2</span></div>
      <div class="MuiGrid-item"><span>Sam</span></div>`;
    renderOdds('Sam', {
      winRate: 0.42, ci: 0.02, samples: 1000, approximate: false,
    });
    const cards = document.querySelectorAll('.MuiGrid-item');
    expect(cards[0]?.textContent).not.toContain('%');
    expect(cards[1]?.textContent).toContain('42 %');
  });
});

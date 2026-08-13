// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest';
import { formatOdds, renderOdds } from '../../src/userscript/inject.js';

describe('affichage', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="MuiGrid-item"><span>Adversaire1</span></div>
      <div class="MuiGrid-item"><span>Adversaire2</span></div>`;
  });

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

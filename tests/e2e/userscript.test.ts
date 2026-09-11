// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { handleRequest, type WorkerRequest } from '../../src/worker/protocol.js';
import { makeBrute } from '../fixtures/makeBrute.js';
import realFight from '../fixtures/real-fight.json' with { type: 'json' };

/**
 * Le seul test qui traverse tout : réponse réseau interceptée, cache, résolution des
 * renforts, calcul délégué, badge peint, résultat du combat confronté à l'annonce.
 *
 * `main.ts` n'était couvert par rien, c'est pourtant lui qui relie des pièces toutes
 * testées séparément, et une pièce mal branchée ne se voit nulle part ailleurs.
 */

/** Un worker qui fait vraiment le travail, mais dans ce fil : le protocole exécuté est
 *  celui du vrai worker, seul le passage de messages est simulé. */
class FakeWorker {
  onmessage: ((event: { data: unknown }) => void) | null = null;

  onerror: ((event: unknown) => void) | null = null;

  postMessage(request: WorkerRequest) {
    const response = handleRequest(request);
    queueMicrotask(() => this.onmessage?.({ data: response }));
  }

  terminate() {}
}

const opponents = [makeBrute({ name: 'AdvA' }), makeBrute({ name: 'AdvB', hpValue: 500 })];
const own = makeBrute({ name: 'Sam' });

let resetOdds: () => void;
/** La vraie fonction réseau, celle que le userscript enveloppe : c'est elle qu'on pilote,
 *  `fetch` global étant devenu l'intercepteur lui-même. */
let réseau: ReturnType<typeof vi.fn>;

const json = (payload: unknown) => new Response(JSON.stringify(payload), {
  headers: { 'content-type': 'application/json' },
});

describe('userscript de bout en bout', () => {
  beforeEach(async () => {
    vi.resetModules();
    localStorage.clear();
    document.body.innerHTML = '';

    vi.stubGlobal('WORKER_SOURCE', '/* le vrai code est exécuté par FakeWorker */');
    vi.stubGlobal('Worker', FakeWorker);
    vi.stubGlobal('Blob', class {});
    vi.stubGlobal('URL', class extends URL {
      static createObjectURL = () => 'blob:factice';
    });
    réseau = vi.fn(async (url: string) => {
      if (url.includes('authenticate')) return json({ user: { brutes: [own] }, modifiers: {} });
      if (url.includes('get-opponents')) return json(opponents);
      return json({});
    });
    vi.stubGlobal('fetch', réseau);

    // Importe le userscript comme le navigateur le ferait : il s'installe tout seul.
    await import('../../src/userscript/main.js');
    // Même instance de module que celle que `main` vient de charger : c'est son
    // observateur qu'il faudra débrancher, sinon il se réveille sur un document mort.
    ({ resetOdds } = await import('../../src/userscript/inject.js'));
  });

  afterEach(() => {
    resetOdds();
    vi.unstubAllGlobals();
  });

  const jouerLArène = async () => {
    await fetch('https://brute.eternaltwin.org/api/user/authenticate');
    document.body.innerHTML = `
      <div class="carte"><span>AdvA</span></div>
      <div class="carte"><span>AdvB</span></div>`;
    await fetch('https://brute.eternaltwin.org/api/brute/Sam/get-opponents/10');
  };

  it('peint un pourcentage sur chaque adversaire de l\'arène', async () => {
    await jouerLArène();

    await vi.waitFor(() => {
      const badges = [...document.querySelectorAll('.brute-odds')];
      expect(badges).toHaveLength(2);
      badges.forEach((badge) => expect(badge.textContent)
        .toMatch(/^\d+ % ± \d+( · meilleur)?$/));
    }, { timeout: 10000 });
  }, 15000);

  it('donne un chiffre plus bas contre l\'adversaire le plus coriace', async () => {
    await jouerLArène();

    await vi.waitFor(() => {
      expect(document.querySelectorAll('.brute-odds')).toHaveLength(2);
    }, { timeout: 10000 });

    const lire = (name: string) => Number([...document.querySelectorAll('.brute-odds')]
      .find((b) => b.getAttribute('data-brute') === name)!.textContent!.match(/\d+/)![0]);

    // AdvB a huit fois les points de vie d'AdvA : le doute n'est pas permis.
    expect(lire('AdvB')).toBeLessThan(lire('AdvA'));

    // Et c'est l'adversaire jouable qui est désigné, une fois les deux situés.
    await vi.waitFor(() => {
      const marqué = [...document.querySelectorAll('.brute-odds')]
        .filter((b) => b.textContent?.includes('meilleur'));
      expect(marqué).toHaveLength(1);
      expect(marqué[0]?.getAttribute('data-brute')).toBe('AdvA');
    }, { timeout: 10000 });
  }, 15000);

  it('confronte l\'annonce au résultat du vrai combat', async () => {
    await jouerLArène();
    await vi.waitFor(() => {
      expect(document.querySelectorAll('.brute-odds')).toHaveLength(2);
    }, { timeout: 10000 });

    const bruteOdds = (window as unknown as {
      bruteOdds: { calibration: () => string; records: () => unknown[] };
    }).bruteOdds;
    expect(bruteOdds.records()).toHaveLength(0);

    // Le combat que le joueur lance ensuite, tel que le serveur le renvoie.
    réseau.mockResolvedValueOnce(json({
      ...realFight, winner: 'Sam', loser: 'AdvA',
    }));
    await fetch('https://brute.eternaltwin.org/api/brute/Sam/versus/AdvA');

    expect(bruteOdds.records()).toHaveLength(1);
    expect(bruteOdds.calibration()).toContain('1 combats mesurés, 1 gagnés');
  }, 15000);
});

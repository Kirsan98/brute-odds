import { describe, expect, it, vi } from 'vitest';
import {
  bestOf, contenders, createArenaHandler, type Deps,
} from '../../src/userscript/orchestrate.js';
import { summarize, type Estimation } from '../../src/odds/estimate.js';
import { FIRST_PASS, SECOND_PASS } from '../../src/odds/config.js';
import type { FightRequest, WorkerRequest, WorkerResponse } from '../../src/worker/protocol.js';
import { makeBrute } from '../fixtures/makeBrute.js';

const estimation = (winRate: number, samples = 1000): Estimation => summarize({
  wins: Math.round(winRate * samples),
  samples,
  turnsTotal: 20 * samples,
  hpLeftTotalOnWin: 0.3 * Math.round(winRate * samples),
  approximate: false,
});

/** Un taux par adversaire, pour piloter ce que le worker répond. L'arène n'émet que des
 *  combats : une carrière ici serait un bug, le bouchon le dit tout de suite. */
const worker = (rates: Record<string, number>) => vi.fn(
  async (request: WorkerRequest): Promise<WorkerResponse> => {
    if (request.kind === 'career') throw new Error('l\'arène n\'émet pas de carrière');
    return {
      id: request.id,
      estimation: estimation(
        rates[request.input.opponent.name] ?? 0.5,
        request.samples ?? FIRST_PASS,
      ),
    };
  },
);

/** Les requêtes émises, vues comme les combats qu'elles sont. */
const combats = (run: { mock: { calls: [WorkerRequest][] } }): FightRequest[] => run.mock.calls
  .map(([r]) => r).filter((r): r is FightRequest => r.kind !== 'career');

const setup = (overrides: Partial<Deps> = {}, rates: Record<string, number> = {}) => {
  const brute = makeBrute({ name: 'Sam' });
  const opponents = [makeBrute({ name: 'AdvA' }), makeBrute({ name: 'AdvB' })];
  const render = vi.fn();
  const renderBest = vi.fn();
  const run = worker(rates);

  const deps: Deps = {
    getBrute: (name) => (name === 'Sam' ? brute : undefined),
    getOpponents: (name) => (name === 'Sam' ? opponents : undefined),
    getModifiers: () => ({}),
    getOwnBrutes: () => [brute],
    fetchProfileBrutes: async () => [],
    run,
    render,
    renderBest,
    ...overrides,
  };

  return {
    brute, opponents, render, renderBest, run, handler: createArenaHandler(deps),
  };
};

describe('choix des prétendants', () => {
  const table = (rates: [string, number][]) => new Map(
    rates.map(([name, rate]) => [name, estimation(rate, 1500)]),
  );

  it('ne retient que ceux dont l\'intervalle touche encore celui du meilleur', () => {
    // 62 % et 61 % sont indiscernables à 1500 tirages ; 30 % ne l'est pas.
    expect(contenders(table([['A', 0.62], ['B', 0.61], ['C', 0.3]])).sort())
      .toEqual(['A', 'B']);
  });

  it('n\'en retient qu\'un quand le meilleur est net', () => {
    expect(contenders(table([['A', 0.9], ['B', 0.3], ['C', 0.2]]))).toEqual(['A']);
  });

  it('ne retient rien quand il n\'y a rien', () => {
    expect(contenders(new Map())).toEqual([]);
    expect(bestOf(new Map())).toBeUndefined();
  });

  it('désigne le taux le plus haut, départagé par la borne basse', () => {
    expect(bestOf(table([['A', 0.5], ['B', 0.7], ['C', 0.6]]))).toBe('B');

    // À taux égal, celui dont la borne basse est la plus haute : le mieux établi.
    const égalité = new Map([
      ['Peu', estimation(0.6, 200)],
      ['Beaucoup', estimation(0.6, 8000)],
    ]);
    expect(bestOf(égalité)).toBe('Beaucoup');
  });
});

describe('orchestration de l\'arène', () => {
  it('ne fait rien tant que la brute ou ses adversaires manquent', async () => {
    const { handler, run, render } = setup();
    await handler('Inconnue');
    expect(run).not.toHaveBeenCalled();
    expect(render).not.toHaveBeenCalled();
  });

  it('affiche l\'attente sur tous les adversaires avant de calculer', async () => {
    const { handler, render } = setup();
    await handler('Sam');

    expect(render.mock.calls.slice(0, 2)).toEqual([['AdvA', 'pending'], ['AdvB', 'pending']]);
  });

  it('rend un résultat sur la carte de chaque adversaire', async () => {
    const { handler, render } = setup({}, { AdvA: 0.7, AdvB: 0.2 });
    await handler('Sam');

    const dernier = (name: string) => [...render.mock.calls]
      .reverse().find(([n]) => n === name)?.[1] as Estimation;

    expect(dernier('AdvA').winRate).toBeCloseTo(0.7, 2);
    expect(dernier('AdvB').winRate).toBeCloseTo(0.2, 2);
  });

  it('affiche l\'échec plutôt que de laisser la carte en attente', async () => {
    const { handler, render } = setup({
      run: async (request) => ({ id: request.id, error: 'Fight not finished' }),
    });
    await handler('Sam');

    expect(render).toHaveBeenCalledWith('AdvA', { error: 'Fight not finished' });
  });

  it('désigne l\'adversaire à combattre', async () => {
    const { handler, renderBest } = setup({}, { AdvA: 0.35, AdvB: 0.75 });
    await handler('Sam');

    // D'abord personne (les cartes repartent à zéro), puis le meilleur.
    expect(renderBest.mock.calls[0]).toEqual([undefined]);
    expect(renderBest.mock.calls.at(-1)).toEqual(['AdvB']);
  });

  // Affiner un adversaire déjà classé dernier ne change aucune décision ; départager
  // les deux premiers la change entièrement.
  it('ne tire la seconde salve que sur les prétendants', async () => {
    const { handler, run } = setup({}, { AdvA: 0.61, AdvB: 0.15 });
    await handler('Sam');

    const salves = combats(run).map((r) => [r.input.opponent.name, r.samples]);
    expect(salves).toContainEqual(['AdvA', FIRST_PASS]);
    expect(salves).toContainEqual(['AdvB', FIRST_PASS]);
    expect(salves).not.toContainEqual(['AdvB', SECOND_PASS]);
    // Un seul prétendant : rien à départager, pas de seconde salve du tout.
    expect(salves).toHaveLength(2);
  });

  it('départage deux adversaires trop proches par une seconde salve', async () => {
    const { handler, run, render } = setup({}, { AdvA: 0.61, AdvB: 0.6 });
    await handler('Sam');

    const salves = combats(run).map((r) => [r.input.opponent.name, r.samples]);
    expect(salves).toContainEqual(['AdvA', SECOND_PASS]);
    expect(salves).toContainEqual(['AdvB', SECOND_PASS]);

    // Les deux salves se cumulent : l'intervalle final est plus serré que celui de la
    // première, et porte sur tous les tirages.
    const dernier = [...render.mock.calls].reverse()
      .find(([n]) => n === 'AdvA')?.[1] as Estimation;
    expect(dernier.samples).toBe(FIRST_PASS + SECOND_PASS);
    expect(dernier.ci).toBeLessThan(estimation(0.61, FIRST_PASS).ci);
  });

  it('tire autre chose à la seconde salve qu\'à la première', async () => {
    const { handler, run } = setup({}, { AdvA: 0.61, AdvB: 0.6 });
    await handler('Sam');

    const secondes = combats(run).map((r) => r.input.round).filter((r) => r === 1);
    expect(secondes).toHaveLength(2);
  });

  it('annonce chaque prévision, pour pouvoir la confronter au vrai combat', async () => {
    const onPrediction = vi.fn();
    const { handler } = setup({ onPrediction }, { AdvA: 0.7, AdvB: 0.2 });
    await handler('Sam');

    expect(onPrediction.mock.calls.map(([, name]) => name)).toContain('AdvA');
    expect(onPrediction.mock.calls.map(([, name]) => name)).toContain('AdvB');
  });

  // En série, un profil d'adversaire lent retardait les cinq autres cartes.
  it('n\'attend pas le renfort d\'un adversaire pour lancer le calcul du suivant', async () => {
    let releaseSlow = () => {};
    const slow = new Promise<void>((resolve) => { releaseSlow = resolve; });

    const opponents = [
      makeBrute({ name: 'Lent', skills: ['backup'] as never }),
      makeBrute({ name: 'Rapide' }),
    ];
    const run = worker({});

    const handler = createArenaHandler({
      getBrute: () => makeBrute({ name: 'Sam' }),
      getOpponents: () => opponents,
      getModifiers: () => ({}),
      getOwnBrutes: () => [],
      fetchProfileBrutes: async () => { await slow; return []; },
      run,
      render: vi.fn(),
      renderBest: vi.fn(),
    });

    const pending = handler('Sam');
    await vi.waitFor(() => expect(run).toHaveBeenCalledTimes(1));
    expect(combats(run)[0]?.input.opponent.name).toBe('Rapide');

    releaseSlow();
    await pending;
  });

  it('transmet au calcul les viviers de renfort, pas un renfort tiré d\'avance', async () => {
    const brute = makeBrute({ name: 'Sam', level: 20, skills: ['backup'] as never });
    const petit = makeBrute({ name: 'Petit', level: 5 });
    const trop = makeBrute({ name: 'Trop', level: 25 });
    const run = worker({});

    const handler = createArenaHandler({
      getBrute: () => brute,
      getOpponents: () => [makeBrute({ name: 'Adv' })],
      getModifiers: () => ({}),
      getOwnBrutes: () => [brute, petit, trop],
      fetchProfileBrutes: async () => [],
      run,
      render: vi.fn(),
      renderBest: vi.fn(),
    });

    await handler('Sam');

    expect(combats(run)[0]?.input.backups?.own?.map((b) => b.name)).toEqual(['Petit']);
  });
});

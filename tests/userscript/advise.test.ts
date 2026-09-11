import { describe, expect, it, vi } from 'vitest';
import type { LevelUpChoice } from '@labrute/core';
import {
  createAdvisor, decide, type Advice, type AdvisorDeps, type Option,
} from '../../src/userscript/advise.js';
import { summarize, type Estimation } from '../../src/odds/estimate.js';
import {
  ADVICE_PASS, CAREER_CHUNKS, CAREER_LEVELS, CAREER_SECOND_CHUNKS, REFERENCE_COUNT,
} from '../../src/odds/config.js';
import type {
  CareerRequest, FightRequest, WorkerRequest, WorkerResponse,
} from '../../src/worker/protocol.js';
import { makeBrute } from '../fixtures/makeBrute.js';

const estimation = (winRate: number, samples = 6000): Estimation => summarize({
  wins: Math.round(winRate * samples),
  samples,
  turnsTotal: 20 * samples,
  hpLeftTotalOnWin: 0,
  approximate: false,
});

const option = (label: string, now: number, later?: number): Option => ({
  label,
  now: estimation(now),
  ...(later === undefined ? {} : { later: estimation(later) }),
});

const CHOIX: LevelUpChoice[] = [
  { type: 'weapon', weapon: 'sai' } as LevelUpChoice,
  { type: 'stats', stat1: 'strength', stat1Value: 2 } as LevelUpChoice,
];

/** Le conseil rendu, une fois écartés l'attente et l'échec. */
const conseil = (rendu: unknown): Advice => {
  if (!rendu || rendu === 'pending' || typeof rendu !== 'object' || 'error' in rendu) {
    throw new Error(`pas un conseil : ${JSON.stringify(rendu)}`);
  }
  return rendu as Advice;
};

/**
 * Un worker bouchonné qui récompense la force, et différemment selon l'horizon : c'est
 * ce qui permet de vérifier que les destins sont bien appliqués avant simulation, et
 * que le long terme est bien ce qui décide.
 */
const workerParForce = (courtTerme = 0.01, longTerme = courtTerme) => vi.fn(
  async (request: WorkerRequest): Promise<WorkerResponse> => {
    const carrière = request.kind === 'career';
    const samples = request.kind === 'career'
      ? request.input.trajectories * request.input.fightsPerTrajectory
      : (request.samples ?? 1);
    const force = request.input.brute.strengthValue;
    const winRate = Math.min(0.95, force * (carrière ? longTerme : courtTerme));

    return {
      id: request.id,
      estimation: summarize({
        wins: Math.round(winRate * samples),
        samples,
        turnsTotal: 20 * samples,
        hpLeftTotalOnWin: 0,
        approximate: false,
      }),
    };
  },
);

/** Un worker bouchonné aux taux imposés, pour opposer franchement les deux horizons. */
const workerFixe = (taux: (request: WorkerRequest) => number) => vi.fn(
  async (request: WorkerRequest): Promise<WorkerResponse> => {
    const samples = request.kind === 'career'
      ? request.input.trajectories * request.input.fightsPerTrajectory
      : (request.samples ?? 1);
    return {
      id: request.id,
      estimation: summarize({
        wins: Math.round(taux(request) * samples),
        samples,
        turnsTotal: 20 * samples,
        hpLeftTotalOnWin: 0,
        approximate: false,
      }),
    };
  },
);

type Appels = { mock: { calls: [WorkerRequest][] } };
const combats = (run: Appels): FightRequest[] => run.mock.calls
  .map(([r]) => r).filter((r): r is FightRequest => r.kind !== 'career');
const carrières = (run: Appels): CareerRequest[] => run.mock.calls
  .map(([r]) => r).filter((r): r is CareerRequest => r.kind === 'career');

const setup = (overrides: Partial<AdvisorDeps> = {}, vivier: number = REFERENCE_COUNT) => {
  const brute = makeBrute({ name: 'Sam', level: 10, strengthStat: 40, strengthValue: 40 });
  const arena = [makeBrute({ name: 'AdvA' }), makeBrute({ name: 'AdvB' })];
  const pool = Array.from({ length: vivier }, () => makeBrute({ level: 11 }));
  const render = vi.fn(overrides.render);
  const run = (overrides.run ?? workerParForce()) as ReturnType<typeof workerParForce>;

  const deps: AdvisorDeps = {
    getBrute: (name) => (name === 'Sam' ? brute : undefined),
    getOpponents: (name) => (name === 'Sam' ? arena : undefined),
    getModifiers: () => ({}),
    sampleOpponents: (_level, count) => pool.slice(0, count),
    ...overrides,
    run,
    render,
  };

  return { brute, arena, pool, render, run, advise: createAdvisor(deps) };
};

describe('sur quoi le conseil tranche', () => {
  it('sur le long terme quand les carrières séparent les deux destins', () => {
    // Le court terme dit l'inverse : c'est bien la carrière qui décide.
    expect(decide([option('a', 0.7, 0.4), option('b', 0.3, 0.6)])).toEqual({
      best: 1, reason: 'long terme', decisive: true,
    });
  });

  it('sur le court terme quand les carrières ne séparent rien', () => {
    expect(decide([option('a', 0.7, 0.5), option('b', 0.3, 0.502)])).toEqual({
      best: 0, reason: 'court terme', decisive: true,
    });
  });

  it('prévient quand rien ne sépare les deux destins', () => {
    const verdict = decide([option('a', 0.5, 0.5), option('b', 0.502, 0.502)]);
    expect(verdict.decisive).toBe(false);
    expect(verdict.reason).toBe('écart faible');
  });

  it('tranche sur le court terme tant que les carrières ne sont pas calculées', () => {
    expect(decide([option('a', 0.3), option('b', 0.7)])).toEqual({
      best: 1, reason: 'court terme', decisive: true,
    });
  });
});

describe('conseil de montée de niveau', () => {
  it('ne dit rien sans brute connue ni sans deux destins', async () => {
    const { advise, render } = setup();
    await advise('Inconnue', CHOIX);
    await advise('Sam', [CHOIX[0]!]);
    expect(render).not.toHaveBeenCalled();
  });

  it('affiche l\'attente avant de calculer', async () => {
    const { advise, render } = setup();
    await advise('Sam', CHOIX);
    expect(render.mock.calls[0]).toEqual(['pending']);
  });

  it('juge les destins sur le vivier accumulé plutôt que sur le tirage du jour', async () => {
    const { advise, render, run } = setup();
    await advise('Sam', CHOIX);

    const advice = conseil(render.mock.calls.at(-1)?.[0]);
    expect(advice.basis).toBe('pool');
    expect(advice.references).toBe(REFERENCE_COUNT);

    // 2 destins x 12 références au premier temps.
    const demain = combats(run);
    expect(demain).toHaveLength(2 * REFERENCE_COUNT);
    expect(demain.every((r) => r.samples === ADVICE_PASS)).toBe(true);
  });

  it('retombe sur les adversaires du jour quand le vivier est vide', async () => {
    const { advise, render } = setup({ sampleOpponents: () => [] });
    await advise('Sam', CHOIX);

    const advice = conseil(render.mock.calls.at(-1)?.[0]);
    expect(advice.basis).toBe('arena');
    expect(advice.references).toBe(2);
  });

  it('compare la brute à elle-même quand rien n\'est connu', async () => {
    const { advise, render, run } = setup({
      sampleOpponents: () => [], getOpponents: () => undefined,
    });
    await advise('Sam', CHOIX);

    expect(conseil(render.mock.calls.at(-1)?.[0]).basis).toBe('mirror');
    expect(combats(run)[0]?.input.opponent.name).toBe('Sam');
  });

  it('applique chaque destin avant de simuler', async () => {
    const { advise, run } = setup();
    await advise('Sam', CHOIX);

    const brutes = run.mock.calls.map(([r]) => r.input.brute);
    // Montée d'un niveau des deux côtés, et « +2 force » a bien donné ses deux points.
    expect(new Set(brutes.map((b) => b.level))).toEqual(new Set([11]));
    expect(new Set(brutes.map((b) => b.strengthValue))).toEqual(new Set([40, 42]));
  });

  it('prolonge chaque destin sur dix niveaux, en lots parallélisables', async () => {
    const { advise, run } = setup();
    await advise('Sam', CHOIX);

    const lancées = carrières(run);
    expect(lancées.length).toBeGreaterThanOrEqual(2 * CAREER_CHUNKS);
    expect(lancées.every((r) => r.input.levels === CAREER_LEVELS)).toBe(true);
    // Chaque lot tire d'autres avenirs que ses voisins.
    const lots = lancées.slice(0, CAREER_CHUNKS).map((r) => r.input.round);
    expect(new Set(lots).size).toBe(CAREER_CHUNKS);
  });

  it('affiche d\'abord demain, puis la carrière', async () => {
    const { advise, render } = setup();
    await advise('Sam', CHOIX);

    const premier = conseil(render.mock.calls[1]?.[0]);
    expect(premier.options[0]?.later).toBeUndefined();
    expect(premier.options[0]?.now.samples).toBe(REFERENCE_COUNT * ADVICE_PASS);

    const dernier = conseil(render.mock.calls.at(-1)?.[0]);
    expect(dernier.options[0]?.later).toBeDefined();
    expect(dernier.horizon).toBe(CAREER_LEVELS);
  });

  // Le court terme préfère le premier destin, la carrière préfère le second : c'est
  // elle qui doit l'emporter, parce qu'un destin ne se reprend pas.
  it('recommande sur la carrière, pas sur le combat de demain', async () => {
    // « arme sai » (force 40) gagne demain, « +2 force » (force 42) gagne la carrière.
    const { advise, render } = setup({
      run: workerFixe((r) => {
        const costaud = r.input.brute.strengthValue > 40;
        return r.kind === 'career' ? (costaud ? 0.6 : 0.3) : (costaud ? 0.3 : 0.6);
      }),
    });
    await advise('Sam', CHOIX);

    const advice = conseil(render.mock.calls.at(-1)?.[0]);
    expect(advice.reason).toBe('long terme');
    expect(advice.options[advice.best]?.label).toBe('+2 strength');
  });

  it('relance des avenirs quand les deux carrières se valent', async () => {
    // 50,0 % contre 50,2 % : aucun tirage raisonnable ne sépare ça.
    const { advise, run } = setup({
      run: workerFixe((r) => (r.input.brute.strengthValue > 40 ? 0.502 : 0.5)),
    });
    await advise('Sam', CHOIX);

    expect(carrières(run)).toHaveLength(2 * (CAREER_CHUNKS + CAREER_SECOND_CHUNKS));
  });

  it('s\'arrête quand la carrière a déjà tranché', async () => {
    const { advise, run } = setup({
      run: workerFixe((r) => (r.input.brute.strengthValue > 40 ? 0.7 : 0.3)),
    });
    await advise('Sam', CHOIX);

    expect(carrières(run)).toHaveLength(2 * CAREER_CHUNKS);
  });

  it('dit l\'échec plutôt que de conseiller sur un calcul incomplet', async () => {
    const { advise, render } = setup({
      run: async (request) => ({ id: request.id, error: 'Fight not finished' }),
    });
    await advise('Sam', CHOIX);

    expect(render.mock.calls.at(-1)?.[0])
      .toEqual({ error: 'le calcul d\'un des destins a échoué' });
  });
});

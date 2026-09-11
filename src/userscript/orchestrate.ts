import type { Modifiers } from '@labrute/core';
import type { RawBrute } from '../engine/types.js';
import type { WorkerRequest, WorkerResponse } from '../worker/protocol.js';
import { combine, type Estimation, type FightInput } from '../odds/estimate.js';
import { FIRST_PASS, SECOND_PASS } from '../odds/config.js';
import type { Displayed } from './inject.js';
import { resolveBackups } from './resolveBackups.js';

export type Deps = {
  getBrute: (name: string) => RawBrute | undefined;
  getOpponents: (name: string) => RawBrute[] | undefined;
  getModifiers: () => Modifiers;
  getOwnBrutes: () => RawBrute[];
  fetchProfileBrutes: (name: string) => Promise<RawBrute[]>;
  run: (request: WorkerRequest) => Promise<WorkerResponse>;
  render: (name: string, displayed: Displayed) => void;
  /** Désigne l'adversaire à combattre une fois les six situés. */
  renderBest: (name: string | undefined) => void;
  /** Appelé dès qu'un chiffre est annoncé, pour pouvoir le confronter plus tard au
   *  résultat réel du combat (calibration). */
  onPrediction?: (brute: string, opponent: string, winRate: number) => void;
};

let counter = 0;

/** Les adversaires qu'une première salve n'a pas su départager du meilleur : leur
 *  intervalle touche encore le sien. Ce sont les seuls à mériter une seconde salve,
 *  puisque ce sont les seuls dont dépend la décision. */
export const contenders = (results: Map<string, Estimation>): string[] => {
  const best = [...results.values()].reduce<Estimation | undefined>(
    (top, e) => (!top || e.winRate > top.winRate ? e : top),
    undefined,
  );
  if (!best) return [];

  return [...results.entries()]
    .filter(([, e]) => e.hi >= best.lo)
    .map(([name]) => name);
};

/** Le meilleur adversaire : le taux le plus haut, départagé par la borne basse quand
 *  deux taux sont à égalité. */
export const bestOf = (results: Map<string, Estimation>): string | undefined => (
  [...results.entries()].sort(
    ([, a], [, b]) => (b.winRate - a.winRate) || (b.lo - a.lo),
  )[0]?.[0]
);

/**
 * Ce qui se passe quand l'arène se charge : six adversaires, six estimations, puis la
 * désignation de celui qu'il faut combattre.
 *
 * Le budget de calcul n'est pas réparti à parts égales. Une première salve situe tout
 * le monde ; la seconde ne va qu'aux prétendants, parce qu'affiner un adversaire déjà
 * classé dernier ne change aucune décision, alors que départager les deux premiers la
 * change entièrement.
 */
export const createArenaHandler = (deps: Deps) => async (bruteName: string) => {
  const brute = deps.getBrute(bruteName);
  const opponents = deps.getOpponents(bruteName);
  if (!brute || !opponents) return;

  // Tous les noms d'abord : c'est en les connaissant tous qu'on sait délimiter la
  // carte de chacun, et les six adversaires affichent leur attente sans délai.
  opponents.forEach((opponent) => deps.render(opponent.name, 'pending'));
  deps.renderBest(undefined);

  const modifiers = deps.getModifiers();
  const inputs = new Map<string, FightInput>();
  const results = new Map<string, Estimation>();

  const salve = async (opponent: RawBrute, input: FightInput, samples: number) => {
    counter += 1;
    const response = await deps.run({
      id: `${bruteName}:${opponent.name}:${counter}`,
      input,
      samples,
    });

    if ('error' in response) {
      deps.render(opponent.name, { error: response.error });
      return;
    }

    const previous = results.get(opponent.name);
    const estimation = previous
      ? combine(previous, response.estimation)
      : response.estimation;

    results.set(opponent.name, estimation);
    deps.render(opponent.name, estimation);
    deps.onPrediction?.(bruteName, opponent.name, estimation.winRate);
  };

  await Promise.all(opponents.map(async (opponent) => {
    // Les viviers de renfort, pas les renforts : le tirage se fait combat par combat,
    // dans le worker.
    const backups = await resolveBackups(brute, opponent, {
      ownBrutes: deps.getOwnBrutes,
      fetchProfileBrutes: deps.fetchProfileBrutes,
    });

    const input: FightInput = {
      brute,
      opponent,
      modifiers,
      backups: { own: backups.own, opponent: backups.opponent },
      approximate: backups.approximate,
    };
    inputs.set(opponent.name, input);

    await salve(opponent, input, FIRST_PASS);
  }));

  deps.renderBest(bestOf(results));

  const àDépartager = contenders(results);
  if (àDépartager.length < 2) return;

  await Promise.all(àDépartager.map(async (name) => {
    const opponent = opponents.find((o) => o.name === name);
    const input = inputs.get(name);
    if (!opponent || !input) return;
    // Salve 1 : une seconde salve doit tirer autre chose que la première, sinon elle
    // ne fait que recopier son résultat.
    await salve(opponent, { ...input, round: 1 }, SECOND_PASS);
  }));

  deps.renderBest(bestOf(results));
};

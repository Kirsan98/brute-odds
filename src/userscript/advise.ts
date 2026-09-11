import type { LevelUpChoice, Modifiers } from '@labrute/core';
import { applyChoice, describeChoice } from '../engine/levelUp.js';
import type { RawBrute } from '../engine/types.js';
import { combine, summarize, type Estimation, type Tally } from '../odds/estimate.js';
import {
  ADVICE_PASS, CAREER_CHUNKS, CAREER_FIGHTS, CAREER_LEVELS, CAREER_SECOND_CHUNKS,
  CAREER_TRAJECTORIES, REFERENCE_COUNT,
} from '../odds/config.js';
import type { WorkerRequest, WorkerResponse } from '../worker/protocol.js';

export type Option = {
  label: string;
  /** Ce que le destin vaut au prochain combat. */
  now: Estimation;
  /** Ce qu'il vaut dans `CAREER_LEVELS` niveaux, sur des centaines d'avenirs tirés. */
  later?: Estimation;
};

export type Advice = {
  brute: string;
  /** Contre quoi les destins ont été comparés. */
  basis: 'pool' | 'arena' | 'mirror';
  references: number;
  horizon: number;
  options: Option[];
  /** Le destin à prendre. Il y en a toujours un : à la montée de niveau, s'abstenir
   *  n'est pas une option, il faut cliquer sur l'un des deux. */
  best: number;
  /** Sur quoi la recommandation se fonde. */
  reason: 'long terme' | 'court terme' | 'écart faible';
  decisive: boolean;
};

export type AdvisorDeps = {
  getBrute: (name: string) => RawBrute | undefined;
  getOpponents: (name: string) => RawBrute[] | undefined;
  getModifiers: () => Modifiers;
  /** Le vivier accumulé, pour ne pas juger un destin sur le tirage d'un seul jour. */
  sampleOpponents: (level: number, count: number) => RawBrute[];
  run: (request: WorkerRequest) => Promise<WorkerResponse>;
  render: (advice: Advice | 'pending' | { error: string }) => void;
};

const VIDE: Tally = {
  wins: 0, samples: 0, turnsTotal: 0, hpLeftTotalOnWin: 0, approximate: false,
};

let counter = 0;

const cumule = (tallies: Tally[]): Estimation => tallies.reduce<Estimation>(
  (total, tally) => combine(total, tally),
  summarize(VIDE),
);

const meilleur = (options: Option[], clé: (o: Option) => Estimation | undefined): number => (
  options.reduce((best, option, index) => {
    const candidat = clé(option)?.winRate ?? -1;
    return candidat > (clé(options[best]!)?.winRate ?? -1) ? index : best;
  }, 0)
);

/** Un écart est net quand les intervalles ne se chevauchent plus : en deçà, le
 *  classement pourrait s'inverser au prochain tirage. */
const tranché = (options: Option[], clé: (o: Option) => Estimation | undefined): boolean => {
  const estimations = options.map(clé).filter((e): e is Estimation => !!e && e.samples > 0);
  if (estimations.length < 2) return false;

  const [premier, second] = [...estimations].sort((a, b) => b.winRate - a.winRate);
  return premier!.lo > second!.hi;
};

/**
 * Sur quoi trancher. Le long terme d'abord : une compétence reste pour toujours, alors
 * qu'un combat de plus ou de moins se rattrape dès demain. Le court terme ne décide que
 * si les avenirs simulés ne séparent pas les deux destins.
 */
export const decide = (options: Option[]): Pick<Advice, 'best' | 'reason' | 'decisive'> => {
  if (tranché(options, (o) => o.later)) {
    return { best: meilleur(options, (o) => o.later), reason: 'long terme', decisive: true };
  }
  if (tranché(options, (o) => o.now)) {
    return { best: meilleur(options, (o) => o.now), reason: 'court terme', decisive: true };
  }

  const clé = options.some((o) => o.later) ? (o: Option) => o.later : (o: Option) => o.now;
  return { best: meilleur(options, clé), reason: 'écart faible', decisive: false };
};

/**
 * Le conseil de montée de niveau : le jeu propose deux destins, on simule la brute
 * telle qu'elle serait avec l'un, puis avec l'autre.
 *
 * En deux temps. D'abord le combat de demain, contre les adversaires de référence :
 * c'est rapide, et ça suffit souvent. Ensuite la carrière : des centaines d'avenirs
 * entiers tirés avec les règles du jeu, pour voir ce que le destin vaut dans dix
 * niveaux. C'est ce second chiffre qui décide, parce que c'est lui qui correspond à ce
 * qu'on engage : un choix de destin ne se reprend jamais.
 */
export const createAdvisor = (deps: AdvisorDeps) => async (
  bruteName: string,
  choices: LevelUpChoice[],
) => {
  const brute = deps.getBrute(bruteName);
  if (!brute || choices.length < 2) return;

  deps.render('pending');

  const upgraded = choices.map((choice) => ({
    label: describeChoice(choice),
    brute: applyChoice(brute, choice),
  }));
  const niveau = upgraded[0]?.brute.level ?? brute.level;

  // Le vivier d'abord : les six du jour ne sont qu'un tirage, le vivier en est des
  // centaines. À défaut, les six du jour. À défaut, la brute elle-même.
  const duVivier = deps.sampleOpponents(niveau, REFERENCE_COUNT);
  const arena = deps.getOpponents(bruteName) ?? [];
  const references = duVivier.length >= 2 ? duVivier : (arena.length ? arena : [brute]);
  const basis = duVivier.length >= 2 ? 'pool' : (arena.length ? 'arena' : 'mirror');
  const modifiers = deps.getModifiers();

  let échec = false;

  const demande = async (request: WorkerRequest): Promise<Tally> => {
    const response = await deps.run(request);
    if ('error' in response) {
      échec = true;
      return VIDE;
    }
    return response.estimation;
  };

  /** Le combat de demain : chaque destin contre chaque référence. */
  const maintenant = async (): Promise<Estimation[]> => Promise.all(
    upgraded.map(async ({ brute: candidat }) => cumule(await Promise.all(
      references.map((opponent) => {
        counter += 1;
        return demande({
          id: `levelup:${bruteName}:${counter}`,
          input: { brute: candidat, opponent, modifiers },
          samples: ADVICE_PASS,
        });
      }),
    ))),
  );

  /** La carrière, découpée en lots pour occuper tous les workers à la fois. */
  const carrière = async (chunks: number, offset: number): Promise<Estimation[]> => Promise.all(
    upgraded.map(async ({ brute: candidat }) => cumule(await Promise.all(
      Array.from({ length: chunks }, (_, chunk) => {
        counter += 1;
        return demande({
          kind: 'career',
          id: `carrière:${bruteName}:${counter}`,
          input: {
            brute: candidat,
            references,
            modifiers,
            levels: CAREER_LEVELS,
            trajectories: Math.ceil(CAREER_TRAJECTORIES / chunks),
            fightsPerTrajectory: CAREER_FIGHTS,
            // Chaque lot doit tirer d'autres avenirs que ses voisins.
            round: offset + chunk,
          },
        });
      }),
    ))),
  );

  const conseil = (options: Option[]): Advice => ({
    brute: bruteName,
    basis,
    references: references.length,
    horizon: CAREER_LEVELS,
    options,
    ...decide(options),
  });

  const now = await maintenant();
  if (échec) {
    deps.render({ error: 'le calcul d\'un des destins a échoué' });
    return;
  }

  let options: Option[] = upgraded.map(({ label }, index) => ({ label, now: now[index]! }));
  deps.render(conseil(options));

  const later = await carrière(CAREER_CHUNKS, 0);
  if (échec) return;

  options = options.map((option, index) => ({ ...option, later: later[index]! }));
  deps.render(conseil(options));

  if (tranché(options, (o) => o.later)) return;

  // Les deux avenirs se valent encore : on insiste, avec trois fois plus d'avenirs
  // tirés. Un destin est définitif, il vaut bien deux secondes d'attente.
  const encore = await carrière(CAREER_SECOND_CHUNKS, CAREER_CHUNKS);
  if (échec) return;

  deps.render(conseil(options.map((option, index) => ({
    ...option,
    later: combine(option.later!, encore[index]!),
  }))));
};

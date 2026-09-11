import { fetchProfileBrutes, installInterceptor } from './intercept.js';
import { renderBest, renderOdds } from './inject.js';
import { store } from './store.js';
import { createPool, poolSize, type Pool, type WorkerLike } from './pool.js';
import type { WorkerRequest } from '../worker/protocol.js';
import { createArenaHandler } from './orchestrate.js';
import { createCalibrationLog } from './calibrationLog.js';
import { createOpponentPool } from './opponentPool.js';
import { createAdvisor } from './advise.js';
import { renderAdvice } from './panel.js';

// Remplacé au build par le code du worker, inséré comme chaîne (scripts/build.mjs) :
// un userscript est un fichier unique, il n'a pas de second fichier à charger.
declare const WORKER_SOURCE: string;

const OPPONENTS_PER_ARENA = 6;

const spawn = (): WorkerLike => new Worker(URL.createObjectURL(
  new Blob([WORKER_SOURCE], { type: 'application/javascript' }),
)) as unknown as WorkerLike;

// Le pool n'existe qu'à la première arène : le script tourne sur toutes les pages du
// site, et la plupart n'ont aucun combat à estimer.
let pool: Pool | undefined;
const run = (request: WorkerRequest) => {
  pool ??= createPool(
    poolSize(navigator.hardwareConcurrency, OPPONENTS_PER_ARENA),
    spawn,
  );
  return pool.run(request);
};

const calibration = createCalibrationLog(localStorage);
// Les six adversaires d'une visite sont un tirage au hasard de la population qu'on
// affronte (getOpponents.ts) : les accumuler, c'est l'échantillonner.
const opponents = createOpponentPool(localStorage);

const onArena = createArenaHandler({
  getBrute: (name) => store.getBrute(name),
  getOpponents: (name) => store.getOpponents(name),
  getModifiers: () => store.getModifiers(),
  getOwnBrutes: () => store.getOwnBrutes(),
  fetchProfileBrutes,
  run,
  render: renderOdds,
  renderBest,
  onPrediction: calibration.remember,
});

// Le conseil de montée de niveau : la seule décision du jeu qui ne se rattrape pas.
const onLevelUp = createAdvisor({
  getBrute: (name) => store.getBrute(name),
  getOpponents: (name) => store.getOpponents(name),
  getModifiers: () => store.getModifiers(),
  sampleOpponents: opponents.sample,
  run,
  render: renderAdvice,
});

installInterceptor({
  onArena: (bruteName) => {
    opponents.remember(store.getOpponents(bruteName) ?? []);
    void onArena(bruteName);
  },
  onLevelUpChoices: (bruteName, choices) => { void onLevelUp(bruteName, choices); },
  onFight: (fight) => {
    const recorded = calibration.record(fight);
    if (!recorded) return;
    // Une ligne par combat mesuré : la calibration se voit sans avoir à la demander.
    console.info(
      `brute-odds : annoncé ${Math.round(recorded.predicted * 100)} %, résultat `
      + `${recorded.won ? 'victoire' : 'défaite'}. bruteOdds.calibration() pour le bilan.`,
    );
  },
});

// Seule interface du script en dehors des badges : le bilan de calibration, à la console.
(window as unknown as { bruteOdds: unknown }).bruteOdds = {
  calibration: () => calibration.report(),
  records: () => calibration.records(),
  reset: () => calibration.reset(),
  // Le vivier : de combien d'adversaires réels le conseil dispose.
  pool: () => opponents.size(),
  forgetPool: () => opponents.reset(),
};

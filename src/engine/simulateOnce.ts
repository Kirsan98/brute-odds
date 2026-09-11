import {
  getCalculatedBrute, StepType, type CalculatedBrute, type Modifiers,
} from '@labrute/core';
import { getFighters } from '../../vendor/labrute/server/src/utils/fight/getFighters.js';
import {
  checkDeaths, fighterArrives, orderFighters, playFighterTurn, saboteur,
} from '../../vendor/labrute/server/src/utils/fight/fightMethods.js';
import { applySpy } from '../../vendor/labrute/server/src/utils/fight/applySpy.js';
import type { DetailedFight } from '../../vendor/labrute/server/src/utils/fight/generateFight.js';
import type { BackupPools, FightOutcome, RawBrute } from './types.js';

const MAX_RETRIES = 10;

/** `getCalculatedBrute` conserve la forme de son entrée : appliqué à notre `RawBrute`,
 *  qui n'a que les champs renvoyés par l'API, il rend une brute plus étroite que la
 *  `CalculatedBrute` du serveur — laquelle traîne tout le modèle Prisma. Le moteur de
 *  combat ne lit que les champs que nous avons ; on assume le contrat ici, une fois,
 *  plutôt que d'élargir `RawBrute` avec des champs qu'on n'a pas. */
const calculate = (brute: RawBrute, modifiers: Modifiers): CalculatedBrute =>
  getCalculatedBrute(brute, modifiers) as unknown as CalculatedBrute;

/** Appelle `fn` jusqu'à `times` fois ; renvoie le premier résultat obtenu sans exception,
 *  ou relève la dernière erreur si toutes les tentatives ont échoué. */
export const retry = <T>(fn: () => T, times: number): T => {
  let lastError: unknown;
  for (let attempt = 0; attempt < times; attempt += 1) {
    try {
      return fn();
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
};

/** Les deux camps tels que le moteur les voit avant le premier coup. Exporté pour le
 *  test en or : c'est ici que se joue la justesse du simulateur, tout le reste n'est
 *  que du hasard rejoué. */
export const buildFighters = (
  brute: RawBrute, opponent: RawBrute, modifiers: Modifiers,
  backups: { own?: RawBrute; opponent?: RawBrute } = {},
) => getFighters({
  team1: {
    brutes: [calculate(brute, modifiers)],
    backups: backups.own ? [calculate(backups.own, modifiers)] : [],
    bosses: [],
  },
  team2: {
    brutes: [calculate(opponent, modifiers)],
    backups: backups.opponent ? [calculate(backups.opponent, modifiers)] : [],
    bosses: [],
  },
  modifiers,
  clanFight: false,
});

/** Un renfort tiré au hasard dans le vivier, comme le serveur le fait à chaque combat
 *  (`generateFight.ts:224-231`). Tirer une seule fois pour toutes les simulations
 *  donnerait la probabilité de gagner *sachant ce renfort-là*, pas la probabilité de
 *  gagner — deux choses différentes dès que le vivier n'est pas homogène. */
export const drawBackup = (pool?: RawBrute[]): RawBrute | undefined => (
  pool?.length ? pool[Math.floor(Math.random() * pool.length)] : undefined
);

const runFight = (
  brute: RawBrute, opponent: RawBrute, modifiers: Modifiers,
  backups: BackupPools,
): FightOutcome => {
  const fighters = buildFighters(brute, opponent, modifiers, {
    own: drawBackup(backups.own),
    opponent: drawBackup(backups.opponent),
  });

  const fightData: DetailedFight = {
    modifiers,
    fighters,
    initialFighters: [],
    steps: [],
    initiative: 0,
    winner: null,
    loser: null,
    overtime: false,
  };

  const stats = {};
  const achievements = {};

  fightData.fighters.forEach((f) => {
    if (f.type === 'brute' && f.master) return;
    fighterArrives(fightData, f);
  });

  orderFighters(fightData);
  const mains = fightData.fighters.filter((f) => f.type === 'brute' && !f.master);
  mains.forEach((f) => {
    const foe = mains.find((o) => o.id !== f.id);
    if (foe) applySpy(fightData, f, foe);
  });

  saboteur(fightData, achievements);

  let turn = 0;
  while (!fightData.loser && turn < 2000) {
    orderFighters(fightData);
    if (!fightData.fighters[0]) break;
    fightData.initiative = fightData.fighters[0].initiative;
    if (turn > 1000) fightData.overtime = true;
    playFighterTurn(fightData, stats, achievements);
    checkDeaths(fightData, stats);
    // Le spec soupçonnait ces steps d'animation de dominer le temps de calcul. Mesure
    // faite (npm run bench) : filtrer en place plutôt que réallouer ne change rien de
    // mesurable (0,083 à 0,091 ms contre 0,087 à 0,089). La question est tranchée, la
    // version simple reste.
    // On ne consomme pas les animations, mais checkDeaths() se sert de fightData.steps
    // pour savoir si un combattant a déjà son step de mort (fightMethods.ts:2020-2021) :
    // il faut donc conserver les steps Death d'un tour sur l'autre, sous peine de les
    // dupliquer et de fausser les stats qui en dépendent.
    fightData.steps = fightData.steps.filter((s) => s.a === StepType.Death);
    turn += 1;
  }

  if (!fightData.loser) throw new Error('Fight not finished');

  const loser = fightData.fighters.find((f) => f.id === fightData.loser);
  if (!loser) throw new Error('No loser found');

  // `getFighters` range team1 du côté 'L' (getFighters.ts:161) : notre brute est donc
  // le combattant principal de gauche, et c'est le sien qu'on regarde saigner.
  const mine = fightData.fighters
    .find((f) => f.type === 'brute' && !f.master && f.team === 'L');

  return {
    result: loser.team === 'L' ? 'loss' : 'win',
    turns: turn,
    hpLeft: mine && mine.maxHp > 0 ? Math.max(0, mine.hp) / mine.maxHp : 0,
  };
};

export const simulateOnce = (
  brute: RawBrute, opponent: RawBrute, modifiers: Modifiers,
  backups: BackupPools = {},
): FightOutcome => retry(() => runFight(brute, opponent, modifiers, backups), MAX_RETRIES);

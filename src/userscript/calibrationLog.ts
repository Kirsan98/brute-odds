import { formatReport, type Prediction } from '../odds/calibration.js';
import type { FightResult } from './fightResult.js';

/** Le journal survit à la session : la calibration se juge sur des centaines de combats,
 *  pas sur une visite. Plafonné pour ne pas grossir sans fin dans le stockage local. */
const KEY = 'brute-odds:calibration';
const MAX_RECORDS = 500;

export type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

export type CalibrationLog = {
  /** Ce qu'on a annoncé pour un affrontement, en attendant de savoir ce qu'il a donné. */
  remember: (brute: string, opponent: string, predicted: number) => void;
  /** Confronte un combat réel à ce qui avait été annoncé. Rend l'écriture faite, ou rien. */
  record: (fight: FightResult) => Prediction | null;
  records: () => Prediction[];
  report: () => string;
  reset: () => void;
};

const key = (brute: string, opponent: string) => `${brute} vs ${opponent}`;

export const createCalibrationLog = (storage: StorageLike): CalibrationLog => {
  const announced = new Map<string, number>();

  const read = (): Prediction[] => {
    try {
      const raw = storage.getItem(KEY);
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed as Prediction[] : [];
    } catch {
      return [];
    }
  };

  const write = (records: Prediction[]) => {
    try {
      storage.setItem(KEY, JSON.stringify(records.slice(-MAX_RECORDS)));
    } catch {
      // Stockage plein ou refusé : la mesure est un bonus, elle ne casse rien.
    }
  };

  return {
    remember: (brute, opponent, predicted) => {
      announced.set(key(brute, opponent), predicted);
    },

    record: (fight) => {
      // Le combat ne dit que deux noms. Celui pour lequel on a annoncé quelque chose est
      // le nôtre : s'il figure en vainqueur, on avait raison de l'espérer.
      const asWinner = announced.get(key(fight.winner, fight.loser));
      const asLoser = announced.get(key(fight.loser, fight.winner));
      if (asWinner === undefined && asLoser === undefined) return null;

      const won = asWinner !== undefined;
      const entry: Prediction = {
        fightId: fight.id,
        brute: won ? fight.winner : fight.loser,
        opponent: won ? fight.loser : fight.winner,
        predicted: (won ? asWinner : asLoser)!,
        won,
      };

      const records = read();
      if (records.some((r) => r.fightId === entry.fightId)) return null;

      records.push(entry);
      write(records);
      return entry;
    },

    records: read,
    report: () => formatReport(read()),
    reset: () => {
      announced.clear();
      try {
        storage.removeItem(KEY);
      } catch {
        // idem
      }
    },
  };
};

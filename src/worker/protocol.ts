import { estimate, type Estimation, type FightInput, type Simulator } from '../odds/estimate.js';
import { FIRST_PASS } from '../odds/config.js';

export type WorkerRequest = {
  id: string;
  input: FightInput;
  /** Nombre de combats à tirer. L'appelant décide : il en donne davantage aux
   *  adversaires dont dépend la décision. */
  samples?: number;
};

export type WorkerResponse =
  | { id: string; estimation: Estimation }
  | { id: string; error: string };

/** Un combat qui échoue dix fois de suite fait lever `estimate`. Sans réponse, la carte
 *  resterait sur ses points de suspension pour toujours : on renvoie l'échec plutôt que
 *  de laisser l'appelant attendre. */
export const handleRequest = (req: WorkerRequest, sim?: Simulator): WorkerResponse => {
  try {
    return { id: req.id, estimation: estimate(req.input, req.samples ?? FIRST_PASS, sim) };
  } catch (error) {
    return { id: req.id, error: error instanceof Error ? error.message : String(error) };
  }
};

import { estimate, type Estimation, type FightInput, type Simulator } from '../odds/estimate.js';
import { SIMULATIONS } from '../odds/config.js';

export type WorkerRequest = { id: string; input: FightInput };
export type WorkerResponse = { id: string; estimation: Estimation };

export const handleRequest = (req: WorkerRequest, sim?: Simulator): WorkerResponse => ({
  id: req.id,
  estimation: estimate(req.input, SIMULATIONS, sim),
});

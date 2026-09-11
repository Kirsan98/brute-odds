import type { WorkerRequest, WorkerResponse } from '../worker/protocol.js';

/** Le minimum qu'on demande à un worker : de quoi être testé sans navigateur. */
export type WorkerLike = {
  postMessage: (message: WorkerRequest) => void;
  onmessage: ((event: { data: WorkerResponse }) => void) | null;
  onerror: ((event: unknown) => void) | null;
  terminate: () => void;
};

export type Pool = {
  run: (request: WorkerRequest) => Promise<WorkerResponse>;
  size: number;
};

/** Un worker par adversaire au plus, un cœur laissé à la page, jamais moins d'un.
 *  Six adversaires calculés en série tenaient la demi-seconde ; en parallèle ils
 *  tiennent le temps du plus lent. */
export const poolSize = (cores: number | undefined, jobs: number): number => Math.max(
  1,
  Math.min(jobs, (cores && cores > 1 ? cores - 1 : 1)),
);

type Slot = { worker: WorkerLike; busy: boolean };
type Job = { request: WorkerRequest; resolve: (response: WorkerResponse) => void };

/**
 * Une file de requêtes servie par plusieurs workers. `run` ne rejette jamais : un worker
 * qui meurt rend une réponse d'erreur, que l'appelant sait afficher. Sans cela, une carte
 * attendrait indéfiniment un message qui ne viendra pas.
 */
export const createPool = (size: number, spawn: () => WorkerLike): Pool => {
  const slots: Slot[] = [];
  const queue: Job[] = [];
  const running = new Map<WorkerLike, Job>();

  const settle = (slot: Slot, response: WorkerResponse) => {
    const job = running.get(slot.worker);
    running.delete(slot.worker);
    slot.busy = false;
    job?.resolve(response);
    pump();
  };

  const attach = (slot: Slot) => {
    slot.worker.onmessage = (event) => settle(slot, event.data);
    slot.worker.onerror = (event) => {
      const job = running.get(slot.worker);
      const message = (event as { message?: string } | undefined)?.message ?? 'worker en échec';
      // Un worker mort ne redeviendra pas vivant : on le remplace, sinon la file
      // perdrait un servant à chaque incident jusqu'à ne plus avancer du tout.
      slot.worker.terminate();
      running.delete(slot.worker);
      slot.worker = spawn();
      attach(slot);
      slot.busy = false;
      job?.resolve({ id: job.request.id, error: message });
      pump();
    };
  };

  function pump() {
    for (const slot of slots) {
      if (slot.busy) continue;
      const job = queue.shift();
      if (!job) return;
      slot.busy = true;
      running.set(slot.worker, job);
      slot.worker.postMessage(job.request);
    }
  }

  for (let i = 0; i < size; i += 1) {
    const slot: Slot = { worker: spawn(), busy: false };
    attach(slot);
    slots.push(slot);
  }

  return {
    size,
    run: (request) => new Promise<WorkerResponse>((resolve) => {
      queue.push({ request, resolve });
      pump();
    }),
  };
};

import { describe, expect, it, vi } from 'vitest';
import { createPool, poolSize, type WorkerLike } from '../../src/userscript/pool.js';
import type { WorkerRequest, WorkerResponse } from '../../src/worker/protocol.js';
import { makeBrute } from '../fixtures/makeBrute.js';

const request = (id: string): WorkerRequest => ({
  id,
  input: { brute: makeBrute(), opponent: makeBrute(), modifiers: {} },
});

/** Un worker qui ne répond que lorsqu'on le lui dit : c'est la seule façon d'observer
 *  qui travaille en même temps que qui. */
const makeWorker = () => {
  const received: WorkerRequest[] = [];
  const worker: WorkerLike = {
    postMessage: (message) => { received.push(message); },
    onmessage: null,
    onerror: null,
    terminate: vi.fn(),
  };
  return {
    worker,
    received,
    answer: (response: WorkerResponse) => worker.onmessage?.({ data: response }),
    crash: (message: string) => worker.onerror?.({ message }),
  };
};

describe('taille du pool', () => {
  it('laisse un cœur à la page et ne dépasse pas le nombre de travaux', () => {
    expect(poolSize(8, 6)).toBe(6);
    expect(poolSize(4, 6)).toBe(3);
    expect(poolSize(2, 6)).toBe(1);
  });

  it('tient debout quand le navigateur ne dit rien de ses cœurs', () => {
    expect(poolSize(undefined, 6)).toBe(1);
    expect(poolSize(1, 6)).toBe(1);
    expect(poolSize(8, 0)).toBe(1);
  });
});

describe('pool de workers', () => {
  it('occupe tous les workers avant d\'en faire attendre un', () => {
    const workers = [makeWorker(), makeWorker()];
    let spawned = 0;
    const pool = createPool(2, () => workers[spawned++]!.worker);

    void pool.run(request('a'));
    void pool.run(request('b'));
    void pool.run(request('c'));

    expect(workers[0]?.received.map((r) => r.id)).toEqual(['a']);
    expect(workers[1]?.received.map((r) => r.id)).toEqual(['b']);

    // 'c' attend en file, et part dès qu'un servant se libère.
    workers[0]?.answer({ id: 'a', error: 'peu importe' });
    expect(workers[0]?.received.map((r) => r.id)).toEqual(['a', 'c']);
  });

  it('rend à chaque appelant sa propre réponse', async () => {
    const worker = makeWorker();
    const pool = createPool(1, () => worker.worker);

    const first = pool.run(request('a'));
    const second = pool.run(request('b'));

    worker.answer({ id: 'a', error: 'première' });
    worker.answer({ id: 'b', error: 'seconde' });

    expect(await first).toEqual({ id: 'a', error: 'première' });
    expect(await second).toEqual({ id: 'b', error: 'seconde' });
  });

  // Sans cela, la carte de l'adversaire attendrait un message qui ne viendra jamais.
  it('rend une erreur quand le worker meurt, au lieu de laisser attendre', async () => {
    const workers = [makeWorker(), makeWorker()];
    let spawned = 0;
    const pool = createPool(1, () => workers[spawned++]!.worker);

    const promise = pool.run(request('a'));
    workers[0]?.crash('mémoire épuisée');

    expect(await promise).toEqual({ id: 'a', error: 'mémoire épuisée' });
  });

  it('remplace le worker mort et continue de servir la file', async () => {
    const workers = [makeWorker(), makeWorker()];
    let spawned = 0;
    const pool = createPool(1, () => workers[spawned++]!.worker);

    const premier = pool.run(request('a'));
    const suivant = pool.run(request('b'));
    workers[0]?.crash('boum');

    await premier;
    expect(workers[0]?.worker.terminate).toHaveBeenCalled();
    expect(workers[1]?.received.map((r) => r.id)).toEqual(['b']);

    workers[1]?.answer({ id: 'b', error: 'servie par le remplaçant' });
    expect(await suivant).toEqual({ id: 'b', error: 'servie par le remplaçant' });
  });
});

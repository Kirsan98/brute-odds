import { fetchProfileBrutes, installInterceptor } from './intercept.js';
import { resolveBackups } from './resolveBackups.js';
import { renderOdds } from './inject.js';
import { store } from './store.js';
import type { WorkerResponse } from '../worker/protocol.js';

// Remplacé au build par le code du worker, inséré comme chaîne (scripts/build.mjs) :
// un userscript est un fichier unique, il n'a pas de second fichier à charger.
declare const WORKER_SOURCE: string;

const worker = new Worker(URL.createObjectURL(
  new Blob([WORKER_SOURCE], { type: 'application/javascript' }),
));

const pending = new Map<string, string>();

worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
  const name = pending.get(event.data.id);
  if (!name) return;
  renderOdds(name, event.data.estimation);
  pending.delete(event.data.id);
};

const onArena = async (bruteName: string) => {
  const brute = store.getBrute(bruteName);
  const opponents = store.getOpponents(bruteName);
  if (!brute || !opponents) return;

  for (const opponent of opponents) {
    renderOdds(opponent.name, 'pending');

    const backups = await resolveBackups(brute, opponent, {
      ownBrutes: () => store.getOwnBrutes(),
      fetchProfileBrutes,
    });

    const id = `${bruteName}:${opponent.name}`;
    pending.set(id, opponent.name);
    worker.postMessage({
      id,
      input: {
        brute,
        opponent,
        modifiers: store.getModifiers(),
        backups: { own: backups.own, opponent: backups.opponent },
        approximate: backups.approximate,
      },
    });
  }
};

installInterceptor((bruteName) => { void onArena(bruteName); });

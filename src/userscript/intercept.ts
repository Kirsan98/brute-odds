import type { RawBrute } from '../engine/types.js';
import { store } from './store.js';

const OPPONENTS = /\/api\/brute\/([^/]+)\/get-opponents\//;
const HOOK = /\/api\/brute\/([^/]+)\/for-hook/;

export const installInterceptor = (onArena: (bruteName: string) => void) => {
  const original = window.fetch;

  window.fetch = async (...args: Parameters<typeof fetch>) => {
    const response = await original(...args);
    const url = typeof args[0] === 'string' ? args[0] : (args[0] as Request).url;

    // On mémorise des en-têtes valides pour nos propres requêtes (cf. tâche 8),
    // uniquement pour les requêtes de l'API du jeu : une requête hors-jeu
    // (asset, beacon analytics) ne doit jamais écraser les bons en-têtes.
    const init = args[1];
    if (url.includes('/api/') && init?.headers) {
      store.putHeaders(Object.fromEntries(new Headers(init.headers).entries()));
    }

    try {
      if (url.includes('/api/user/authenticate')) {
        const data = await response.clone().json();
        store.putOwnBrutes(data.user.brutes);
        store.putModifiers(data.modifiers);
      } else if (HOOK.test(url)) {
        store.putBrutes([await response.clone().json()]);
      } else if (url.includes('/level-up')) {
        store.putBrutes([await response.clone().json()]);
      } else {
        const match = OPPONENTS.exec(url);
        if (match?.[1]) {
          const bruteName = decodeURIComponent(match[1]);
          store.putOpponents(bruteName, await response.clone().json());
          onArena(bruteName);
        }
      }
    } catch {
      // Une réponse illisible ne doit jamais casser la page du jeu.
    }

    return response;
  };
};

// Rejoue les en-têtes capturés — seule façon de passer `securityCheck` — pour
// résoudre le pool de renfort d'un adversaire (cf. tâche 8, resolveBackups.ts).
export const fetchProfileBrutes = async (bruteName: string): Promise<RawBrute[]> => {
  const headers = store.getHeaders();
  const hook = await fetch(`/api/brute/${encodeURIComponent(bruteName)}/for-hook`, { headers });
  if (!hook.ok) throw new Error(`for-hook ${hook.status}`);
  const { userId } = await hook.json();
  if (!userId) throw new Error('userId absent');

  const profile = await fetch(`/api/user/${userId}/profile`, { headers });
  if (!profile.ok) throw new Error(`profile ${profile.status}`);
  return (await profile.json()).brutes;
};

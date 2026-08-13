import { store } from './store.js';

const OPPONENTS = /\/api\/brute\/([^/]+)\/get-opponents\//;
const HOOK = /\/api\/brute\/([^/]+)\/for-hook/;

export const installInterceptor = (onArena: (bruteName: string) => void) => {
  const original = window.fetch;

  window.fetch = async (...args: Parameters<typeof fetch>) => {
    const response = await original(...args);
    const url = typeof args[0] === 'string' ? args[0] : (args[0] as Request).url;

    // On mémorise des en-têtes valides pour nos propres requêtes (cf. tâche 8).
    const init = args[1];
    if (init?.headers) {
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

import type { RawBrute } from '../engine/types.js';
import { asFightResult, type FightResult } from './fightResult.js';
import { store } from './store.js';

const OPPONENTS = /\/api\/brute\/([^/]+)\/get-opponents\//;
const HOOK = /\/api\/brute\/([^/]+)\/for-hook/;

export type Hooks = {
  onArena: (bruteName: string) => void;
  /** Le résultat d'un vrai combat, reconnu à sa forme et non à son URL : c'est ce qui
   *  permet de confronter nos annonces à ce que le jeu a réellement produit. */
  onFight?: (fight: FightResult) => void;
};

export const installInterceptor = (hooks: Hooks) => {
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
          hooks.onArena(bruteName);
        } else if (hooks.onFight && url.includes('/api/')
          && response.headers.get('content-type')?.includes('json')) {
          // On ne connaît pas l'URL du combat, et elle peut changer : on regarde la
          // forme de la réponse. Un objet qui n'est pas un combat est simplement ignoré.
          const fight = asFightResult(await response.clone().json());
          if (fight) hooks.onFight(fight);
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

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { installInterceptor } from '../../src/userscript/intercept.js';
import { store } from '../../src/userscript/store.js';
import { makeBrute } from '../fixtures/makeBrute.js';

// `installInterceptor` patche `window.fetch`. L'environnement Node de vitest
// ne fournit pas ce global navigateur : on le simule ici, uniquement côté
// test, sans toucher à la source qui vise le vrai navigateur du jeu.
const stubGameFetch = (fetchMock: ReturnType<typeof vi.fn>) => {
  vi.stubGlobal('window', globalThis);
  vi.stubGlobal('fetch', fetchMock);
};

describe('installInterceptor', () => {
  beforeEach(() => {
    store.reset();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('route les adversaires vers la brute nommée dans l\'URL, sans mélange multi-brutes', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(new Response(JSON.stringify([makeBrute({ name: 'AdvA' })])))
      .mockResolvedValueOnce(new Response(JSON.stringify([makeBrute({ name: 'AdvB' })])));
    stubGameFetch(fetchMock);
    const onArena = vi.fn();
    installInterceptor(onArena);

    await fetch('https://labrute.example/api/brute/SamIsGuey/get-opponents/12');
    await fetch('https://labrute.example/api/brute/AutreBrute/get-opponents/5');

    expect(store.getOpponents('SamIsGuey')?.[0]?.name).toBe('AdvA');
    expect(store.getOpponents('AutreBrute')?.[0]?.name).toBe('AdvB');
    expect(onArena).toHaveBeenNthCalledWith(1, 'SamIsGuey');
    expect(onArena).toHaveBeenNthCalledWith(2, 'AutreBrute');
  });

  it('décode le nom de brute encodé dans l\'URL des adversaires', async () => {
    const name = 'Sam Brute'; // l'espace est encodé en %20 dans l'URL réelle
    stubGameFetch(vi.fn().mockResolvedValue(new Response(JSON.stringify([makeBrute({ name: 'Adv' })]))));
    const onArena = vi.fn();
    installInterceptor(onArena);

    await fetch(`https://labrute.example/api/brute/${encodeURIComponent(name)}/get-opponents/1`);

    expect(store.getOpponents(name)?.[0]?.name).toBe('Adv');
    expect(onArena).toHaveBeenCalledWith(name);
  });

  it('authenticate alimente les brutes propres et les modifiers, consultables aussi via getBrute', async () => {
    const own = [makeBrute({ name: 'Sam' }), makeBrute({ name: 'Autre' })];
    const modifiers = { noThrows: true };
    stubGameFetch(vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ user: { brutes: own }, modifiers })),
    ));
    installInterceptor(vi.fn());

    await fetch('https://labrute.example/api/user/authenticate');

    expect(store.getOwnBrutes().map((b) => b.name).sort()).toEqual(['Autre', 'Sam']);
    expect(store.getModifiers()).toEqual(modifiers);
    expect(store.getBrute('Sam')?.name).toBe('Sam');
  });

  it('for-hook et level-up alimentent le cache général, la plus récente écrase la précédente', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(new Response(JSON.stringify(makeBrute({ name: 'Sam', level: 10 }))))
      .mockResolvedValueOnce(new Response(JSON.stringify(makeBrute({ name: 'Sam', level: 11 }))));
    stubGameFetch(fetchMock);
    installInterceptor(vi.fn());

    await fetch('https://labrute.example/api/brute/Sam/for-hook');
    expect(store.getBrute('Sam')?.level).toBe(10);

    await fetch('https://labrute.example/api/brute/Sam/level-up');
    expect(store.getBrute('Sam')?.level).toBe(11);
  });

  it('renvoie la réponse originale, toujours lisible par l\'appelant (preuve du clone)', async () => {
    const originalResponse = new Response(JSON.stringify([makeBrute({ name: 'Adv' })]));
    stubGameFetch(vi.fn().mockResolvedValue(originalResponse));
    installInterceptor(vi.fn());

    const result = await fetch('https://labrute.example/api/brute/Sam/get-opponents/1');

    expect(result).toBe(originalResponse);
    const body = await result.json();
    expect(body[0].name).toBe('Adv');
  });

  it('ne rejette jamais quand la réponse est illisible', async () => {
    stubGameFetch(vi.fn().mockResolvedValue(new Response('pas du json', { status: 200 })));
    installInterceptor(vi.fn());

    await expect(fetch('https://labrute.example/api/brute/Sam/get-opponents/1')).resolves.toBeInstanceOf(Response);
  });

  it('ne capture les en-têtes que sur les requêtes de l\'API du jeu, pour ne pas les écraser avec une requête hors-jeu', async () => {
    stubGameFetch(vi.fn().mockResolvedValue(new Response('ok')));
    installInterceptor(vi.fn());

    await fetch('https://labrute.example/api/brute/Sam/for-hook', { headers: { 'x-security-check': 'bon' } });
    expect(store.getHeaders()).toEqual({ 'x-security-check': 'bon' });

    await fetch('https://labrute.example/analytics/beacon', { headers: { 'x-security-check': 'mauvais' } });

    expect(store.getHeaders()).toEqual({ 'x-security-check': 'bon' });
  });
});

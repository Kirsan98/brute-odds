import { build } from 'esbuild';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

// Mêmes cibles que `vitest.config.ts` et `tsconfig.json` : trois outils, une seule vérité.
const alias = {
  '@labrute/core': './vendor/labrute/core/src/index.ts',
  '@labrute/prisma': './vendor/labrute/prisma/index-browser.js',
};

const common = {
  bundle: true, format: 'iife', platform: 'browser', alias, write: false,
};

// Le worker est embarqué comme chaîne : un userscript est un fichier unique.
const worker = await build({ ...common, entryPoints: ['src/worker/worker.ts'] });
const workerSource = worker.outputFiles[0].text;

const main = await build({
  ...common,
  entryPoints: ['src/userscript/main.ts'],
  define: { WORKER_SOURCE: JSON.stringify(workerSource) },
});

const { version } = JSON.parse(await readFile('package.json', 'utf8'));

const header = `// ==UserScript==
// @name         brute-odds
// @namespace    https://github.com/Kirsan98/brute-odds
// @version      ${version}
// @description  Probabilite de victoire en arene sur LaBrute
// @match        https://brute.eternaltwin.org/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

`;

await mkdir('dist', { recursive: true });
await writeFile('dist/brute-odds.user.js', header + main.outputFiles[0].text);
console.log('dist/brute-odds.user.js écrit');

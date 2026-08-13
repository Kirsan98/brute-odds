import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

const r = (p: string) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig({
  resolve: {
    alias: [
      { find: '@labrute/core', replacement: r('./vendor/labrute/core/src/index.ts') },
      { find: '@labrute/prisma', replacement: r('./vendor/labrute/prisma/index-browser.js') },
    ],
  },
  test: { environment: 'node' },
});

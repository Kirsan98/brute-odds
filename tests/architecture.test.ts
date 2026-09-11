import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * Les frontières entre modules étaient jusqu'ici une règle de revue : « `engine/` ne
 * connaît ni le DOM ni le réseau, `odds/` ne connaît que `engine`, `userscript/` ne
 * contient aucune règle de jeu ». Une règle que personne ne vérifie finit par céder,
 * un import à la fois. Elle est ici vérifiée.
 */
const sourcesOf = (directory: string): [string, string][] => readdirSync(directory, { withFileTypes: true })
  .flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return sourcesOf(path);
    return entry.name.endsWith('.ts') ? [[path, readFileSync(path, 'utf8')] as [string, string]] : [];
  });

/** Les commentaires parlent du DOM et du réseau sans y toucher : on ne juge que le code. */
const stripComments = (source: string) => source
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/^\s*\/\/.*$/gm, '');

const forbid = (directory: string, patterns: RegExp[], why: string) => {
  sourcesOf(directory).forEach(([path, source]) => {
    const code = stripComments(source);
    patterns.forEach((pattern) => {
      expect(pattern.test(code), `${path} : ${why} (${pattern})`).toBe(false);
    });
  });
};

describe('frontières entre modules', () => {
  it('engine/ ignore le navigateur', () => {
    forbid('src/engine', [/\bdocument\b/, /\bwindow\b/, /\blocalStorage\b/, /\bnavigator\b/, /\bfetch\s*\(/],
      'le moteur ne doit rien savoir du navigateur');
  });

  it('odds/ ignore le navigateur', () => {
    forbid('src/odds', [/\bdocument\b/, /\bwindow\b/, /\blocalStorage\b/, /\bnavigator\b/, /\bfetch\s*\(/],
      'le Monte-Carlo ne doit rien savoir du navigateur');
  });

  it('les dépendances descendent : engine ne connaît ni odds ni userscript', () => {
    forbid('src/engine', [/from '\.\.\/odds\//, /from '\.\.\/userscript\//],
      'engine est en bas de la pile');
  });

  it('odds ne connaît pas userscript', () => {
    forbid('src/odds', [/from '\.\.\/userscript\//], 'odds ne dépend que de engine');
  });

  it('userscript ne rejoue pas les règles du jeu lui-même', () => {
    forbid('src/userscript', [/from '.*\/vendor\//, /simulateOnce/],
      'le moteur ne se pilote que par le worker');
  });

  // Un module de moins d'un test est un module qu'on croit couvert. Les modules qui
  // ne déclarent que des types ou des constantes n'ont rien à prouver.
  it('chaque module de src qui fait quelque chose a son fichier de test', () => {
    const sansTest = sourcesOf('src')
      .filter(([, source]) => /export (const \w+ = [^;]*=>|function )/.test(source))
      .map(([path]) => path)
      // `main.ts` est le câblage : il ne fait qu'assembler des pièces testées, et son
      // exécution demanderait un vrai navigateur. `worker.ts` est son équivalent côté
      // worker : trois lignes qui branchent `handleRequest` sur `onmessage`.
      .filter((path) => !path.endsWith('main.ts') && !path.endsWith('worker/worker.ts'))
      .filter((path) => {
        const name = path.split('/').pop()!.replace('.ts', '');
        return !sourcesOf('tests').some(([test]) => test.endsWith(`${name}.test.ts`));
      });

    expect(sansTest).toEqual([]);
  });
});

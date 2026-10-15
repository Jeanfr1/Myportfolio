// Writes every page of the site, in every language, from one template each:
//   scripts/pages/home.mjs -> index.html, en/index.html, fr/index.html
//   scripts/pages/case.mjs -> projetos/<slug>/, en/work/<slug>/, fr/projets/<slug>/
// Texts come from src/i18n/<lang>.js, shared data from src/data/projects.js.
// Runs before `dev` and `build`; the output is committed so the diff shows what visitors get.
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { LOCALES } from '../src/i18n/locales.js';
import { projects } from '../src/data/projects.js';
import { home } from './pages/home.mjs';
import { casePage } from './pages/case.mjs';
import pt from '../src/i18n/pt.js';
import en from '../src/i18n/en.js';
import fr from '../src/i18n/fr.js';

const dicts = { pt, en, fr };
const file = (url) => `${url.replace(/^\//, '')}index.html`; // '/en/work/sta/' -> 'en/work/sta/index.html'

// generated folders are rebuilt from scratch, so a renamed case leaves nothing behind
// (estudos/, en/studies/ and fr/etudes/ held the earlier concept studies: vercel.json redirects them)
for (const dir of new Set(['estudos/', ...LOCALES.flatMap((l) => [l.cases, l.home])].filter((u) => u !== '/'))) {
  await rm(dir.replace(/^\//, ''), { recursive: true, force: true });
}

const written = [];
for (const loc of LOCALES) {
  const t = dicts[loc.code];
  const pages = [[loc.home, home(loc, t)], ...projects.map((p, i) => [`${loc.cases}${p.slug}/`, casePage(loc, t, i)])];
  for (const [url, html] of pages) {
    const out = file(url);
    if (out.includes('/')) await mkdir(dirname(out), { recursive: true });
    await writeFile(out, html);
    written.push(out);
  }
}
console.log(`pages: ${written.length} written (${LOCALES.map((l) => l.code).join(', ')} × home + ${projects.length} cases)`);

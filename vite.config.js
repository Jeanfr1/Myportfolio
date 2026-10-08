import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { LOCALES } from './src/i18n/locales.js';
import { projects } from './src/data/projects.js';

// every page in every language (written by `npm run pages`): / , /en/ , /fr/ and the six studies
// under each language's studies folder (/estudos/, /en/studies/, /fr/etudes/)
const page = (url) => resolve(__dirname, `${url.replace(/^\//, '')}index.html`);
const input = Object.fromEntries(
  LOCALES.flatMap((l) => [
    [l.code === 'pt' ? 'main' : l.code, page(l.home)],
    ...projects.map((p) => [`${l.code}-${p.slug}`, page(`${l.studies}${p.slug}/`)]),
  ]),
);

export default defineConfig({
  build: {
    target: 'es2020',
    assetsInlineLimit: 0, // keep every image as its own cacheable file
    rollupOptions: { input },
  },
});

import { defineConfig } from 'vite';
import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';

// one page + the six study pages (estudos/<slug>/index.html, written by `npm run studies`)
const studies = readdirSync(resolve(__dirname, 'estudos'), { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => [`estudo-${d.name}`, resolve(__dirname, 'estudos', d.name, 'index.html')]);

export default defineConfig({
  build: {
    target: 'es2020',
    assetsInlineLimit: 0, // keep every image as its own cacheable file
    rollupOptions: {
      input: { main: resolve(__dirname, 'index.html'), ...Object.fromEntries(studies) },
    },
  },
});

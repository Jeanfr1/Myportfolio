// Web assets for the eight client sites and the social wall, from the capture masters:
//   node scripts/capture/stills.mjs <caps>          desktop + phone stills of the live sites (2x PNG)
//   node scripts/capture/loops.mjs <frames> scrub   then  … live      motion frames of each hero
//   python3 scripts/capture/build-loops.py <frames> <loops>          seamless loops (mp4 + poster)
//   bash scripts/capture/social.sh <exports> <social>                 the reels and motion graphics
//   node scripts/site-assets.mjs <caps> <loops> <social>             this script
// The masters stay outside the repo (the live sites are the source); the outputs are committed.
import sharp from 'sharp';
import { copyFile, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { projects, social } from '../src/data/projects.js';

const [CAPS, LOOPS, SOCIAL] = process.argv.slice(2);
if (!CAPS || !LOOPS || !SOCIAL) throw new Error('usage: node scripts/site-assets.mjs <caps> <loops> <social>');
const IMG = 'src/assets/img';
const VID = 'src/assets/video';
await mkdir(IMG, { recursive: true });
await mkdir(VID, { recursive: true });

const photo = { quality: 78, effort: 6, smartSubsample: true };
const report = [];
async function webp(input, name, width) {
  const info = await sharp(input).resize({ width, withoutEnlargement: true }).webp(photo).toFile(path.join(IMG, name));
  report.push(`${name.padEnd(36)} ${String(info.width).padStart(4)}x${String(info.height).padEnd(5)} ${(info.size / 1024).toFixed(0).padStart(4)} KB`);
}
async function copy(from, name) {
  await copyFile(from, path.join(VID, name));
  report.push(`${name.padEnd(36)} ${'video'.padStart(10)} ${((await stat(from)).size / 1024).toFixed(0).padStart(4)} KB`);
}

for (const { slug } of projects) {
  const cap = (n) => path.join(CAPS, `${slug}-${n}.png`);
  // the hero window (16:10, the same frame the live site opens on)
  for (const w of [640, 1024, 1600]) await webp(cap('d0'), `window-${slug}-${w}.webp`, w);
  // three scenes from further down the page, and two phone screens
  for (const i of [1, 2, 3]) for (const w of [720, 1280]) await webp(cap(`d${i}`), `site-${slug}-s${i}-${w}.webp`, w);
  for (const i of [0, 1]) for (const w of [390, 780]) await webp(cap(`m${i}`), `site-${slug}-m${i}-${w}.webp`, w);
  // the motion loop and its first frame
  for (const w of [960, 1280]) await webp(path.join(LOOPS, `${slug}-poster.jpg`), `poster-${slug}-${w}.webp`, w);
  await copy(path.join(LOOPS, `${slug}-loop.mp4`), `${slug}-loop.mp4`);
}

for (const { id } of social) {
  for (const w of [360, 540]) await webp(path.join(SOCIAL, `${id}-poster.jpg`), `social-${id}-${w}.webp`, w);
  await copy(path.join(SOCIAL, `${id}-preview.mp4`), `social-${id}-preview.mp4`);
  await copy(path.join(SOCIAL, `${id}-full.mp4`), `social-${id}-full.mp4`);
}

console.log(report.join('\n'));

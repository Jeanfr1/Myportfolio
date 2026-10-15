// Generates the web images (WebP) from the kit in josean-portfolio-ultrapremium/. The kit's PNGs
// stay the source of truth; run `npm run images` after changing any of them (and
// `python3 scripts/register-hero.py` first if a hero layer changed).
//
// - Photos and art get a few widths for srcset.
// - Transparent layers are cut to their visible box; src/data/hero.json keeps the box, so the
//   page can still place them on the hero art.
// - Favicon, touch icon and the social image are drawn from the traced JA monogram.
import sharp from 'sharp';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const KIT = 'josean-portfolio-ultrapremium';
const OUT = 'src/assets/img';
const PUBLIC = 'public';
const GRAPHITE = '#080A0D';

const photo = { quality: 80, effort: 6, smartSubsample: true };
const cutout = { quality: 84, alphaQuality: 90, effort: 6, smartSubsample: true };

await mkdir(OUT, { recursive: true });
const report = [];
const src = (p) => path.join(KIT, p);
const boxOf = ([x0, y0, x1, y1]) => ({ left: x0, top: y0, width: x1 - x0, height: y1 - y0 });

async function write(input, name, width, options = photo, extract, dir = OUT) {
  let img = sharp(input);
  if (extract) img = img.extract(extract);
  const info = await img.resize({ width, withoutEnlargement: true }).webp(options).toFile(path.join(dir, name));
  report.push(`${name.padEnd(34)} ${String(info.width).padStart(4)}x${String(info.height).padEnd(5)} ${(info.size / 1024).toFixed(0).padStart(4)} KB`);
}

// ---------- hero ----------
for (const w of [1672, 1200, 800]) await write(src('02-hero/hero-desktop.png'), `hero-desktop-${w}.webp`, w);
for (const w of [941, 640]) await write(src('02-hero/hero-mobile.png'), `hero-mobile-${w}.webp`, w);
for (const w of [1672, 960]) await write(src('02-hero/fundo-grafite.png'), `graphite-${w}.webp`, w);
const hero = JSON.parse(await readFile('src/data/hero.json', 'utf8'));
for (const [name, file] of [['josean', '03-camadas/josean-corpo-transparente.png'], ['portrait', '03-camadas/retrato-monumental-transparente.png']]) {
  const box = boxOf(hero.layers[name].box);
  for (const w of [box.width, Math.round(box.width * 0.6)]) await write(src(file), `${name}-${w}.webp`, w, cutout, box);
}
for (const w of [1448, 900]) await write(src('03-camadas/portal-vidro-transparente.png'), `portal-${w}.webp`, w, cutout);

// The eight sites (windows, screens, phone screens, loops, posters) come from captures of the
// live sites: scripts/site-assets.mjs. The kit only feeds the hero, the STA chapter and the closing.

// ---------- chapter art ----------
for (const w of [1672, 1000]) await write(src('04-projetos/sta-carro-scan.png'), `sta-scan-${w}.webp`, w);
for (const [name, file, box] of [
  ['sta-engine', '04-projetos/sta-motor-transparente.png', [235, 44, 1337, 1017]],
]) {
  const b = boxOf(box);
  for (const w of [b.width, Math.round(b.width * 0.6)]) await write(src(file), `${name}-${w}.webp`, w, cutout, b);
}

// ---------- about + contact ----------
for (const w of [1672, 1000]) await write(src('03-camadas/retrato-encerramento.png'), `about-${w}.webp`, w);
for (const w of [1672, 1000]) await write(src('03-camadas/portal-encerramento.png'), `closing-${w}.webp`, w);

// ---------- favicon + touch icon: the JA mark on graphite ----------
const ja = await readFile('src/assets/brand/ja.svg', 'utf8');
const [, jw, jh] = ja.match(/viewBox="0 0 (\d+) (\d+)"/).map(Number);
const jaPath = ja.match(/<path[^>]*\/>/)[0];
function icon(size, pad, radius) {
  const k = (size * (1 - 2 * pad)) / Math.max(jw, jh);
  const x = (size - jw * k) / 2;
  const y = (size - jh * k) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="${GRAPHITE}"/><g fill="#F7F9FB" transform="translate(${x.toFixed(2)} ${y.toFixed(2)}) scale(${k.toFixed(4)})">${jaPath}</g></svg>\n`;
}
await writeFile(path.join(PUBLIC, 'favicon.svg'), icon(64, 0.1, 12));
await sharp(Buffer.from(icon(64, 0.1, 12))).png().toFile(path.join(PUBLIC, 'favicon.png'));
await sharp(Buffer.from(icon(180, 0.14, 0))).png().toFile(path.join(PUBLIC, 'apple-touch-icon.png'));

// ---------- social preview: the hero art, its empty left side carrying the mark ----------
{
  const W = 1200;
  const H = 630;
  const art = await sharp(src('02-hero/hero-desktop.png')).resize({ width: W, height: H, fit: 'cover', position: 'right' }).toBuffer();
  const mark = await sharp(Buffer.from(ja), { density: 144 }).resize({ width: 300 }).png().toBuffer();
  const mm = await sharp(mark).metadata();
  await sharp(art)
    .composite([{ input: mark, left: 90, top: Math.round((H - mm.height) / 2) }])
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(path.join(PUBLIC, 'og-image.jpg'));
  report.push('public/og-image.jpg               1200x630');
}

console.log(report.join('\n'));

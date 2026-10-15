// Motion loops of the eight live sites, as numbered frames.
// scrub: deterministic scroll positions through the hero (frames/<slug>/f_0001.jpg …)
// live:  real-time CDP screencast of the opening (frames/<slug>/s_<ms>.jpg), optional scrub tail
import { createRequire } from 'node:module';
import { mkdirSync, writeFileSync } from 'node:fs';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.HOME + '/.npm/_npx/9833c18b2d85bc59/node_modules/playwright');
const OUT = process.argv[2];
const mode = process.argv[3]; // scrub | live
const only = process.argv[4] ? process.argv[4].split(',') : null;
const SCRUB = {
  sta: { url: 'https://automotives-sta-st-albans.vercel.app/?nosmooth', from: 0, to: 4860, n: 150, wait: 70 },
  tonton: { url: 'https://chez-tonton-pontchateau5.vercel.app/?nosmooth', from: 0, to: 1125, n: 110, wait: 70 },
  bayro: { url: 'https://bayro-cut.vercel.app/?nosmooth', from: 0, to: 1800, n: 140, wait: 70 },
  isola: { url: 'https://isola-mosede.vercel.app', from: 0, to: 1800, n: 150, wait: 450 },
  getmoto: { url: 'https://getmoto-uk.vercel.app', from: 0, to: 2880, n: 130, wait: 900 },
};
const LIVE = {
  cabane: { url: 'https://cabane-a-mousse-herbignac.vercel.app', ms: 4200 },
  rumi: { url: 'https://rumi-cafe-francis-street.vercel.app', ms: 4200 },
  lovinspoon: { url: 'https://lovinspoon-dublin.vercel.app', ms: 3200, tail: { from: 1450, to: 2160, n: 70, wait: 90 } },
};
const browser = await chromium.launch({ channel: 'chrome' });
const raf2 = (p) => p.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
const pad = (i) => String(i).padStart(4, '0');

async function scrub(p, dir, { from, to, n, wait }, prefix = 'f', start = 1) {
  for (let i = 0; i < n; i++) {
    const y = Math.round(from + ((to - from) * i) / (n - 1));
    await p.evaluate((v) => window.scrollTo({ top: v, behavior: 'instant' }), y);
    await p.waitForTimeout(wait);
    await raf2(p);
    await p.screenshot({ path: `${dir}/${prefix}_${pad(start + i)}.jpg`, type: 'jpeg', quality: 92 });
  }
}

if (mode === 'scrub') {
  await Promise.all(Object.entries(SCRUB).filter(([s]) => !only || only.includes(s)).map(async ([slug, s]) => {
    const dir = `${OUT}/${slug}`;
    mkdirSync(dir, { recursive: true });
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    const p = await ctx.newPage();
    await p.goto(s.url, { waitUntil: 'load', timeout: 60000 });
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(4000);
    await scrub(p, dir, s);
    await ctx.close();
  }));
} else {
  for (const [slug, s] of Object.entries(LIVE).filter(([k]) => !only || only.includes(k))) {
    const dir = `${OUT}/${slug}`;
    mkdirSync(dir, { recursive: true });
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    const p = await ctx.newPage();
    // warm the cache so the opening isn't waiting on the network, then record a fresh load
    await p.goto(s.url, { waitUntil: 'load', timeout: 60000 });
    await p.waitForTimeout(1500);
    await p.goto('about:blank');
    const cdp = await ctx.newCDPSession(p);
    const frames = [];
    cdp.on('Page.screencastFrame', async ({ data, metadata, sessionId }) => {
      frames.push({ t: metadata.timestamp, data });
      try { await cdp.send('Page.screencastFrameAck', { sessionId }); } catch {}
    });
    await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 92, maxWidth: 1440, maxHeight: 900, everyNthFrame: 1 });
    const t0 = Date.now() / 1000;
    await p.goto(s.url, { waitUntil: 'commit' });
    await p.waitForTimeout(s.ms);
    await cdp.send('Page.stopScreencast');
    const list = [];
    for (const f of frames) {
      const name = `s_${String(Math.round((f.t - t0) * 1000)).padStart(6, '0')}.jpg`;
      writeFileSync(`${dir}/${name}`, Buffer.from(f.data, 'base64'));
      list.push(name);
    }
    writeFileSync(`${dir}/live.json`, JSON.stringify(frames.map((f, i) => ({ file: list[i], t: f.t - t0 }))));
    if (s.tail) await scrub(p, dir, s.tail, 'f');
    await ctx.close();
    console.log(slug, frames.length, 'live frames');
  }
}
await browser.close();
console.log('loops', mode, 'done');

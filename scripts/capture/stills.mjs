// Stills of the eight live sites: desktop hero + three scenes (2x), phone hero + one scene (2x).
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.HOME + '/.npm/_npx/9833c18b2d85bc59/node_modules/playwright');
const OUT = process.argv[2];
const SITES = {
  sta: { url: 'https://automotives-sta-st-albans.vercel.app/?nosmooth', shots: [900, 3600, 5900], phone: [0, 2400] },
  getmoto: { url: 'https://getmoto-uk.vercel.app', shots: [2700, 4500, 5400], phone: [0, 3200], wait: 1400 },
  tonton: { url: 'https://chez-tonton-pontchateau5.vercel.app/?nosmooth', shots: [2100, 2988, 4803], phone: [0, 1500] },
  cabane: { url: 'https://cabane-a-mousse-herbignac.vercel.app', shots: [650, 1300, 2077], phone: [0, 1100] },
  rumi: { url: 'https://rumi-cafe-francis-street.vercel.app', shots: [899, 1659, 5415], phone: [0, 1300] },
  lovinspoon: { url: 'https://lovinspoon-dublin.vercel.app', shots: [900, 1800, 2160], phone: [0, 1500] },
  isola: { url: 'https://isola-mosede.vercel.app', shots: [1000, 2700, 3372], phone: [0, 2000] },
  bayro: { url: 'https://bayro-cut.vercel.app/?nosmooth', shots: [1350, 2700, 4753], phone: [0, 2200] },
};
const only = process.argv[3] ? process.argv[3].split(',') : Object.keys(SITES);
const browser = await chromium.launch({ channel: 'chrome' });
const settle = (p, ms) => p.waitForTimeout(ms).then(() => p.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))));
async function go(p, y, wait) {
  await p.evaluate((v) => window.scrollTo({ top: v, behavior: 'instant' }), y);
  await settle(p, wait);
  await p.evaluate((v) => window.scrollTo({ top: v, behavior: 'instant' }), y);
  await settle(p, 400);
}
await Promise.all(only.map(async (slug) => {
  const s = SITES[slug];
  const wait = s.wait || 900;
  for (const [kind, vp, list] of [['d', { width: 1440, height: 900 }, [0, ...s.shots]], ['m', { width: 390, height: 844 }, s.phone]]) {
    const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 2, isMobile: kind === 'm', hasTouch: kind === 'm' });
    const p = await ctx.newPage();
    await p.goto(s.url, { waitUntil: 'load', timeout: 60000 });
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(4500); // intros (toast, steam, opening) finish
    for (const [i, y] of list.entries()) {
      // walk there in steps so scroll-driven scenes and lazy images catch up
      const from = await p.evaluate(() => scrollY);
      const steps = Math.max(1, Math.ceil(Math.abs(y - from) / 600));
      for (let k = 1; k <= steps; k++) await go(p, Math.round(from + ((y - from) * k) / steps), 120);
      await go(p, y, wait);
      await p.screenshot({ path: `${OUT}/${slug}-${kind}${i}.png` });
    }
    await ctx.close();
  }
}));
await browser.close();
console.log('stills done');

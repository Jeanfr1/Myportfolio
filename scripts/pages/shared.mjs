// Pieces every page shares: <head>, header with the language switch, footer.
import { SITE, LOCALES, DEFAULT, STORAGE_KEY } from '../../src/i18n/locales.js';
import { LINKEDIN } from '../../src/data/projects.js';

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const img = (name) => `/src/assets/img/${name}.webp`;
export const homeUrl = (loc) => loc.home;
export const studyUrl = (loc, slug) => `${loc.studies}${slug}/`;
export { LINKEDIN, LOCALES };

// The root page is the only one that guesses: a first visit (nothing stored, not coming from
// another page of the site) goes to the browser's language, and any language other than
// Portuguese or French gets English. Robots and automated browsers stay on the page they asked for.
const GUESS = `<script>
      (function () {
        var codes = ${JSON.stringify(LOCALES.map((l) => l.code))};
        var go = function (c) { if (c !== '${DEFAULT}') location.replace('/' + c + '/' + location.search + location.hash); };
        if (navigator.webdriver || /bot|crawl|spider|slurp|lighthouse|headless/i.test(navigator.userAgent)) return;
        var saved = null;
        try { saved = localStorage.getItem('${STORAGE_KEY}'); } catch (e) {}
        if (codes.indexOf(saved) >= 0) return go(saved);
        if (document.referrer && document.referrer.indexOf(location.origin + '/') === 0) return;
        var list = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
        for (var i = 0; i < list.length; i++) {
          var c = String(list[i]).slice(0, 2).toLowerCase();
          if (codes.indexOf(c) >= 0) return go(c);
        }
        go('en');
      })();
    </script>`;

// alternates: { pt: '/estudos/sta/', en: '/en/studies/sta/', fr: '/fr/etudes/sta/' }
export function head({ loc, t, title, description, ogType, ogTitle, ogDescription, alternates, guess = false, extra = '' }) {
  const links = LOCALES.map((l) => `<link rel="alternate" hreflang="${l.code}" href="${SITE}${alternates[l.code]}" />`);
  links.push(`<link rel="alternate" hreflang="x-default" href="${SITE}${alternates[DEFAULT]}" />`);
  const others = LOCALES.filter((l) => l !== loc).map((l) => `<meta property="og:locale:alternate" content="${l.og}" />`);
  return `<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    ${guess ? `${GUESS}\n    ` : ''}<title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}" />
    <meta name="theme-color" content="#080A0D" />
    <link rel="canonical" href="${SITE}${alternates[loc.code]}" />
    ${links.join('\n    ')}
    <meta property="og:type" content="${ogType}" />
    <meta property="og:url" content="${SITE}${alternates[loc.code]}" />
    <meta property="og:locale" content="${loc.og}" />
    ${others.join('\n    ')}
    <meta property="og:site_name" content="Josean Araújo" />
    <meta property="og:title" content="${esc(ogTitle)}" />
    <meta property="og:description" content="${esc(ogDescription)}" />
    <meta property="og:image" content="${SITE}/og-image.jpg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${esc(t.meta.ogImageAlt)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="icon" href="/favicon.png" type="image/png" sizes="64x64" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
${extra}  </head>`;
}

export const GLOBE = '<symbol id="i-globe" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.3 2.4 3.4 5.2 3.4 8.5s-1.1 6.1-3.4 8.5c-2.3-2.4-3.4-5.2-3.4-8.5s1.1-6.1 3.4-8.5Z" /></symbol>';

// Language switch: PT · EN · FR inline on wide screens, a small menu behind the globe on phones.
// Each link goes to the same page in the other language (src/js/lang.js keeps the #section).
export function langSwitch(loc, t, alternates) {
  const items = LOCALES.map((l) => {
    const current = l === loc ? ' aria-current="page"' : '';
    return `<li><a href="${alternates[l.code]}" hreflang="${l.code}" lang="${l.html}" data-lang-link="${l.code}"${current}><span class="lang-code">${l.label}</span> <span class="lang-name">${l.name}</span></a></li>`;
  });
  return `<nav class="lang" aria-label="${esc(t.lang.label)}" data-lang>
          <button class="lang-toggle" type="button" aria-expanded="false" aria-controls="lang-menu" data-lang-toggle>
            <svg class="icon" aria-hidden="true"><use href="#i-globe" /></svg>
            <span>${loc.label}</span><span class="sr-only"> · ${esc(t.lang.toggle)}</span>
          </button>
          <ul class="lang-menu" id="lang-menu">
            ${items.join('\n            ')}
          </ul>
        </nav>`;
}

export function header({ loc, t, alternates, study = false }) {
  const base = study ? homeUrl(loc) : '';
  const nav = (id, label) =>
    study ? `<li><a href="${base}#${id}">${esc(label)}</a></li>` : `<li><a href="#${id}" data-nav="${id}">${esc(label)}</a></li>`;
  return `<header class="site-header${study ? ' is-solid' : ''}"${study ? '' : ' data-header'}>
      <div class="wrap header-inner">
        <a class="brand" href="${study ? homeUrl(loc) : '#inicio'}" aria-label="${esc(study ? t.nav.homePage : t.nav.home)}">
          <img src="/src/assets/brand/ja.svg" alt="" width="60" height="30" />
          <span class="brand-name">Josean Araújo</span>
        </a>
        <nav class="main-nav" aria-label="${esc(t.nav.label)}">
          <ul>
            ${nav('projetos', t.nav.projects)}
            ${nav('sobre', t.nav.about)}
            ${nav('contato', t.nav.contact)}
          </ul>
        </nav>
        ${langSwitch(loc, t, alternates)}
      </div>
    </header>`;
}

export function footer({ loc, t, note, study = false }) {
  return `<footer class="site-footer">
      <div class="wrap footer-inner">
        <p class="footer-sign">
          <img src="/src/assets/brand/ja.svg" alt="" width="44" height="22" loading="lazy" />
          <span>${esc(t.footer.sign)}</span>
        </p>
        <ul class="footer-links">
          <li><a href="${study ? homeUrl(loc) : ''}#projetos">${esc(t.footer.projects)}</a></li>
          <li><a href="${LINKEDIN}" target="_blank" rel="noopener">LinkedIn<span class="sr-only"> ${esc(t.newTab)}</span></a></li>
        </ul>
        <p class="footer-note">© <span data-year>2026</span> Josean Araújo. ${esc(note)}</p>
      </div>
    </footer>`;
}

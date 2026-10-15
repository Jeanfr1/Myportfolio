// The one-page portfolio, written once and rendered per language.
// Section ids stay the same in every language: the scripts in src/js find them by id.
//   hero → work by sector (Automotivos opens in the STA chapter the hero lands in; every other
//   sector opens with its name in giant type and a particle emblem) → social media → all
//   projects → about → process → contact
import { projects, categories, social, bySlug } from '../../src/data/projects.js';
import { esc, img, video, head, header, footer, caseUrl, LINKEDIN, LOCALES, GLOBE, ICONS } from './shared.mjs';

const ARROW = (id) => `<svg class="icon" aria-hidden="true"><use href="#${id}" /></svg>`;
const N = String(projects.length).padStart(2, '0');
const srcset = (base, widths) => widths.map((w) => `${img(`${base}-${w}`)} ${w}w`).join(', ');
const host = (url) => new URL(url).host;

// the text of a case: kicker, name, sector and place, one line, what the site does, links
function caseCopy({ p, t, loc, text = true }) {
  const c = t.cases[p.slug];
  return `<div class="case" data-reveal>
              <p class="eyebrow case-kicker"><span>${p.number} / ${N}</span> ${esc(t.categories[p.category].name)}</p>
              <h3 class="case-title" id="${p.slug}-title">${esc(p.name)}</h3>
              <p class="case-sector">${esc(c.sector)} · ${esc(c.place)}</p>
              <p class="case-lead">${esc(c.proposal)}</p>${
                text
                  ? `
              <p class="case-text">${esc(c.overview)}</p>
              <ul class="case-tags">${c.tags.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`
                  : ''
              }
              <div class="actions">
                <a class="btn btn--site" href="${p.url}" target="_blank" rel="noopener">
                  <span>${esc(t.work.visit)}</span>
                  ${ARROW('i-external')}
                  <span class="sr-only">${esc(t.newTab)}</span>
                </a>
                <a class="btn btn--quiet" href="${caseUrl(loc, p.slug)}">
                  <span>${esc(t.work.case)}</span>
                  ${ARROW('i-arrow-right')}
                </a>
              </div>
            </div>`;
}

// one site: its text, and a stage where three real screens fan out behind a browser that plays
// the site's opening (recorded live) and a phone with its first screen
function site({ p, t, loc, flip }) {
  const scenes = [1, 2, 3]
    .map(
      (i) => `<figure class="fan fan--${i}"><img src="${img(`site-${p.slug}-s${i}-720`)}" srcset="${srcset(`site-${p.slug}-s${i}`, [720, 1280])}" sizes="(min-width: 1024px) 28vw, 60vw" width="720" height="450" alt="" loading="lazy" decoding="async" /></figure>`,
    )
    .join('\n              ');
  return `<article class="site site--${p.theme}${flip ? ' site--flip' : ''}" id="${p.slug}" aria-labelledby="${p.slug}-title" data-scene style="--s-bg: ${p.bg}; --s-ink: ${p.ink}; --s-accent: ${p.accent}; --s-label: ${p.label || p.accent}; --s-btn: ${p.button || p.accent}">
          <div class="wrap site-grid">
            ${caseCopy({ p, t, loc })}
            <div class="site-stage" aria-hidden="true">
              ${scenes}
              <div class="browser">
                <p class="browser-bar"><i></i><i></i><i></i><span>${host(p.url)}</span></p>
                <video class="browser-screen" muted loop playsinline preload="none" poster="${img(`poster-${p.slug}-960`)}" data-loop>
                  <source src="${video(`${p.slug}-loop`)}" type="video/mp4" />
                </video>
              </div>
              <figure class="phone"><img src="${img(`site-${p.slug}-m0-390`)}" srcset="${srcset(`site-${p.slug}-m0`, [390, 780])}" sizes="(min-width: 1024px) 9vw, 26vw" width="390" height="844" alt="" loading="lazy" decoding="async" /></figure>
            </div>
          </div>
        </article>`;
}

// a sector's opening: its name in giant type, a cloud of particles that forms a real object from
// one of its sites (then the next), and the sites that follow
function opener({ cat, t }) {
  const C = t.categories[cat.id];
  const chars = Math.max(...C.title.map((l) => [...l].length));
  const list = cat.slugs
    .map((s) => `<li><a href="#${s}"><span>${bySlug[s].number}</span> ${esc(bySlug[s].name)} <em>${esc(t.cases[s].place.split(',')[0])}</em></a></li>`)
    .join('\n                  ');
  return `<header class="opener" data-opener data-scene data-emblems="${cat.emblems.join(',')}" style="--cat: ${cat.accent}; --chars: ${chars}">
            <div class="opener-stage">
              <canvas class="opener-canvas" aria-hidden="true"></canvas>
              <p class="opener-ghost" aria-hidden="true"><span>${esc(`${C.name} · `.repeat(6))}</span></p>
              <div class="wrap opener-copy">
                <p class="eyebrow"><span>${cat.number} / 0${categories.length}</span> ${esc(t.work.sector)}</p>
                <h2 class="opener-title" id="${cat.id}-title">${C.title.map((l) => `<span class="ot-line"><span>${esc(l)}</span></span>`).join(' ')}</h2>
                <p class="opener-lead">${esc(C.lead)}</p>
                <ol class="opener-list">
                  ${list}
                </ol>
              </div>
            </div>
          </header>`;
}

function staChapter({ t, loc }) {
  const p = bySlug.sta;
  return `<!-- 01 · Automotives STA: the hero lands here. Car -> scan -> engine (crossfade, short scale, vertical mask) -->
        <article class="chapter chapter--sta" id="sta" aria-labelledby="sta-title" data-chapter="sta">
          <div class="sta-track" data-sta-track>
            <div class="sta-stage" data-sta-stage>
              <div class="sta-scene" aria-hidden="true">
                <img class="sta-car" src="/src/assets/img/sta-scan-1672.webp" srcset="/src/assets/img/sta-scan-1000.webp 1000w, /src/assets/img/sta-scan-1672.webp 1672w" sizes="100vw" width="1672" height="941" alt="" loading="lazy" decoding="async" />
                <img class="sta-car sta-car--lit" src="/src/assets/img/sta-scan-1672.webp" srcset="/src/assets/img/sta-scan-1000.webp 1000w, /src/assets/img/sta-scan-1672.webp 1672w" sizes="100vw" width="1672" height="941" alt="" loading="lazy" decoding="async" />
                <span class="sta-beam"></span>
                <div class="sta-engine">
                  <img src="/src/assets/img/sta-engine-1102.webp" srcset="/src/assets/img/sta-engine-661.webp 661w, /src/assets/img/sta-engine-1102.webp 1102w" sizes="(min-width: 1024px) 46vw, 90vw" width="1102" height="973" alt="" loading="lazy" decoding="async" />
                </div>
                <span class="sta-shade"></span>
              </div>
              <div class="wrap sta-copy">
                ${caseCopy({ p, t, loc, text: false })}
              </div>
              <ol class="states" aria-label="${esc(t.work.states)}">
                ${t.cases.sta.motion.map((m, i) => `<li data-state="${i}">${esc(m)}</li>`).join('\n                ')}
              </ol>
            </div>
          </div>
        </article>`;
}

function sector({ cat, t, loc }) {
  const C = t.categories[cat.id];
  const sites = cat.slugs.filter((s) => s !== 'sta').map((s, i) => site({ p: bySlug[s], t, loc, flip: i % 2 === 1 }));
  const head = cat.id === 'automotivos' ? `<h2 class="sr-only" id="${cat.id}-title">${esc(C.name)}</h2>\n        ${staChapter({ t, loc })}` : opener({ cat, t });
  return `<section class="sector sector--${cat.id}" id="${cat.id}" aria-labelledby="${cat.id}-title" data-sector>
        ${head}
        ${sites.join('\n        ')}
      </section>`;
}

function reel(v, t, i) {
  const S = t.social;
  const it = S.items[v.id];
  const k = i - (social.length - 1) / 2;
  return `<li class="reel reel--${v.kind}" style="--k: ${k}; --ka: ${Math.abs(k)}">
            <button class="reel-card" type="button" data-reel="${v.id}" aria-haspopup="dialog">
              <video class="reel-video" muted loop playsinline preload="none" poster="${img(`social-${v.id}-540`)}">
                <source src="${video(`social-${v.id}-preview`)}" type="video/mp4" />
              </video>
              <span class="reel-play"><svg class="icon" aria-hidden="true"><use href="#i-play" /></svg> <span>${esc(S.watch)}<span class="sr-only">: ${esc(it.title)}</span></span></span>
            </button>
            <p class="reel-meta">
              <span class="reel-kind">${esc(S.kinds[v.kind])} · ${esc(S.seconds(v.seconds))}</span>
              <span class="reel-title">${esc(it.title)}</span>
              <span class="reel-line">${esc(it.line)}</span>
            </p>
          </li>`;
}

function card({ p, t, loc }) {
  const c = t.cases[p.slug];
  return `<li>
              <a class="study-card" href="${caseUrl(loc, p.slug)}" data-reveal>
                <figure>
                  <img src="${img(`window-${p.slug}-640`)}" srcset="${srcset(`window-${p.slug}`, [640, 1024])}" sizes="(min-width: 1024px) 30vw, (min-width: 768px) 46vw, 92vw" width="640" height="400" alt="" loading="lazy" decoding="async" />
                </figure>
                <span class="study-meta">
                  <span class="study-num">${p.number}</span>
                  <span class="study-name">${esc(p.name)}</span>
                  <span class="study-line">${esc(c.sector)} · ${esc(c.place)}</span>
                  <span class="study-tag">${esc(t.list.tag)}</span>
                </span>
              </a>
            </li>`;
}

function role(r) {
  const partner = r.partner ? ` <span class="role-partner">/ ${esc(r.partner)}</span>` : '';
  return `<li class="role" data-reveal>
                  <p class="role-meta"><span>${esc(r.years)}</span> ${esc(r.place)}</p>
                  <h4 class="role-org">${esc(r.org)}${partner}</h4>
                  <p class="role-title">${esc(r.title)}</p>
                  <ul class="role-points">
                    ${r.points.map((x) => `<li>${esc(x)}</li>`).join('\n                    ')}
                  </ul>
                </li>`;
}

export function home(loc, t) {
  const alternates = Object.fromEntries(LOCALES.map((l) => [l.code, l.home]));
  const index = categories
    .map((c) => `<li><a href="#${c.id}"><span>${c.number}</span> ${esc(t.categories[c.id].name)}</a></li>`)
    .join('\n              ');
  const rail = categories
    .map((c) => `<li><a href="#${c.id}" data-rail-link="${c.id}" data-name="${esc(t.categories[c.id].name)}"><span>${c.number}</span> ${esc(t.categories[c.id].name)}</a></li>`)
    .join('\n            ');
  const groups = categories
    .map(
      (c) => `<section class="index-group" aria-labelledby="ig-${c.id}">
            <h3 class="index-cat" id="ig-${c.id}" data-reveal><span>${c.number}</span> ${esc(t.categories[c.id].name)} <em>${esc(t.work.count(c.slugs.length))}</em></h3>
            <ol class="study-grid">
            ${c.slugs.map((s) => card({ p: bySlug[s], t, loc })).join('\n            ')}
            </ol>
          </section>`,
    )
    .join('\n          ');
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Josean Araújo',
    description: t.meta.person,
    homeLocation: { '@type': 'Country', name: t.meta.country },
    knowsLanguage: ['pt', 'en', 'fr'],
    sameAs: [LINKEDIN],
  };
  const sta = bySlug.sta;

  const extra = `    <script type="application/ld+json">
      ${JSON.stringify(ld, null, 2).replace(/\n/g, '\n      ')}
    </script>
    <script>
      // Picks the hero mode before first paint, so the page height (and any #anchor) is right from the start.
      (function () {
        var d = document.documentElement;
        var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var short = window.matchMedia('(max-height: 519px)').matches; // e.g. 200 % zoom on a laptop
        var wide = window.matchMedia('(min-width: 1024px) and (min-height: 600px)').matches;
        d.classList.remove('no-js');
        d.classList.add('js', reduced || short ? 'hero-static' : wide ? 'hero-scroll' : 'hero-compact');
        if (!reduced) d.classList.add('motion-ok');
      })();
    </script>
    <link rel="preload" as="image" href="/src/assets/img/hero-desktop-1672.webp" media="(min-width: 768px)" fetchpriority="high" />
    <script type="module" src="/src/main.js"></script>
`;

  return `<!doctype html>
<!-- Generated by scripts/build-pages.mjs from scripts/pages/home.mjs and src/i18n/${loc.code}.js: edit those, then run npm run pages. -->
<html lang="${loc.html}" class="no-js">
  ${head({
    loc,
    t,
    title: t.meta.title,
    description: t.meta.description,
    ogType: 'website',
    ogTitle: 'Josean Araújo · Inside the Creative Mind',
    ogDescription: t.meta.ogDescription,
    alternates,
    guess: loc.code === 'pt',
    extra,
  })}
  <body>
    <a class="skip-link" href="#conteudo">${esc(t.skip)}</a>

    <svg class="icon-sprite" aria-hidden="true" focusable="false">
      ${ICONS}
      <symbol id="i-linkedin" viewBox="0 0 24 24"><path d="M4.5 9.5h3v10h-3zM6 4.6a1.7 1.7 0 1 1 0 3.4 1.7 1.7 0 0 1 0-3.4ZM10.5 9.5h2.9v1.4c.5-.9 1.7-1.7 3.4-1.7 3.2 0 3.7 2 3.7 4.7v5.6h-3v-5c0-1.2 0-2.7-1.7-2.7s-2 1.3-2 2.6v5.1h-3.3z" /></symbol>
      <symbol id="i-listen" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" /><path d="M12 8v4.5l3 1.8" /></symbol>
      <symbol id="i-shape" viewBox="0 0 24 24"><path d="M4 20 12 4l8 16H4Z" /><path d="M8.3 12h7.4" /></symbol>
      <symbol id="i-build" viewBox="0 0 24 24"><path d="M8 7 3 12l5 5M16 7l5 5-5 5M14 4l-4 16" /></symbol>
      ${GLOBE}
    </svg>

    ${header({ loc, t, alternates })}

    <!-- 01 / Hero, "Inside the Creative Mind". Scroll mode: the stage stays pinned while the portrait
         opens into planes, eight site windows emerge, Automotives STA takes the portal and the
         camera goes through it. The name, the text and the links are live HTML. -->
    <div class="hero-track" id="inicio" data-hero-track>
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero-stage" data-stage>
          <div class="scene" aria-hidden="true">
            <img class="h-bg" alt="" decoding="async" data-bg />
            <picture class="h-art" data-art>
              <source media="(max-width: 767px)" srcset="/src/assets/img/hero-mobile-640.webp 640w, /src/assets/img/hero-mobile-941.webp 941w" sizes="100vw" />
              <img
                src="/src/assets/img/hero-desktop-1672.webp"
                srcset="/src/assets/img/hero-desktop-800.webp 800w, /src/assets/img/hero-desktop-1200.webp 1200w, /src/assets/img/hero-desktop-1672.webp 1672w"
                sizes="100vw"
                width="1672"
                height="941"
                alt=""
                fetchpriority="high"
                data-art-img
              />
            </picture>
            <div class="h-planes" data-planes></div>
            <img class="h-layer h-portrait" alt="" decoding="async" data-layer="portrait" />
            <img class="h-layer h-rim" alt="" decoding="async" data-rim />
            <div class="h-windows" data-windows></div>
            <img class="h-layer h-josean" alt="" decoding="async" data-layer="josean" />
            <img class="h-portal" alt="" decoding="async" data-portal />
            <span class="h-tint" data-tint></span>
            <span class="h-sweep" data-sweep></span>
            <div class="h-full" data-full><img alt="" decoding="async" /></div>
            <svg class="h-light" data-light><path data-light-path /></svg>
          </div>

          <div class="wrap hero-copy" data-hero-copy>
            <div class="hero-head">
              <p class="eyebrow hero-eyebrow">${esc(t.hero.eyebrow)}</p>
              <h1 class="hero-title" id="hero-title">
                <span>Josean</span>
                <span>Araújo</span>
              </h1>
              <p class="hero-tagline">${esc(t.hero.tagline)}</p>
            </div>
            <div class="hero-foot">
              <p class="hero-intro">${esc(t.hero.intro)}</p>
              <div class="actions">
                <a class="btn btn--primary" href="#projetos">
                  <span>${esc(t.hero.explore)}</span>
                  ${ARROW('i-arrow-down')}
                </a>
                <a class="btn btn--quiet" href="#indice">${esc(t.hero.all)}</a>
              </div>
            </div>
          </div>

          <!-- scene captions: they narrate the scene, so screen readers get them as plain text in order -->
          <div class="wrap hero-caption hero-caption--reveal" data-caption="reveal">
            <p class="eyebrow">${esc(t.hero.revealEyebrow)}</p>
            <p class="caption-title">${esc(t.hero.revealTitle)}</p>
            <ol class="caption-index">
              ${index}
            </ol>
          </div>
          <div class="wrap hero-caption hero-caption--select" data-caption="select">
            <p class="eyebrow"><span>${sta.number} / ${N}</span> ${esc(t.categories.automotivos.name)}</p>
            <p class="caption-title">${esc(sta.name)}</p>
            <p class="caption-sub">${esc(t.cases.sta.tagline)}</p>
            <a class="btn btn--line" href="${caseUrl(loc, 'sta')}">
              <span>${esc(t.work.case)}</span>
              ${ARROW('i-arrow-right')}
            </a>
          </div>

          <div class="hero-progress" aria-hidden="true"><span data-progress></span></div>
          <p class="scroll-cue" aria-hidden="true" data-cue>${esc(t.hero.cue)}</p>
        </div>
      </section>
    </div>

    <main id="conteudo" class="content" tabindex="-1" data-content>
      <!-- 02 / The work, by sector. The hero lands in the first site: same image, same frame. -->
      <div class="projects" id="projetos" role="region" aria-label="${esc(t.work.title)}">
        <nav class="rail" aria-label="${esc(t.work.rail)}" data-rail>
          <ol>
            ${rail}
          </ol>
        </nav>

        ${categories.map((cat) => sector({ cat, t, loc })).join('\n\n      ')}
      </div>

      <!-- 03 / Social media: reels and motion graphics, previews that play on screen, the full piece with sound on demand -->
      <section class="social" id="social" aria-labelledby="social-title" data-scene>
        <div class="wrap social-head">
          <p class="eyebrow">${esc(t.social.eyebrow)}</p>
          <h2 class="social-title" id="social-title">${t.social.title.map((l) => `<span class="ot-line"><span>${esc(l)}</span></span>`).join(' ')}</h2>
          <p class="social-manifesto" data-words>${esc(t.social.manifesto)}</p>
        </div>
        <div class="reels-wrap">
          <ul class="reels" data-reels>
          ${social.map((v, i) => reel(v, t, i)).join('\n          ')}
          </ul>
        </div>
        <p class="wrap social-note">${esc(t.social.note)}</p>
        <dialog class="player" data-player aria-label="${esc(t.social.eyebrow)}">
          <div class="player-frame">
            <video class="player-video" controls playsinline preload="none" data-player-video></video>
          </div>
          <button class="player-close" type="button" data-player-close>
            <svg class="icon" aria-hidden="true"><use href="#i-close" /></svg>
            <span class="sr-only">${esc(t.social.close)}</span>
          </button>
        </dialog>
      </section>

      <!-- 04 / All projects, by sector: the way in without the animation -->
      <section class="index" id="indice" aria-labelledby="indice-title">
        <div class="wrap">
          <header class="section-head" data-reveal>
            <p class="eyebrow">01 — ${N}</p>
            <h2 class="section-title" id="indice-title">${esc(t.list.title)}</h2>
            <p class="section-lead">${esc(t.list.lead)}</p>
          </header>
          ${groups}
        </div>
      </section>

      <!-- 05 / About: a quieter pause, silver. The two roles come from Josean's CV (13/07/2026). -->
      <section class="about" id="sobre" aria-labelledby="sobre-title" data-scene>
        <div class="about-media" aria-hidden="true">
          <img src="/src/assets/img/about-1672.webp" srcset="/src/assets/img/about-1000.webp 1000w, /src/assets/img/about-1672.webp 1672w" sizes="(min-width: 1024px) 50vw, 100vw" width="1672" height="941" alt="" loading="lazy" decoding="async" data-parallax />
        </div>
        <div class="about-copy">
          <div class="about-inner" data-reveal>
            <p class="eyebrow">${esc(t.about.eyebrow)}</p>
            <h2 class="section-title" id="sobre-title">${esc(t.about.title)}</h2>
            ${t.about.paragraphs.map((x) => `<p>${esc(x)}</p>`).join('\n            ')}
            <section class="career" aria-labelledby="career-title">
              <h3 class="career-title" id="career-title">${esc(t.about.career)}</h3>
              <ol class="roles">
                ${t.about.roles.map(role).join('\n                ')}
              </ol>
            </section>
            <dl class="facts">
              ${t.about.facts.map(([k, v]) => `<div>\n                <dt>${esc(k)}</dt>\n                <dd>${esc(v)}</dd>\n              </div>`).join('\n              ')}
            </dl>
            <a class="link-arrow" href="${LINKEDIN}" target="_blank" rel="noopener">
              <span>${esc(t.about.linkedin)}</span>
              ${ARROW('i-external')}
              <span class="sr-only">${esc(t.newTab)}</span>
            </a>
          </div>
        </div>
      </section>

      <!-- 06 / Process -->
      <section class="process" id="processo" aria-labelledby="processo-title" data-scene>
        <div class="wrap">
          <header class="section-head" data-reveal>
            <p class="eyebrow">${esc(t.process.eyebrow)}</p>
            <h2 class="section-title" id="processo-title">${esc(t.process.title)}</h2>
          </header>
          <div class="steps-wrap">
          <span class="steps-line" aria-hidden="true"></span>
          <ol class="steps">
            ${t.process.steps
              .map(
                ([h, x], i) => `<li class="step" data-reveal>
              ${`<svg class="icon step-icon" aria-hidden="true"><use href="#${['i-listen', 'i-shape', 'i-build'][i]}" /></svg>`}
              <p class="step-num">0${i + 1}</p>
              <h3>${esc(h)}</h3>
              <p>${esc(x)}</p>
            </li>`,
              )
              .join('\n            ')}
          </ol>
          </div>
        </div>
      </section>

      <!-- 07 / Contact: the closing portal, one path -->
      <!-- TODO(portfolio): add email, GitHub or WhatsApp here only once the real addresses are confirmed (roteiro §07) -->
      <section class="contact" id="contato" aria-labelledby="contato-title">
        <div class="contact-media" aria-hidden="true">
          <img src="/src/assets/img/closing-1672.webp" srcset="/src/assets/img/closing-1000.webp 1000w, /src/assets/img/closing-1672.webp 1672w" sizes="100vw" width="1672" height="941" alt="" loading="lazy" decoding="async" />
        </div>
        <div class="wrap contact-inner">
          <div class="contact-copy" data-reveal>
            <p class="eyebrow">${esc(t.contact.eyebrow)}</p>
            <h2 class="contact-title" id="contato-title">
              <span>${esc(t.contact.title[0])}</span>
              <span>${esc(t.contact.title[1])}</span>
            </h2>
            <p class="section-lead">${esc(t.contact.lead)}</p>
            <a class="btn btn--primary btn--lg" href="${LINKEDIN}" target="_blank" rel="noopener">
              ${ARROW('i-linkedin')}
              <span>${esc(t.contact.cta)}</span>
              <span class="sr-only">${esc(t.newTab)}</span>
            </a>
          </div>
        </div>
      </section>
    </main>

    ${footer({ loc, t, note: t.footer.note })}
  </body>
</html>
`;
}

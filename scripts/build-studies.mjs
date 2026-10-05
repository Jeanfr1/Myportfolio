// Builds the six study pages (estudos/<slug>/index.html) and the "Todos os estudos" list in
// index.html from src/data/projects.js, so names, sectors and links live in one place.
// Run `npm run studies` after editing the data; both outputs are committed.
//
// Each page follows roteiro-secoes.md §04: name, sector and "Estudo conceitual"; the
// opportunity; the direction; the interface (the concept mockup, which opens at full size); the
// movement (up to three states and a short script); Josean's role; next study and the way back.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { projects, LINKEDIN } from '../src/data/projects.js';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (name) => `/src/assets/img/${name}.webp`;

const SPRITE = `<svg class="icon-sprite" aria-hidden="true" focusable="false">
      <symbol id="i-arrow-right" viewBox="0 0 24 24"><path d="M4 12h15m-6-6 6 6-6 6" /></symbol>
      <symbol id="i-arrow-left" viewBox="0 0 24 24"><path d="M20 12H5m6-6-6 6 6 6" /></symbol>
      <symbol id="i-external" viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9" /></symbol>
      <symbol id="i-expand" viewBox="0 0 24 24"><path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" /></symbol>
    </svg>`;

function page(p, i) {
  const next = projects[(i + 1) % projects.length];
  const n = projects.length;
  const interfaceBlock = p.concept
    ? `<figure class="concept" data-reveal>
            <a class="concept-link" href="/studies/${p.slug}.webp" target="_blank" rel="noopener">
              <img src="${img(`concept-${p.slug}-1024`)}" srcset="${img(`concept-${p.slug}-720`)} 720w, ${img(`concept-${p.slug}-1024`)} 1024w" sizes="(min-width: 1024px) 46vw, 92vw" width="${p.concept.width}" height="${p.concept.height}" alt="Mockup conceitual da página de ${esc(p.name)}, do topo ao rodapé" loading="lazy" decoding="async" />
              <span class="concept-zoom"><svg class="icon" aria-hidden="true"><use href="#i-expand" /></svg> Ampliar<span class="sr-only"> o mockup (abre a imagem em uma nova aba)</span></span>
            </a>
            <figcaption>Mockup conceitual: uma imagem de apresentação, não um site em funcionamento.</figcaption>
          </figure>`
    : `<p class="study-text concept-missing" data-reveal>O kit deste portfólio não inclui um mockup desta página; o protótipo publicado mostra a interface completa.</p>`;
  const prototype = p.prototype
    ? `<a class="btn btn--quiet" href="${p.prototype}" target="_blank" rel="noopener">
                <span>Abrir protótipo publicado</span>
                <svg class="icon" aria-hidden="true"><use href="#i-external" /></svg>
                <span class="sr-only">(abre em uma nova aba)</span>
              </a>`
    : '';
  return `<!doctype html>
<html lang="pt-BR" class="no-js">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${esc(p.name)} · Estudo conceitual · Josean Araújo</title>
    <meta name="description" content="${esc(p.name)}: ${esc(p.proposal)} Estudo conceitual de Josean Araújo — ${esc(p.role.replace(/\.$/, '').toLowerCase())}." />
    <meta name="theme-color" content="#080A0D" />
    <meta property="og:type" content="article" />
    <meta property="og:locale" content="pt_BR" />
    <meta property="og:site_name" content="Josean Araújo" />
    <meta property="og:title" content="${esc(p.name)} · Estudo conceitual" />
    <meta property="og:description" content="${esc(p.proposal)}" />
    <meta property="og:image" content="/og-image.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="icon" href="/favicon.png" type="image/png" sizes="64x64" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <script>
      document.documentElement.classList.remove('no-js');
      document.documentElement.classList.add('js');
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) document.documentElement.classList.add('motion-ok');
    </script>
    <script type="module" src="/src/study.js"></script>
  </head>
  <body class="study-page" style="--accent: ${p.accent}">
    <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>

    ${SPRITE}

    <header class="site-header is-solid">
      <div class="wrap header-inner">
        <a class="brand" href="/" aria-label="Josean Araújo, página inicial">
          <img src="/src/assets/brand/ja.svg" alt="" width="60" height="30" />
          <span class="brand-name">Josean Araújo</span>
        </a>
        <nav class="main-nav" aria-label="Principal">
          <ul>
            <li><a href="/#projetos">Projetos</a></li>
            <li><a href="/#sobre">Sobre</a></li>
            <li><a href="/#contato">Contato</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <main id="conteudo" class="study" tabindex="-1">
      <!-- 1 · name, sector, label -->
      <section class="study-hero" aria-labelledby="study-title">
        <div class="wrap study-hero-grid">
          <div class="study-intro" data-reveal>
            <a class="back" href="/#${p.slug}">
              <svg class="icon" aria-hidden="true"><use href="#i-arrow-left" /></svg>
              <span>Voltar aos projetos</span>
            </a>
            <p class="eyebrow"><span>${p.number} / 0${n}</span> Estudo conceitual</p>
            <h1 class="study-title" id="study-title">${esc(p.name)}</h1>
            <p class="case-sector">${esc(p.sector)}</p>
            <p class="study-lead">${esc(p.proposal)}</p>
          </div>
          <figure class="study-window" data-reveal>
            <img src="${img(`window-${p.slug}-1024`)}" srcset="${img(`window-${p.slug}-640`)} 640w, ${img(`window-${p.slug}-1024`)} 1024w" sizes="(min-width: 1024px) 50vw, 92vw" width="1024" height="640" alt="" fetchpriority="high" decoding="async" />
          </figure>
        </div>
      </section>

      <div class="wrap study-body">
        <!-- 2 · the opportunity -->
        <section class="study-block" aria-labelledby="oportunidade" data-reveal>
          <h2 class="study-h2" id="oportunidade"><span>02</span> A oportunidade</h2>
          <p class="study-text">${esc(p.opportunity)}</p>
        </section>

        <!-- 3 · the direction -->
        <section class="study-block" aria-labelledby="direcao" data-reveal>
          <h2 class="study-h2" id="direcao"><span>03</span> A direção</h2>
          <dl class="direction">
${p.direction.map(([k, v]) => `            <div>\n              <dt>${esc(k)}</dt>\n              <dd>${esc(v)}</dd>\n            </div>`).join('\n')}
          </dl>
        </section>

        <!-- 4 · the interface -->
        <section class="study-block study-block--wide" aria-labelledby="interface">
          <h2 class="study-h2" id="interface" data-reveal><span>04</span> A interface</h2>
          <div class="interface-grid">
          ${interfaceBlock}
            <div class="interface-note" data-reveal>
              <p class="study-text">A página foi pensada como uma única cena que se desdobra com o scroll, com o conteúdo sempre legível sem depender da animação.</p>
              <div class="actions">
              ${prototype}
              </div>
            </div>
          </div>
        </section>

        <!-- 5 · the movement -->
        <section class="study-block" aria-labelledby="movimento" data-reveal>
          <h2 class="study-h2" id="movimento"><span>05</span> O movimento</h2>
          <ol class="motion-states">
${p.motion.map((m, j) => `            <li><span>${String(j + 1).padStart(2, '0')}</span> ${esc(m)}</li>`).join('\n')}
          </ol>
          <p class="study-text">${esc(p.script)}</p>
        </section>

        <!-- 6 · Josean's role -->
        <section class="study-block" aria-labelledby="papel" data-reveal>
          <h2 class="study-h2" id="papel"><span>06</span> O papel de Josean</h2>
          <p class="study-text">${esc(p.role)}</p>
        </section>
      </div>

      <!-- 7 · next study and the way back -->
      <nav class="study-next" aria-label="Estudos">
        <div class="wrap study-next-inner">
          <a class="next-link" href="/estudos/${next.slug}/">
            <span class="eyebrow">Próximo estudo</span>
            <span class="next-name">${esc(next.name)}</span>
            <span class="next-line">${esc(next.tagline)}</span>
            <svg class="icon" aria-hidden="true"><use href="#i-arrow-right" /></svg>
          </a>
          <a class="back" href="/#estudos">
            <svg class="icon" aria-hidden="true"><use href="#i-arrow-left" /></svg>
            <span>Todos os estudos</span>
          </a>
        </div>
      </nav>
    </main>

    <footer class="site-footer">
      <div class="wrap footer-inner">
        <p class="footer-sign">
          <img src="/src/assets/brand/ja.svg" alt="" width="44" height="22" loading="lazy" />
          <span>Josean Araújo · Design, desenvolvimento e IA</span>
        </p>
        <ul class="footer-links">
          <li><a href="/#projetos">Projetos</a></li>
          <li><a href="${LINKEDIN}" target="_blank" rel="noopener">LinkedIn<span class="sr-only"> (abre em uma nova aba)</span></a></li>
        </ul>
        <p class="footer-note">© <span data-year>2026</span> Josean Araújo. ${esc(p.name)} é um estudo conceitual: não indica contratação, lançamento ou resultados.</p>
      </div>
    </footer>
  </body>
</html>
`;
}

function card(p) {
  return `            <li>
              <a class="study-card" href="/estudos/${p.slug}/" data-reveal>
                <figure>
                  <img src="${img(`window-${p.slug}-640`)}" srcset="${img(`window-${p.slug}-640`)} 640w, ${img(`window-${p.slug}-1024`)} 1024w" sizes="(min-width: 1024px) 30vw, (min-width: 768px) 46vw, 92vw" width="640" height="400" alt="" loading="lazy" decoding="async" />
                </figure>
                <span class="study-meta">
                  <span class="study-num">${p.number}</span>
                  <span class="study-name">${esc(p.name)}</span>
                  <span class="study-line">${esc(p.tagline)} · ${esc(p.sector.split(' · ')[0])}</span>
                  <span class="study-tag">Estudo conceitual · Explorar estudo</span>
                </span>
              </a>
            </li>`;
}

for (const [i, p] of projects.entries()) {
  await mkdir(`estudos/${p.slug}`, { recursive: true });
  await writeFile(`estudos/${p.slug}/index.html`, page(p, i));
}
const index = await readFile('index.html', 'utf8');
const start = '<!-- studies:start -->';
const end = '<!-- studies:end -->';
const a = index.indexOf(start);
const b = index.indexOf(end);
if (a < 0 || b < 0) throw new Error('index.html: studies markers not found');
await writeFile('index.html', `${index.slice(0, a + start.length)}\n${projects.map(card).join('\n')}\n            ${index.slice(b)}`);
console.log(`estudos/: ${projects.map((p) => p.slug).join(', ')} · index.html list updated`);

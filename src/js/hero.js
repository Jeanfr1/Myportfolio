// Hero: "Inside the Creative Mind" (roteiro-animacao.md, Ato 1; PDF p.4).
//
// One smoothed scroll value drives every layer, so the scene is a pure function of the scroll
// position and runs backwards as cleanly as forwards:
//   0.00–0.12  presence   the finished art: Josean, the monumental portrait, the name
//   0.12–0.32  unfold     the art hands over to its own layers; the glass planes behind the
//                         face drift apart, the portrait recedes ~5 %, Josean barely moves
//   0.32–0.55  reveal     six project windows emerge from behind the portrait, three in front
//                         and three further back
//   0.55–0.76  select     Automotives STA takes the centre inside the glass portal; the other
//                         windows lose scale and light
//   0.76–1.00  traverse   the window grows to fill the screen, the blue gives way to the
//                         study's red, and the page continues in the STA chapter, on the same image
//
// Modes (picked in index.html before first paint, kept in sync here):
//   scroll  – wide screens: pinned over 360svh, the full layered scene
//   compact – phones and tablets: 180svh, the finished art, three windows, the same landing
//   static  – prefers-reduced-motion (and no JS): the finished art and the text, no pinning
import hero from '../data/hero.json';
import { media, lerp, range, smooth, ease, windowed } from './motion.js';

const IMG = import.meta.glob('../assets/img/*.webp', { eager: true, query: '?url', import: 'default' });
const url = (name) => IMG[`../assets/img/${name}.webp`];

// per-frame catch-up of the scrubbed scroll position (`?nosmooth` turns it off, for captures)
const SMOOTH = new URLSearchParams(location.search).has('nosmooth') ? 1 : 0.13;
const deg = Math.PI / 180;
const root = document.documentElement;

// ---------- scroll script (fractions of the pinned distance) ----------
const T = {
  scroll: {
    sweep: [0.1, 0.24], // a band of silver light crosses the scene: the hand-over happens under it
    layersIn: [0.14, 0.18], // the art's own layers come up over it …
    artOut: [0.17, 0.25], // … and the art steps away
    copyOut: [0.12, 0.26],
    unfold: [0.12, 0.34],
    light: [0.04, 0.5],
    windows: [0.32, 0.55],
    select: [0.55, 0.72],
    portalIn: [0.56, 0.66],
    grow: [0.78, 0.98], // the portal and its window come towards the camera …
    rectify: [0.86, 0.98], // … and the window straightens to the screen
    portalOut: [0.84, 0.95],
    content: [0.8, 0.9], // concept -> the study's own image
    edge: [0.88, 0.98],
    tint: [0.76, 0.96],
    peopleOut: [0.74, 0.86],
    captions: { reveal: [0.34, 0.4, 0.52, 0.57], select: [0.6, 0.65, 0.76, 0.81] },
  },
  compact: {
    copyOut: [0.08, 0.26],
    veil: [0.2, 0.5],
    windows: [0.24, 0.5],
    select: [0.52, 0.7],
    grow: [2, 3], // compact never grows the card: the image opens out of it instead
    content: [0.64, 0.74], // concept -> the study's image, inside the card …
    full: [0.74, 0.97], // … then the same image opens from the card to the whole screen
    fullIn: [0.72, 0.78],
    cardOut: [0.8, 0.86],
    edge: [0.86, 0.98],
    tint: [0.76, 0.96],
    captions: { reveal: [0.3, 0.36, 0.48, 0.53], select: [0.56, 0.61, 0.74, 0.79] },
  },
};

// ---------- the six windows ----------
// Reveal state in fractions of the stage: centre, width (× W), yaw (perspective: >0 shortens the
// right edge) and plane (front / back). Laid out like keyframe-universo-aberto.png, kept clear of
// Josean and of the face.
const WINDOWS = [
  { slug: 'sta', scroll: { x: 0.2, y: 0.32, w: 0.27, yaw: 0.14, front: true }, compact: { x: 0.5, y: 0.6, w: 0.86, yaw: 0, front: true } },
  { slug: 'isola', scroll: { x: 0.12, y: 0.6, w: 0.15, yaw: 0.08, front: true }, compact: { x: 0.27, y: 0.3, w: 0.44, yaw: 0.1, front: false } },
  { slug: 'legend', scroll: { x: 0.33, y: 0.58, w: 0.15, yaw: -0.06, front: true }, compact: { x: 0.73, y: 0.33, w: 0.44, yaw: -0.1, front: false } },
  { slug: 'bayro', scroll: { x: 0.43, y: 0.18, w: 0.11, yaw: 0.1, front: false }, compact: null },
  { slug: 'orhan', scroll: { x: 0.93, y: 0.2, w: 0.12, yaw: -0.14, front: false }, compact: null },
  { slug: 'mm', scroll: { x: 0.93, y: 0.62, w: 0.12, yaw: -0.14, front: false }, compact: null },
];
const STAGGER = [0, 0.02, 0.04, 0.06, 0.08, 0.1];

// glass planes behind the face, in hero-art pixels (they echo the architecture of the art)
const PLANES = [
  [620, 150, 170, 360],
  [700, 40, 130, 220],
  [760, 300, 170, 330],
  [860, 90, 120, 260],
  [990, 20, 130, 380],
  [1080, 380, 200, 300],
  [1300, 300, 180, 360],
  [1390, 70, 180, 280],
  [1460, 380, 150, 300],
  [900, 560, 260, 190],
  [1180, 600, 220, 160],
  [1520, 160, 120, 200],
];
const FACE = [1180, 360]; // centre of the portrait on the art: planes drift away from it
// the light: along the floor from the far side, under Josean's feet, towards the empty left
// (art px); once the windows are out it climbs to the STA window and stays on it
const LIGHT = [
  [1650, 768],
  [1260, 760],
  [950, 902],
  [600, 800],
  [300, 764],
];

// ---------- 2D similarities: p' = (x, y) + s·R(r)·p ----------
const sim = (s, r, x, y) => ({ s, r, x, y });
const apply = (A, [px, py]) => [A.x + A.s * (Math.cos(A.r) * px - Math.sin(A.r) * py), A.y + A.s * (Math.sin(A.r) * px + Math.cos(A.r) * py)];
const compose = (A, B) => {
  const [x, y] = apply(A, [B.x, B.y]);
  return sim(A.s * B.s, A.r + B.r, x, y);
};
const matrix = (A) => {
  const a = A.s * Math.cos(A.r);
  const b = A.s * Math.sin(A.r);
  return `matrix(${a.toFixed(5)}, ${b.toFixed(5)}, ${(-b).toFixed(5)}, ${a.toFixed(5)}, ${A.x.toFixed(2)}, ${A.y.toFixed(2)})`;
};

// ---------- quads ----------
// the projective transform taking a w × h element onto a quad (TL, TR, BR, BL), as CSS matrix3d
function quadMatrix(w, h, q) {
  const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = q;
  const sx = x0 - x1 + x2 - x3;
  const sy = y0 - y1 + y2 - y3;
  let a, b, c, d, e, f, g, k;
  if (Math.abs(sx) < 1e-6 && Math.abs(sy) < 1e-6) {
    a = x1 - x0; b = x2 - x1; c = x0; d = y1 - y0; e = y2 - y1; f = y0; g = 0; k = 0;
  } else {
    const dx1 = x1 - x2;
    const dx2 = x3 - x2;
    const dy1 = y1 - y2;
    const dy2 = y3 - y2;
    const den = dx1 * dy2 - dx2 * dy1;
    g = (sx * dy2 - dx2 * sy) / den;
    k = (dx1 * sy - sx * dy1) / den;
    a = x1 - x0 + g * x1; b = x3 - x0 + k * x3; c = x0;
    d = y1 - y0 + g * y1; e = y3 - y0 + k * y3; f = y0;
  }
  const m = [a / w, d / w, 0, g / w, b / h, e / h, 0, k / h, 0, 0, 1, 0, c, f, 0, 1];
  return `matrix3d(${m.map((v) => (Math.abs(v) < 1e-9 ? 0 : +v.toPrecision(8))).join(', ')})`;
}
const mixQuad = (A, B, t) => A.map((p, i) => [lerp(p[0], B[i][0], t), lerp(p[1], B[i][1], t)]);
const centre = (q) => [(q[0][0] + q[1][0] + q[2][0] + q[3][0]) / 4, (q[0][1] + q[1][1] + q[2][1] + q[3][1]) / 4];
const scaleQuad = (q, k, c = centre(q)) => q.map(([x, y]) => [c[0] + (x - c[0]) * k, c[1] + (y - c[1]) * k]);
// a window seen at an angle: the far edge is shorter and a little closer
function windowQuad(cx, cy, w, h, yaw) {
  const x0 = cx - w / 2;
  const x1 = cx + w / 2;
  const top = cy - h / 2;
  const bottom = cy + h / 2;
  const far = 1 - Math.abs(yaw);
  if (yaw >= 0) {
    const xr = x1 - w * yaw * 0.18;
    return [[x0, top], [xr, cy - (h / 2) * far], [xr, cy + (h / 2) * far], [x0, bottom]];
  }
  const xl = x0 - w * yaw * 0.18;
  return [[xl, cy - (h / 2) * far], [x1, top], [x1, bottom], [xl, cy + (h / 2) * far]];
}

// Catmull-Rom path through screen points
function curve(pts) {
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const k = 0.2;
    d += ` C${(p1[0] + (p2[0] - p0[0]) * k).toFixed(1)} ${(p1[1] + (p2[1] - p0[1]) * k).toFixed(1)} ${(p2[0] - (p3[0] - p1[0]) * k).toFixed(1)} ${(p2[1] - (p3[1] - p1[1]) * k).toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}

export function initHero() {
  const track = document.querySelector('[data-hero-track]');
  const stage = document.querySelector('[data-stage]');
  if (!track || !stage) return;

  const el = {
    bg: stage.querySelector('[data-bg]'),
    art: stage.querySelector('[data-art-img]'),
    planes: stage.querySelector('[data-planes]'),
    portrait: stage.querySelector('[data-layer="portrait"]'),
    rim: stage.querySelector('[data-rim]'),
    sweep: stage.querySelector('[data-sweep]'),
    full: stage.querySelector('[data-full]'),
    josean: stage.querySelector('[data-layer="josean"]'),
    windows: stage.querySelector('[data-windows]'),
    portal: stage.querySelector('[data-portal]'),
    tint: stage.querySelector('[data-tint]'),
    light: stage.querySelector('[data-light]'),
    lightPath: stage.querySelector('[data-light-path]'),
    copy: stage.querySelector('[data-hero-copy]'),
    captions: {
      reveal: stage.querySelector('[data-caption="reveal"]'),
      select: stage.querySelector('[data-caption="select"]'),
    },
    progress: stage.querySelector('[data-progress]'),
    cue: stage.querySelector('[data-cue]'),
  };

  // ---------- build the planes and the windows once ----------
  const planes = PLANES.map(() => {
    const n = document.createElement('span');
    n.className = 'plane';
    el.planes.append(n);
    return n;
  });
  const wins = WINDOWS.map((w) => {
    const n = document.createElement('div');
    n.className = `win win--${w.slug}`;
    const img = document.createElement('img');
    img.alt = '';
    img.decoding = 'async';
    n.append(img);
    let next = null;
    if (w.slug === 'sta') {
      next = document.createElement('img');
      next.alt = '';
      next.decoding = 'async';
      next.className = 'win-next';
      n.append(next);
    }
    el.windows.append(n);
    return { ...w, node: n, img, next };
  });

  let loaded = false;
  function loadScene() {
    if (loaded) return;
    loaded = true;
    el.bg.srcset = `${url('graphite-960')} 960w, ${url('graphite-1672')} 1672w`;
    el.bg.sizes = '100vw';
    el.bg.src = url('graphite-1672');
    for (const [node, name] of [[el.portrait, 'portrait'], [el.rim, 'portrait'], [el.josean, 'josean']]) {
      const [x0, , x1] = hero.layers[name].box;
      const w = x1 - x0;
      node.srcset = `${url(`${name}-${Math.round(w * 0.6)}`)} ${Math.round(w * 0.6)}w, ${url(`${name}-${w}`)} ${w}w`;
      node.sizes = '50vw';
      node.src = url(`${name}-${w}`);
    }
    el.portal.srcset = `${url('portal-900')} 900w, ${url('portal-1448')} 1448w`;
    el.portal.sizes = '70vw';
    el.portal.src = url('portal-1448');
    for (const w of wins) {
      w.img.srcset = `${url(`window-${w.slug}-640`)} 640w, ${url(`window-${w.slug}-1024`)} 1024w`;
      w.img.sizes = w.slug === 'sta' ? '100vw' : '30vw';
      w.img.src = url(`window-${w.slug}-1024`);
    }
    for (const img of [wins[0].next, el.full.querySelector('img')]) {
      img.srcset = `${url('sta-scan-1000')} 1000w, ${url('sta-scan-1672')} 1672w`;
      img.sizes = '100vw';
      img.src = url('sta-scan-1672');
    }
  }

  // ---------- state ----------
  let mode = '';
  let W = 1;
  let H = 1;
  let G = {};
  let sy = window.scrollY;
  let target = sy;
  let raf = 0;
  let rim = 0;

  const currentMode = () => (media.reduced.matches || media.short.matches ? 'static' : media.wide.matches ? 'scroll' : 'compact');

  // ---------- measuring ----------
  function measure() {
    W = stage.clientWidth || window.innerWidth;
    H = stage.clientHeight || window.innerHeight;
    const vertical = media.small.matches;
    const art = vertical ? { width: 941, height: 1672 } : hero.art;
    el.art.style.width = `${art.width}px`;
    el.art.style.height = `${art.height}px`;
    // the finished art, cover-fitted; the empty left side gives way first on narrow screens
    const k0 = Math.max(W / art.width, H / art.height);
    const artSim = sim(k0, 0, (W - art.width * k0) * (vertical ? 0.5 : 0.72), (H - art.height * k0) * 0.5);

    // the layers on the art (scroll mode only: compact keeps the finished art)
    const layer = {};
    for (const name of ['portrait', 'josean']) {
      const L = hero.layers[name];
      const [x0, y0, x1, y1] = L.box;
      // the web image is cut to the alpha box: local px + box offset = layer px
      const own = compose(sim(L.scale, L.rot * deg, L.x, L.y), sim(1, 0, x0, y0));
      layer[name] = { sim: compose(artSim, own), w: x1 - x0, h: y1 - y0 };
    }
    const face = apply(artSim, FACE);
    const planeRects = PLANES.map(([x, y, w, h]) => {
      const [sx, sy0] = apply(artSim, [x, y]);
      const c = apply(artSim, [x + w / 2, y + h / 2]);
      const dir = [c[0] - face[0], c[1] - face[1]];
      const len = Math.hypot(dir[0], dir[1]) || 1;
      return { x: sx, y: sy0, w: w * k0, h: h * k0, dx: dir[0] / len, dy: dir[1] / len };
    });

    // the windows
    const L = mode === 'compact' ? 'compact' : 'scroll';
    const ws = wins.map((w) => {
      const d = w[L];
      if (!d) return null;
      // the STA window becomes the screen in scroll mode, so it takes the screen's shape there
      const aspect = w.slug === 'sta' && L === 'scroll' ? W / H : 1.6;
      const nw = 1024;
      const nh = Math.round(nw / aspect);
      w.node.style.width = `${nw}px`;
      w.node.style.height = `${nh}px`;
      const ww = d.w * W;
      // compact: the STA card is as tall as its width allows on a portrait screen
      const wh = ww / aspect;
      const reveal = windowQuad(d.x * W, d.y * H, ww, wh, d.yaw);
      const start = scaleQuad(reveal, 0.08, L === 'scroll' ? face : [W / 2, H * 1.1]);
      return { nw, nh, reveal, start, front: d.front };
    });

    // the portal: its opening holds the STA window at the stage's aspect
    const P = hero.portal;
    const inner = P.inner;
    const innerW = inner[1][0] - inner[0][0];
    const innerH = (inner[3][1] - inner[0][1] + (inner[2][1] - inner[1][1])) / 2;
    const span = L === 'scroll' ? 0.44 : 0.8;
    const px = (span * W) / innerW;
    const py = (span * H) / innerH;
    const ic = [(inner[0][0] + inner[1][0]) / 2, (inner[0][1] + inner[3][1] + inner[1][1] + inner[2][1]) / 4];
    const at = L === 'scroll' ? [0.5 * W, 0.47 * H] : [0.5 * W, 0.46 * H];
    const portal = { px, py, x: at[0] - ic[0] * px, y: at[1] - ic[1] * py, c: at };
    const portalQuad = inner.map(([x, y]) => [portal.x + x * px, portal.y + y * py]);
    // compact has no portal: the card simply comes to the centre
    const selectQuad = L === 'scroll' ? portalQuad : windowQuad(0.5 * W, 0.46 * H, 0.92 * W, (0.92 * W) / 1.6, 0);
    const full = [[-W * 0.01, -H * 0.01], [W * 1.01, -H * 0.01], [W * 1.01, H * 1.01], [-W * 0.01, H * 1.01]];

    G = { artSim, art, layer, planeRects, ws, portal, selectQuad, full, face };
  }

  // ---------- render ----------
  const show = (n, v) => {
    n.style.opacity = v;
    n.style.visibility = v <= 0.001 ? 'hidden' : 'visible';
  };

  function render() {
    const scrollable = track.offsetHeight - H;
    const trackTop = track.getBoundingClientRect().top + window.scrollY;
    const p = scrollable > 0 ? Math.min(1, Math.max(0, (sy - trackTop) / scrollable)) : 0;
    const S = T[mode];
    const compact = mode === 'compact';

    // the finished art
    el.art.style.transform = matrix(G.artSim);
    const layersIn = compact ? 0 : smooth(range(p, ...S.layersIn));
    const artAlpha = compact ? 1 - 0.62 * smooth(range(p, ...S.veil)) : 1 - smooth(range(p, ...S.artOut));
    el.art.style.opacity = artAlpha;
    el.bg.style.opacity = compact ? 0 : 1;
    if (!compact) {
      const sw = range(p, ...S.sweep);
      el.sweep.style.setProperty('--x', `${(-30 + 160 * sw).toFixed(2)}%`);
      el.sweep.style.opacity = sw > 0 && sw < 1 ? Math.sin(sw * Math.PI) : 0;
    }

    const grow = ease(range(p, ...S.grow));
    const peopleOut = compact ? 0 : smooth(range(p, ...S.peopleOut));
    const sel = ease(range(p, ...S.select));

    if (!compact) {
      // unfold: planes drift apart, the portrait recedes ~5 %, Josean barely moves
      const u = ease(range(p, ...S.unfold));
      G.planeRects.forEach((r, i) => {
        const d = (70 + (i % 3) * 40) * u;
        planes[i].style.transform = `translate3d(${(r.x + r.dx * d).toFixed(1)}px, ${(r.y + r.dy * d).toFixed(1)}px, 0)`;
        planes[i].style.width = `${r.w.toFixed(1)}px`;
        planes[i].style.height = `${r.h.toFixed(1)}px`;
        planes[i].style.opacity = smooth(range(p, 0.12, 0.22)) * (0.85 - 0.35 * u) * (1 - sel * 0.6) * (1 - peopleOut);
      });
      const P = G.layer.portrait;
      const k = 1 - 0.05 * u;
      const pc = apply(P.sim, [P.w / 2, P.h / 2]);
      const ps = sim(P.sim.s * k, P.sim.r, pc[0] + (P.sim.x - pc[0]) * k + 18 * u, pc[1] + (P.sim.y - pc[1]) * k - 10 * u);
      el.portrait.style.width = el.rim.style.width = `${P.w}px`;
      el.portrait.style.height = el.rim.style.height = `${P.h}px`;
      el.portrait.style.transform = el.rim.style.transform = matrix(ps);
      show(el.portrait, Math.max(layersIn, 0) * (1 - 0.7 * sel) * (1 - peopleOut));
      show(el.rim, rim > 0 && rim < 1 ? 1 : 0);
      el.rim.style.setProperty('--rim', rim.toFixed(3));
      const J = G.layer.josean;
      el.josean.style.width = `${J.w}px`;
      el.josean.style.height = `${J.h}px`;
      el.josean.style.transform = matrix(sim(J.sim.s, J.sim.r, J.sim.x + 6 * u, J.sim.y));
      show(el.josean, layersIn * (1 - 0.6 * sel) * (1 - peopleOut));
    }

    // the windows: emerge, give way to STA, and STA becomes the screen
    const [w0, w1] = S.windows;
    wins.forEach((w, i) => {
      const g = G.ws[i];
      if (!g) {
        show(w.node, 0);
        return;
      }
      const t = ease(range(p, w0 + STAGGER[i], w0 + STAGGER[i] + (w1 - w0) * 0.55));
      let q = mixQuad(g.start, g.reveal, t);
      let alpha = smooth(t) * (g.front ? 1 : 0.7);
      let filter = g.front ? '' : 'blur(1.5px) brightness(0.7)';
      if (w.slug === 'sta') {
        q = mixQuad(q, G.selectQuad, sel);
        if (grow > 0) {
          const kq = compact ? 1 : 1 + 3.2 * grow * grow;
          const grown = compact ? q : scaleQuad(q, kq, G.portal.c);
          q = mixQuad(grown, G.full, smooth(range(p, ...S.rectify)));
        }
        alpha = Math.max(alpha, sel) * (compact ? 1 - smooth(range(p, ...S.cardOut)) : 1);
        filter = '';
        w.node.style.setProperty('--edge', (1 - smooth(range(p, ...S.edge))).toFixed(3));
        w.next.style.opacity = smooth(range(p, ...S.content));
      } else {
        // the others lose scale and light, then leave
        const c = centre(q);
        const away = [c[0] - W / 2, c[1] - H / 2];
        q = scaleQuad(q, 1 - 0.18 * sel).map(([x, y]) => [x + away[0] * 0.12 * sel, y + away[1] * 0.12 * sel]);
        alpha *= (1 - 0.6 * sel) * (1 - smooth(range(p, 0.74, 0.84)));
        if (sel > 0) filter = `blur(${(1.5 + 1.5 * sel).toFixed(2)}px) brightness(${(0.7 - 0.2 * sel).toFixed(2)})`;
      }
      w.node.style.transform = quadMatrix(g.nw, g.nh, q);
      w.node.style.filter = filter;
      w.node.style.zIndex = w.slug === 'sta' ? 3 : g.front ? 2 : 1;
      show(w.node, alpha);
      if (w.slug === 'sta') G.staQuad = q;
    });

    // the portal frames STA, then passes the camera
    if (!compact) {
      const kq = 1 + 3.2 * grow * grow;
      const Pp = G.portal;
      const cx = Pp.c[0];
      const cy = Pp.c[1];
      el.portal.style.transform = `matrix(${(Pp.px * kq).toFixed(5)}, 0, 0, ${(Pp.py * kq).toFixed(5)}, ${(cx + (Pp.x - cx) * kq).toFixed(2)}, ${(cy + (Pp.y - cy) * kq).toFixed(2)})`;
      show(el.portal, smooth(range(p, ...S.portalIn)) * (1 - smooth(range(p, ...S.portalOut))));
    }
    el.tint.style.opacity = smooth(range(p, ...S.tint));

    // compact: the image opens from the card to the whole screen
    if (compact && G.staQuad) {
      const f = ease(range(p, ...S.full));
      const xs = G.staQuad.map((c) => c[0]);
      const ys = G.staQuad.map((c) => c[1]);
      const ins = [Math.min(...ys), W - Math.max(...xs), H - Math.max(...ys), Math.min(...xs)].map((v) => Math.max(0, v * (1 - f)));
      el.full.style.clipPath = `inset(${ins.map((v) => `${v.toFixed(1)}px`).join(' ')})`;
      show(el.full, smooth(range(p, ...S.fullIn)));
    }

    // the light: along the floor, up to the face, then to the STA window
    if (!compact) {
      const d = ease(range(p, ...S.light));
      const pts = LIGHT.map((q) => apply(G.artSim, q));
      const q = G.staQuad;
      if (q && p > S.windows[0]) pts.push(q[3], [lerp(q[3][0], q[2][0], 0.5), lerp(q[3][1], q[2][1], 0.5)]);
      el.lightPath.setAttribute('d', curve(pts));
      el.lightPath.setAttribute('pathLength', '1');
      el.lightPath.style.strokeDasharray = `${d.toFixed(4)} 1`;
      el.light.style.opacity = d > 0 ? 1 - smooth(range(p, 0.7, 0.8)) : 0;
    }

    // copy and captions: they keep their place, fade and move at most 40 px
    const co = range(p, ...S.copyOut);
    el.copy.style.opacity = 1 - co;
    el.copy.style.visibility = co >= 1 ? 'hidden' : 'visible';
    el.copy.style.transform = `translate3d(0, ${(-40 * ease(co)).toFixed(1)}px, 0)`;
    for (const [name, node] of Object.entries(el.captions)) {
      const v = windowed(p, ...S.captions[name]);
      show(node, v);
      node.style.transform = `translate3d(0, ${((1 - v) * 16).toFixed(1)}px, 0)`;
      node.classList.toggle('is-live', v > 0.6);
    }
    el.progress.style.transform = `scaleX(${p.toFixed(4)})`;
    el.progress.parentElement.style.opacity = 1 - range(p, 0.9, 1);
    el.cue.style.opacity = 1 - range(p, 0, 0.04);
  }

  // ---------- loop ----------
  function frame() {
    raf = 0;
    const diff = target - sy;
    // long jumps (anchor links, a hash on arrival) land at once instead of crawling through the scene
    sy = Math.abs(diff) < 0.5 || Math.abs(diff) > H * 1.5 ? target : sy + diff * SMOOTH;
    render();
    if (sy !== target) raf = requestAnimationFrame(frame);
  }
  const kick = () => {
    if (!raf && mode !== 'static') raf = requestAnimationFrame(frame);
  };

  // the silver light along the portrait's edge, once, after the first paint (1.4 s, never blocking)
  function playRim() {
    if (mode !== 'scroll') return;
    const t0 = performance.now() + 350;
    const step = (now) => {
      rim = Math.min(1, Math.max(0, (now - t0) / 1400));
      render();
      if (rim < 1 && mode === 'scroll') requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  // ---------- modes ----------
  const STYLED = () => [
    el.art, el.bg, el.portrait, el.rim, el.sweep, el.full, el.josean, el.portal, el.tint, el.light, el.copy, el.progress, el.progress.parentElement, el.cue,
    ...Object.values(el.captions), ...planes, ...wins.map((w) => w.node), ...wins.map((w) => w.next).filter(Boolean),
  ];
  function setMode(next) {
    if (next === mode) return;
    mode = next;
    root.classList.remove('hero-scroll', 'hero-compact', 'hero-static');
    root.classList.add(`hero-${mode}`);
    root.classList.toggle('motion-ok', !media.reduced.matches);
    STYLED().forEach((n) => n?.removeAttribute('style'));
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    if (mode === 'static') {
      root.classList.remove('hero-live');
      return;
    }
    root.classList.add('hero-live'); // hidden-until-animated states only apply from here
    loadScene();
    refresh();
  }
  function refresh() {
    if (mode === 'static') return;
    measure();
    target = sy = window.scrollY;
    render();
  }

  setMode(currentMode());
  if (window.scrollY < 10) playRim();

  window.addEventListener(
    'scroll',
    () => {
      target = window.scrollY;
      kick();
    },
    { passive: true },
  );
  let resizeTimer = 0;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const next = currentMode();
      if (next !== mode) setMode(next);
      else refresh();
    }, 120);
  });
  for (const q of Object.values(media)) q.addEventListener?.('change', () => setMode(currentMode()) || refresh());
  window.addEventListener('load', refresh, { once: true });
  document.fonts?.ready.then(refresh);
}

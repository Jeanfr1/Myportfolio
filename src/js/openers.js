// Sector openers. While an opener is pinned, its progress (--o, 0 → 1) drives the giant title and
// the ghost line in CSS, and a canvas of particles tells the sector in objects from its own sites:
// a loose cloud gathers into the first object (the Chez TonTon bottle, the Rumi signature …),
// re-forms as the second (the Cabane glass, the Lovinspoon sandwich), and scatters upwards as the
// sites arrive. The pointer pushes the dots aside. Points come from scripts/emblems.py.
// A canvas only runs while its opener is on screen; with reduced motion it draws the first object
// once, still.
import { media, clamp01, onScrollFrame } from './motion.js';

const EMBLEMS = import.meta.glob('../data/emblems/*.json', { import: 'default' });
const load = (id) => EMBLEMS[`../data/emblems/${id}.json`]?.();

function decode(json, n) {
  const raw = atob(json.points);
  const pts = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const o = (i % json.n) * 5;
    pts[i * 3] = (raw.charCodeAt(o) | (raw.charCodeAt(o + 1) << 8)) / 65535;
    pts[i * 3 + 1] = (raw.charCodeAt(o + 2) | (raw.charCodeAt(o + 3) << 8)) / 65535;
    pts[i * 3 + 2] = raw.charCodeAt(o + 4) / 255;
  }
  return pts;
}

// the opener's colour, as r,g,b, mixed with the site's silver so every sector stays in one family
function tint(el) {
  const c = getComputedStyle(el).getPropertyValue('--cat').trim() || '#61b8ff';
  const n = parseInt(c.slice(1), 16);
  const mix = (v, s) => Math.round(v * 0.55 + s * 0.45);
  return [mix((n >> 16) & 255, 220), mix((n >> 8) & 255, 227), mix(n & 255, 233)];
}

class Field {
  constructor(opener, shapes) {
    this.el = opener;
    this.canvas = opener.querySelector('.opener-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.shapes = shapes; // [{ pts, aspect }]
    this.n = shapes[0].pts.length / 3;
    this.x = new Float32Array(this.n);
    this.y = new Float32Array(this.n);
    this.vx = new Float32Array(this.n);
    this.vy = new Float32Array(this.n);
    this.seed = new Float32Array(this.n).map(() => Math.random());
    this.cloud = new Float32Array(this.n * 2).map(() => Math.random());
    this.rgb = tint(opener);
    this.pointer = { x: -1e4, y: -1e4 };
    this.p = 0;
    this.running = false;
    this.resize();
    // start as a cloud
    for (let i = 0; i < this.n; i++) {
      const [x, y] = this.cloudAt(i, 0);
      this.x[i] = x;
      this.y[i] = y;
    }
    opener.addEventListener('pointermove', (e) => {
      const r = this.canvas.getBoundingClientRect();
      this.pointer.x = (e.clientX - r.left) * this.dpr;
      this.pointer.y = (e.clientY - r.top) * this.dpr;
    });
    opener.addEventListener('pointerleave', () => {
      this.pointer.x = this.pointer.y = -1e4;
    });
  }

  resize() {
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    const r = this.canvas.getBoundingClientRect();
    this.W = Math.max(1, Math.round(r.width * this.dpr));
    this.H = Math.max(1, Math.round(r.height * this.dpr));
    this.canvas.width = this.W;
    this.canvas.height = this.H;
    // where the objects stand: right of the text on wide screens, under it on phones
    const wide = r.width >= 900;
    this.box = wide
      ? { cx: this.W * 0.7, cy: this.H * 0.53, s: Math.min(this.H * 0.74, this.W * 0.44) }
      : { cx: this.W * 0.5, cy: this.H * 0.79, s: Math.min(this.H * 0.34, this.W * 0.8) };
    this.dot = (wide ? 1.5 : 1.3) * this.dpr;
  }

  cloudAt(i, up) {
    const { cx, cy, s } = this.box;
    const a = this.cloud[i * 2] * Math.PI * 2;
    const r = Math.sqrt(this.cloud[i * 2 + 1]) * s * 0.78;
    return [cx + Math.cos(a) * r * 1.25, cy + Math.sin(a) * r * 0.7 - up * s * (0.6 + this.seed[i] * 0.8)];
  }

  shapeAt(k, i) {
    const { pts } = this.shapes[k];
    const { cx, cy, s } = this.box;
    return [cx + (pts[i * 3] - 0.5) * s, cy + (pts[i * 3 + 1] - 0.5) * s];
  }

  // which target a dot follows at progress p: each dot has its own small delay, so the shapes
  // form and re-form in waves rather than all at once
  target(i, p) {
    const d = this.seed[i] * 0.1;
    const two = this.shapes.length > 1;
    if (p > 0.88 + d * 0.6) return this.cloudAt(i, clamp01((p - 0.88) / 0.12));
    if (two && p > 0.5 + d) return this.shapeAt(1, i);
    if (p > 0.1 + d) return this.shapeAt(0, i);
    return this.cloudAt(i, 0);
  }

  step(t) {
    const { n, x, y, vx, vy, seed, pointer } = this;
    const R = 110 * this.dpr;
    const R2 = R * R;
    for (let i = 0; i < n; i++) {
      let [tx, ty] = this.target(i, this.p);
      tx += Math.sin(t * 0.0011 + seed[i] * 40) * 1.6 * this.dpr;
      ty += Math.cos(t * 0.0013 + seed[i] * 31) * 1.6 * this.dpr;
      let ax = (tx - x[i]) * 0.045;
      let ay = (ty - y[i]) * 0.045;
      const dx = x[i] - pointer.x;
      const dy = y[i] - pointer.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < R2) {
        const f = (1 - Math.sqrt(d2) / R) ** 2 * 5;
        const inv = 1 / (Math.sqrt(d2) + 0.001);
        ax += dx * inv * f;
        ay += dy * inv * f;
      }
      vx[i] = (vx[i] + ax) * 0.83;
      vy[i] = (vy[i] + ay) * 0.83;
      x[i] += vx[i];
      y[i] += vy[i];
    }
  }

  draw() {
    const { ctx, n, x, y, dot } = this;
    const [r, g, b] = this.rgb;
    ctx.clearRect(0, 0, this.W, this.H);
    ctx.globalCompositeOperation = 'lighter';
    // brightness in a few bands: one fill style per band
    const shape = this.shapes[this.p > 0.5 && this.shapes.length > 1 ? 1 : 0].pts;
    const fade = this.p > 0.9 ? 1 - (this.p - 0.9) * 6 : 1;
    const ALPHA = [0.1, 0.24, 0.44, 0.7, 1];
    for (let band = 0; band < 5; band++) {
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${(ALPHA[band] * fade).toFixed(3)})`;
      const lo = band / 5;
      const hi = lo + 0.2;
      const size = dot * (0.85 + band * 0.14);
      for (let i = 0; i < n; i++) {
        const v = shape[i * 3 + 2];
        if (v < lo || v >= hi + (band === 4 ? 0.01 : 0)) continue;
        ctx.fillRect(x[i], y[i], size, size);
      }
    }
    ctx.globalCompositeOperation = 'source-over';
  }

  // the still version (reduced motion): the first object, drawn once
  still() {
    for (let i = 0; i < this.n; i++) {
      const [tx, ty] = this.shapeAt(0, i);
      this.x[i] = tx;
      this.y[i] = ty;
    }
    this.p = 0.3;
    this.draw();
  }

  start() {
    if (this.running) return;
    this.running = true;
    const tick = (t) => {
      if (!this.running) return;
      this.step(t);
      this.draw();
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  stop() {
    this.running = false;
  }
}

export function initOpeners() {
  const openers = [...document.querySelectorAll('[data-opener]')];
  if (!openers.length) return;
  const root = document.documentElement;
  const fields = new Map();

  // --o: progress through the pinned opener
  onScrollFrame(() => {
    const vh = window.innerHeight;
    for (const o of openers) {
      const r = o.getBoundingClientRect();
      if (r.bottom < -vh || r.top > vh * 2) continue;
      const span = o.offsetHeight - vh;
      const p = media.reduced.matches ? 0.3 : span > 0 ? clamp01(-r.top / span) : clamp01((vh - r.top) / (vh + r.height));
      o.style.setProperty('--o', p.toFixed(4));
      const f = fields.get(o);
      if (f) f.p = p;
    }
  });

  const counts = () => {
    const w = window.innerWidth;
    return w >= 1200 ? 4200 : w >= 768 ? 3000 : 1800;
  };

  async function build(o) {
    if (fields.has(o)) return fields.get(o);
    fields.set(o, null);
    const ids = (o.dataset.emblems || '').split(',').filter(Boolean);
    if (!ids.length || !o.querySelector('.opener-canvas')) return null;
    const data = await Promise.all(ids.map(load));
    const n = counts();
    const f = new Field(
      o,
      data.filter(Boolean).map((d) => ({ pts: decode(d, n), aspect: d.aspect })),
    );
    fields.set(o, f);
    root.classList.add('particles-on');
    if (media.reduced.matches) f.still();
    return f;
  }

  // load the points a little before the opener arrives; run only while it is on screen
  const io = new IntersectionObserver(
    (entries) => {
      for (const en of entries) {
        const o = en.target;
        if (en.isIntersecting) {
          build(o).then((f) => {
            if (f && !media.reduced.matches && o.dataset.visible === '1') f.start();
          });
        }
      }
    },
    { rootMargin: '100% 0px' },
  );
  const vis = new IntersectionObserver((entries) => {
    for (const en of entries) {
      const o = en.target;
      o.dataset.visible = en.isIntersecting ? '1' : '0';
      const f = fields.get(o);
      if (!f) continue;
      if (en.isIntersecting && !media.reduced.matches) f.start();
      else f.stop();
    }
  });
  openers.forEach((o) => {
    io.observe(o);
    vis.observe(o);
  });

  let rt = 0;
  window.addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(() => {
      for (const f of fields.values()) {
        if (!f) continue;
        f.resize();
        if (media.reduced.matches) f.still();
      }
    }, 150);
  });
}

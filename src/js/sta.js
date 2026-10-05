// 01 · Automotives STA: car -> scan -> engine (roteiro-animacao.md, Ato 2).
// The chapter opens on the image the hero ended with. A blue line scans the body from right to
// left (behind it the car reads as scanned), then the engine takes the scene behind a vertical
// edge with a short change of scale. The case text appears once the composition settles.
import { media, range, ease, onScrollFrame } from './motion.js';

export function initSta() {
  const track = document.querySelector('[data-sta-track]');
  const stage = document.querySelector('[data-sta-stage]');
  if (!track || !stage) return;
  const states = [...stage.querySelectorAll('[data-state]')];
  const live = () => !media.reduced.matches && document.documentElement.classList.contains('hero-live');

  let last = -1;
  onScrollFrame((y) => {
    if (!live()) {
      for (const k of ['--scan', '--engine', '--copy']) stage.style.removeProperty(k);
      setState(1);
      return;
    }
    const top = track.getBoundingClientRect().top + y;
    const span = track.offsetHeight - window.innerHeight;
    const q = span > 0 ? Math.min(1, Math.max(0, (y - top) / span)) : 0;
    const scan = 1 - ease(range(q, 0.1, 0.46));
    const engine = ease(range(q, 0.52, 0.8));
    stage.style.setProperty('--scan', scan.toFixed(4));
    stage.style.setProperty('--engine', engine.toFixed(4));
    stage.style.setProperty('--copy', range(q, 0.06, 0.16).toFixed(4));
    setState(engine > 0.5 ? 2 : scan < 0.95 ? 1 : 0);
  });

  function setState(i) {
    if (i === last) return;
    last = i;
    states.forEach((s, j) => {
      s.classList.toggle('is-active', j === i);
      if (j === i) s.setAttribute('aria-current', 'step');
      else s.removeAttribute('aria-current');
    });
  }
}

// Scene progress for the chapters after STA: each [data-scene] gets --p from 0 (its top meets
// the bottom of the viewport) to 1 (its bottom leaves the top). CSS turns --p into each study's
// own gesture: the orbit, the stroke, the blade of light, the cut of light, the planes.
// With reduced motion nothing is set and CSS keeps every scene in its final state (--p: 1).
import { media, onScrollFrame } from './motion.js';

export function initScenes() {
  const scenes = [...document.querySelectorAll('[data-scene]')];
  if (!scenes.length) return;
  onScrollFrame(() => {
    if (media.reduced.matches) {
      scenes.forEach((s) => s.style.removeProperty('--p'));
      return;
    }
    const vh = window.innerHeight;
    for (const s of scenes) {
      const r = s.getBoundingClientRect();
      if (r.bottom < -vh || r.top > vh * 2) continue;
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      s.style.setProperty('--p', p.toFixed(4));
    }
  });
}

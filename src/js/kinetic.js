// Kinetic text: a sentence whose words light up one after the other as it crosses the screen
// (the manifesto lines of the social section and the sector openers). The words stay real text in
// one paragraph; CSS reads --wp (0 → 1) and each word's index. With reduced motion every word is lit.
import { media, clamp01, onScrollFrame } from './motion.js';

export function initKinetic() {
  const lines = [...document.querySelectorAll('[data-words]')];
  if (!lines.length) return;
  for (const el of lines) {
    const words = el.textContent.trim().split(/\s+/);
    el.textContent = '';
    words.forEach((w, i) => {
      const s = document.createElement('span');
      s.className = 'w';
      s.style.setProperty('--i', i);
      s.textContent = w;
      el.append(s, i < words.length - 1 ? ' ' : '');
    });
    el.style.setProperty('--n', words.length);
    el.classList.add('is-split');
  }
  onScrollFrame(() => {
    const vh = window.innerHeight;
    for (const el of lines) {
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) continue;
      const p = media.reduced.matches ? 1 : clamp01((vh * 0.88 - r.top) / (vh * 0.5));
      el.style.setProperty('--wp', p.toFixed(3));
    }
  });
}

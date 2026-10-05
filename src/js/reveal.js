// Editorial entrances (roteiro: 500–800 ms, 16–28 px). The hidden state only applies once this
// module runs (class reveal-on), so a failed script never hides content.
import { media } from './motion.js';

export function initReveal() {
  if (!('IntersectionObserver' in window) || media.reduced.matches) return;
  document.documentElement.classList.add('reveal-on');
  const io = new IntersectionObserver(
    (entries) => {
      for (const en of entries) {
        if (!en.isIntersecting) continue;
        en.target.classList.add('is-visible');
        io.unobserve(en.target);
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
  );
  document.querySelectorAll('[data-reveal]').forEach((n) => io.observe(n));
}

// Header: light over the hero, solid once the hero has passed; the current section in the nav.
import { onScrollFrame } from './motion.js';

export function initHeader() {
  const header = document.querySelector('[data-header]');
  const track = document.querySelector('[data-hero-track]');
  if (!header) return;
  onScrollFrame(() => {
    const limit = track ? track.getBoundingClientRect().bottom : window.innerHeight;
    header.classList.toggle('is-solid', limit <= header.offsetHeight + 1);
  });

  const links = [...header.querySelectorAll('[data-nav]')];
  const sections = links.map((a) => document.getElementById(a.dataset.nav)).filter(Boolean);
  const visible = new Map();
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => visible.set(en.target.id, en.isIntersecting));
      const current = sections.find((s) => visible.get(s.id));
      links.forEach((a) => {
        if (current && a.dataset.nav === current.id) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  sections.forEach((s) => io.observe(s));
}

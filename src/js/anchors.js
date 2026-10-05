// In-page links. Long jumps (e.g. "Explorar projetos", which crosses the pinned hero) are
// instant; short ones are smooth when motion is allowed. Focus follows the jump.
import { media } from './motion.js';

export function scrollToTarget(el, { focus = true } = {}) {
  if (!el) return;
  const header = document.querySelector('[data-header]')?.offsetHeight || 0;
  const pinned = el.matches('.chapter, .projects');
  let top = el.id === 'inicio' ? 0 : Math.round(el.getBoundingClientRect().top + window.scrollY - (pinned ? 0 : header));
  // the STA chapter shows its text once the scene settles: land there, not on its first frame
  const sta = document.querySelector('[data-sta-track]');
  if ((el.id === 'projetos' || el.id === 'sta') && sta && document.documentElement.classList.contains('hero-live')) {
    top = Math.round(sta.getBoundingClientRect().top + window.scrollY + 0.2 * (sta.offsetHeight - window.innerHeight));
  }
  const distance = Math.abs(top - window.scrollY);
  if (focus) {
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
  }
  if (distance < 1) return;
  const smooth = !media.reduced.matches && distance < window.innerHeight * 2;
  window.scrollTo({ top, behavior: smooth ? 'smooth' : 'auto' });
}

export function initAnchors() {
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey) return;
    const hash = link.getAttribute('href');
    if (hash.length < 2) return;
    const target = document.querySelector(hash);
    if (!target) return;
    event.preventDefault();
    if (history.replaceState) history.replaceState(null, '', hash);
    scrollToTarget(target, { focus: hash !== '#inicio' });
  });
  // arriving with a hash: the hero track only has its final height once styles apply
  if (location.hash.length > 1) {
    const target = document.querySelector(location.hash);
    if (target) window.addEventListener('load', () => scrollToTarget(target, { focus: false }), { once: true });
  }
}

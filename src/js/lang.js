// Language switch (PT · EN · FR). On wide screens it is a plain row of links; on phones the globe
// button opens the same links as a small menu. Picking a language remembers it, so the root
// page stops guessing, and keeps the section the visitor was reading (#sobre stays #sobre).
import { STORAGE_KEY } from '../i18n/locales.js';

export function initLang() {
  const root = document.querySelector('[data-lang]');
  if (!root) return;
  const toggle = root.querySelector('[data-lang-toggle]');

  const setOpen = (open) => {
    root.classList.toggle('is-open', open);
    toggle?.setAttribute('aria-expanded', String(open));
  };
  toggle?.addEventListener('click', () => {
    const open = !root.classList.contains('is-open');
    setOpen(open);
    if (open) root.querySelector('[aria-current="page"]')?.focus();
  });
  document.addEventListener('click', (event) => {
    if (!root.contains(event.target)) setOpen(false);
  });
  root.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !root.classList.contains('is-open')) return;
    setOpen(false);
    toggle?.focus();
  });
  root.addEventListener('focusout', (event) => {
    if (!root.contains(event.relatedTarget)) setOpen(false);
  });

  root.querySelectorAll('[data-lang-link]').forEach((link) => {
    link.addEventListener('click', () => {
      try {
        localStorage.setItem(STORAGE_KEY, link.dataset.langLink);
      } catch {
        // private mode or blocked storage: the link still works, the choice just isn't kept
      }
      if (location.hash.length > 1) link.hash = location.hash;
    });
  });
}

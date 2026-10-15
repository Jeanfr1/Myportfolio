// The menu on phones and tablets: the four sections in large type over the whole screen.
// Escape, a link or the button closes it; focus goes in on open and back to the button on close.
export function initMenu() {
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  if (!toggle || !menu) return;
  const root = document.documentElement;
  const label = toggle.querySelector('[data-open]');
  const wide = window.matchMedia('(min-width: 900px)');

  const set = (open, { focus = true } = {}) => {
    root.classList.toggle('menu-open', open);
    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    if (label) label.textContent = open ? label.dataset.close : label.dataset.open;
    if (open && focus) menu.querySelector('a')?.focus({ preventScroll: true });
    if (!open && focus) toggle.focus({ preventScroll: true });
  };

  toggle.addEventListener('click', () => set(!menu.classList.contains('is-open')));
  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) set(false, { focus: false });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) set(false);
  });
  // keep Tab inside the open menu (the button stays reachable to close it)
  document.addEventListener('focusin', (e) => {
    if (!menu.classList.contains('is-open')) return;
    if (!menu.contains(e.target) && e.target !== toggle) menu.querySelector('a')?.focus();
  });
  wide.addEventListener?.('change', (e) => e.matches && menu.classList.contains('is-open') && set(false, { focus: false }));
}

// Social media wall: each reel plays a short muted preview while it is on screen (or under the
// pointer); a click opens the full piece, with sound, in a dialog. Only one plays with sound.
import { media } from './motion.js';

const FULL = import.meta.glob('../assets/video/social-*-full.mp4', { eager: true, query: '?url', import: 'default' });
const full = (id) => FULL[`../assets/video/social-${id}-full.mp4`];

export function initSocial() {
  const wall = document.querySelector('[data-reels]');
  const dialog = document.querySelector('[data-player]');
  if (!wall) return;
  const cards = [...wall.querySelectorAll('[data-reel]')];
  const previews = cards.map((c) => c.querySelector('video'));
  const saveData = navigator.connection?.saveData === true;
  const allowed = () => !media.reduced.matches && !saveData && !dialog?.open;

  const play = (v) => allowed() && v.play().catch(() => {});
  const onScreen = new Set();
  const io = new IntersectionObserver(
    (entries) => {
      for (const { target: v, isIntersecting, intersectionRatio } of entries) {
        if (isIntersecting && intersectionRatio > 0.55) {
          onScreen.add(v);
          play(v);
        } else {
          onScreen.delete(v);
          v.pause();
        }
      }
    },
    { threshold: [0, 0.55, 0.8] },
  );
  previews.forEach((v) => io.observe(v));
  cards.forEach((c, i) => c.addEventListener('pointerenter', () => play(previews[i])));

  if (!dialog || typeof dialog.showModal !== 'function') {
    // no <dialog>: the card opens the full video in a new tab
    cards.forEach((c) => c.addEventListener('click', () => window.open(full(c.dataset.reel), '_blank', 'noopener')));
    return;
  }
  const player = dialog.querySelector('[data-player-video]');
  let opener = null;

  function open(card) {
    opener = card;
    previews.forEach((v) => v.pause());
    player.poster = card.querySelector('video').poster;
    player.src = full(card.dataset.reel);
    dialog.showModal();
    document.documentElement.classList.add('player-open');
    player.muted = false;
    player.play().catch(() => {});
  }
  function cleanup() {
    player.pause();
    player.removeAttribute('src');
    player.load();
    document.documentElement.classList.remove('player-open');
    opener?.focus({ preventScroll: true });
    onScreen.forEach(play); // the previews on screen carry on
  }
  cards.forEach((c) => c.addEventListener('click', () => open(c)));
  dialog.querySelector('[data-player-close]').addEventListener('click', () => dialog.close());
  // a click on the backdrop (the dialog itself, outside the frame) closes it
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', cleanup);
}

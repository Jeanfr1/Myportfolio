// The sites' openings, recorded live, play only while they are on screen. They are muted, never
// load before they are needed (preload="none"), and stay on their poster with reduced motion or
// when the visitor asks the browser to save data.
import { media } from './motion.js';

export function initLoops(selector = 'video[data-loop]') {
  const videos = [...document.querySelectorAll(selector)];
  if (!videos.length || !('IntersectionObserver' in window)) return;
  const saveData = navigator.connection?.saveData === true;
  const allowed = () => !media.reduced.matches && !saveData;
  const io = new IntersectionObserver(
    (entries) => {
      for (const { target: v, isIntersecting } of entries) {
        if (isIntersecting && allowed()) {
          v.play().catch(() => {});
        } else if (!v.paused) {
          v.pause();
        }
      }
    },
    { threshold: 0.3 },
  );
  videos.forEach((v) => io.observe(v));
  media.reduced.addEventListener?.('change', () => videos.forEach((v) => v.pause()));
}

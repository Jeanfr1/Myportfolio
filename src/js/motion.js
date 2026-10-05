// Shared media queries and small math helpers.
export const media = {
  reduced: window.matchMedia('(prefers-reduced-motion: reduce)'),
  // the pinned, layered hero needs room; below this the shorter "compact" scene runs
  wide: window.matchMedia('(min-width: 1024px) and (min-height: 600px)'),
  // the vertical hero art (hero-mobile) is used below this width (same query as the <picture> source)
  small: window.matchMedia('(max-width: 767px)'),
  // too little height for a pinned scene (e.g. 200 % zoom on a laptop): the hero stays still
  short: window.matchMedia('(max-height: 519px)'),
};

export const clamp01 = (v) => Math.min(1, Math.max(0, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const range = (v, a, b) => clamp01((v - a) / (b - a));
export const smooth = (t) => t * t * (3 - 2 * t);
// long, soft deceleration (roteiro: "aceleração discreta e desaceleração longa")
export const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
// fade in over [a, b], hold, fade out over [c, d]
export const windowed = (v, a, b, c, d) => Math.min(range(v, a, b), 1 - range(v, c, d));

// calls fn(scrollY) once per frame while scrolling, and once on resize
export function onScrollFrame(fn) {
  let ticking = false;
  const run = () => {
    ticking = false;
    fn(window.scrollY);
  };
  const request = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(run);
    }
  };
  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request);
  request();
  return request;
}

// The index of the six studies (desktop): shown while the projects are on screen, with the
// current study marked. It is a plain list of links, so click and keyboard both jump.
export function initRail() {
  const rail = document.querySelector('[data-rail]');
  const projects = document.getElementById('projetos');
  if (!rail || !projects) return;
  const links = [...rail.querySelectorAll('[data-rail-link]')];
  const chapters = links.map((a) => document.getElementById(a.dataset.railLink)).filter(Boolean);
  const root = document.documentElement;

  new IntersectionObserver(([en]) => root.classList.toggle('in-projects', en.isIntersecting), { rootMargin: '-50% 0px -50% 0px' }).observe(projects);

  const visible = new Map();
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => visible.set(en.target.id, en.isIntersecting));
      const current = chapters.find((c) => visible.get(c.id));
      links.forEach((a) => {
        if (current && a.dataset.railLink === current.id) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    },
    { rootMargin: '-50% 0px -50% 0px' },
  );
  chapters.forEach((c) => io.observe(c));
}

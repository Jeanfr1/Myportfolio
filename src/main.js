import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/inter';
import './styles/main.css';

import { initAnchors } from './js/anchors.js';
import { initHeader } from './js/header.js';
import { initHero } from './js/hero.js';
import { initSta } from './js/sta.js';
import { initScenes } from './js/scenes.js';
import { initRail } from './js/rail.js';
import { initReveal } from './js/reveal.js';
import { initLang } from './js/lang.js';

const year = document.querySelector('[data-year]');
if (year) year.textContent = String(new Date().getFullYear());

initAnchors();
initHeader();
initLang();
initHero();
initSta();
initScenes();
initRail();
initReveal();

import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/inter';
import './styles/main.css';
import './styles/work.css';

import { initAnchors } from './js/anchors.js';
import { initHeader } from './js/header.js';
import { initHero } from './js/hero.js';
import { initSta } from './js/sta.js';
import { initScenes } from './js/scenes.js';
import { initRail } from './js/rail.js';
import { initReveal } from './js/reveal.js';
import { initLang } from './js/lang.js';
import { initMenu } from './js/menu.js';
import { initOpeners } from './js/openers.js';
import { initKinetic } from './js/kinetic.js';
import { initLoops } from './js/loops.js';
import { initSocial } from './js/social.js';

const year = document.querySelector('[data-year]');
if (year) year.textContent = String(new Date().getFullYear());

initAnchors();
initHeader();
initLang();
initMenu();
initHero();
initSta();
initScenes();
initOpeners();
initKinetic();
initLoops();
initSocial();
initRail();
initReveal();

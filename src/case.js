import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/inter';
import './styles/main.css';
import './styles/work.css';
import './styles/case.css';

import { initReveal } from './js/reveal.js';
import { initLang } from './js/lang.js';
import { initMenu } from './js/menu.js';
import { initLoops } from './js/loops.js';

const year = document.querySelector('[data-year]');
if (year) year.textContent = String(new Date().getFullYear());
initLang();
initMenu();
initLoops();
initReveal();

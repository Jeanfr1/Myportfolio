import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/inter';
import './styles/main.css';
import './styles/study.css';

import { initReveal } from './js/reveal.js';

const year = document.querySelector('[data-year]');
if (year) year.textContent = String(new Date().getFullYear());
initReveal();

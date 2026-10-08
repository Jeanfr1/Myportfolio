// The six concept studies (roteiro-secoes.md §03–04, roteiro-animacao.md Ato 3, PDF p.5).
// Every one is a conceptual design study: no client, launch, result or rating is claimed.
// This file holds what is the same in every language; the texts of each study (sector, lines,
// direction, movement, role) live in src/i18n/<lang>.js under `studies.<slug>`.
// `prototype` is the published prototype of the study (a real URL, so "Abrir protótipo" is allowed);
// set it to null to hide the link. TODO(portfolio): confirm these prototypes should be public here.
export const projects = [
  {
    slug: 'sta',
    number: '01',
    name: 'Automotives STA',
    accent: '#F12E32',
    prototype: 'https://automotives-sta-st-albans.vercel.app',
    concept: { width: 1024, height: 1536 },
  },
  {
    slug: 'isola',
    number: '02',
    name: 'Isola',
    accent: '#BDCF84',
    prototype: 'https://isola-mosede.vercel.app',
    concept: { width: 1086, height: 1448 },
  },
  {
    slug: 'legend',
    number: '03',
    name: 'Legend Nails',
    accent: '#72775D',
    prototype: 'https://legend-nails-st-albans.vercel.app',
    concept: { width: 1024, height: 1536 },
  },
  {
    slug: 'orhan',
    number: '04',
    name: 'Orhan Barber',
    accent: '#DCE3E9',
    prototype: 'https://orhan-barber-st-albans.vercel.app',
    concept: { width: 1024, height: 1536 },
  },
  {
    slug: 'bayro',
    number: '05',
    name: 'Bayro Cut',
    accent: '#B1BBC3',
    prototype: 'https://bayro-cut-greve.vercel.app',
    concept: { width: 1024, height: 1536 },
  },
  {
    slug: 'mm',
    number: '06',
    name: 'M&M Cleaning',
    accent: '#3F82CE',
    prototype: 'https://mm-cleaning-one.vercel.app',
    concept: null, // no concept mockup in the kit: the study shows the room itself
  },
];

export const LINKEDIN = 'https://www.linkedin.com/in/josean-araujo-3ba63b17b/';

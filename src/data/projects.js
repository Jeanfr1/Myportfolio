// The work: eight sites Josean designed, built and sold to real businesses, grouped by sector.
// This file holds what is the same in every language; every text (sector, lines, direction,
// movement, role) lives in src/i18n/<lang>.js under `cases.<slug>` and `categories.<id>`.
// `url` is the live site (checked on Vercel: the project's production domain, 200).
// Design facts (type, colours, the opening) come from each site's own README. In the portfolio a
// site's block takes its colours: `bg`, `ink`, `accent`; `label` and `button` replace the accent
// where it would fall under 4.5:1 (button text is the site's `bg`).
export const projects = [
  {
    slug: 'sta',
    number: '01',
    name: 'Automotives STA',
    category: 'automotivos',
    url: 'https://automotives-sta-st-albans.vercel.app',
    theme: 'dark',
    bg: '#08090B',
    ink: '#F4F3EF',
    accent: '#E63B32',
    fonts: 'Inter Tight · JetBrains Mono',
    tokens: [['Base', '#08090B'], ['White', '#F4F3EF'], ['Silver', '#ADB4BC'], ['Red', '#E63B32'], ['Scan blue', '#CFE9FF']],
  },
  {
    slug: 'getmoto',
    number: '02',
    name: 'GetMOTO',
    category: 'automotivos',
    url: 'https://getmoto-uk.vercel.app',
    theme: 'dark',
    bg: '#04070D',
    ink: '#FFFFFF',
    accent: '#3D8BFF',
    fonts: 'Poppins',
    tokens: [['Night', '#04070D'], ['Deep', '#070C16'], ['Mist', '#C9D3E6'], ['Electric', '#1A6DFF'], ['Glow', '#3D8BFF']],
  },
  {
    slug: 'tonton',
    number: '03',
    name: 'Chez TonTon',
    category: 'bares',
    url: 'https://chez-tonton-pontchateau5.vercel.app',
    theme: 'light',
    bg: '#F2EBDC',
    ink: '#23211D',
    accent: '#713343',
    fonts: 'Bebas Neue · Inter',
    tokens: [['Papier', '#F2EBDC'], ['Encre', '#23211D'], ['Malt', '#BE934C'], ['Bordeaux', '#713343'], ['Bleu froid', '#24434D']],
  },
  {
    slug: 'cabane',
    number: '04',
    name: 'La Cabane à Mousse',
    category: 'bares',
    url: 'https://cabane-a-mousse-herbignac.vercel.app',
    theme: 'dark',
    bg: '#191918',
    ink: '#F5EBDD',
    accent: '#E67F22',
    fonts: 'Anton · Kaushan Script · Roboto Serif · Montserrat · Oswald',
    tokens: [['Graphite', '#191918'], ['Wood', '#8A5F35'], ['Amber', '#F3B43F'], ['Orange', '#E67F22'], ['Foam', '#F5EBDD']],
  },
  {
    slug: 'rumi',
    number: '05',
    name: 'Rumi Cafe',
    category: 'cafes',
    url: 'https://rumi-cafe-francis-street.vercel.app',
    theme: 'dark',
    bg: '#103E49',
    ink: '#FFF8E9',
    accent: '#D6B76E',
    fonts: 'URW Bookman · Nimbus Sans',
    tokens: [['Teal', '#267B8D'], ['Deep teal', '#103E49'], ['Gold', '#D6B76E'], ['Paper', '#F4EDDE'], ['Coffee', '#241D18']],
  },
  {
    slug: 'lovinspoon',
    number: '06',
    name: 'Lovinspoon',
    category: 'cafes',
    url: 'https://lovinspoon-dublin.vercel.app',
    theme: 'dark',
    bg: '#24231F',
    ink: '#FFFCF5',
    accent: '#E5AF35',
    fonts: 'Lilita One · Caveat · Nimbus Sans',
    tokens: [['Charcoal', '#24231F'], ['Paper', '#F7F0E2'], ['Chalk', '#FFFCF5'], ['Mustard', '#E5AF35'], ['Wood', '#8A5433']],
  },
  {
    slug: 'isola',
    number: '07',
    name: 'isola',
    category: 'sorveteria',
    url: 'https://isola-mosede.vercel.app',
    theme: 'light',
    bg: '#E8EED4',
    ink: '#082A32',
    accent: '#00A99B',
    label: '#006B62', // the brand turquoise is 2.5:1 on pistachio: a deeper one for text
    button: '#082A32',
    fonts: 'Schibsted Grotesk',
    tokens: [['Ink', '#082A32'], ['Turquoise', '#00A99B'], ['Pistacie', '#E8EED4'], ['Mango', '#FFF0BD'], ['Hindbær', '#F9DDE2']],
  },
  {
    slug: 'bayro',
    number: '08',
    name: 'Bayro Cut',
    category: 'barbearia',
    url: 'https://bayro-cut.vercel.app',
    theme: 'dark',
    bg: '#0B0D0C',
    ink: '#F6F2EB',
    accent: '#D5B16F',
    fonts: 'Oswald · Barlow',
    tokens: [['Black', '#0B0D0C'], ['Panel', '#16130F'], ['Gold', '#D5B16F'], ['Gold light', '#EAD09A'], ['Text', '#F6F2EB']],
  },
];

// The sectors, in the order of the page. The hero lands in Automotives STA, so the work opens with
// cars and motorbikes; the other sectors open with a particle emblem made of a real object from
// one of their sites (design/emblems/, sampled by scripts/emblems.py).
export const categories = [
  { id: 'automotivos', number: '01', slugs: ['sta', 'getmoto'], emblems: [], accent: '#E63B32' },
  { id: 'bares', number: '02', slugs: ['tonton', 'cabane'], emblems: ['tonton-bottle', 'cabane-glass'], accent: '#E39A3B' },
  { id: 'cafes', number: '03', slugs: ['rumi', 'lovinspoon'], emblems: ['rumi-signature', 'lovinspoon-sandwich'], accent: '#D6B76E' },
  { id: 'sorveteria', number: '04', slugs: ['isola'], emblems: ['isola-scoop'], accent: '#7FD9CB' },
  { id: 'barbearia', number: '05', slugs: ['bayro'], emblems: ['bayro-clipper'], accent: '#D5B16F' },
];

// Social media: Josean's reels and motion graphics (his own exports, see scripts/capture/social.sh).
export const social = [
  { id: 'reel-mystery', kind: 'reel', seconds: 67 },
  { id: 'motion-mindset', kind: 'motion', seconds: 15 },
  { id: 'motion-menu', kind: 'motion', seconds: 15 },
  { id: 'motion-cafe', kind: 'motion', seconds: 13 },
  { id: 'motion-burger', kind: 'motion', seconds: 12 },
  { id: 'motion-drink', kind: 'motion', seconds: 12 },
];

export const LINKEDIN = 'https://www.linkedin.com/in/josean-araujo-3ba63b17b/';
export const bySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));

// The three languages of the site. Portuguese lives at the root; English and French get their
// own folder, so every page has a real URL in each language (shareable, with its own preview).
// `cases` is where that language's case pages live. Section ids (#projetos, #sobre…) are the
// same in every language: the scripts look them up by id.
export const SITE = 'https://joseanaraujo.com'; // the domain (bought 2026-10-15); josean-araujo.vercel.app redirects here (vercel.json)

export const LOCALES = [
  { code: 'pt', html: 'pt-BR', og: 'pt_BR', label: 'PT', name: 'Português', home: '/', cases: '/projetos/' },
  { code: 'en', html: 'en', og: 'en_GB', label: 'EN', name: 'English', home: '/en/', cases: '/en/work/' },
  { code: 'fr', html: 'fr', og: 'fr_FR', label: 'FR', name: 'Français', home: '/fr/', cases: '/fr/projets/' },
];

export const DEFAULT = 'pt';
// stored when the visitor picks a language; the root page only guesses when nothing is stored
export const STORAGE_KEY = 'lang';

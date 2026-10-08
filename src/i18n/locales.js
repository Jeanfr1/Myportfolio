// The three languages of the site. Portuguese lives at the root; English and French get their
// own folder, so every page has a real URL in each language (shareable, with its own preview).
// `studies` is where that language's study pages live. Section ids (#projetos, #sobre…) are the
// same in every language: the scripts look them up by id.
export const SITE = 'https://josean-araujo.vercel.app'; // TODO(portfolio): change here once there is a final domain

export const LOCALES = [
  { code: 'pt', html: 'pt-BR', og: 'pt_BR', label: 'PT', name: 'Português', home: '/', studies: '/estudos/' },
  { code: 'en', html: 'en', og: 'en_GB', label: 'EN', name: 'English', home: '/en/', studies: '/en/studies/' },
  { code: 'fr', html: 'fr', og: 'fr_FR', label: 'FR', name: 'Français', home: '/fr/', studies: '/fr/etudes/' },
];

export const DEFAULT = 'pt';
// stored when the visitor picks a language; the root page only guesses when nothing is stored
export const STORAGE_KEY = 'lang';

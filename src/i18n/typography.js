// Typographic polish applied to a whole dictionary: curly apostrophes, and in French the
// non-breaking space before : ; ! ? so the sign never starts a line.
const deep = (v, f) => {
  if (typeof v === 'string') return f(v);
  if (typeof v === 'function') return (...args) => f(v(...args));
  if (Array.isArray(v)) return v.map((x) => deep(x, f));
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, deep(x, f)]));
  return v;
};

const curly = (s) => s.replace(/'/g, '’');
const french = (s) => curly(s).replace(/ ([:;!?])/g, ' $1');

export const english = (dict) => deep(dict, curly);
export const frenchTypography = (dict) => deep(dict, french);

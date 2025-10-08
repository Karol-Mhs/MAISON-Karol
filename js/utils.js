// utils.js — shared helper functions

// Normalize text (remove accents, lowercase)
function normalizeText(text) {
  if (!text) return '';
  try {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  } catch (e) {
    return text.toLowerCase();
  }
}

// Expand query with synonyms (future improvement)
function expandQuery(query, synonymsDict = {}) {
  const tokens = normalizeText(query).split(/\s+/).filter(Boolean);
  const expanded = new Set(tokens);
  for (const token of tokens) {
    for (const key in synonymsDict) {
      if (synonymsDict[key].includes(token)) {
        synonymsDict[key].forEach(s => expanded.add(normalizeText(s)));
      }
    }
  }
  return Array.from(expanded).join(' ');
}

export { normalizeText, expandQuery };
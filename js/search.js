// search.js — handles CSV loading + fuzzy search logic
import { normalizeText, expandQuery } from './utils.js';

const RAW_CSV_URL = 'https://raw.githubusercontent.com/jgalazka/SB_publications/main/SB_publication_PMC.csv';
let fuse = null;
let publications = [];

const SYNONYMS = {
  // Placeholder: can later be dynamically loaded or extended with semantic API
  'plant': ['plant', 'plants', 'flora', 'vegetation', 'crop', 'leaf', 'roots'],
  'space': ['space', 'microgravity', 'orbit', 'zero gravity'],
};

async function loadCSV() {
  try {
    // Try local file first
    const response = await fetch('../SB_publication_PMC.csv');
    if (!response.ok) throw new Error('Local CSV not found');
    const text = await response.text();
    processCSV(text);
    console.log('Loaded CSV from local file.');
  } catch {
    // Fallback to GitHub
    console.log('Local CSV not found. Loading from GitHub...');
    const response = await fetch(RAW_CSV_URL);
    const text = await response.text();
    processCSV(text);
  }
}

function processCSV(csvText) {
  const parsed = Papa.parse(csvText, { header: false, skipEmptyLines: true });
  publications = parsed.data.map(row => ({
    title: row[0]?.trim() || '',
    link: row[1]?.trim() || '',
    title_norm: normalizeText(row[0])
  }));

  const fuseOptions = {
    includeScore: true,
    keys: ['title_norm'],
    threshold: 0.45,
    ignoreLocation: true,
    distance: 50
  };
  fuse = new Fuse(publications, fuseOptions);
  console.log(`Indexed ${publications.length} publications`);

}

function searchPublications(query) {
  if (!fuse) return [];
  const expanded = expandQuery(query, SYNONYMS);
  const results = fuse.search(expanded, { limit: 200 });
  return results.map(r => ({ title: r.item.title, link: r.item.link, score: r.score }));
}

function renderResults(results) {
  const container = document.getElementById('results');
  container.innerHTML = '';
  if (results.length === 0) {
    container.innerHTML = '<p>No results found.</p>';
    return;
  }

  results.forEach(r => {
    const div = document.createElement('div');
    div.className = 'row';
    div.innerHTML = `<div class="title">${r.title}</div>
                     <a href="${r.link}" target="_blank">${r.link}</a>`;
    container.appendChild(div);
  });
}

// --- UI bindings ---
window.addEventListener('DOMContentLoaded', () => {
  loadCSV();

  document.getElementById('search-btn').addEventListener('click', () => {
    const q = document.getElementById('search-input').value.trim();
    const results = searchPublications(q);
    renderResults(results);
  });

  document.getElementById('tab-search').addEventListener('click', () => {
    document.getElementById('tab-search').classList.add('active');
    document.getElementById('tab-chat').classList.remove('active');
    document.getElementById('search-section').style.display = '';
    document.getElementById('chat-section').style.display = 'none';
  });

  document.getElementById('tab-chat').addEventListener('click', () => {
    document.getElementById('tab-chat').classList.add('active');
    document.getElementById('tab-search').classList.remove('active');
    document.getElementById('search-section').style.display = 'none';
    document.getElementById('chat-section').style.display = '';
  });
});
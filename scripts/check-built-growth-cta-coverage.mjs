import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const fail = (message) => { console.error(`[built-growth-cta] FAIL ${message}`); process.exitCode = 1; };
const read = (relative) => {
  const file = path.join(dist, relative);
  if (!fs.existsSync(file)) { fail(`missing dist/${relative}; run Astro build first`); return ''; }
  return fs.readFileSync(file, 'utf8');
};
const count = (html, attr, value) => [...html.matchAll(new RegExp(`${attr}=["']${value}["']`, 'g'))].length;

function validateSurface(html, label, required) {
  for (const [attr, value, minimum = 1] of required) {
    const found = count(html, attr, value);
    if (found < minimum) fail(`${label}: ${attr}="${value}" expected >=${minimum}, got ${found}`);
  }
}

// Pure checker contract tests: missing marks and a duplicate lang/category marker must be rejected.
function syntheticCheck(html) {
  const markers = [...html.matchAll(/<a\b[^>]*data-growth="([^"]+)"[^>]*data-lang="([^"]+)"/g)];
  const keys = markers.map((m) => `${m[1]}:${m[2]}`);
  return keys.includes('daily-latest:en') && keys.includes('daily-latest:zh') && new Set(keys).size === keys.length;
}
if (syntheticCheck('<a data-growth="daily-latest" data-lang="en"></a><a data-growth="daily-latest" data-lang="zh"></a>') !== true ||
    syntheticCheck('<a data-growth="daily-latest" data-lang="en"></a>') !== false ||
    syntheticCheck('<a data-growth="daily-latest" data-lang="en"></a><a data-growth="daily-latest" data-lang="en"></a>') !== false) {
  fail('synthetic self-test failed');
}

for (const lang of ['en', 'zh']) {
  const home = read(`${lang}/index.html`);
  validateSurface(home, `${lang} home`, [['data-growth', 'cta-primary'], ['data-growth', 'daily-latest'], ['data-growth', 'daily-rss'], ['data-lang', lang]]);
  const daily = read(`${lang}/daily/index.html`);
  validateSurface(daily, `${lang} daily archive`, [['data-daily-index-growth', 'latest'], ['data-daily-index-growth', 'rss'], ['data-lang', lang]]);
  const index = read(`${lang}/blog/index.html`);
  validateSurface(index, `${lang} blog index`, [['data-growth-link', 'article-index-card']]);
}
const articles = [];
for (const lang of ['en', 'zh']) {
  const dir = path.join(dist, lang, 'blog');
  if (!fs.existsSync(dir)) { fail(`missing dist/${lang}/blog`); continue; }
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory() && entry.name !== 'index.html' && fs.existsSync(path.join(dir, entry.name, 'index.html'))) {
      const html = fs.readFileSync(path.join(dir, entry.name, 'index.html'), 'utf8');
      if (html.includes('data-growth-surface="related-posts"')) {
        const links = [...html.matchAll(/<a\b[^>]*data-growth-link="related-post"[^>]*>/g)];
        if (links.length < 1) fail(`${lang}/${entry.name}: related-post surface has no measurable CTA marks`);
        articles.push(`${lang}/${entry.name}`);
      }
    }
  }
}
if (!articles.length) fail('no built article pages with related-post growth surface found');
if (!process.exitCode) console.log(`[built-growth-cta] PASS: bilingual home/daily/blog index CTA coverage and ${articles.length} article related-post surfaces; synthetic missing/duplicate markers rejected.`);

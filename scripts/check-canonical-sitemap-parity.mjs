import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('dist');
const BASE = 'https://kuoo.uk';
const failures = [];

if (!fs.existsSync(ROOT)) {
  console.error('Canonical sitemap parity check failed: dist output missing; run pnpm build first');
  process.exit(1);
}

function walk(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (entry.isFile() && entry.name === 'index.html') files.push(full);
  }
  return files;
}

function routeForFile(file) {
  const relative = path.relative(ROOT, file).split(path.sep).join('/');
  return `/${relative.replace(/index\.html$/, '')}`;
}

function canonicalFrom(html) {
  const tags = [...html.matchAll(/<link\b[^>]*>/gi)]
    .map((match) => match[0])
    .filter((tag) => /\brel=["'][^"']*\bcanonical\b[^"']*["']/i.test(tag));
  if (tags.length !== 1) return { error: `expected exactly one canonical tag, found ${tags.length}` };
  const href = tags[0].match(/\bhref=["']([^"']+)["']/i)?.[1];
  if (!href) return { error: 'canonical tag has no href' };
  return { href };
}

const sitemapUrls = new Set();
for (const file of fs.readdirSync(ROOT).filter((name) => /^sitemap(?:-\d+)?\.xml$/.test(name))) {
  const xml = fs.readFileSync(path.join(ROOT, file), 'utf8');
  for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) sitemapUrls.add(match[1]);
}
if (sitemapUrls.size === 0) failures.push('no sitemap URLs found in dist');

const pages = walk(ROOT);
for (const file of pages) {
  const route = routeForFile(file);
  const expected = `${BASE}${encodeURI(route)}`;
  const result = canonicalFrom(fs.readFileSync(file, 'utf8'));
  if (result.error) {
    failures.push(`${route}: ${result.error}`);
    continue;
  }
  if (result.href !== expected) failures.push(`${route}: canonical expected ${expected}, got ${result.href}`);
  if (!sitemapUrls.has(result.href)) failures.push(`${route}: canonical missing from sitemap (${result.href})`);
  let parsed;
  try {
    parsed = new URL(result.href);
  } catch {
    failures.push(`${route}: canonical is not a valid URL (${result.href})`);
    continue;
  }
  const target = parsed.pathname === '/'
    ? path.join(ROOT, 'index.html')
    : path.join(ROOT, decodeURIComponent(parsed.pathname).replace(/^\//, ''), 'index.html');
  if (!fs.existsSync(target)) failures.push(`${route}: canonical target is not built (${target})`);
}

if (failures.length) {
  failures.slice(0, 20).forEach((failure) => console.error(`- ${failure}`));
  if (failures.length > 20) console.error(`- ... and ${failures.length - 20} more`);
  console.error(`Canonical sitemap parity check failed with ${failures.length} issue(s)`);
  process.exit(1);
}

console.log(`Canonical sitemap parity check passed: ${pages.length} built pages and ${sitemapUrls.size} sitemap URLs validated`);

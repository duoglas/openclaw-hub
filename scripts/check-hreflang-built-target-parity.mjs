import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('dist');
const BASE = 'https://kuoo.uk';
const LANGUAGE_ROOTS = ['en', 'zh'];

function fail(message) {
  console.error(`❌ ${message}`);
  process.exitCode = 1;
}

function htmlFilesUnder(language) {
  const root = path.join(ROOT, language);
  const files = [];
  function visit(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) visit(full);
      else if (entry.isFile() && entry.name.endsWith('.html')) files.push(full);
    }
  }
  if (fs.existsSync(root)) visit(root);
  return files.sort();
}

function routeForFile(file) {
  const relative = path.relative(ROOT, file).split(path.sep).join('/');
  return `/${relative.replace(/index\.html$/, '')}`;
}

function builtFileForPathname(pathname) {
  const clean = decodeURIComponent(pathname).replace(/^\/+/, '').replace(/\/$/, '');
  return path.join(ROOT, clean, 'index.html');
}

function attrs(tag) {
  const result = {};
  for (const match of tag.matchAll(/([\w:-]+)\s*=\s*(["'])(.*?)\2/gi)) {
    result[match[1].toLowerCase()] = match[3];
  }
  return result;
}

if (!fs.existsSync(ROOT)) fail('dist output missing; run pnpm build first');

const allBlogFiles = LANGUAGE_ROOTS.flatMap(htmlFilesUnder).filter((file) => routeForFile(file).includes('/blog/'));
const blogRoutes = new Set(allBlogFiles.map(routeForFile));
const files = allBlogFiles.filter((file) => {
  const route = routeForFile(file);
  const parts = route.split('/');
  if (parts.length !== 4 || parts[2] !== 'blog') return false;
  const otherLanguage = parts[1] === 'en' ? 'zh' : 'en';
  return blogRoutes.has(route.replace(`/${parts[1]}/`, `/${otherLanguage}/`));
});
if (files.length === 0) fail('no bilingual blog article HTML files found under dist/en/blog or dist/zh/blog');

let checked = 0;
for (const file of files) {
  const route = routeForFile(file);
  const encodedRoute = encodeURI(route);
  const language = route.split('/')[1];
  const alternateLanguage = language === 'en' ? 'zh' : 'en';
  const expectedSelf = `${BASE}${encodedRoute}`;
  const otherRoute = route.replace(`/${language}/`, `/${alternateLanguage}/`);
  const encodedOtherRoute = encodeURI(otherRoute);
  const expectedOther = `${BASE}${encodedOtherRoute}`;
  const expectedDefault = `${BASE}${encodeURI(otherRoute.replace(/^\/zh\//, '/en/'))}`;
  const html = fs.readFileSync(file, 'utf8');
  const links = new Map();

  for (const match of html.matchAll(/<link\b[^>]*>/gi)) {
    const attributes = attrs(match[0]);
    if (!attributes.rel?.toLowerCase().split(/\s+/).includes('alternate') || !attributes.hreflang || !attributes.href) continue;
    const key = attributes.hreflang.trim().toLowerCase();
    if (links.has(key)) fail(`${file}: duplicate hreflang=${key}`);
    links.set(key, attributes.href.trim());
  }

  const expected = new Map([
    [language, expectedSelf],
    [alternateLanguage, expectedOther],
    ['x-default', expectedDefault],
  ]);

  for (const [key, expectedHref] of expected) {
    const actual = links.get(key);
    if (!actual) {
      fail(`${file}: missing hreflang=${key}`);
      continue;
    }
    if (actual !== expectedHref) fail(`${file}: hreflang=${key} expected ${expectedHref}, got ${actual}`);
  }

  for (const [key, href] of links) {
    if (!expected.has(key)) continue;
    let parsed;
    try {
      parsed = new URL(href);
    } catch {
      fail(`${file}: hreflang=${key} is not a valid absolute URL: ${href}`);
      continue;
    }
    if (parsed.origin !== BASE || parsed.search || parsed.hash) {
      fail(`${file}: hreflang=${key} must be a clean kuoo.uk URL: ${href}`);
      continue;
    }
    const target = builtFileForPathname(parsed.pathname);
    if (!fs.existsSync(target)) fail(`${file}: hreflang=${key} target is not built: ${href} (${target})`);
  }
  checked += 1;
}

if (process.exitCode) {
  console.error(`[hreflang-parity] failed after checking ${checked} bilingual pages`);
} else {
  console.log(`[hreflang-parity] passed: ${checked} bilingual pages have reciprocal, built hreflang targets`);
}

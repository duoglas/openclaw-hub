import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = path.join(root, 'dist');

function htmlFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...htmlFiles(full));
    else if (entry.isFile() && entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

function imagePathFromUrl(value) {
  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    throw new Error(`invalid social image URL: ${value}`);
  }
  if (parsed.protocol !== 'https:' || parsed.hostname !== 'kuoo.uk') {
    throw new Error(`social image must use https://kuoo.uk: ${value}`);
  }
  if (parsed.search || parsed.hash || !parsed.pathname.startsWith('/')) {
    throw new Error(`social image must be a clean root-relative URL: ${value}`);
  }
  return path.join(distRoot, decodeURIComponent(parsed.pathname).replace(/^\/+/, ''));
}

function extractImages(html) {
  const values = [];
  const re = /<(?:meta)\b[^>]+(?:property|name)="(?:og:image|twitter:image)"[^>]+content="([^"]+)"[^>]*>/gi;
  for (const match of html.matchAll(re)) values.push(match[1]);
  return values;
}

function runSelfTest() {
  const cases = [
    ['https://kuoo.uk/images/hero.png', 'images/hero.png'],
    ['https://kuoo.uk/images/hero%20card.png', 'images/hero card.png'],
  ];
  for (const [url, expected] of cases) {
    const actual = path.relative(distRoot, imagePathFromUrl(url));
    if (actual !== expected) throw new Error(`self-test mapping mismatch: ${actual}`);
  }
  for (const bad of ['http://kuoo.uk/images/x.png', 'https://example.com/x.png', 'https://kuoo.uk/x.png?q=1']) {
    let failed = false;
    try { imagePathFromUrl(bad); } catch { failed = true; }
    if (!failed) throw new Error(`self-test accepted invalid URL: ${bad}`);
  }
  console.log('Built social-image target self-test passed (valid mapping and invalid URL rejection).');
}

if (process.argv.includes('--self-test')) {
  runSelfTest();
  process.exit(0);
}

for (const lang of ['en', 'zh']) {
  const files = htmlFiles(path.join(distRoot, lang));
  if (files.length === 0) throw new Error(`no built HTML files found under dist/${lang}`);
  for (const file of files) {
    const images = extractImages(fs.readFileSync(file, 'utf8'));
    if (images.length < 2) throw new Error(`missing og:image/twitter:image metadata: ${path.relative(root, file)}`);
    for (const image of images) {
      const target = imagePathFromUrl(image);
      if (!fs.existsSync(target) || !fs.statSync(target).isFile()) {
        throw new Error(`social image target does not exist: ${image} referenced by ${path.relative(root, file)}`);
      }
    }
  }
  console.log(`Built social-image target parity passed for ${lang} (${files.length} pages).`);
}

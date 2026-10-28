import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const adsLine = 'google.com, pub-8837835283235973, DIRECT, f08c47fec0942fa0';
function validateAds(text) {
  const records = text.split(/\r?\n/).map(line => line.trim()).filter(line => line && !line.startsWith('#'));
  assert.deepEqual(records, [adsLine], 'ads.txt must authorize the configured Google publisher exactly once');
}
function validateLinks(html, lang, label) {
  for (const page of ['about', 'privacy', 'contact']) {
    assert.ok(html.includes(`href="/${lang}/${page}/"`), `${label}: missing ${lang} ${page} link`);
  }
}
validateAds(adsLine + '\n');
assert.throws(() => validateAds(adsLine.replace('8837835283235973', '0000000000000000')));
assert.throws(() => validateAds(adsLine + '\n' + adsLine));
const links = ['about', 'privacy', 'contact'].map(page => `<a href="/en/${page}/">${page}</a>`).join('');
validateLinks(links, 'en', 'valid fixture');
assert.throws(() => validateLinks(links.replace('/en/privacy/', '/missing/'), 'en', 'missing privacy fixture'));
console.log('Site foundations validator fixtures: 5 passed');

if (!process.argv.includes('--self-test')) {
  validateAds(readFileSync('public/ads.txt', 'utf8'));
  validateAds(readFileSync('dist/ads.txt', 'utf8'));
  function htmlFiles(dir) {
    return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
      const path = join(dir, entry.name);
      return entry.isDirectory() ? htmlFiles(path) : entry.name.endsWith('.html') ? [path] : [];
    });
  }
  let checked = 0;
  for (const file of htmlFiles('dist')) {
    const html = readFileSync(file, 'utf8');
    const label = relative('dist', file);
    if (/^google[a-f0-9]+\.html$/.test(label) && html.startsWith('google-site-verification:')) continue;
    const langs = label === 'index.html' ? ['en', 'zh'] : [label.startsWith('en/') ? 'en' : 'zh'];
    for (const lang of langs) validateLinks(html, lang, label);
    checked++;
  }
  assert.ok(checked > 0, 'No pages checked');
  for (const lang of ['en', 'zh']) {
    for (const page of ['about', 'privacy', 'contact']) {
      const html = readFileSync(`dist/${lang}/${page}/index.html`, 'utf8');
      assert.ok(html.includes('<h1'), `${lang}/${page}: missing content heading`);
      assert.ok(html.includes(`rel="canonical" href="https://kuoo.uk/${lang}/${page}/"`), `${lang}/${page}: incorrect canonical`);
    }
  }
  for (const page of ['index.html', 'en/index.html', 'zh/index.html']) {
    const html = readFileSync(join('dist', page), 'utf8');
    const hero = [...html.matchAll(/<img\b[^>]*>/g)].map(match => match[0]).find(tag => tag.includes('home-hero-1280.webp'));
    assert.ok(hero, `${page}: missing responsive hero`);
    for (const token of ['home-hero-640.webp 640w', 'home-hero-1280.webp 1280w', 'width="1280"', 'height="714"', 'fetchpriority="high"']) {
      assert.ok(hero.includes(token), `${page}: missing image attribute ${token}`);
    }
  }
  const images = [640, 1280].map(width => {
    const path = `dist/images/home-hero-${width}.webp`;
    const bytes = statSync(path).size;
    assert.ok(bytes > 0 && bytes < 500_000, `${path}: image budget exceeded`);
    const data = readFileSync(path);
    assert.equal(data.toString('ascii', 0, 4), 'RIFF');
    assert.equal(data.toString('ascii', 8, 12), 'WEBP');
    return { width, bytes };
  });
  console.log(`Site foundations: ${checked} pages with information links; 6 bilingual information pages; ads.txt valid`);
  console.log(`Responsive hero assets: ${JSON.stringify(images)}`);
}

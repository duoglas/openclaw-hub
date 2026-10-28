import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const expectedSrc = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8837835283235973';

function attributes(tag) {
  const result = new Map();
  const pattern = /([^\s=<>/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  for (const match of tag.replace(/^<script\b/i, '').replace(/>$/, '').matchAll(pattern)) {
    result.set(match[1].toLowerCase(), match[2] ?? match[3] ?? match[4] ?? '');
  }
  return result;
}

function validate(html, label) {
  const head = /<head\b[^>]*>[\s\S]*?<\/head\s*>/i.exec(html);
  assert.ok(head, `${label}: missing head`);
  const scripts = [...html.matchAll(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi)]
    .map(match => ({ match, attrs: attributes(match[0].slice(0, match[0].indexOf('>') + 1)) }))
    .filter(({ attrs }) => (attrs.get('src') || '').includes('adsbygoogle.js'));
  assert.equal(scripts.length, 1, `${label}: expected exactly one AdSense loader`);
  const { match, attrs } = scripts[0];
  assert.ok(match.index >= head.index && match.index + match[0].length <= head.index + head[0].length,
    `${label}: loader must be inside head`);
  assert.equal(attrs.get('src'), expectedSrc, `${label}: wrong publisher or loader URL`);
  assert.ok(attrs.has('async'), `${label}: loader must be async`);
  assert.equal(attrs.get('crossorigin'), 'anonymous', `${label}: missing anonymous crossorigin`);
}

const loader = `<script async src="${expectedSrc}" crossorigin="anonymous"></script>`;
const documentWith = (head, body = '') => `<!doctype html><html><head>${head}</head><body>${body}</body></html>`;
validate(documentWith(loader), 'valid fixture');
validate(documentWith(loader.replace(' async ', ' async="" ')), 'boolean attribute fixture');
for (const [label, html] of [
  ['missing loader', documentWith('')],
  ['body-only loader', documentWith('', loader)],
  ['duplicate loader', documentWith(loader, loader)],
  ['wrong publisher', documentWith(loader.replace('8837835283235973', '0000000000000000'))],
  ['not async', documentWith(loader.replace(' async', ''))],
  ['missing crossorigin', documentWith(loader.replace(' crossorigin="anonymous"', ''))],
]) {
  assert.throws(() => validate(html, label), undefined, `${label}: regression fixture must fail`);
}
console.log('AdSense validator fixtures: 8 passed');

if (!process.argv.includes('--self-test')) {
  const root = 'dist';
  function htmlFiles(dir) {
    return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
      const path = join(dir, entry.name);
      return entry.isDirectory() ? htmlFiles(path) : entry.name.endsWith('.html') ? [path] : [];
    });
  }
  let checked = 0;
  let verificationFiles = 0;
  for (const file of htmlFiles(root)) {
    const html = readFileSync(file, 'utf8');
    const label = relative(root, file);
    if (/^google[a-f0-9]+\.html$/.test(label) && /^google-site-verification: google[a-f0-9]+\.html\s*$/.test(html.trim())) {
      verificationFiles++;
      continue;
    }
    validate(html, label);
    checked++;
  }
  assert.ok(checked > 0, 'No HTML pages checked; build first');
  console.log(`AdSense head coverage: ${checked} pages passed; ${verificationFiles} Google verification files unchanged`);
}

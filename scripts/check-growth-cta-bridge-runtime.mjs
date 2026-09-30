import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const analytics = await readFile(new URL('../src/components/Analytics.astro', import.meta.url), 'utf8');
const match = analytics.match(/<script\s+is:inline\s+define:vars=\{\{\s*cfToken\s*\}\}[^>]*>([\s\S]*?)<\/script>/);
assert.ok(match, 'could not find the actual inline analytics bridge');
const bridge = match[1];

function executeClick({ marker, href = 'https://example.test/feed?secret=1#private', targetHasClosest = true } = {}) {
  const sent = [];
  const handlers = {};
  const anchor = {
    href,
    getAttribute(name) {
      if (name === 'data-growth-link') return marker ?? null;
      if (name === 'data-daily-index-growth') return null;
      if (name === 'data-lang') return 'en';
      return null;
    }
  };
  const target = targetHasClosest ? { closest: (selector) => selector === 'a[href]' ? anchor : null } : {};
  const document = {
    documentElement: { lang: 'en' },
    addEventListener(name, callback) { handlers[name] = callback; }
  };
  const window = {
    addEventListener() {},
    cloudflareinsights(...args) { sent.push(args); }
  };
  const context = { window, document, location: { pathname: '/en/', href: 'https://example.test/en/?page-secret=2#fragment' }, URL, Object, String };
  vm.runInNewContext(bridge, context, { timeout: 1000 });
  handlers.click({ target });
  return sent;
}

const valid = executeClick({ marker: 'daily-rss' });
assert.equal(valid.length, 1, 'marked click must emit exactly one event');
assert.equal(valid[0][0], 'track');
assert.equal(valid[0][1], 'growth_cta_click');
assert.deepEqual(JSON.parse(JSON.stringify(valid[0][2])), { lang: 'en', path: '/en/', kind: 'daily-rss', href: 'https://example.test/feed', label: 'cta' });
assert.ok(!JSON.stringify(valid).includes('secret'));
assert.ok(!JSON.stringify(valid).includes('private'));
assert.equal(executeClick({ marker: '', targetHasClosest: true }).length, 0, 'unmarked click must not emit a CTA event');
assert.equal(executeClick({ marker: 'bad marker' }).length, 0, 'invalid marker must not emit a CTA event');
assert.equal(executeClick({ marker: 'x'.repeat(65) }).length, 0, 'overlong marker must not emit a CTA event');
assert.equal(executeClick({ marker: 'nested', targetHasClosest: false }).length, 0, 'non-anchor nested target must not emit a CTA event');
console.log('Growth CTA bridge runtime synthetic checks passed (real inline bridge, privacy, marker validation, nested target).');

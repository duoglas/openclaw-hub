import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const analytics = await readFile(new URL('../src/components/Analytics.astro', import.meta.url), 'utf8');
const match = analytics.match(/<script\s+is:inline\s+define:vars=\{\{\s*cfToken\s*\}\}[^>]*>([\s\S]*?)<\/script>/);
assert.ok(match, 'could not find the actual inline analytics bridge');
const bridge = match[1];

function executeClick({ marker, href = 'https://example.test/feed?secret=***#private', targetHasClosest = true, pageHref = 'https://example.test/en/?page-secret=2#fragment' } = {}) {
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
  const page = new URL(pageHref);
  const context = { window, document, location: { pathname: page.pathname, href: page.href, origin: page.origin }, URL, Object, String };
  vm.runInNewContext(bridge, context, { timeout: 1000 });
  handlers.click({ target });
  return sent;
}

const valid = executeClick({ marker: 'daily-rss' });
assert.equal(valid.length, 1, 'marked click must emit exactly one event');
assert.equal(valid[0][0], 'track');
assert.equal(valid[0][1], 'growth_cta_click');
assert.deepEqual(JSON.parse(JSON.stringify(valid[0][2])), { lang: 'en', path: '/en/', kind: 'daily-rss', href: '/feed', label: 'cta' });
assert.ok(!JSON.stringify(valid).includes('secret'));
assert.ok(!JSON.stringify(valid).includes('private'));
assert.equal(executeClick({ marker: '', targetHasClosest: true }).length, 0, 'unmarked click must not emit a CTA event');
assert.equal(executeClick({ marker: 'bad marker' }).length, 0, 'invalid marker must not emit a CTA event');
assert.equal(executeClick({ marker: 'x'.repeat(65) }).length, 0, 'overlong marker must not emit a CTA event');
assert.equal(executeClick({ marker: 'nested', targetHasClosest: false }).length, 0, 'non-anchor nested target must not emit a CTA event');
for (const href of ['javascript:alert(1)', 'data:text/html,hello', 'http://other.test/path']) {
  assert.equal(executeClick({ marker: 'unsafe', href }).filter((event) => event[1] === 'growth_cta_click').length, 0, `${href} must not emit a CTA event`);
}
const sameOriginRelative = executeClick({ marker: 'relative', href: '/feed?secret=1#fragment' });
assert.equal(sameOriginRelative.length, 1, 'same-origin relative CTA must remain tracked');
assert.equal(sameOriginRelative[0][2].href, '/feed');
const secureExternal = executeClick({ marker: 'external', href: 'https://other.test/feed?secret=1#fragment' });
assert.equal(secureExternal.length, 1, 'HTTPS external CTA must remain tracked');
assert.equal(secureExternal[0][2].href, 'https://other.test/feed');
assert.equal(executeClick({ marker: 'malformed', href: 'http://[' }).length, 0, 'malformed URL must not emit an event');
assert.equal(executeClick({ marker: 'local-http', href: '/feed', pageHref: 'http://example.test/en/' }).length, 1, 'same-origin HTTP development route remains allowed');
console.log('Growth CTA bridge runtime synthetic checks passed (destination policy, privacy, marker validation, nested target).');

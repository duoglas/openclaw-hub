import fs from 'node:fs';
import assert from 'node:assert/strict';
const topics=['agents','models','workflows'];
for (const lang of ['en','zh']) {
  const home=fs.readFileSync(`dist/${lang}/index.html`,'utf8');
  assert(home.includes('data-kuoo-hero'),`${lang}: task-oriented home missing`);
  assert(!home.includes('AI Agent Hub'),`${lang}: obsolete site branding`);
  assert(home.indexOf('id="latest-guides"') < home.indexOf('class="news-area'),`${lang}: guides must precede news`);
  for (const topic of topics) {
    assert(home.includes(`href="/${lang}/topics/${topic}/"`),`${lang}: missing topic entry`);
    const page=fs.readFileSync(`dist/${lang}/topics/${topic}/index.html`,'utf8');
    assert(page.includes(`href="https://kuoo.uk/${lang}/topics/${topic}/"`),`${lang}/${topic}: canonical missing`);
    assert(/<article\b[^>]*class="card/.test(page),`${lang}/${topic}: empty topic hub`);
    assert(page.includes(`hreflang="${lang==='en'?'zh':'en'}"`),`${lang}/${topic}: missing language counterpart`);
  }
}
const registry=fs.readFileSync('src/utils/editorialTopics.ts','utf8');
for (const [,chunk] of registry.matchAll(/seeds: \[([^\]]+)\]/g)) {
  for (const [,slug] of chunk.matchAll(/'([^']+)'/g)) {
    for (const lang of ['en','zh']) assert(fs.existsSync(`src/content/blog/${lang}/${slug}.md`),`missing curated article ${lang}/${slug}`);
  }
}
for (const name of fs.readdirSync('editorial/receipts')) {
  if (!name.endsWith('.json')) continue;
  const receipt=JSON.parse(fs.readFileSync(`editorial/receipts/${name}`,'utf8'));
  if (receipt.kind!=='guide') continue;
  for (const lang of ['en','zh']) {
    const topic=fs.readFileSync(`dist/${lang}/topics/${receipt.pillar}/index.html`,'utf8');
    assert(topic.includes(`/${lang}/blog/${receipt.slug}/`),`published guide missing from topic: ${receipt.slug}`);
  }
}
console.log('Editorial surface: six nonempty bilingual topic hubs, curated URL parity, guide discovery and homepage ordering passed.');

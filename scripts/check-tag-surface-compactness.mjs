import fs from 'node:fs';

const files = {
  baseLayout: 'src/layouts/BaseLayout.astro',
  blogPost: 'src/layouts/BlogPost.astro',
  enIndex: 'src/pages/en/index.astro',
  zhIndex: 'src/pages/zh/index.astro',
};

const read = (path) => fs.readFileSync(path, 'utf8');

const checks = [
  {
    file: files.baseLayout,
    label: 'global tag pills are visually bounded',
    tests: [
      ['.tag has max-width cap', /(?::global\()?\.tag\)?\s*\{[\s\S]*max-width:\s*180px;/],
      ['.tag truncates long labels with ellipsis', /(?::global\()?\.tag\)?\s*\{[\s\S]*overflow:\s*hidden;[\s\S]*text-overflow:\s*ellipsis;/],
      ['.tag--more overflow indicator is styled', /(?::global\()?\.tag--more\)?\s*\{/],
    ],
  },
  {
    file: files.blogPost,
    label: 'article pages cap visible tags and preserve tag archive links',
    tests: [
      ['article visibleTags capped at 5', /visibleTags\s*=\s*tags\.slice\(0,\s*5\)/],
      ['article computes hiddenTagCount', /hiddenTagCount\s*=\s*Math\.max\(tags\.length\s*-\s*visibleTags\.length,\s*0\)/],
      ['article renders overflow count pill', /hiddenTagCount\s*>\s*0[\s\S]*tag tag--more[\s\S]*\+\{hiddenTagCount\}/],
      ['article tag links normalize and URI-encode tag slugs', /blog\/tag\/\$\{encodeURIComponent\(tagRouteSlug\(tag\)\)\}\//],
    ],
  },
  {
    file: files.enIndex,
    label: 'English homepage article cards cap tag chips',
    tests: [
      ['EN homepage delegates to shared editorial component', /<EditorialHome lang="en"\s*\/>/],
    ],
  },
  {
    file: files.zhIndex,
    label: 'Chinese homepage article cards cap tag chips',
    tests: [
      ['ZH homepage delegates to shared editorial component', /<EditorialHome lang="zh"\s*\/>/],
    ],
  },
];

const failures = [];
for (const group of checks) {
  const source = read(group.file);
  for (const [name, pattern] of group.tests) {
    if (!pattern.test(source)) {
      failures.push(`${group.file}: missing ${name} (${group.label})`);
    }
  }
}

// The new homepage deliberately shows no per-card tag chips (zero is compact).
// Verify the rendered cards, not obsolete variables in the route wrappers.
for (const lang of ['en', 'zh']) {
  const html = read(`dist/${lang}/index.html`);
  const cards = [...html.matchAll(/<article\b[^>]*class="[^"]*\bentry\b[^"]*"[^>]*>([\s\S]*?)<\/article>/g)];
  if (!cards.length) failures.push(`${lang}: no editorial cards found`);
  if (cards.some((card) => /class="[^"]*\btag\b|\/blog\/tag\//.test(card[1]))) {
    failures.push(`${lang}: homepage tag chips were reintroduced without a compactness policy`);
  }
}

if (failures.length > 0) {
  console.error('Tag surface compactness check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Tag surface compactness check passed.');

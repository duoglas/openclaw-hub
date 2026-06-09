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
      ['.tag has max-width cap', /\.tag\s*\{[\s\S]*max-width:\s*180px;/],
      ['.tag truncates long labels with ellipsis', /\.tag\s*\{[\s\S]*overflow:\s*hidden;[\s\S]*text-overflow:\s*ellipsis;/],
      ['.tag--more overflow indicator is styled', /\.tag--more\s*\{/],
    ],
  },
  {
    file: files.blogPost,
    label: 'article pages cap visible tags and preserve tag archive links',
    tests: [
      ['article visibleTags capped at 5', /visibleTags\s*=\s*tags\.slice\(0,\s*5\)/],
      ['article computes hiddenTagCount', /hiddenTagCount\s*=\s*Math\.max\(tags\.length\s*-\s*visibleTags\.length,\s*0\)/],
      ['article renders overflow count pill', /hiddenTagCount\s*>\s*0[\s\S]*tag tag--more[\s\S]*\+\{hiddenTagCount\}/],
      ['article tag links URI-encode tag slugs', /blog\/tag\/\$\{encodeURIComponent\(tag\)\}\//],
    ],
  },
  {
    file: files.enIndex,
    label: 'English homepage article cards cap tag chips',
    tests: [
      ['EN index visibleTags capped at 3', /visibleTags\s*=\s*post\.data\.tags\.slice\(0,\s*3\)/],
      ['EN index renders overflow count pill', /hiddenTagCount\s*>\s*0[\s\S]*tag tag--more[\s\S]*\+\{hiddenTagCount\}/],
    ],
  },
  {
    file: files.zhIndex,
    label: 'Chinese homepage article cards cap tag chips',
    tests: [
      ['ZH index visibleTags capped at 3', /visibleTags\s*=\s*post\.data\.tags\.slice\(0,\s*3\)/],
      ['ZH index renders overflow count pill', /hiddenTagCount\s*>\s*0[\s\S]*tag tag--more[\s\S]*\+\{hiddenTagCount\}/],
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

if (failures.length > 0) {
  console.error('Tag surface compactness check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Tag surface compactness check passed.');

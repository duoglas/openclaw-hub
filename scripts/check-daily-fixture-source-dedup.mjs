#!/usr/bin/env node
import { readFileSync } from 'node:fs';

const fixtureModule = './fixtures/daily-real-cron-2026-05-24.mjs';
const checkedFiles = [
  'scripts/check-daily-generator-real-cron-fixture.mjs',
  'scripts/check-daily-zh-generator-real-cron-fixture.mjs',
  'scripts/check-daily-bilingual-generator-pair-fixture.mjs',
];

const failures = [];

for (const file of checkedFiles) {
  const source = readFileSync(file, 'utf8');
  if (!source.includes(fixtureModule)) {
    failures.push(`${file} does not import the shared real cron fixture module`);
  }
  if (/const\s+fixture\s*=\s*`《AI、科技日报》/.test(source) || /2026-05-24\n\n## 今日要闻/.test(source)) {
    failures.push(`${file} reintroduced an inline 2026-05-24 cron fixture`);
  }
}

const fixtureSource = readFileSync('scripts/fixtures/daily-real-cron-2026-05-24.mjs', 'utf8');
for (const exportName of ['realCronFixture', 'fixtureDate', 'expectedSignals', 'bannedFallbackPhrases']) {
  if (!fixtureSource.includes(`export const ${exportName}`)) {
    failures.push(`shared fixture module is missing export: ${exportName}`);
  }
}

if (failures.length > 0) {
  console.error('Daily fixture source dedup check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('daily fixture source dedup check passed');

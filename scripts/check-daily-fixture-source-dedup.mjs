#!/usr/bin/env node
import { readFileSync } from 'node:fs';

const fixtureRegistry = './fixtures/daily-real-cron-fixtures.mjs';
const checkedFiles = [
  'scripts/check-daily-generator-real-cron-fixture.mjs',
  'scripts/check-daily-zh-generator-real-cron-fixture.mjs',
  'scripts/check-daily-bilingual-generator-pair-fixture.mjs',
];
const fixtureFiles = [
  'scripts/fixtures/daily-real-cron-2026-05-24.mjs',
  'scripts/fixtures/daily-real-cron-2026-05-27.mjs',
  'scripts/fixtures/daily-real-cron-2026-05-28.mjs',
  'scripts/fixtures/daily-real-cron-2026-05-29.mjs',
];

const failures = [];

for (const file of checkedFiles) {
  const source = readFileSync(file, 'utf8');
  if (!source.includes(fixtureRegistry)) {
    failures.push(`${file} does not import the shared real cron fixture registry`);
  }
  if (/const\s+fixture\s*=\s*`《AI、科技日报》/.test(source) || /2026-05-(24|27|28|29).*## 今日要闻/s.test(source)) {
    failures.push(`${file} reintroduced an inline real cron fixture`);
  }
}

const registrySource = readFileSync('scripts/fixtures/daily-real-cron-fixtures.mjs', 'utf8');
if (!registrySource.includes('realCronFixtures')) {
  failures.push('shared fixture registry is missing realCronFixtures export');
}

for (const fixtureFile of fixtureFiles) {
  const fixtureSource = readFileSync(fixtureFile, 'utf8');
  for (const exportName of ['realCronFixture', 'fixtureDate', 'expectedSignals', 'bannedFallbackPhrases']) {
    if (!fixtureSource.includes(`export const ${exportName}`)) {
      failures.push(`${fixtureFile} is missing export: ${exportName}`);
    }
  }
}

if (failures.length > 0) {
  console.error('Daily fixture source dedup check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('daily fixture source dedup check passed');

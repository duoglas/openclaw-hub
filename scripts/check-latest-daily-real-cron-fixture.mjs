import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { realCronFixtures } from './fixtures/daily-real-cron-fixtures.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const blogRoots = [
  path.join(repoRoot, 'src/content/blog/en'),
  path.join(repoRoot, 'src/content/blog/zh'),
];

function fail(message, details = []) {
  console.error(`latest daily real cron fixture check failed: ${message}`);
  for (const detail of details) console.error(`- ${detail}`);
  process.exit(1);
}

function dailyDatesForDir(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .map((file) => file.match(/^openclaw-daily-(\d{4}-\d{2}-\d{2})\.md$/)?.[1])
    .filter(Boolean);
}

function latestDate(dates) {
  return [...dates].sort().at(-1) || '';
}

function fixtureDateOf(fixtureModule) {
  return fixtureModule?.fixtureDate || fixtureModule?.realCronFixture?.match(/\n(\d{4}-\d{2}-\d{2})\s/)?.[1] || '';
}

function expectedSignalCount(fixtureModule) {
  return Array.isArray(fixtureModule?.expectedSignals) ? fixtureModule.expectedSignals.length : 0;
}

function runSyntheticSelfTest() {
  const syntheticLatestDailyDate = '2026-07-01';
  const syntheticFixtures = [
    { fixtureDate: '2026-06-27', expectedSignals: [{}, {}, {}, {}, {}] },
    { fixtureDate: '2026-06-26', expectedSignals: [{}, {}, {}, {}, {}] },
  ];
  const syntheticFixtureDates = syntheticFixtures.map(fixtureDateOf).filter(Boolean).sort();
  const syntheticLatestFixtureDate = latestDate(syntheticFixtureDates);
  if (syntheticLatestFixtureDate >= syntheticLatestDailyDate) {
    fail('synthetic latest daily freshness self-test did not exercise missing latest fixture failure');
  }
}

runSyntheticSelfTest();

const enDates = dailyDatesForDir(blogRoots[0]);
const zhDates = dailyDatesForDir(blogRoots[1]);
const latestDailyDate = latestDate([...new Set([...enDates, ...zhDates])]);
if (!latestDailyDate) fail('no daily blog posts found');

const missingLangs = [];
if (!enDates.includes(latestDailyDate)) missingLangs.push(`EN missing src/content/blog/en/openclaw-daily-${latestDailyDate}.md`);
if (!zhDates.includes(latestDailyDate)) missingLangs.push(`ZH missing src/content/blog/zh/openclaw-daily-${latestDailyDate}.md`);
if (missingLangs.length) fail(`latest daily ${latestDailyDate} is not bilingual`, missingLangs);

const fixtureDates = realCronFixtures.map(fixtureDateOf).filter(Boolean).sort();
const latestFixtureDate = latestDate(fixtureDates);
if (latestFixtureDate !== latestDailyDate) {
  fail(`latest daily ${latestDailyDate} is not covered by the latest real cron fixture`, [
    `latest fixture date: ${latestFixtureDate || '(none)'}`,
    `expected fixture file: scripts/fixtures/daily-real-cron-${latestDailyDate}.mjs`,
    'add/register the fixture before relying on latest daily generator output',
  ]);
}

const matchingFixture = realCronFixtures.find((fixture) => fixtureDateOf(fixture) === latestDailyDate);
const signalCount = expectedSignalCount(matchingFixture);
if (signalCount < 5) {
  fail(`latest fixture ${latestDailyDate} has insufficient expectedSignals coverage`, [
    `expected at least 5 story-level expectedSignals, got ${signalCount}`,
  ]);
}

console.log(`latest daily real cron fixture check passed: latestDaily=${latestDailyDate}, expectedSignals=${signalCount}`);

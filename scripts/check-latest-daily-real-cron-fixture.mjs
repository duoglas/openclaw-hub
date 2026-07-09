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

const MAX_FIXTURE_LAG_DAYS = 0;

function daysBetween(fromDate, toDate) {
  const from = Date.parse(`${fromDate}T00:00:00Z`);
  const to = Date.parse(`${toDate}T00:00:00Z`);
  if (!Number.isFinite(from) || !Number.isFinite(to)) return Number.POSITIVE_INFINITY;
  return Math.floor((to - from) / 86400000);
}

function runSyntheticSelfTest() {
  const syntheticLatestDailyDate = '2026-07-10';
  const syntheticFixtures = [
    { fixtureDate: '2026-07-09', expectedSignals: [{}, {}, {}, {}, {}] },
    { fixtureDate: '2026-07-01', expectedSignals: [{}, {}, {}, {}, {}] },
  ];
  const syntheticFixtureDates = syntheticFixtures.map(fixtureDateOf).filter(Boolean).sort();
  const syntheticLatestFixtureDate = latestDate(syntheticFixtureDates);
  const syntheticLagDays = daysBetween(syntheticLatestFixtureDate, syntheticLatestDailyDate);
  if (syntheticLagDays <= MAX_FIXTURE_LAG_DAYS) {
    fail('synthetic latest daily freshness self-test did not exercise stale fixture failure');
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
if (!latestFixtureDate) fail('no real cron fixtures registered');

const fixtureLagDays = daysBetween(latestFixtureDate, latestDailyDate);
if (fixtureLagDays < 0) {
  fail(`latest real cron fixture ${latestFixtureDate} is newer than latest daily ${latestDailyDate}`, [
    'check fixture registry ordering and committed daily files',
  ]);
}

if (fixtureLagDays > MAX_FIXTURE_LAG_DAYS) {
  fail(`latest daily ${latestDailyDate} is not covered by a recent real cron fixture`, [
    `latest fixture date: ${latestFixtureDate}`,
    `fixture lag days: ${fixtureLagDays}`,
    `maximum allowed lag days: ${MAX_FIXTURE_LAG_DAYS}`,
    `expected fixture file when refreshing coverage: scripts/fixtures/daily-real-cron-${latestDailyDate}.mjs`,
    'add/register a fresh fixture before relying on more daily generator output',
  ]);
}

const matchingFixture = realCronFixtures.find((fixture) => fixtureDateOf(fixture) === latestFixtureDate);
const signalCount = expectedSignalCount(matchingFixture);
if (signalCount < 5) {
  fail(`latest fixture ${latestFixtureDate} has insufficient expectedSignals coverage`, [
    `expected at least 5 story-level expectedSignals, got ${signalCount}`,
  ]);
}

console.log(`latest daily real cron fixture check passed: latestDaily=${latestDailyDate}, latestFixture=${latestFixtureDate}, fixtureLagDays=${fixtureLagDays}, expectedSignals=${signalCount}`);

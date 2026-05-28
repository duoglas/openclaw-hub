#!/usr/bin/env node
import { realCronFixtures } from './fixtures/daily-real-cron-fixtures.mjs';
import { buildZhDescription, extractZhStories, generateZhDailyBody } from './lib/daily-zh-generator.mjs';

const failures = [];

for (const fixture of realCronFixtures) {
  const { realCronFixture, fixtureDate, bannedFallbackPhrases, requiredZhOutputs, expectedSignals } = fixture;
  const stories = extractZhStories(realCronFixture);
  const desc = buildZhDescription(realCronFixture);
  const body = generateZhDailyBody(realCronFixture, fixtureDate);

  const banned = bannedFallbackPhrases.filter((phrase) => !phrase.startsWith('primary') && !phrase.startsWith('The item') && !phrase.startsWith('named') && !phrase.startsWith('same-day') && !phrase.startsWith('concrete') && !phrase.startsWith('mapped'));

  if (stories.length !== 5) failures.push(`${fixtureDate}: expected 5 parsed ZH stories, found ${stories.length}`);
  expectedSignals.forEach((signal, index) => {
    if (stories[index]?.title !== signal.title) failures.push(`${fixtureDate}: ZH story ${index + 1} title drifted: ${stories[index]?.title || ''}`);
  });
  if (!desc.includes(expectedSignals[0].title.split('，')[0].split('/')[0]) && !desc.includes('Anthropic')) {
    failures.push(`${fixtureDate}: ZH description did not use concrete source details`);
  }
  if (/今日要闻|证据矩阵|明日跟踪点|发生了什么|为什么重要|可能影响|^#+\s|### \d+\./.test(desc)) {
    failures.push(`${fixtureDate}: ZH description leaked section headings or field labels`);
  }
  for (const phrase of requiredZhOutputs) {
    if (!body.includes(phrase)) failures.push(`${fixtureDate}: missing fixture output: ${phrase}`);
  }
  for (const phrase of banned) {
    if (body.includes(phrase)) failures.push(`${fixtureDate}: banned fallback leaked: ${phrase}`);
  }

  const evidenceCount = (body.match(/^- 来源条目 \d+：/gm) || []).length;
  const conclusionBullets = (body.match(/^## 今日结论\n\n(?:- .+\n?){3}/m) || []).length;
  const watchBullets = (body.match(/^## 明日跟踪点\n\n(?:- .+\n?){3}/m) || []).length;
  if (evidenceCount !== 5) failures.push(`${fixtureDate}: expected 5 ZH Evidence Matrix items, found ${evidenceCount}`);
  if (conclusionBullets !== 1) failures.push(`${fixtureDate}: ZH conclusion section does not contain at least 3 bullets`);
  if (watchBullets !== 1) failures.push(`${fixtureDate}: ZH watch section does not contain at least 3 bullets`);
}

if (failures.length > 0) {
  console.error('Daily ZH generator real cron fixture check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('daily ZH generator real cron fixture check passed');

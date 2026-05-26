#!/usr/bin/env node
import { realCronFixture, fixtureDate, bannedFallbackPhrases, requiredZhOutputs } from './fixtures/daily-real-cron-2026-05-24.mjs';
import { buildZhDescription, extractZhStories, generateZhDailyBody } from './lib/daily-zh-generator.mjs';

const stories = extractZhStories(realCronFixture);
const desc = buildZhDescription(realCronFixture);
const body = generateZhDailyBody(realCronFixture, fixtureDate);

const banned = bannedFallbackPhrases.filter((phrase) => !phrase.startsWith('primary') && !phrase.startsWith('The item') && !phrase.startsWith('named') && !phrase.startsWith('same-day') && !phrase.startsWith('concrete') && !phrase.startsWith('mapped'));

const failures = [];
if (stories.length !== 5) failures.push(`expected 5 parsed ZH stories, found ${stories.length}`);
if (!desc.includes('Anthropic 发布 Project Glasswing') || desc.includes('今日要闻')) {
  failures.push('ZH description did not use concrete source details or leaked section headings');
}
for (const phrase of requiredZhOutputs) {
  if (!body.includes(phrase)) failures.push(`missing fixture output: ${phrase}`);
}
for (const phrase of banned) {
  if (body.includes(phrase)) failures.push(`banned fallback leaked: ${phrase}`);
}

const evidenceCount = (body.match(/^- 来源条目 \d+：/gm) || []).length;
const conclusionBullets = (body.match(/^## 今日结论\n\n(?:- .+\n?){3}/m) || []).length;
const watchBullets = (body.match(/^## 明日跟踪点\n\n(?:- .+\n?){3}/m) || []).length;
if (evidenceCount !== 5) failures.push(`expected 5 ZH Evidence Matrix items, found ${evidenceCount}`);
if (conclusionBullets !== 1) failures.push('ZH conclusion section does not contain at least 3 bullets');
if (watchBullets !== 1) failures.push('ZH watch section does not contain at least 3 bullets');

if (failures.length > 0) {
  console.error('Daily ZH generator real cron fixture check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('daily ZH generator real cron fixture check passed');

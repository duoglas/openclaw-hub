#!/usr/bin/env node
import { realCronFixture, fixtureDate, bannedFallbackPhrases, requiredEnglishOutputs } from './fixtures/daily-real-cron-2026-05-24.mjs';
import { generateEnglishDailyBody } from './lib/daily-generator.mjs';

const body = generateEnglishDailyBody(realCronFixture, fixtureDate);
const banned = bannedFallbackPhrases.filter((phrase) => !phrase.startsWith('今日') && !phrase.startsWith('用于') && phrase !== '-…' && phrase !== '...');
const required = requiredEnglishOutputs.filter((phrase) => phrase.startsWith('###') || phrase.startsWith('Evidence item') || phrase.startsWith('##'));

const failures = [];
for (const phrase of banned) {
  if (body.includes(phrase)) failures.push(`banned phrase leaked: ${phrase}`);
}
for (const phrase of required) {
  if (!body.includes(phrase)) failures.push(`missing fixture output: ${phrase}`);
}

const storyCount = (body.match(/^### \d+\./gm) || []).length;
const evidenceCount = (body.match(/^- Evidence item \d+:/gm) || []).length;
if (storyCount !== 5) failures.push(`expected 5 Top Stories, found ${storyCount}`);
if (evidenceCount !== 5) failures.push(`expected 5 Evidence Matrix items, found ${evidenceCount}`);
if (/[\u3400-\u9fff\uf900-\ufaff]/.test(body)) failures.push('English generator output leaked CJK text from the source summary');
if (!body.includes('Source 5 centers on China, Xinhua')) failures.push('missing CJK-to-English source projection for Xinhua/China fixture item');

if (failures.length > 0) {
  console.error('Daily generator real cron fixture check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('daily generator real cron fixture check passed');

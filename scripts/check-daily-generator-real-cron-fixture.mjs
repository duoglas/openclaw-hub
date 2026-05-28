#!/usr/bin/env node
import { realCronFixtures } from './fixtures/daily-real-cron-fixtures.mjs';
import { extractStories, generateEnglishDailyBody, labelFor } from './lib/daily-generator.mjs';

const failures = [];

for (const fixture of realCronFixtures) {
  const { realCronFixture, fixtureDate, expectedSignals, bannedFallbackPhrases, requiredEnglishOutputs, parserGuardrails } = fixture;
  const body = generateEnglishDailyBody(realCronFixture, fixtureDate);
  const stories = extractStories(realCronFixture);
  const banned = bannedFallbackPhrases.filter((phrase) => !phrase.startsWith('今日') && !phrase.startsWith('用于') && phrase !== '-…' && phrase !== '...');
  const required = requiredEnglishOutputs.filter((phrase) => phrase.startsWith('###') || phrase.startsWith('Evidence item') || phrase.startsWith('##'));

  for (const phrase of banned) {
    if (body.includes(phrase)) failures.push(`${fixtureDate}: banned phrase leaked: ${phrase}`);
  }
  for (const phrase of required) {
    if (!body.includes(phrase)) failures.push(`${fixtureDate}: missing fixture output: ${phrase}`);
  }

  const storyCount = (body.match(/^### \d+\./gm) || []).length;
  const evidenceCount = (body.match(/^- Evidence item \d+:/gm) || []).length;
  if (stories.length !== 5) failures.push(`${fixtureDate}: expected 5 parsed stories, found ${stories.length}`);
  if (storyCount !== 5) failures.push(`${fixtureDate}: expected 5 Top Stories, found ${storyCount}`);
  if (evidenceCount !== 5) failures.push(`${fixtureDate}: expected 5 Evidence Matrix items, found ${evidenceCount}`);
  if (/[\u3400-\u9fff\uf900-\ufaff]/.test(body)) failures.push(`${fixtureDate}: English generator output leaked CJK text from the source summary`);

  expectedSignals.forEach((signal, index) => {
    const label = labelFor(stories[index], index + 1);
    if (label !== signal.enLabel) failures.push(`${fixtureDate}: EN label ${index + 1} drifted: ${label}`);
  });

  if (fixtureDate === '2026-05-24' && !body.includes('Source 5 centers on China, Xinhua')) {
    failures.push('2026-05-24: missing CJK-to-English source projection for Xinhua/China fixture item');
  }

  if (parserGuardrails?.story5ForbiddenEnLabelTokens?.length) {
    const story5Label = labelFor(stories[4], 5);
    for (const token of parserGuardrails.story5ForbiddenEnLabelTokens) {
      if (story5Label.includes(token)) failures.push(`${fixtureDate}: story 5 label leaked post-story section token: ${token}`);
    }
    for (const token of parserGuardrails.story5RequiredEnLabelTokens || []) {
      if (!story5Label.includes(token)) failures.push(`${fixtureDate}: story 5 label missing required token: ${token}`);
    }
  }
}

if (failures.length > 0) {
  console.error('Daily generator real cron fixture check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('daily generator real cron fixture check passed');

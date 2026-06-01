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

  if (fixtureDate === '2026-05-24' && !body.includes('Source 5 reports a robotics deployment, AI education deployment signal involving China, Xinhua')) {
    failures.push('2026-05-24: missing CJK-to-English source projection for Xinhua/China fixture item');
  }

  for (let index = 1; index <= 5; index += 1) {
    const story = stories[index - 1] || {};
    const label = labelFor(story, index);
    const storyText = [story.title, story.what, story.why, story.impact].filter(Boolean).join(' ');
    const evidenceLine = body.split('\n').find((line) => line.startsWith(`- Evidence item ${index}:`)) || '';
    const forbidden = parserGuardrails?.[`story${index}ForbiddenEnLabelTokens`] || [];
    const required = parserGuardrails?.[`story${index}RequiredEnLabelTokens`] || [];
    const forbiddenDetail = parserGuardrails?.[`story${index}ForbiddenDetailTokens`] || [];
    const requiredDetail = parserGuardrails?.[`story${index}RequiredDetailTokens`] || [];
    const forbiddenEvidence = parserGuardrails?.[`story${index}ForbiddenEvidenceTokens`] || forbiddenDetail;
    for (const token of forbidden) {
      if (label.includes(token)) failures.push(`${fixtureDate}: story ${index} label leaked forbidden token: ${token}`);
    }
    for (const token of required) {
      if (!label.includes(token)) failures.push(`${fixtureDate}: story ${index} label missing required token: ${token}`);
    }
    for (const token of forbiddenDetail) {
      if (storyText.includes(token)) failures.push(`${fixtureDate}: story ${index} parsed detail leaked post-section token: ${token}`);
    }
    for (const token of requiredDetail) {
      if (!storyText.includes(token)) failures.push(`${fixtureDate}: story ${index} parsed detail missing required token: ${token}`);
    }
    for (const token of forbiddenEvidence) {
      if (evidenceLine.includes(token)) failures.push(`${fixtureDate}: story ${index} evidence leaked post-section token: ${token}`);
    }
  }
}

if (failures.length > 0) {
  console.error('Daily generator real cron fixture check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('daily generator real cron fixture check passed');

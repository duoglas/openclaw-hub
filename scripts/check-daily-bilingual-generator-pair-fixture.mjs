#!/usr/bin/env node
import { realCronFixtures } from './fixtures/daily-real-cron-fixtures.mjs';
import { extractStories, generateEnglishDailyBody } from './lib/daily-generator.mjs';
import { buildZhDescription, extractZhStories, generateZhDailyBody } from './lib/daily-zh-generator.mjs';

const failures = [];

for (const fixture of realCronFixtures) {
  const { realCronFixture, fixtureDate, expectedSignals, bannedFallbackPhrases } = fixture;
  const date = fixtureDate;
  const enStories = extractStories(realCronFixture);
  const zhStories = extractZhStories(realCronFixture);
  const enBody = generateEnglishDailyBody(realCronFixture, date);
  const zhBody = generateZhDailyBody(realCronFixture, date);
  const zhDescription = buildZhDescription(realCronFixture);

  if (enStories.length !== 5) failures.push(`${fixtureDate}: expected 5 EN parsed stories, found ${enStories.length}`);
  if (zhStories.length !== 5) failures.push(`${fixtureDate}: expected 5 ZH parsed stories, found ${zhStories.length}`);

  expectedSignals.forEach((signal, index) => {
    const enTitle = enStories[index]?.title || '';
    const zhTitle = zhStories[index]?.title || '';
    if (enTitle !== signal.title) failures.push(`${fixtureDate}: EN story ${index + 1} title drifted: ${enTitle}`);
    if (zhTitle !== signal.title) failures.push(`${fixtureDate}: ZH story ${index + 1} title drifted: ${zhTitle}`);
    if (!enBody.includes(`### ${index + 1}. ${signal.enLabel}`)) {
      failures.push(`${fixtureDate}: missing EN story label ${index + 1}: ${signal.enLabel}`);
    }
    if (!enBody.includes(`Evidence item ${index + 1}: ${signal.enLabel}`)) {
      failures.push(`${fixtureDate}: missing EN evidence item ${index + 1}: ${signal.enLabel}`);
    }
    if (!zhBody.includes(signal.zhEvidence)) {
      failures.push(`${fixtureDate}: missing ZH evidence item ${index + 1}: ${signal.zhEvidence}`);
    }
    for (const token of signal.requiredTokens) {
      if (!enBody.includes(token) && !zhBody.includes(token) && !zhDescription.includes(token)) {
        failures.push(`${fixtureDate}: cross-language token missing from outputs: ${token}`);
      }
    }
  });

  for (const phrase of bannedFallbackPhrases) {
    if (enBody.includes(phrase) || zhBody.includes(phrase) || zhDescription.includes(phrase)) {
      failures.push(`${fixtureDate}: banned fallback leaked across pair fixture: ${phrase}`);
    }
  }

  const enEvidenceCount = (enBody.match(/^- Evidence item \d+:/gm) || []).length;
  const zhEvidenceCount = (zhBody.match(/^- 来源条目 \d+：/gm) || []).length;
  if (enEvidenceCount !== zhEvidenceCount) {
    failures.push(`${fixtureDate}: EN/ZH evidence count mismatch: ${enEvidenceCount} vs ${zhEvidenceCount}`);
  }
  if (enEvidenceCount !== 5) failures.push(`${fixtureDate}: expected 5 EN Evidence Matrix items, found ${enEvidenceCount}`);
  if (zhEvidenceCount !== 5) failures.push(`${fixtureDate}: expected 5 ZH Evidence Matrix items, found ${zhEvidenceCount}`);

  const firstSignalTokens = expectedSignals[0]?.requiredTokens || [];
  if (!zhDescription.includes('Anthropic') && !firstSignalTokens.some((token) => zhDescription.includes(token))) {
    failures.push(`${fixtureDate}: ZH description does not preserve the first concrete source detail from the shared fixture`);
  }
  if (/今日要闻|证据矩阵|明日跟踪点|发生了什么|为什么重要|可能影响|^#+\s|### \d+\./.test(zhDescription)) {
    failures.push(`${fixtureDate}: ZH description leaked section headings or field labels`);
  }

  const enActionSections = ['## Today’s Bottom Line', '## What to Watch Tomorrow'];
  const zhActionSections = ['## 今日结论', '## 明日跟踪点'];
  for (const section of [...enActionSections, ...zhActionSections]) {
    const body = section.startsWith('## Today') || section.startsWith('## What') ? enBody : zhBody;
    if (!body.includes(section)) failures.push(`${fixtureDate}: missing action section: ${section}`);
  }
}

if (failures.length > 0) {
  console.error('Daily bilingual generator pair fixture check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('daily bilingual generator pair fixture check passed');

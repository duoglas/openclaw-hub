#!/usr/bin/env node
import { realCronFixture, fixtureDate, expectedSignals, bannedFallbackPhrases } from './fixtures/daily-real-cron-2026-05-24.mjs';
import { extractStories, generateEnglishDailyBody } from './lib/daily-generator.mjs';
import { buildZhDescription, extractZhStories, generateZhDailyBody } from './lib/daily-zh-generator.mjs';

const date = fixtureDate;
const enStories = extractStories(realCronFixture);
const zhStories = extractZhStories(realCronFixture);
const enBody = generateEnglishDailyBody(realCronFixture, date);
const zhBody = generateZhDailyBody(realCronFixture, date);
const zhDescription = buildZhDescription(realCronFixture);

const failures = [];

if (enStories.length !== 5) failures.push(`expected 5 EN parsed stories, found ${enStories.length}`);
if (zhStories.length !== 5) failures.push(`expected 5 ZH parsed stories, found ${zhStories.length}`);

expectedSignals.forEach((signal, index) => {
  const enTitle = enStories[index]?.title || '';
  const zhTitle = zhStories[index]?.title || '';
  if (enTitle !== signal.title) failures.push(`EN story ${index + 1} title drifted: ${enTitle}`);
  if (zhTitle !== signal.title) failures.push(`ZH story ${index + 1} title drifted: ${zhTitle}`);
  if (!enBody.includes(`### ${index + 1}. ${signal.enLabel}`)) {
    failures.push(`missing EN story label ${index + 1}: ${signal.enLabel}`);
  }
  if (!enBody.includes(`Evidence item ${index + 1}: ${signal.enLabel}`)) {
    failures.push(`missing EN evidence item ${index + 1}: ${signal.enLabel}`);
  }
  if (!zhBody.includes(signal.zhEvidence)) {
    failures.push(`missing ZH evidence item ${index + 1}: ${signal.zhEvidence}`);
  }
  for (const token of signal.requiredTokens) {
    if (!enBody.includes(token) && !zhBody.includes(token) && !zhDescription.includes(token)) {
      failures.push(`cross-language token missing from outputs: ${token}`);
    }
  }
});

for (const phrase of bannedFallbackPhrases) {
  if (enBody.includes(phrase) || zhBody.includes(phrase) || zhDescription.includes(phrase)) {
    failures.push(`banned fallback leaked across pair fixture: ${phrase}`);
  }
}

const enEvidenceCount = (enBody.match(/^- Evidence item \d+:/gm) || []).length;
const zhEvidenceCount = (zhBody.match(/^- 来源条目 \d+：/gm) || []).length;
if (enEvidenceCount !== zhEvidenceCount) {
  failures.push(`EN/ZH evidence count mismatch: ${enEvidenceCount} vs ${zhEvidenceCount}`);
}
if (enEvidenceCount !== 5) failures.push(`expected 5 EN Evidence Matrix items, found ${enEvidenceCount}`);
if (zhEvidenceCount !== 5) failures.push(`expected 5 ZH Evidence Matrix items, found ${zhEvidenceCount}`);

if (!zhDescription.includes('Anthropic 发布 Project Glasswing')) {
  failures.push('ZH description does not preserve the first concrete source detail from the shared fixture');
}
if (/今日要闻|证据矩阵|明日跟踪点|发生了什么|为什么重要|可能影响|^#+\s|### \d+\./.test(zhDescription)) {
  failures.push('ZH description leaked section headings or field labels');
}

const enActionSections = ['## Today’s Bottom Line', '## What to Watch Tomorrow'];
const zhActionSections = ['## 今日结论', '## 明日跟踪点'];
for (const section of [...enActionSections, ...zhActionSections]) {
  const body = section.startsWith('## Today') || section.startsWith('## What') ? enBody : zhBody;
  if (!body.includes(section)) failures.push(`missing action section: ${section}`);
}

if (failures.length > 0) {
  console.error('Daily bilingual generator pair fixture check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('daily bilingual generator pair fixture check passed');

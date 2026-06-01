#!/usr/bin/env node
import { realCronFixtures } from './fixtures/daily-real-cron-fixtures.mjs';

const failures = [];

function hasPostTopCaseSection(source) {
  const story5Index = source.indexOf('### 5.');
  const caseIndex = source.indexOf('## 实战案例');
  return story5Index >= 0 && caseIndex > story5Index;
}

for (const fixture of realCronFixtures) {
  const { fixtureDate, realCronFixture, parserGuardrails = {} } = fixture;
  if (!hasPostTopCaseSection(realCronFixture)) continue;

  const requiredGuardrailKeys = [
    'story5ForbiddenDetailTokens',
    'story5ForbiddenEvidenceTokens',
    'story5ForbiddenZhEvidenceTokens',
  ];

  for (const key of requiredGuardrailKeys) {
    const value = parserGuardrails[key];
    if (!Array.isArray(value) || value.length === 0) {
      failures.push(`${fixtureDate}: post-Top5 case section requires non-empty parserGuardrails.${key}`);
    }
  }

  const forbiddenDetail = parserGuardrails.story5ForbiddenDetailTokens || [];
  const postTopCaseText = realCronFixture.slice(realCronFixture.indexOf('## 实战案例'));
  const anchoredTokens = forbiddenDetail.filter((token) => postTopCaseText.includes(token));
  if (anchoredTokens.length === 0) {
    failures.push(`${fixtureDate}: story5ForbiddenDetailTokens must include at least one token from the post-Top5 case section`);
  }
}

if (failures.length > 0) {
  console.error('Daily parser guardrail coverage check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('daily parser guardrail coverage check passed');

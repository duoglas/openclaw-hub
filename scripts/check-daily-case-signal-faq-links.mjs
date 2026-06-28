#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { realCronFixtures } from './fixtures/daily-real-cron-fixtures.mjs';

const caseSignalCatalog = [
  {
    label: 'ChatGPT dictation',
    matchTerms: ['ChatGPT 听写', '听写升级', 'dictation'],
    requiredTerms: ['ChatGPT dictation', 'dictation model', 'voice input'],
    links: ['/en/blog/openclaw-model-fallback-strategy/'],
  },
  {
    label: 'Claude Tag',
    matchTerms: ['Claude Tag'],
    requiredTerms: ['Claude Tag', 'Slack-based', 'channel memory scope'],
    links: ['/en/blog/openclaw-model-fallback-strategy/', '/en/blog/openclaw-vps-deployment-complete-guide/'],
  },
  {
    label: 'ChatGPT personal finance',
    matchTerms: ['个人金融', 'personal finance'],
    requiredTerms: ['personal finance', 'US Plus users', 'data boundary'],
    links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-vps-deployment-complete-guide/'],
  },
];

const historicalRequiredCaseSignals = [
  {
    date: '2026-06-27',
    file: 'src/content/blog/en/openclaw-daily-2026-06-27.md',
    signals: [
      {
        label: 'ChatGPT dictation',
        terms: ['ChatGPT dictation', 'dictation model', 'voice input'],
        links: ['/en/blog/openclaw-model-fallback-strategy/'],
      },
      {
        label: 'ChatGPT personal finance',
        terms: ['personal finance', 'US Plus users', 'data boundary'],
        links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-vps-deployment-complete-guide/'],
      },
    ],
  },
  {
    date: '2026-06-26',
    file: 'src/content/blog/en/openclaw-daily-2026-06-26.md',
    signals: [
      {
        label: 'Claude Tag',
        terms: ['Claude Tag', 'Slack-based', 'channel memory scope'],
        links: ['/en/blog/openclaw-model-fallback-strategy/', '/en/blog/openclaw-vps-deployment-complete-guide/'],
      },
    ],
  },
];

function latestRealCronFixture(fixtures = realCronFixtures) {
  return fixtures
    .filter((fixture) => fixture?.fixtureDate && fixture?.realCronFixture)
    .sort((a, b) => a.fixtureDate.localeCompare(b.fixtureDate))
    .at(-1);
}

function parsePracticalCaseTitles(realCronFixture) {
  const section = realCronFixture.split('## 实战案例', 2)[1]?.split(/\n##\s+/u, 1)[0] || '';
  return [...section.matchAll(/^\s*\d+\.\s+(.+)$/gmu)].map((match) => match[1].trim());
}

function inferCaseSignalsFromPracticalCases(practicalCaseTitles) {
  const signals = [];
  const seen = new Set();

  for (const title of practicalCaseTitles) {
    for (const catalogItem of caseSignalCatalog) {
      const matched = catalogItem.matchTerms.some((term) => title.toLowerCase().includes(term.toLowerCase()));
      if (!matched || seen.has(catalogItem.label)) {
        continue;
      }
      seen.add(catalogItem.label);
      signals.push({
        label: catalogItem.label,
        terms: catalogItem.requiredTerms,
        links: catalogItem.links,
        inferredFrom: title,
      });
    }
  }

  return signals;
}

function buildLatestCaseSignalSpec() {
  const latestFixture = latestRealCronFixture();
  if (!latestFixture) {
    return { spec: null, errors: ['no latest real cron fixture found for case-level FAQ link check'] };
  }

  const practicalCaseTitles = parsePracticalCaseTitles(latestFixture.realCronFixture);
  const signals = inferCaseSignalsFromPracticalCases(practicalCaseTitles);
  const errors = [];

  if (practicalCaseTitles.length > 0 && signals.length === 0) {
    errors.push(
      `latest fixture ${latestFixture.fixtureDate}: found ${practicalCaseTitles.length} practical case(s) but none matched the case signal catalog: ${practicalCaseTitles.join(' | ')}`,
    );
  }

  for (const title of practicalCaseTitles) {
    const matched = signals.some((signal) => signal.inferredFrom === title);
    const isGenericCase = /daily news|signals into personal productivity|deployment checklist|今日|结论/iu.test(title);
    if (!matched && !isGenericCase) {
      errors.push(`latest fixture ${latestFixture.fixtureDate}: practical case is not covered by case signal catalog: ${title}`);
    }
  }

  return {
    spec: {
      date: latestFixture.fixtureDate,
      file: `src/content/blog/en/openclaw-daily-${latestFixture.fixtureDate}.md`,
      signals,
      derivedFromLatestFixture: true,
      practicalCaseTitles,
    },
    errors,
  };
}

const { spec: latestCaseSignalSpec, errors: latestSpecErrors } = buildLatestCaseSignalSpec();
const requiredCaseSignals = [
  ...(latestCaseSignalSpec && latestCaseSignalSpec.signals.length > 0 ? [latestCaseSignalSpec] : []),
  ...historicalRequiredCaseSignals,
];

const errors = [...latestSpecErrors];
let checkedSignals = 0;

for (const spec of requiredCaseSignals) {
  const text = readFileSync(join(process.cwd(), spec.file), 'utf8');

  if (!text.includes('## Case-Level FAQ')) {
    errors.push(`${spec.file}: missing ## Case-Level FAQ section for case-level signal capture`);
    continue;
  }

  const section = text.split('## Case-Level FAQ', 2)[1]?.split(/\n##\s+/u, 1)[0] || '';
  const questionCount = (section.match(/^###\s+/gmu) || []).length;
  if (questionCount < spec.signals.length) {
    errors.push(`${spec.file}: Case-Level FAQ has ${questionCount} question(s), expected at least ${spec.signals.length}`);
  }

  for (const signal of spec.signals) {
    checkedSignals += 1;
    for (const term of signal.terms) {
      if (!section.includes(term)) {
        errors.push(`${spec.file}: ${signal.label} FAQ missing required term: ${term}`);
      }
    }
    for (const link of signal.links) {
      if (!section.includes(`](${link})`)) {
        errors.push(`${spec.file}: ${signal.label} FAQ missing required internal link: ${link}`);
      }
    }
  }
}

if (errors.length > 0) {
  console.error('Daily case signal FAQ link check failed:');
  for (const error of errors) {
    console.error(` - ${error}`);
  }
  process.exit(1);
}

const latestSummary = latestCaseSignalSpec?.signals.length
  ? ` latestFixture=${latestCaseSignalSpec.date}, autoSignals=${latestCaseSignalSpec.signals.length}`
  : '';
console.log(`Daily case signal FAQ link check passed: ${checkedSignals} case-level signals have FAQ copy and internal links.${latestSummary}`);

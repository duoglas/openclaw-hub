#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { realCronFixtures } from './fixtures/daily-real-cron-fixtures.mjs';

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

function inferCaseSignalsFromPracticalCases(practicalCaseTitles, fixtureCaseLevelFaqSignals = []) {
  const signals = [];
  const seen = new Set();

  for (const title of practicalCaseTitles) {
    for (const fixtureSignal of fixtureCaseLevelFaqSignals) {
      const matchTerms = fixtureSignal.practicalCaseMatchTerms || [];
      const matched = matchTerms.some((term) => title.toLowerCase().includes(term.toLowerCase()));
      if (!matched || seen.has(fixtureSignal.label)) {
        continue;
      }
      seen.add(fixtureSignal.label);
      signals.push({
        label: fixtureSignal.label,
        terms: fixtureSignal.requiredTerms || [],
        links: fixtureSignal.links || [],
        inferredFrom: title,
        source: 'fixture metadata',
      });
    }
  }

  return signals;
}

function validateFixtureCaseLevelFaqSignals(fixture) {
  const errors = [];
  const signals = fixture.caseLevelFaqSignals || [];
  const labels = new Set();

  if (!Array.isArray(signals) || signals.length === 0) {
    errors.push(`latest fixture ${fixture.fixtureDate}: missing caseLevelFaqSignals metadata for case-level FAQ inference`);
    return errors;
  }

  for (const signal of signals) {
    if (!signal?.label) {
      errors.push(`latest fixture ${fixture.fixtureDate}: caseLevelFaqSignals entry is missing label`);
      continue;
    }
    if (labels.has(signal.label)) {
      errors.push(`latest fixture ${fixture.fixtureDate}: duplicate caseLevelFaqSignals label: ${signal.label}`);
    }
    labels.add(signal.label);
    if (!Array.isArray(signal.practicalCaseMatchTerms) || signal.practicalCaseMatchTerms.length === 0) {
      errors.push(`latest fixture ${fixture.fixtureDate}: ${signal.label} metadata missing practicalCaseMatchTerms`);
    }
    if (!Array.isArray(signal.requiredTerms) || signal.requiredTerms.length === 0) {
      errors.push(`latest fixture ${fixture.fixtureDate}: ${signal.label} metadata missing requiredTerms`);
    }
    if (!Array.isArray(signal.links) || signal.links.length === 0) {
      errors.push(`latest fixture ${fixture.fixtureDate}: ${signal.label} metadata missing internal links`);
    }
  }

  return errors;
}

function buildLatestCaseSignalSpec() {
  const latestFixture = latestRealCronFixture();
  if (!latestFixture) {
    return { spec: null, errors: ['no latest real cron fixture found for case-level FAQ link check'] };
  }

  const practicalCaseTitles = parsePracticalCaseTitles(latestFixture.realCronFixture);
  const errors = practicalCaseTitles.length > 0 ? validateFixtureCaseLevelFaqSignals(latestFixture) : [];
  const signals = inferCaseSignalsFromPracticalCases(practicalCaseTitles, latestFixture.caseLevelFaqSignals);

  if (practicalCaseTitles.length > 0 && signals.length === 0) {
    errors.push(
      `latest fixture ${latestFixture.fixtureDate}: found ${practicalCaseTitles.length} practical case(s) but none matched the fixture caseLevelFaqSignals metadata: ${practicalCaseTitles.join(' | ')}`,
    );
  }

  for (const title of practicalCaseTitles) {
    const matched = signals.some((signal) => signal.inferredFrom === title);
    const isGenericCase = /daily news|signals into personal productivity|deployment checklist|今日|结论/iu.test(title);
    if (!matched && !isGenericCase) {
      errors.push(`latest fixture ${latestFixture.fixtureDate}: practical case is not covered by fixture caseLevelFaqSignals metadata: ${title}`);
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
console.log(`Daily case signal FAQ link check passed: ${checkedSignals} case-level signals have FAQ copy and internal links from fixture metadata.${latestSummary}`);

#!/usr/bin/env node
import { fileURLToPath } from 'node:url';
import { realCronFixtures } from './fixtures/daily-real-cron-fixtures.mjs';
import { sourceProjectionRules } from './lib/source-projection-rules.mjs';

const QUOTE_CHARS = /["'“”‘’]/;
const QUOTE_NORMALIZER = /[“”]/g;
const SINGLE_QUOTE_NORMALIZER = /[‘’]/g;

function normalizeQuotes(value) {
  return String(value || '')
    .replace(QUOTE_NORMALIZER, '"')
    .replace(SINGLE_QUOTE_NORMALIZER, "'");
}

function storyBlockFor(fixtureText, title) {
  const titleIndex = fixtureText.indexOf(title);
  if (titleIndex === -1) return '';
  const rest = fixtureText.slice(titleIndex);
  const nextSeparator = rest.indexOf('\n---', title.length);
  if (nextSeparator !== -1) return rest.slice(0, nextSeparator);
  const nextStory = rest.search(new RegExp('\\n###\\s+(?:\\d+\\.\\s*)?', 'u'));
  if (nextStory > 0) return rest.slice(0, nextStory);
  const nextMajorSection = rest.search(/\n##\s+/);
  if (nextMajorSection !== -1) return rest.slice(0, nextMajorSection);
  return rest;
}

function storyBlocksForFixture(fixture) {
  const text = String(fixture.realCronFixture || '');
  if (Array.isArray(fixture.expectedSignals) && fixture.expectedSignals.length > 0) {
    return fixture.expectedSignals.map((signal) => ({
      title: signal.title,
      block: storyBlockFor(text, signal.title),
    }));
  }

  const parts = text.split(/\n---\n/g);
  return parts
    .map((block) => block.trim())
    .filter((block) => /^###\s+/m.test(block))
    .map((block) => ({
      title: block.match(/^###\s+(?:\d+\.\s*)?(.+)$/m)?.[1]?.trim() || 'untitled story',
      block,
    }));
}

function hasQuoteSensitiveNearMiss(block, term) {
  if (!QUOTE_CHARS.test(term)) return false;
  if (block.includes(term)) return false;
  return normalizeQuotes(block).includes(normalizeQuotes(term));
}

export function validateSourceProjectionRuleQuoteNormalization(fixtures = realCronFixtures, rules = sourceProjectionRules()) {
  const failures = [];

  for (const fixture of fixtures) {
    const blocks = storyBlocksForFixture(fixture);
    for (const { title, block } of blocks) {
      const key = `${fixture.fixtureDate}::${title}`;
      if (!block) {
        failures.push(`${key} — story block not found`);
        continue;
      }
      for (const rule of rules) {
        for (const term of rule.terms || []) {
          if (hasQuoteSensitiveNearMiss(block, term)) {
            failures.push(
              `${key} — quote-normalized near miss for ${rule.name}: term ${JSON.stringify(term)} only matches after quote normalization; use the same ASCII/smart quote characters in fixture text and rule terms`
            );
          }
        }
      }
    }
  }

  return failures;
}

const syntheticQuoteMismatchFixtures = [
  {
    fixtureDate: 'synthetic-source-projection-quote-normalization',
    realCronFixture: `# Synthetic source projection quote fixture

## Top 5

### Synthetic quote mismatch probe
发生了什么：This story mentions an ASCII "AI factory" phrase that should not silently miss a smart-quote rule term.
为什么重要：The self-test proves quote variants are diagnosed before source projection matching silently fails.
影响：Fixture authors must align quote characters deliberately.

---
`,
  },
];

const syntheticQuoteRules = [
  {
    name: 'synthetic-ai-factory-smart-quotes',
    terms: ['“AI factory”'],
    details: { what: '', why: '', impact: '' },
  },
];

function validateSelfTest() {
  const failures = validateSourceProjectionRuleQuoteNormalization(syntheticQuoteMismatchFixtures, syntheticQuoteRules);
  const diagnostic = failures.join('\n');
  const requiredFragments = [
    'synthetic-source-projection-quote-normalization::Synthetic quote mismatch probe',
    'quote-normalized near miss for synthetic-ai-factory-smart-quotes',
    'term "“AI factory”" only matches after quote normalization',
  ];

  if (failures.length !== 1 || requiredFragments.some((fragment) => !diagnostic.includes(fragment))) {
    return [
      'source projection rule quote normalization self-test failed:',
      diagnostic || '(no failure emitted)',
      `required fragments: ${requiredFragments.join(' | ')}`,
    ];
  }

  return [];
}

function runCli() {
  const selfTestFailures = validateSelfTest();
  const fixtureFailures = validateSourceProjectionRuleQuoteNormalization(realCronFixtures, sourceProjectionRules());
  const failures = [...selfTestFailures, ...fixtureFailures];

  if (failures.length > 0) {
    console.error('source projection rule quote normalization check failed:');
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }

  console.log('source projection rule quote normalization check passed');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runCli();
}

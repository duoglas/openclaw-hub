#!/usr/bin/env node
import { fileURLToPath } from 'node:url';
import { realCronFixtures } from './fixtures/daily-real-cron-fixtures.mjs';
import { sourceProjectionRuleMatches, sourceProjectionRuleNames } from './lib/source-projection-rules.mjs';
import { formatSourceProjectionMatches } from './check-source-projection-rule-scope.mjs';

const knownRuleNames = new Set(sourceProjectionRuleNames());

function storyBlockFor(fixtureText, title) {
  const titleIndex = fixtureText.indexOf(title);
  if (titleIndex === -1) return '';
  const rest = fixtureText.slice(titleIndex);
  const nextSeparator = rest.indexOf('\n---', title.length);
  if (nextSeparator !== -1) return rest.slice(0, nextSeparator);
  const nextMajorSection = rest.search(/\n##\s+/);
  if (nextMajorSection !== -1) return rest.slice(0, nextMajorSection);
  return rest;
}

function hasOwn(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key);
}

export function validateSourceProjectionRuleMetadataCoverage(fixtures = realCronFixtures) {
  const failures = [];

  for (const fixture of fixtures) {
    for (const signal of fixture.expectedSignals || []) {
      const key = `${fixture.fixtureDate}::${signal.title}`;
      const block = storyBlockFor(fixture.realCronFixture, signal.title);
      if (!block) {
        failures.push(`${key} — story block not found`);
        continue;
      }

      const actualMatches = sourceProjectionRuleMatches(block);
      if (actualMatches.length === 0) continue;

      if (!hasOwn(signal, 'sourceProjectionRuleMatches')) {
        failures.push(
          `${key} — missing explicit sourceProjectionRuleMatches metadata for matched projection rule(s); matched terms: ${formatSourceProjectionMatches(actualMatches)}`
        );
        continue;
      }

      if (!Array.isArray(signal.sourceProjectionRuleMatches)) {
        failures.push(`${key} — sourceProjectionRuleMatches must be an array`);
        continue;
      }

      const unknownExpected = signal.sourceProjectionRuleMatches.filter((name) => !knownRuleNames.has(name));
      if (unknownExpected.length > 0) {
        failures.push(`${key} — unknown expected source projection rule(s): [${unknownExpected.join(', ')}]`);
      }
    }
  }

  return failures;
}

const syntheticMissingMetadataFixtures = [
  {
    fixtureDate: 'synthetic-source-projection-metadata-coverage',
    realCronFixture: `# Synthetic source projection metadata coverage fixture

## Top 5

### Synthetic AI Cloud metadata probe
发生了什么：A deliberately narrow fixture mentions AI Cloud but omits sourceProjectionRuleMatches metadata.
为什么重要：This synthetic story must fail validation so projection-backed fixture metadata cannot be silently omitted.
影响：The check protects future real cron fixtures from relying on implicit scope defaults.

---
`,
    expectedSignals: [
      {
        title: 'Synthetic AI Cloud metadata probe',
      },
    ],
  },
];

function validateSelfTest() {
  const failures = validateSourceProjectionRuleMetadataCoverage(syntheticMissingMetadataFixtures);
  const diagnostic = failures.join('\n');
  const requiredFragments = [
    'synthetic-source-projection-metadata-coverage::Synthetic AI Cloud metadata probe',
    'missing explicit sourceProjectionRuleMatches metadata',
    'matched terms: nvidia-ai-cloud-ecosystem via "AI Cloud"',
  ];

  if (failures.length !== 1 || requiredFragments.some((fragment) => !diagnostic.includes(fragment))) {
    return [
      'source projection rule metadata coverage self-test failed:',
      diagnostic || '(no failure emitted)',
      `required fragments: ${requiredFragments.join(' | ')}`,
    ];
  }

  return [];
}

function runCli() {
  const selfTestFailures = validateSelfTest();
  const fixtureFailures = validateSourceProjectionRuleMetadataCoverage(realCronFixtures);
  const failures = [...selfTestFailures, ...fixtureFailures];

  if (failures.length > 0) {
    console.error('source projection rule metadata coverage check failed:');
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }

  console.log('source projection rule metadata coverage check passed');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runCli();
}

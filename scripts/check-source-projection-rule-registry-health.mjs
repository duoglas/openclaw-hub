#!/usr/bin/env node
import { fileURLToPath } from 'node:url';
import { realCronFixtures } from './fixtures/daily-real-cron-fixtures.mjs';
import { sourceProjectionRules } from './lib/source-projection-rules.mjs';
import { formatSourceProjectionMatches } from './check-source-projection-rule-scope.mjs';

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

function normalizeDetail(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

function ruleMatches(source, rules) {
  const text = String(source || '');
  return rules
    .map((rule) => ({
      name: rule.name,
      terms: (rule.terms || []).filter((term) => text.includes(term)),
    }))
    .filter((match) => match.terms.length > 0);
}

function collectRuleUsage(fixtures, rules, failures) {
  const usage = new Map(rules.map((rule) => [rule.name, []]));

  for (const fixture of fixtures) {
    for (const signal of fixture.expectedSignals || []) {
      const key = `${fixture.fixtureDate}::${signal.title}`;
      const block = storyBlockFor(fixture.realCronFixture, signal.title);
      if (!block) {
        failures.push(`${key} — story block not found while checking source projection registry usage`);
        continue;
      }

      for (const match of ruleMatches(block, rules)) {
        usage.get(match.name)?.push(`${key} via ${formatSourceProjectionMatches([match])}`);
      }
    }
  }

  return usage;
}

export function validateSourceProjectionRuleRegistryHealth({ rules = sourceProjectionRules(), fixtures = realCronFixtures } = {}) {
  const failures = [];
  const seenNames = new Map();
  const detailOwners = new Map();

  for (const rule of rules) {
    if (!rule.name || typeof rule.name !== 'string') {
      failures.push('source projection rule with missing string name');
      continue;
    }

    if (seenNames.has(rule.name)) {
      failures.push(`duplicate source projection rule name: ${rule.name}`);
    }
    seenNames.set(rule.name, true);

    if (!Array.isArray(rule.terms) || rule.terms.length === 0) {
      failures.push(`${rule.name} — rule must declare at least one matching term`);
    }

    for (const term of rule.terms || []) {
      if (!term || typeof term !== 'string') {
        failures.push(`${rule.name} — rule contains an empty/non-string term`);
      }
    }

    for (const key of ['what', 'why', 'impact']) {
      const detail = rule.details?.[key];
      if (!detail || typeof detail !== 'string') {
        failures.push(`${rule.name} — missing ${key} detail`);
        continue;
      }

      const normalized = normalizeDetail(detail);
      const ownerKey = `${key}::${normalized}`;
      const previousOwner = detailOwners.get(ownerKey);
      if (previousOwner && previousOwner !== rule.name) {
        failures.push(`${rule.name} — duplicate ${key} detail already used by ${previousOwner}`);
      } else {
        detailOwners.set(ownerKey, rule.name);
      }
    }
  }

  const usage = collectRuleUsage(fixtures, rules, failures);
  for (const rule of rules) {
    const hits = usage.get(rule.name) || [];
    if (hits.length === 0) {
      failures.push(`${rule.name} — unused source projection rule; no real cron fixture story block matches any declared term`);
    }
  }

  return failures;
}

const fullSyntheticDetails = {
  what: 'Synthetic used what detail for source projection registry health checks.',
  why: 'Synthetic used why detail for source projection registry health checks.',
  impact: 'Synthetic used impact detail for source projection registry health checks.',
};

function validateSelfTests() {
  const syntheticFixtures = [
    {
      fixtureDate: 'synthetic-source-projection-registry-health',
      realCronFixture: `# Synthetic source projection registry health fixture\n\n## Top 5\n\n### Synthetic used rule story\n发生了什么：Used Token appears in this story block so the first rule is exercised.\n为什么重要：This probe keeps the unused-rule diagnostic deterministic.\n影响：Only one synthetic rule should be used here.\n\n---\n`,
      expectedSignals: [{ title: 'Synthetic used rule story' }],
    },
  ];

  const unusedProbeFailures = validateSourceProjectionRuleRegistryHealth({
    fixtures: syntheticFixtures,
    rules: [
      { name: 'synthetic-used-rule', terms: ['Used Token'], details: fullSyntheticDetails },
      {
        name: 'synthetic-unused-rule',
        terms: ['Never Used Token'],
        details: {
          what: 'Synthetic unused what detail for source projection registry health checks.',
          why: 'Synthetic unused why detail for source projection registry health checks.',
          impact: 'Synthetic unused impact detail for source projection registry health checks.',
        },
      },
    ],
  });

  const unusedDiagnostic = unusedProbeFailures.join('\n');
  const unusedRequiredFragments = [
    'synthetic-unused-rule — unused source projection rule',
    'no real cron fixture story block matches any declared term',
  ];

  const duplicateProbeFailures = validateSourceProjectionRuleRegistryHealth({
    fixtures: [
      {
        fixtureDate: 'synthetic-source-projection-registry-health-duplicate-detail',
        realCronFixture: `# Synthetic source projection duplicate detail fixture\n\n## Top 5\n\n### Synthetic duplicate detail story\n发生了什么：First Duplicate Token and Second Duplicate Token both appear here.\n为什么重要：Both rules are exercised so only duplicate detail should fail.\n影响：The check must prevent copy-pasted projection details.\n\n---\n`,
        expectedSignals: [{ title: 'Synthetic duplicate detail story' }],
      },
    ],
    rules: [
      { name: 'synthetic-duplicate-rule-a', terms: ['First Duplicate Token'], details: fullSyntheticDetails },
      { name: 'synthetic-duplicate-rule-b', terms: ['Second Duplicate Token'], details: fullSyntheticDetails },
    ],
  });

  const duplicateDiagnostic = duplicateProbeFailures.join('\n');
  const duplicateRequiredFragments = [
    'synthetic-duplicate-rule-b — duplicate what detail already used by synthetic-duplicate-rule-a',
    'synthetic-duplicate-rule-b — duplicate why detail already used by synthetic-duplicate-rule-a',
    'synthetic-duplicate-rule-b — duplicate impact detail already used by synthetic-duplicate-rule-a',
  ];

  const failures = [];
  if (unusedProbeFailures.length !== 1 || unusedRequiredFragments.some((fragment) => !unusedDiagnostic.includes(fragment))) {
    failures.push(
      'source projection registry unused-rule self-test failed:',
      unusedDiagnostic || '(no failure emitted)',
      `required fragments: ${unusedRequiredFragments.join(' | ')}`
    );
  }

  if (duplicateProbeFailures.length !== 3 || duplicateRequiredFragments.some((fragment) => !duplicateDiagnostic.includes(fragment))) {
    failures.push(
      'source projection registry duplicate-detail self-test failed:',
      duplicateDiagnostic || '(no failure emitted)',
      `required fragments: ${duplicateRequiredFragments.join(' | ')}`
    );
  }

  return failures;
}

function runCli() {
  const failures = [...validateSelfTests(), ...validateSourceProjectionRuleRegistryHealth()];

  if (failures.length > 0) {
    console.error('source projection rule registry health check failed:');
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }

  console.log('source projection rule registry health check passed');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runCli();
}

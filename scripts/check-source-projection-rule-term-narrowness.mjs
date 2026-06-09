#!/usr/bin/env node
import { fileURLToPath } from 'node:url';
import { sourceProjectionRuleMatches } from './lib/source-projection-rules.mjs';

const TERM_NARROWNESS_PROBES = [
  {
    ruleName: 'aws-quick-connect-bedrock-openai-2026',
    probeName: 'amazon-quicksight-off-topic-substring',
    source: 'AWS analytics notes mention Amazon QuickSight dashboards, SPICE datasets, and BI readers in a standalone business-intelligence product update.',
    reason: 'Amazon QuickSight contains the substring "Amazon Quick" but is an analytics BI product, not the Amazon Quick work AI assistant story.',
  },
];

function formatMatches(matches) {
  return matches.map((match) => `${match.name} via ${match.terms.map((term) => JSON.stringify(term)).join(', ')}`).join('; ');
}

export function validateSourceProjectionRuleTermNarrowness(
  probes = TERM_NARROWNESS_PROBES,
  matchSourceProjectionRules = sourceProjectionRuleMatches
) {
  const failures = [];

  for (const probe of probes) {
    const matches = matchSourceProjectionRules(probe.source).filter((match) => match.name === probe.ruleName);
    if (matches.length > 0) {
      failures.push(
        `${probe.probeName} — off-topic probe unexpectedly matched ${formatMatches(matches)}; ${probe.reason}`
      );
    }
  }

  return failures;
}

const syntheticProbe = [
  {
    ruleName: 'aws-quick-connect-bedrock-openai-2026',
    probeName: 'synthetic-amazon-quicksight-off-topic-substring',
    source: 'Amazon QuickSight teams published a dashboarding update for BI readers and SPICE datasets.',
    reason: 'Self-test expects a broad Amazon Quick term to collide with Amazon QuickSight.',
  },
];

function validateSelfTest() {
  const broadAmazonQuickMatcher = (source) => {
    const text = String(source || '');
    const terms = ['Amazon Quick'].filter((term) => text.includes(term));
    return terms.length > 0 ? [{ name: 'aws-quick-connect-bedrock-openai-2026', terms }] : [];
  };
  const failures = validateSourceProjectionRuleTermNarrowness(syntheticProbe, broadAmazonQuickMatcher);
  const diagnostic = failures.join('\n');
  const requiredFragments = [
    'synthetic-amazon-quicksight-off-topic-substring',
    'aws-quick-connect-bedrock-openai-2026 via "Amazon Quick"',
    'collide with Amazon QuickSight',
  ];

  if (failures.length !== 1 || requiredFragments.some((fragment) => !diagnostic.includes(fragment))) {
    return [
      'source projection rule term narrowness self-test failed:',
      diagnostic || '(no failure emitted)',
      `required fragments: ${requiredFragments.join(' | ')}`,
    ];
  }

  return [];
}

function runCli() {
  const selfTestFailures = validateSelfTest();
  const probeFailures = validateSourceProjectionRuleTermNarrowness();
  const failures = [...selfTestFailures, ...probeFailures];

  if (failures.length > 0) {
    console.error('source projection rule term narrowness check failed:');
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }

  console.log('source projection rule term narrowness check passed');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runCli();
}

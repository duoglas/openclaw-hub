#!/usr/bin/env node
import { fileURLToPath } from 'node:url';
import { sourceProjectionRules } from './lib/source-projection-rules.mjs';

export const ALLOWED_SOURCE_PROJECTION_OWNERS = ['daily-source-projection'];
export const ALLOWED_SOURCE_PROJECTION_CATEGORIES = [
  'cloud-infrastructure',
  'company-finance',
  'consumer-productivity',
  'developer-tools',
  'enterprise-agents',
  'frontier-models',
  'market-intelligence',
  'physical-ai-robotics',
  'policy-governance',
  'product-safety',
];

function normalize(value) {
  return String(value || '').trim();
}

export function validateSourceProjectionRuleTaxonomy({ rules = sourceProjectionRules() } = {}) {
  const failures = [];
  const categoriesInUse = new Set();

  for (const rule of rules) {
    const name = normalize(rule.name) || '(unnamed rule)';
    const owner = normalize(rule.owner);
    const category = normalize(rule.category);

    if (!owner) {
      failures.push(`${name} — missing owner metadata`);
    } else if (!ALLOWED_SOURCE_PROJECTION_OWNERS.includes(owner)) {
      failures.push(`${name} — unknown owner metadata: ${owner}`);
    }

    if (!category) {
      failures.push(`${name} — missing category metadata`);
    } else if (!ALLOWED_SOURCE_PROJECTION_CATEGORIES.includes(category)) {
      failures.push(`${name} — unknown category metadata: ${category}`);
    } else {
      categoriesInUse.add(category);
    }
  }

  for (const category of ALLOWED_SOURCE_PROJECTION_CATEGORIES) {
    if (!categoriesInUse.has(category)) {
      failures.push(`source projection category has no owning rules: ${category}`);
    }
  }

  return failures;
}

function validateSelfTests() {
  const failures = [];
  const missingFailures = validateSourceProjectionRuleTaxonomy({
    rules: [
      {
        name: 'synthetic-missing-taxonomy-rule',
        terms: ['Synthetic Missing Taxonomy'],
        details: { what: 'what', why: 'why', impact: 'impact' },
      },
    ],
  });
  const missingDiagnostic = missingFailures.join('\n');
  for (const fragment of [
    'synthetic-missing-taxonomy-rule — missing owner metadata',
    'synthetic-missing-taxonomy-rule — missing category metadata',
  ]) {
    if (!missingDiagnostic.includes(fragment)) {
      failures.push(`source projection taxonomy missing-metadata self-test failed: ${fragment}`);
    }
  }

  const unknownFailures = validateSourceProjectionRuleTaxonomy({
    rules: [
      {
        name: 'synthetic-unknown-taxonomy-rule',
        owner: 'unknown-owner',
        category: 'unknown-category',
        terms: ['Synthetic Unknown Taxonomy'],
        details: { what: 'what', why: 'why', impact: 'impact' },
      },
    ],
  });
  const unknownDiagnostic = unknownFailures.join('\n');
  for (const fragment of [
    'synthetic-unknown-taxonomy-rule — unknown owner metadata: unknown-owner',
    'synthetic-unknown-taxonomy-rule — unknown category metadata: unknown-category',
  ]) {
    if (!unknownDiagnostic.includes(fragment)) {
      failures.push(`source projection taxonomy unknown-metadata self-test failed: ${fragment}`);
    }
  }

  return failures;
}

function runCli() {
  const failures = [...validateSelfTests(), ...validateSourceProjectionRuleTaxonomy()];
  if (failures.length > 0) {
    console.error('source projection rule taxonomy check failed:');
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }
  console.log('source projection rule taxonomy check passed');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runCli();
}

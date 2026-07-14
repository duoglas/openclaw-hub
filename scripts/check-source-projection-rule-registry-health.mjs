#!/usr/bin/env node
import { fileURLToPath } from 'node:url';
import { realCronFixtures } from './fixtures/daily-real-cron-fixtures.mjs';
import { sourceProjectionRules } from './lib/source-projection-rules.mjs';
import { formatSourceProjectionMatches } from './check-source-projection-rule-scope.mjs';
import { ALLOWED_SOURCE_PROJECTION_SPLIT_TARGET_CATEGORIES } from './check-source-projection-rule-taxonomy.mjs';

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

function detailVariantMatchesFixture(variant, fixtures) {
  const terms = Array.isArray(variant?.terms) ? variant.terms : [];
  if (terms.length === 0) return false;

  return fixtures.some((fixture) => {
    for (const signal of fixture.expectedSignals || []) {
      const block = storyBlockFor(fixture.realCronFixture, signal.title);
      if (block && terms.every((term) => block.includes(term))) return true;
    }
    return false;
  });
}

function effectiveRuleCategory(rule) {
  return String(rule.splitTargetCategory || rule.category || '(missing category)').trim();
}

function sortDistributionEntries(entries) {
  return [...entries].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

export function summarizeSourceProjectionRuleRegistrySplitTargets({ rules = sourceProjectionRules() } = {}) {
  const distribution = new Map();
  const parentCategoryFallback = [];
  const allowedSplitTargets = new Set(ALLOWED_SOURCE_PROJECTION_SPLIT_TARGET_CATEGORIES);

  for (const rule of rules) {
    const effectiveCategory = effectiveRuleCategory(rule);
    distribution.set(effectiveCategory, (distribution.get(effectiveCategory) || 0) + 1);
    if (!rule.splitTargetCategory && !allowedSplitTargets.has(effectiveCategory)) {
      parentCategoryFallback.push(rule.name || '(unnamed rule)');
    }
  }

  return {
    totalRules: rules.length,
    distribution: sortDistributionEntries(distribution.entries()).map(([name, count]) => ({ name, count })),
    parentCategoryFallback,
  };
}

export function formatSourceProjectionRuleRegistrySplitTargetSummary(summary = summarizeSourceProjectionRuleRegistrySplitTargets()) {
  const distributionLine = summary.distribution.map((item) => `${item.name}=${item.count}`).join(', ');
  return [
    `source projection registry effective category summary: totalRules=${summary.totalRules}`,
    `effective categories: ${distributionLine || 'none'}`,
    `parent category fallback rules: ${summary.parentCategoryFallback.length}`,
  ].join('\n');
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

    for (const [index, variant] of (rule.detailVariants || []).entries()) {
      const variantLabel = `${rule.name}.detailVariants[${index}]`;
      if (!Array.isArray(variant?.terms) || variant.terms.length === 0) {
        failures.push(`${variantLabel} — detail variant must declare at least one matching term`);
      }

      for (const term of variant?.terms || []) {
        if (!term || typeof term !== 'string') {
          failures.push(`${variantLabel} — detail variant contains an empty/non-string term`);
        }
      }

      for (const key of ['what', 'why', 'impact']) {
        const detail = variant?.details?.[key];
        if (!detail || typeof detail !== 'string') {
          failures.push(`${variantLabel} — missing ${key} detail`);
          continue;
        }

      }

      if (!detailVariantMatchesFixture(variant, fixtures)) {
        failures.push(`${variantLabel} — unused detail variant; no real cron fixture story block matches all declared terms`);
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

  const detailVariantProbeFailures = validateSourceProjectionRuleRegistryHealth({
    fixtures: [
      {
        fixtureDate: 'synthetic-source-projection-registry-health-detail-variant',
        realCronFixture: `# Synthetic source projection detail variant fixture\n\n## Top 5\n\n### Synthetic variant story\n发生了什么：Variant Anchor Token appears here, while the second required probe is absent.\n为什么重要：The check must ensure variant details are complete and fixture-backed.\n影响：Unused variants should not silently pass.\n\n---\n`,
        expectedSignals: [{ title: 'Synthetic variant story' }],
      },
    ],
    rules: [
      {
        name: 'synthetic-detail-variant-rule',
        terms: ['Variant Anchor Token'],
        details: fullSyntheticDetails,
        detailVariants: [
          {
            terms: ['Variant Anchor Token', 'Missing Variant Token'],
            details: {
              what: 'Synthetic detail variant what for registry health checks.',
              why: 'Synthetic detail variant why for registry health checks.',
            },
          },
        ],
      },
    ],
  });

  const detailVariantDiagnostic = detailVariantProbeFailures.join('\n');
  const detailVariantRequiredFragments = [
    'synthetic-detail-variant-rule.detailVariants[0] — missing impact detail',
    'synthetic-detail-variant-rule.detailVariants[0] — unused detail variant; no real cron fixture story block matches all declared terms',
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

  if (detailVariantProbeFailures.length !== 2 || detailVariantRequiredFragments.some((fragment) => !detailVariantDiagnostic.includes(fragment))) {
    failures.push(
      'source projection registry detail-variant self-test failed:',
      detailVariantDiagnostic || '(no failure emitted)',
      `required fragments: ${detailVariantRequiredFragments.join(' | ')}`
    );
  }

  const splitTargetSummaryDiagnostic = formatSourceProjectionRuleRegistrySplitTargetSummary(summarizeSourceProjectionRuleRegistrySplitTargets({
    rules: [
      {
        name: 'synthetic-enterprise-parent-rule',
        category: 'enterprise-agents',
      },
      {
        name: 'synthetic-enterprise-platform-rule',
        category: 'enterprise-agents',
        splitTargetCategory: 'enterprise-agent-platforms',
      },
      {
        name: 'synthetic-enterprise-platform-rule-b',
        category: 'enterprise-agents',
        splitTargetCategory: 'enterprise-agent-platforms',
      },
      {
        name: 'synthetic-frontier-rule',
        category: 'frontier-models',
      },
    ],
  }));
  for (const fragment of [
    'source projection registry effective category summary: totalRules=4',
    'effective categories: enterprise-agent-platforms=2, enterprise-agents=1, frontier-models=1',
    'parent category fallback rules: 2',
  ]) {
    if (!splitTargetSummaryDiagnostic.includes(fragment)) {
      failures.push(`source projection registry split-target summary self-test failed: ${fragment}`);
    }
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
  console.log(formatSourceProjectionRuleRegistrySplitTargetSummary());
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runCli();
}

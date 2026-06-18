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

export const SOURCE_PROJECTION_CATEGORY_RULE_BUDGETS = {
  'cloud-infrastructure': 6,
  'company-finance': 5,
  'consumer-productivity': 5,
  'developer-tools': 4,
  'enterprise-agents': 8,
  'frontier-models': 6,
  'market-intelligence': 5,
  'physical-ai-robotics': 10,
  'policy-governance': 8,
  'product-safety': 5,
};
export const SOURCE_PROJECTION_CATEGORY_LOW_HEADROOM_THRESHOLD = 1;
export const SOURCE_PROJECTION_CATEGORY_HIGH_UTILIZATION_THRESHOLD = 0.8;
export const SOURCE_PROJECTION_CATEGORY_SPLIT_RECOMMENDATIONS = {
  'cloud-infrastructure': [
    'cloud-model-distribution',
    'ai-infrastructure-capacity',
  ],
  'consumer-productivity': [
    'career-productivity-workflows',
    'chatgpt-control-surfaces',
    'consumer-creative-ai',
  ],
  'enterprise-agents': [
    'enterprise-agent-platforms',
    'vertical-workflow-agents',
    'agent-enablement-programs',
  ],
  'physical-ai-robotics': [
    'robotics-simulation-training',
    'robotics-commercial-deployment',
    'autonomous-mobility-systems',
  ],
  'market-intelligence': [
    'market-sizing-reports',
    'content-licensing-markets',
    'regional-ai-ecosystems',
  ],
  'policy-governance': [
    'ai-policy-standards',
    'ai-industrial-policy',
    'digital-regulation-compliance',
  ],
};

export const SOURCE_PROJECTION_CATEGORY_SPLIT_MIGRATION_HINTS = {
  'enterprise-agents': [
    {
      target: 'enterprise-agent-platforms',
      match: ['meta-business-agent', 'microsoft-enterprise-agent-system', 'aws-quick-connect', 'openai-partner-network'],
    },
    {
      target: 'vertical-workflow-agents',
      match: ['amazon-nova-act', 'nvidia-nemoclaw'],
    },
    {
      target: 'agent-enablement-programs',
      match: ['openai-academy', 'anthropic-claude-corps'],
    },
  ],
  'policy-governance': [
    {
      target: 'ai-policy-standards',
      match: ['metrology', 'safety', 'standards', '计量', '安全'],
    },
    {
      target: 'ai-industrial-policy',
      match: ['national-data-administration', 'ai-education', 'provincial', 'province-ministry', '6g', 'asean', 'ict', '数据局', '东盟'],
    },
    {
      target: 'digital-regulation-compliance',
      match: ['app-jump', '治理', 'compliance'],
    },
  ],
  'cloud-infrastructure': [
    {
      target: 'cloud-model-distribution',
      match: ['bedrock', 'openai-amazon', 'agentperf', 'agentcore', 'continuum'],
    },
    {
      target: 'ai-infrastructure-capacity',
      match: ['ai-cloud', 'korea', 'blackwell', 'azure', 'microsoft', 'infrastructure'],
    },
  ],
  'consumer-productivity': [
    {
      target: 'career-productivity-workflows',
      match: ['jobs', 'resume', '职位', '简历', 'freelance'],
    },
    {
      target: 'chatgpt-control-surfaces',
      match: ['model-picker', 'scheduled-tasks', 'pulse', 'instant', 'thinking', 'scheduled'],
    },
    {
      target: 'consumer-creative-ai',
      match: ['facebook-ai-tools', 'ai mode', '图片', '视频', '换装', 'creative'],
    },
  ],
  'market-intelligence': [
    {
      target: 'market-sizing-reports',
      match: ['industry-report', '6000', '1.2', 'market scale', '产业规模'],
    },
    {
      target: 'content-licensing-markets',
      match: ['content-partners', 'crawler', 'licensing', 'gated preview'],
    },
    {
      target: 'regional-ai-ecosystems',
      match: ['shanghai-tech-fair', 'korea', 'seoul', 'naver', 'nexon', 'regional', 'ecosystem'],
    },
  ],
  'physical-ai-robotics': [
    {
      target: 'robotics-simulation-training',
      match: ['sim-to-real', 'cvpr', 'cosmos', 'agent-skills', 'embodied-training', '实景实训'],
    },
    {
      target: 'robotics-commercial-deployment',
      match: ['doosan', 'unitree', 'service-robotics', 'ipo', 'factory'],
    },
    {
      target: 'autonomous-mobility-systems',
      match: ['drive-hyperion', 'robotaxi', 'autonomous'],
    },
  ],
};

function normalize(value) {
  return String(value || '').trim();
}

export function summarizeSourceProjectionRuleTaxonomy({ rules = sourceProjectionRules() } = {}) {
  const ownerCounts = new Map();
  const categoryCounts = new Map();

  for (const rule of rules) {
    const owner = normalize(rule.owner) || '(missing owner)';
    const category = normalize(rule.category) || '(missing category)';
    ownerCounts.set(owner, (ownerCounts.get(owner) || 0) + 1);
    categoryCounts.set(category, (categoryCounts.get(category) || 0) + 1);
  }

  const sortCounts = (entries) => [...entries].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

  const owners = sortCounts(ownerCounts.entries()).map(([name, count]) => ({
    name,
    count,
    share: rules.length > 0 ? count / rules.length : 0,
  }));
  const categories = sortCounts(categoryCounts.entries()).map(([name, count]) => {
    const budget = SOURCE_PROJECTION_CATEGORY_RULE_BUDGETS[name] || null;
    return {
      name,
      count,
      share: rules.length > 0 ? count / rules.length : 0,
      budget,
      headroom: budget == null ? null : budget - count,
    };
  });

  const lowHeadroomCategories = categories
    .filter((item) => item.headroom != null && item.headroom <= SOURCE_PROJECTION_CATEGORY_LOW_HEADROOM_THRESHOLD)
    .sort((a, b) => a.headroom - b.headroom || b.count - a.count || a.name.localeCompare(b.name));
  const highUtilizationCategories = categories
    .filter((item) => (
      item.budget != null
      && item.budget > 0
      && item.count / item.budget >= SOURCE_PROJECTION_CATEGORY_HIGH_UTILIZATION_THRESHOLD
    ))
    .sort((a, b) => (b.count / b.budget) - (a.count / a.budget) || b.count - a.count || a.name.localeCompare(b.name));

  return {
    rules,
    totalRules: rules.length,
    owners,
    categories,
    largestOwner: owners[0] || null,
    largestCategory: categories[0] || null,
    lowHeadroomCategories,
    highUtilizationCategories,
  };
}

function formatShare(value) {
  return `${Math.round(Number(value || 0) * 100)}%`;
}

function formatUtilization(item) {
  return `${item.name}=${item.count}/${item.budget} (${formatShare(item.count / item.budget)} used, ${item.headroom} headroom)`;
}

function formatMigrationRuleList(rules) {
  return rules.length > 0 ? rules.join('|') : 'none';
}

export function suggestSourceProjectionCategorySplitPlans(summary = summarizeSourceProjectionRuleTaxonomy()) {
  return suggestSourceProjectionCategoryCapacityActions(summary)
    .filter((item) => SOURCE_PROJECTION_CATEGORY_SPLIT_RECOMMENDATIONS[item.name])
    .map((item) => ({
      ...item,
      splitInto: SOURCE_PROJECTION_CATEGORY_SPLIT_RECOMMENDATIONS[item.name],
    }));
}

function ruleSearchText(rule) {
  return [
    rule.name,
    rule.category,
    ...(rule.terms || []),
    rule.details?.what,
    rule.details?.why,
    rule.details?.impact,
  ].filter(Boolean).join(' ').toLowerCase();
}

export function suggestSourceProjectionCategorySplitMigrationBatches({
  summary = null,
  rules = summary?.rules || sourceProjectionRules(),
} = {}) {
  summary ||= summarizeSourceProjectionRuleTaxonomy({ rules });
  const highRiskCategories = new Set(suggestSourceProjectionCategorySplitPlans(summary).map((item) => item.name));
  return [...highRiskCategories]
    .map((category) => {
      const hints = SOURCE_PROJECTION_CATEGORY_SPLIT_MIGRATION_HINTS[category] || [];
      const rulesInCategory = rules.filter((rule) => normalize(rule.category) === category);
      const targets = hints.map((hint) => ({ target: hint.target, rules: [] }));
      const unmatched = [];

      for (const rule of rulesInCategory) {
        const text = ruleSearchText(rule);
        const matchedHint = hints.find((hint) => hint.match.some((token) => text.includes(token.toLowerCase())));
        if (matchedHint) {
          targets.find((item) => item.target === matchedHint.target).rules.push(rule.name);
        } else {
          unmatched.push(rule.name);
        }
      }

      return {
        category,
        totalRules: rulesInCategory.length,
        targets: targets.filter((item) => item.rules.length > 0),
        unmatched,
      };
    })
    .filter((batch) => batch.totalRules > 0);
}

export function suggestSourceProjectionCategoryCapacityActions(summary = summarizeSourceProjectionRuleTaxonomy()) {
  const actionByCategory = new Map();
  for (const item of summary.highUtilizationCategories || []) {
    actionByCategory.set(item.name, {
      ...item,
      reasons: [`${formatShare(item.count / item.budget)} used`],
    });
  }
  for (const item of summary.lowHeadroomCategories || []) {
    const existing = actionByCategory.get(item.name) || { ...item, reasons: [] };
    existing.reasons.push(`${item.headroom} headroom`);
    actionByCategory.set(item.name, existing);
  }

  return [...actionByCategory.values()]
    .sort((a, b) => a.headroom - b.headroom || (b.count / b.budget) - (a.count / a.budget) || b.count - a.count || a.name.localeCompare(b.name))
    .map((item) => ({
      ...item,
      action: 'split category or raise budget before adding new rules',
      reason: [...new Set(item.reasons)].join(' + '),
    }));
}


function hasCapacityPlan(rule) {
  return Boolean(normalize(rule.capacityPlan) || normalize(rule.capacityJustification));
}

export function categoriesRequiringSourceProjectionCapacityPlan(summary = summarizeSourceProjectionRuleTaxonomy()) {
  return suggestSourceProjectionCategoryCapacityActions(summary).map((item) => item.name);
}

export function validateSourceProjectionRuleCategoryCapacityPlan({
  currentRules = sourceProjectionRules(),
  proposedRules = [],
} = {}) {
  const summary = summarizeSourceProjectionRuleTaxonomy({ rules: currentRules });
  const actionByCategory = new Map(suggestSourceProjectionCategoryCapacityActions(summary).map((item) => [item.name, item]));
  const failures = [];

  for (const rule of proposedRules) {
    const name = normalize(rule.name) || '(unnamed proposed rule)';
    const category = normalize(rule.category);
    const action = actionByCategory.get(category);
    if (action && !hasCapacityPlan(rule)) {
      failures.push(
        `${name} — category ${category} requires capacityPlan before adding new rules `
          + `(${action.reason}; ${action.action})`,
      );
    }
  }

  return failures;
}

export function formatSourceProjectionRuleTaxonomySummary(summary = summarizeSourceProjectionRuleTaxonomy()) {
  const ownerLine = summary.owners.map((item) => `${item.name}=${item.count}`).join(', ');
  const categoryLine = summary.categories.map((item) => `${item.name}=${item.count}`).join(', ');
  const categoryBudgetLine = summary.categories
    .filter((item) => item.budget != null)
    .map((item) => `${item.name}=${item.count}/${item.budget} (${item.headroom} headroom)`)
    .join(', ');
  const largestOwner = summary.largestOwner
    ? `${summary.largestOwner.name}=${summary.largestOwner.count}/${summary.totalRules} (${formatShare(summary.largestOwner.share)})`
    : 'n/a';
  const largestCategory = summary.largestCategory
    ? `${summary.largestCategory.name}=${summary.largestCategory.count}/${summary.totalRules} (${formatShare(summary.largestCategory.share)})`
    : 'n/a';
  const lowHeadroomLine = (summary.lowHeadroomCategories || [])
    .map((item) => `${item.name}=${item.count}/${item.budget} (${item.headroom} headroom)`)
    .join(', ');
  const highUtilizationLine = (summary.highUtilizationCategories || [])
    .map(formatUtilization)
    .join(', ');
  const capacityActionLine = suggestSourceProjectionCategoryCapacityActions(summary)
    .map((item) => `${item.name}: ${item.action} (${item.reason})`)
    .join('; ');
  const splitPlanLine = suggestSourceProjectionCategorySplitPlans(summary)
    .map((item) => `${item.name}: split into ${item.splitInto.join(' / ')} (${item.reason})`)
    .join('; ');
  const splitMigrationBatches = suggestSourceProjectionCategorySplitMigrationBatches({ summary });
  const splitMigrationLine = splitMigrationBatches
    .map((batch) => {
      const targetLine = batch.targets
        .map((target) => `${target.target}=${target.rules.length}`)
        .join(', ');
      const unmatchedLine = batch.unmatched.length > 0 ? `, unmatched=${batch.unmatched.length}` : '';
      return `${batch.category}: ${targetLine}${unmatchedLine}`;
    })
    .join('; ');
  const splitMigrationDetailsLine = splitMigrationBatches
    .map((batch) => {
      const targetDetails = batch.targets
        .map((target) => `${target.target}=[${formatMigrationRuleList(target.rules)}]`)
        .join(', ');
      const unmatchedDetails = batch.unmatched.length > 0
        ? `, unmatched=[${formatMigrationRuleList(batch.unmatched)}]`
        : '';
      return `${batch.category}: ${targetDetails}${unmatchedDetails}`;
    })
    .join('; ');
  const capacityPlanCategories = categoriesRequiringSourceProjectionCapacityPlan(summary).join(', ');
  return [
    `source projection taxonomy summary: totalRules=${summary.totalRules}`,
    `owners: ${ownerLine}`,
    `categories: ${categoryLine}`,
    `category budgets: ${categoryBudgetLine || 'n/a'}`,
    `low headroom categories: ${lowHeadroomLine || 'none'}`,
    `high utilization categories: ${highUtilizationLine || 'none'}`,
    `category capacity actions: ${capacityActionLine || 'none'}`,
    `category split recommendations: ${splitPlanLine || 'none'}`,
    `category split migration batches: ${splitMigrationLine || 'none'}`,
    `category split migration details: ${splitMigrationDetailsLine || 'none'}`,
    `new rule capacity plan required for: ${capacityPlanCategories || 'none'}`,
    `largest owner share: ${largestOwner}`,
    `largest category share: ${largestCategory}`,
  ].join('\n');
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

  const summary = summarizeSourceProjectionRuleTaxonomy({ rules });
  for (const category of summary.categories) {
    if (category.budget != null && category.count > category.budget) {
      failures.push(
        `source projection category over budget: ${category.name}=${category.count}/${category.budget} `
          + `(over by ${category.count - category.budget})`,
      );
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

  const budgetFailures = validateSourceProjectionRuleTaxonomy({
    rules: Array.from({ length: SOURCE_PROJECTION_CATEGORY_RULE_BUDGETS['developer-tools'] + 1 }, (_, index) => ({
      name: `synthetic-developer-tools-budget-rule-${index + 1}`,
      owner: 'daily-source-projection',
      category: 'developer-tools',
      terms: [`Synthetic Developer Tools Budget ${index + 1}`],
      details: { what: 'what', why: 'why', impact: 'impact' },
    })).concat(ALLOWED_SOURCE_PROJECTION_CATEGORIES
      .filter((category) => category !== 'developer-tools')
      .map((category) => ({
        name: `synthetic-${category}-coverage-rule`,
        owner: 'daily-source-projection',
        category,
        terms: [`Synthetic ${category} Coverage`],
        details: { what: 'what', why: 'why', impact: 'impact' },
      }))),
  });
  const budgetDiagnostic = budgetFailures.join('\n');
  if (!budgetDiagnostic.includes('source projection category over budget: developer-tools=5/4 (over by 1)')) {
    failures.push('source projection taxonomy category budget self-test failed: developer-tools over budget diagnostic');
  }

  const summaryDiagnostic = formatSourceProjectionRuleTaxonomySummary(summarizeSourceProjectionRuleTaxonomy({
    rules: [
      { name: 'synthetic-frontier-rule', owner: 'daily-source-projection', category: 'frontier-models' },
      { name: 'synthetic-robotics-rule-a', owner: 'daily-source-projection', category: 'physical-ai-robotics' },
      { name: 'synthetic-robotics-rule-b', owner: 'daily-source-projection', category: 'physical-ai-robotics' },
    ],
  }));
  for (const fragment of [
    'source projection taxonomy summary: totalRules=3',
    'owners: daily-source-projection=3',
    'categories: physical-ai-robotics=2, frontier-models=1',
    'category budgets: physical-ai-robotics=2/10 (8 headroom), frontier-models=1/6 (5 headroom)',
    'low headroom categories: none',
    'high utilization categories: none',
    'category capacity actions: none',
    'category split recommendations: none',
    'category split migration batches: none',
    'category split migration details: none',
    'new rule capacity plan required for: none',
    'largest owner share: daily-source-projection=3/3 (100%)',
    'largest category share: physical-ai-robotics=2/3 (67%)',
  ]) {
    if (!summaryDiagnostic.includes(fragment)) {
      failures.push(`source projection taxonomy summary self-test failed: ${fragment}`);
    }
  }

  const highUtilizationDiagnostic = formatSourceProjectionRuleTaxonomySummary(summarizeSourceProjectionRuleTaxonomy({
    rules: Array.from({ length: 4 }, (_, index) => ({
      name: `synthetic-developer-utilization-rule-${index + 1}`,
      owner: 'daily-source-projection',
      category: 'developer-tools',
    })).concat(Array.from({ length: 4 }, (_, index) => ({
      name: `synthetic-company-utilization-rule-${index + 1}`,
      owner: 'daily-source-projection',
      category: 'company-finance',
    }))),
  }));
  for (const fragment of [
    'high utilization categories: developer-tools=4/4 (100% used, 0 headroom), company-finance=4/5 (80% used, 1 headroom)',
    'category capacity actions: developer-tools: split category or raise budget before adding new rules (100% used + 0 headroom); company-finance: split category or raise budget before adding new rules (80% used + 1 headroom)',
    'category split recommendations: none',
    'category split migration batches: none',
    'category split migration details: none',
    'new rule capacity plan required for: developer-tools, company-finance',
  ]) {
    if (!highUtilizationDiagnostic.includes(fragment)) {
      failures.push(`source projection taxonomy high-utilization self-test failed: ${fragment}`);
    }
  }

  const splitPlanDiagnostic = formatSourceProjectionRuleTaxonomySummary(summarizeSourceProjectionRuleTaxonomy({
    rules: Array.from({ length: 8 }, (_, index) => ({
      name: `synthetic-enterprise-agents-split-rule-${index + 1}`,
      owner: 'daily-source-projection',
      category: 'enterprise-agents',
    })).concat(ALLOWED_SOURCE_PROJECTION_CATEGORIES
      .filter((category) => category !== 'enterprise-agents')
      .map((category) => ({
        name: `synthetic-${category}-split-coverage-rule`,
        owner: 'daily-source-projection',
        category,
      }))),
  }));
  if (!splitPlanDiagnostic.includes('category split recommendations: enterprise-agents: split into enterprise-agent-platforms / vertical-workflow-agents / agent-enablement-programs (100% used + 0 headroom)')) {
    failures.push('source projection taxonomy split-plan self-test failed: enterprise-agents split recommendation');
  }

  const splitMigrationRules = [
    { name: 'meta-business-agent-2026', owner: 'daily-source-projection', category: 'enterprise-agents' },
    { name: 'microsoft-enterprise-agent-system-2026', owner: 'daily-source-projection', category: 'enterprise-agents' },
    { name: 'amazon-nova-act-agentic-ai', owner: 'daily-source-projection', category: 'enterprise-agents' },
    { name: 'nvidia-nemoclaw-industrial-agents', owner: 'daily-source-projection', category: 'enterprise-agents' },
    { name: 'openai-academy-enterprise-ai-foundations-2026', owner: 'daily-source-projection', category: 'enterprise-agents' },
    { name: 'anthropic-claude-corps-nonprofit-2026', owner: 'daily-source-projection', category: 'enterprise-agents' },
    { name: 'synthetic-unmapped-enterprise-agent', owner: 'daily-source-projection', category: 'enterprise-agents' },
    { name: 'openai-partner-network-enterprise-ecosystem-2026', owner: 'daily-source-projection', category: 'enterprise-agents' },
  ];
  const splitMigrationDiagnostic = formatSourceProjectionRuleTaxonomySummary(summarizeSourceProjectionRuleTaxonomy({
    rules: splitMigrationRules,
  }));
  if (!splitMigrationDiagnostic.includes('category split migration batches: enterprise-agents: enterprise-agent-platforms=3, vertical-workflow-agents=2, agent-enablement-programs=2, unmatched=1')) {
    failures.push('source projection taxonomy split-migration self-test failed: enterprise-agents migration batch counts');
  }
  if (!splitMigrationDiagnostic.includes('category split migration details: enterprise-agents: enterprise-agent-platforms=[meta-business-agent-2026|microsoft-enterprise-agent-system-2026|openai-partner-network-enterprise-ecosystem-2026], vertical-workflow-agents=[amazon-nova-act-agentic-ai|nvidia-nemoclaw-industrial-agents], agent-enablement-programs=[openai-academy-enterprise-ai-foundations-2026|anthropic-claude-corps-nonprofit-2026], unmatched=[synthetic-unmapped-enterprise-agent]')) {
    failures.push('source projection taxonomy split-migration self-test failed: enterprise-agents migration rule details');
  }

  const recentSignalSplitMigrationDiagnostic = formatSourceProjectionRuleTaxonomySummary(summarizeSourceProjectionRuleTaxonomy({
    rules: [
      { name: 'chatgpt-jobs-resume-tools', owner: 'daily-source-projection', category: 'consumer-productivity' },
      { name: 'openai-chatgpt-model-picker-2026', owner: 'daily-source-projection', category: 'consumer-productivity' },
      { name: 'meta-facebook-ai-tools-2026', owner: 'daily-source-projection', category: 'consumer-productivity' },
      { name: 'openai-chatgpt-scheduled-tasks-pulse-2026', owner: 'daily-source-projection', category: 'consumer-productivity' },
      { name: 'china-ai-industry-report-l3', owner: 'daily-source-projection', category: 'market-intelligence' },
      { name: 'shanghai-tech-fair-2026-hard-tech', owner: 'daily-source-projection', category: 'market-intelligence' },
      { name: 'amazon-content-partners-ai-crawler-preview-2026', owner: 'daily-source-projection', category: 'market-intelligence' },
      { name: 'anthropic-korea-seoul-office-ecosystem-2026', owner: 'daily-source-projection', category: 'market-intelligence' },
    ],
  }));
  for (const fragment of [
    'category split recommendations: consumer-productivity: split into career-productivity-workflows / chatgpt-control-surfaces / consumer-creative-ai (80% used + 1 headroom); market-intelligence: split into market-sizing-reports / content-licensing-markets / regional-ai-ecosystems (80% used + 1 headroom)',
    'category split migration batches: consumer-productivity: career-productivity-workflows=1, chatgpt-control-surfaces=2, consumer-creative-ai=1; market-intelligence: market-sizing-reports=1, content-licensing-markets=1, regional-ai-ecosystems=2',
    'category split migration details: consumer-productivity: career-productivity-workflows=[chatgpt-jobs-resume-tools], chatgpt-control-surfaces=[openai-chatgpt-model-picker-2026|openai-chatgpt-scheduled-tasks-pulse-2026], consumer-creative-ai=[meta-facebook-ai-tools-2026]; market-intelligence: market-sizing-reports=[china-ai-industry-report-l3], content-licensing-markets=[amazon-content-partners-ai-crawler-preview-2026], regional-ai-ecosystems=[shanghai-tech-fair-2026-hard-tech|anthropic-korea-seoul-office-ecosystem-2026]',
  ]) {
    if (!recentSignalSplitMigrationDiagnostic.includes(fragment)) {
      failures.push(`source projection taxonomy recent-signal split-migration self-test failed: ${fragment}`);
    }
  }

  const capacityPlanFailures = validateSourceProjectionRuleCategoryCapacityPlan({
    currentRules: Array.from({ length: 4 }, (_, index) => ({
      name: `synthetic-developer-capacity-current-${index + 1}`,
      owner: 'daily-source-projection',
      category: 'developer-tools',
    })).concat(ALLOWED_SOURCE_PROJECTION_CATEGORIES
      .filter((category) => category !== 'developer-tools')
      .map((category) => ({
        name: `synthetic-${category}-capacity-coverage-rule`,
        owner: 'daily-source-projection',
        category,
      }))),
    proposedRules: [
      {
        name: 'synthetic-new-developer-tool-rule-without-plan',
        owner: 'daily-source-projection',
        category: 'developer-tools',
      },
    ],
  });
  const capacityPlanDiagnostic = capacityPlanFailures.join('\n');
  if (!capacityPlanDiagnostic.includes('synthetic-new-developer-tool-rule-without-plan — category developer-tools requires capacityPlan before adding new rules (100% used + 0 headroom; split category or raise budget before adding new rules)')) {
    failures.push('source projection taxonomy capacity-plan self-test failed: missing capacityPlan diagnostic');
  }

  const capacityPlanPassFailures = validateSourceProjectionRuleCategoryCapacityPlan({
    currentRules: Array.from({ length: 4 }, (_, index) => ({
      name: `synthetic-developer-capacity-current-pass-${index + 1}`,
      owner: 'daily-source-projection',
      category: 'developer-tools',
    })).concat(ALLOWED_SOURCE_PROJECTION_CATEGORIES
      .filter((category) => category !== 'developer-tools')
      .map((category) => ({
        name: `synthetic-${category}-capacity-pass-coverage-rule`,
        owner: 'daily-source-projection',
        category,
      }))),
    proposedRules: [
      {
        name: 'synthetic-new-developer-tool-rule-with-plan',
        owner: 'daily-source-projection',
        category: 'developer-tools',
        capacityPlan: 'Split developer-tools into desktop-automation before adding this rule.',
      },
    ],
  });
  if (capacityPlanPassFailures.length > 0) {
    failures.push('source projection taxonomy capacity-plan self-test failed: capacityPlan should satisfy high-risk category guard');
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
  console.log(formatSourceProjectionRuleTaxonomySummary());
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runCli();
}

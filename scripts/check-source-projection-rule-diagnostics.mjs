#!/usr/bin/env node
import { validateSourceProjectionRuleScope } from './check-source-projection-rule-scope.mjs';

// Capture console.warn output
const warnLines = [];
const originalWarn = console.warn;
console.warn = (...args) => {
  warnLines.push(args.join(' '));
  originalWarn(...args);
};

const syntheticCollisionFixtures = [
  {
    fixtureDate: 'synthetic-source-projection-diagnostic',
    realCronFixture: `# Synthetic source projection diagnostic fixture

## Top 5

### Synthetic AI Cloud collision probe
发生了什么：A deliberately narrow fixture mentions AI Cloud without declaring an allowed projection rule.
为什么重要：This synthetic story must trigger a diagnostic so we can verify which term caused the collision.
影响：The check protects future scope changes from losing the specific matched term.

---
`,
    expectedSignals: [
      {
        title: 'Synthetic AI Cloud collision probe',
        sourceProjectionRuleMatches: [],
      },
    ],
  },
];

// Reset console.warn
console.warn = originalWarn;

const failures = validateSourceProjectionRuleScope(syntheticCollisionFixtures);
const diagnostic = warnLines.join('\n');

// After the scope gate change: unexpected matches go to console.warn, not failures.
// The diagnostic fixture verifies that the warning still contains the expected information.
const requiredFragments = [
  'synthetic-source-projection-diagnostic::Synthetic AI Cloud collision probe',
  'unexpected matches',
  'nvidia-ai-cloud-ecosystem',
  'AI Cloud',
];

const hasRequired = requiredFragments.every((fragment) => diagnostic.includes(fragment));
const hasNoUnexpectedFailures = failures.length === 0;

if (!hasRequired) {
  console.error('source projection rule diagnostic fixture failed:');
  console.error(diagnostic || '(no warning emitted)');
  console.error(`required fragments: ${requiredFragments.join(' | ')}`);
  process.exit(1);
}

if (!hasNoUnexpectedFailures) {
  console.error('source projection rule diagnostic fixture failed: unexpected failures');
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('source projection rule diagnostic fixture passed');

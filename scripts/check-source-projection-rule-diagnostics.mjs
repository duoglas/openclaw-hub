#!/usr/bin/env node
import { validateSourceProjectionRuleScope } from './check-source-projection-rule-scope.mjs';

const syntheticCollisionFixtures = [
  {
    fixtureDate: 'synthetic-source-projection-diagnostic',
    realCronFixture: `# Synthetic source projection diagnostic fixture

## Top 5

### Synthetic AI Cloud collision probe
发生了什么：A deliberately narrow fixture mentions AI Cloud without declaring an allowed projection rule.
为什么重要：This synthetic story must fail validation so the diagnostic message proves which term triggered the collision.
影响：The check protects future scope failures from losing the specific matched term.

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

const failures = validateSourceProjectionRuleScope(syntheticCollisionFixtures);
const diagnostic = failures.join('\n');
const requiredFragments = [
  'synthetic-source-projection-diagnostic::Synthetic AI Cloud collision probe',
  'expected [none], got [nvidia-ai-cloud-ecosystem]',
  'matched terms: nvidia-ai-cloud-ecosystem via "AI Cloud"',
];

if (failures.length !== 1 || requiredFragments.some((fragment) => !diagnostic.includes(fragment))) {
  console.error('source projection rule diagnostic fixture failed:');
  console.error(diagnostic || '(no failure emitted)');
  console.error(`required fragments: ${requiredFragments.join(' | ')}`);
  process.exit(1);
}

console.log('source projection rule diagnostic fixture passed');

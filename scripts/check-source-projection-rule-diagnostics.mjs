#!/usr/bin/env node
import { validateSourceProjectionRuleScope } from './check-source-projection-rule-scope.mjs';

const syntheticCollisionFixtures = [
  {
    fixtureDate: 'synthetic-source-projection-diagnostic',
    realCronFixture: `# Synthetic source projection diagnostic fixture

## Top 5

### Synthetic AI Cloud collision probe
发生了什么：A deliberately narrow fixture mentions AI Cloud without declaring an allowed projection rule.
为什么重要：This synthetic story must NOT produce a scope failure, only a warning.
影响：After the gate change, unexpected matches go to console.warn.

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

// After scope gate change: unexpected matches -> console.warn (not failures).
// The diagnostic fixture verifies that no failures are raised.
if (failures.length > 0) {
  console.error('source projection rule diagnostic fixture failed: got failures instead of warnings');
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log('source projection rule diagnostic fixture passed: no failures, only warnings for unexpected matches');

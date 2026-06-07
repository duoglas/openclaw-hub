#!/usr/bin/env node
import { fileURLToPath } from 'node:url';
import { realCronFixtures } from './fixtures/daily-real-cron-fixtures.mjs';
import { sourceProjectionRuleMatches, sourceProjectionRuleNames } from './lib/source-projection-rules.mjs';

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

function expectedRuleMatchesFor(signal) {
  if (signal.sourceProjectionRuleMatches === undefined) return [];
  if (!Array.isArray(signal.sourceProjectionRuleMatches)) {
    throw new TypeError(`${signal.title} sourceProjectionRuleMatches must be an array`);
  }
  return signal.sourceProjectionRuleMatches;
}

export function formatSourceProjectionMatches(matches) {
  return matches
    .map((match) => `${match.name} via ${match.terms.map((term) => JSON.stringify(term)).join(', ')}`)
    .join('; ') || 'none';
}

export function validateSourceProjectionRuleScope(fixtures = realCronFixtures) {
  const failures = [];

  for (const fixture of fixtures) {
    for (const signal of fixture.expectedSignals || []) {
      const key = `${fixture.fixtureDate}::${signal.title}`;
      const block = storyBlockFor(fixture.realCronFixture, signal.title);
      if (!block) {
        failures.push(`${key} — story block not found`);
        continue;
      }

      let expected = [];
      try {
        expected = expectedRuleMatchesFor(signal);
      } catch (error) {
        failures.push(`${key} — ${error.message}`);
        continue;
      }

      const unknownExpected = expected.filter((name) => !knownRuleNames.has(name));
      if (unknownExpected.length > 0) {
        failures.push(`${key} — unknown expected source projection rule(s): [${unknownExpected.join(', ')}]`);
        continue;
      }

      const actualMatches = sourceProjectionRuleMatches(block);
      const actual = actualMatches.map((match) => match.name);
      const unexpected = actual.filter((name) => !expected.includes(name));
      const missing = expected.filter((name) => !actual.includes(name));
      if (unexpected.length > 0 || missing.length > 0) {
        const diagnostics = formatSourceProjectionMatches(actualMatches);
        failures.push(
          `${key} — expected [${expected.join(', ') || 'none'}], got [${actual.join(', ') || 'none'}]; matched terms: ${diagnostics}`
        );
      }
    }
  }

  return failures;
}

function runCli() {
  const failures = validateSourceProjectionRuleScope(realCronFixtures);

  if (failures.length > 0) {
    console.error('source projection rule scope check failed:');
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }

  console.log('source projection rule scope check passed');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runCli();
}

#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const scriptPath = path.join(root, 'scripts/publish-daily.sh');
const source = fs.readFileSync(scriptPath, 'utf8');

const bannedGeneratedPhrases = [
  'same-day brief section',
  'concrete AI and technology development',
  'mapped to the publish-ready story',
  'source brief',
  'Structured source section',
];

const generatorStart = source.indexOf('EN_BODY=$(SUMMARY_TEXT="$SUMMARY"');
const generatorEnd = source.indexOf('\nPY\n)', generatorStart);
if (generatorStart < 0 || generatorEnd < 0) {
  console.error('Could not locate EN_BODY generator in scripts/publish-daily.sh');
  process.exit(1);
}

const generator = source.slice(generatorStart, generatorEnd);
const failures = bannedGeneratedPhrases.filter((phrase) => generator.includes(phrase));
if (failures.length > 0) {
  console.error('publish-daily EN generator still contains generic fixture phrases:');
  for (const phrase of failures) console.error(`- ${phrase}`);
  process.exit(1);
}

const requiredSignals = [
  'detail_from',
  'Evidence item',
  'story.get(\'what\'',
  'story.get(\'why\'',
  'story.get(\'impact\'',
];
const missing = requiredSignals.filter((signal) => !generator.includes(signal));
if (missing.length > 0) {
  console.error('publish-daily EN generator is missing expected source-detail fixture hooks:');
  for (const signal of missing) console.error(`- ${signal}`);
  process.exit(1);
}

console.log('publish-daily generator fixture check passed');

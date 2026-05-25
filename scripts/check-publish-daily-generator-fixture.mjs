#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const scriptPath = path.join(root, 'scripts/publish-daily.sh');
const modulePath = path.join(root, 'scripts/lib/daily-generator.mjs');
const source = fs.readFileSync(scriptPath, 'utf8');
const generator = fs.readFileSync(modulePath, 'utf8');

const bannedGeneratedPhrases = [
  'same-day brief section',
  'concrete AI and technology development',
  'mapped to the publish-ready story',
  'source brief',
  'Structured source section',
  'primary named signal',
  'The item affects workflow fit',
  'named signal for story',
  'item affects workflow fit',
];

if (!source.includes("import { generateEnglishDailyBody } from './scripts/lib/daily-generator.mjs';")) {
  console.error('publish-daily.sh does not call the shared daily generator module');
  process.exit(1);
}
const failures = bannedGeneratedPhrases.filter((phrase) => generator.includes(phrase));
if (failures.length > 0) {
  console.error('publish-daily EN generator still contains generic fixture phrases:');
  for (const phrase of failures) console.error(`- ${phrase}`);
  process.exit(1);
}

const requiredSignals = [
  'compactTitle',
  'detailFrom',
  'Evidence item',
  'story?.title',
  "story?.[key]",
  "story?.why",
  "story?.impact",
];
const missing = requiredSignals.filter((signal) => !generator.includes(signal));
if (missing.length > 0) {
  console.error('publish-daily EN generator is missing expected source-detail fixture hooks:');
  for (const signal of missing) console.error(`- ${signal}`);
  process.exit(1);
}

console.log('publish-daily generator fixture check passed');

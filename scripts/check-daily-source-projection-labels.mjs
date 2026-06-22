import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { extractStories, labelFor } from './lib/daily-generator.mjs';
import { projectEnglishSourceLabel } from './lib/source-projection-rules.mjs';
import { realCronFixture as fixture20260621, expectedSignals as expected20260621 } from './fixtures/daily-real-cron-2026-06-21.mjs';
import { realCronFixture as fixture20260618, expectedSignals as expected20260618 } from './fixtures/daily-real-cron-2026-06-18.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

function fail(message, details = []) {
  console.error(`daily source projection label check failed: ${message}`);
  for (const detail of details) console.error(`- ${detail}`);
  process.exit(1);
}

function storySource(story) {
  return [story?.title, story?.what, story?.why, story?.impact].filter(Boolean).join(' ');
}

const METADATA_LABEL_BASELINES = new Set([
  'OpenAI / Codex / ChatGPT control surfaces',
  'Amazon / Alexa+ / consumer AI localization',
  'NVIDIA / HPE / AI infrastructure capacity',
  'Anthropic / Korea / regional AI ecosystem',
  'China / WAICO / AI governance coordination',
]);

function assertFixtureLabels({ fixtureName, fixture, expectedSignals }) {
  const stories = extractStories(fixture);
  const failures = [];
  expectedSignals.forEach((expected, index) => {
    if (!METADATA_LABEL_BASELINES.has(expected.enLabel)) return;
    const story = stories[index];
    const metadataLabel = projectEnglishSourceLabel(storySource(story));
    const generatedLabel = labelFor(story, index + 1);
    if (metadataLabel !== expected.enLabel) {
      failures.push(`${fixtureName} story ${index + 1}: source projection metadata label "${metadataLabel || '(empty)'}" !== expected "${expected.enLabel}"`);
    }
    if (generatedLabel !== expected.enLabel) {
      failures.push(`${fixtureName} story ${index + 1}: generator label "${generatedLabel || '(empty)'}" !== expected "${expected.enLabel}"`);
    }
  });
  if (failures.length) fail('fixture labels drifted from source projection metadata', failures);
}

function assertNoGeneratorHardcodedOverrides() {
  const generatorPath = path.join(repoRoot, 'scripts/lib/daily-generator.mjs');
  const generator = fs.readFileSync(generatorPath, 'utf8');
  const forbiddenSnippets = [
    'Record & Replay\') && text.includes(\'Scheduled tasks',
    'Alexa+\') && (text.includes(\'Brazil',
    'HPE AI Factory with NVIDIA\') && text.includes(\'NVIDIA Agent Toolkit',
    '世界人工智能合作组织\') && text.includes(\'上海世界人工智能大会',
  ];
  const found = forbiddenSnippets.filter((snippet) => generator.includes(snippet));
  if (found.length) {
    fail('daily-generator still contains token-level topic label overrides instead of source projection metadata', found);
  }
}

function assertSyntheticConditionalLabel() {
  const hpeSource = 'HPE AI Factory with NVIDIA adds Vera CPU and NVIDIA Agent Toolkit for private cloud AI.';
  const broadCloudSource = 'NVIDIA said partners are expanding AI Cloud capacity across six continents for training and inference.';
  const hpeLabel = projectEnglishSourceLabel(hpeSource);
  const broadLabel = projectEnglishSourceLabel(broadCloudSource);
  if (hpeLabel !== 'NVIDIA / HPE / AI infrastructure capacity') {
    fail('conditional HPE display label did not resolve from source projection rule metadata', [`actual=${hpeLabel || '(empty)'}`]);
  }
  if (broadLabel) {
    fail('broad NVIDIA AI Cloud source received an HPE-specific label', [`actual=${broadLabel}`]);
  }
}

assertNoGeneratorHardcodedOverrides();
assertFixtureLabels({ fixtureName: 'daily-real-cron-2026-06-21', fixture: fixture20260621, expectedSignals: expected20260621 });
assertFixtureLabels({ fixtureName: 'daily-real-cron-2026-06-18', fixture: fixture20260618, expectedSignals: expected20260618 });
assertSyntheticConditionalLabel();
console.log('daily source projection label check passed');

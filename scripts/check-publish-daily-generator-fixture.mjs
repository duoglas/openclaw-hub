#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const scriptPath = path.join(root, 'scripts/publish-daily.sh');
const modulePath = path.join(root, 'scripts/lib/daily-generator.mjs');
const zhModulePath = path.join(root, 'scripts/lib/daily-zh-generator.mjs');
const projectionRulesPath = path.join(root, 'scripts/lib/source-projection-rules.mjs');
const signalMapsPath = path.join(root, 'scripts/lib/daily-signal-maps.mjs');
const source = fs.readFileSync(scriptPath, 'utf8');
const generator = fs.readFileSync(modulePath, 'utf8');
const zhGenerator = fs.readFileSync(zhModulePath, 'utf8');
const projectionRules = fs.readFileSync(projectionRulesPath, 'utf8');
const signalMaps = fs.readFileSync(signalMapsPath, 'utf8');

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
  'daily story',
  'source story behind',
  'anchors story',
  'This item provides a named source signal',
];

if (!source.includes("import { generateEnglishDailyBody } from './scripts/lib/daily-generator.mjs';")) {
  console.error('publish-daily.sh does not call the shared daily generator module');
  process.exit(1);
}
if (!source.includes("import { generateZhDailyBody } from './scripts/lib/daily-zh-generator.mjs';") || !source.includes("import { buildZhDescription } from './scripts/lib/daily-zh-generator.mjs';")) {
  console.error('publish-daily.sh does not call the shared ZH daily generator module');
  process.exit(1);
}

const commitIndex = source.indexOf('git commit -m "content: sync daily site post');
const requiredPreCommitChecks = [
  '"check:daily-cross-date-duplicate"',
  '"check:latest-daily-real-cron-fixture"',
];
const missingPreCommitChecks = requiredPreCommitChecks.filter((check) => {
  const checkIndex = source.indexOf(check);
  return checkIndex < 0 || commitIndex < 0 || checkIndex > commitIndex;
});
if (missingPreCommitChecks.length > 0) {
  console.error('publish-daily.sh is missing required pre-commit content freshness gates:');
  for (const check of missingPreCommitChecks) console.error(`- ${check}`);
  process.exit(1);
}

const staleSummaryFallbackPhrases = [
  'fallback to latest available',
  'if summary is None and entries:',
  "summary = entries[0]['summary']",
];
const staleSummaryFallbacks = staleSummaryFallbackPhrases.filter((phrase) => source.includes(phrase));
if (staleSummaryFallbacks.length > 0) {
  console.error('publish-daily.sh can still relabel an older cron summary with today\'s date:');
  for (const phrase of staleSummaryFallbacks) console.error(`- ${phrase}`);
  process.exit(1);
}
const requiredFrozenPublishDateSignals = [
  'export TZ=Asia/Shanghai',
  'export DATE=$(date +%Y-%m-%d)',
  "publish_date = os.environ.get('DATE', '')",
  "if d == publish_date:",
  'Missing frozen Asia/Shanghai publish DATE',
];
const missingFrozenPublishDateSignals = requiredFrozenPublishDateSignals.filter((signal) => !source.includes(signal));
if (missingFrozenPublishDateSignals.length > 0) {
  console.error('publish-daily.sh is missing the frozen Asia/Shanghai publish-date guard:');
  for (const signal of missingFrozenPublishDateSignals) console.error(`- ${signal}`);
  process.exit(1);
}
if (source.includes('if d == today:') || source.includes('datetime.datetime.now(')) {
  console.error('publish-daily.sh recomputes the source-match date instead of reusing frozen DATE');
  process.exit(1);
}

const requiredSameDaySummarySignals = [
  "if d == publish_date:",
  "No usable same-day daily-ai-tech cron summary found for {publish_date}",
  'refusing to relabel an older brief',
];
const missingSameDaySummarySignals = requiredSameDaySummarySignals.filter((signal) => !source.includes(signal));
if (missingSameDaySummarySignals.length > 0) {
  console.error('publish-daily.sh is missing the fail-closed same-day cron summary guard:');
  for (const signal of missingSameDaySummarySignals) console.error(`- ${signal}`);
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
  'projectEnglishSourceDetail',
  './source-projection-rules.mjs',
  './daily-signal-maps.mjs',
  'KEYWORD_MAP',
  'ZH_ENTITY_MAP',
];
const missing = requiredSignals.filter((signal) => !generator.includes(signal));
if (missing.length > 0) {
  console.error('publish-daily EN generator is missing expected source-detail fixture hooks:');
  for (const signal of missing) console.error(`- ${signal}`);
  process.exit(1);
}


const generatorInlineMapLeaks = [
  'const KEYWORD_MAP = [',
  'const ZH_ENTITY_MAP = [',
].filter((phrase) => generator.includes(phrase));
if (generatorInlineMapLeaks.length > 0) {
  console.error('publish-daily EN generator still inlines signal maps instead of using daily-signal-maps.mjs:');
  for (const phrase of generatorInlineMapLeaks) console.error(`- ${phrase}`);
  process.exit(1);
}

const requiredSignalMapSignals = [
  'KEYWORD_MAP',
  'ZH_ENTITY_MAP',
  'dailySignalMapNames',
  'compute infrastructure',
  'agent platform',
  'AI metrology and evaluation',
  'Tencent',
  'SAMR',
  'Xinhua',
];
const missingSignalMapSignals = requiredSignalMapSignals.filter((signal) => !signalMaps.includes(signal));
if (missingSignalMapSignals.length > 0) {
  console.error('daily signal map registry is missing expected entity/topic mappings:');
  for (const signal of missingSignalMapSignals) console.error(`- ${signal}`);
  process.exit(1);
}

const generatorInlineRuleLeaks = [
  'Anthropic released Claude Opus 4.8',
  'Anthropic announced a Series H round',
  'China’s SAMR and NDRC issued an AI metrology',
  'Amazon described its agentic AI approach',
  'NVIDIA highlighted eight ICRA robotics papers',
].filter((phrase) => generator.includes(phrase));
if (generatorInlineRuleLeaks.length > 0) {
  console.error('publish-daily EN generator still inlines field-level projection copy instead of using source-projection-rules.mjs:');
  for (const phrase of generatorInlineRuleLeaks) console.error(`- ${phrase}`);
  process.exit(1);
}

const requiredProjectionRuleSignals = [
  'claude-opus-4-8',
  'anthropic-series-h',
  'china-ai-metrology-guide',
  'amazon-nova-act-agentic-ai',
  'nvidia-icra-sim-to-real',
  'nvidia-microsoft-agentic-windows-azure',
  'nvidia-nemoclaw-industrial-agents',
  'openai-chatgpt-active-sessions',
  'china-national-data-administration-embodied-ai',
  'projectEnglishSourceDetail',
  'sourceProjectionRuleNames',
];
const missingProjectionRuleSignals = requiredProjectionRuleSignals.filter((signal) => !projectionRules.includes(signal));
if (missingProjectionRuleSignals.length > 0) {
  console.error('source projection rule registry is missing expected fixture-backed rules:');
  for (const signal of missingProjectionRuleSignals) console.error(`- ${signal}`);
  process.exit(1);
}

const requiredZhSignals = [
  'extractZhStories',
  'buildZhDescription',
  'generateZhDailyBody',
  '来源条目',
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
];
const missingZh = requiredZhSignals.filter((signal) => !zhGenerator.includes(signal));
if (missingZh.length > 0) {
  console.error('publish-daily ZH generator is missing expected source-detail fixture hooks:');
  for (const signal of missingZh) console.error(`- ${signal}`);
  process.exit(1);
}

console.log('publish-daily generator fixture check passed');

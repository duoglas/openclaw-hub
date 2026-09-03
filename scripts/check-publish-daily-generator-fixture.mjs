#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

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

const repositoryLockSignals = [
  'GIT_COMMON_DIR=$(git rev-parse --git-common-dir)',
  'PUBLISH_LOCK_FILE="${GIT_COMMON_DIR}/openclaw-hub-publish-daily.lock"',
  'exec 9>"$PUBLISH_LOCK_FILE"',
  'flock -n 9',
  'Refusing daily publish: another publish-daily process holds the repository release lock:',
];
const missingRepositoryLockSignals = repositoryLockSignals.filter((signal) => !source.includes(signal));
const repositoryLockIndex = source.indexOf('GIT_COMMON_DIR=$(git rev-parse --git-common-dir)');
const stagedIndexGuardIndex = source.indexOf('if ! git diff --cached --quiet --; then', source.indexOf('export DATE=$(date +%Y-%m-%d)'));
if (
  missingRepositoryLockSignals.length > 0
  || repositoryLockIndex < 0
  || stagedIndexGuardIndex < 0
  || repositoryLockIndex > stagedIndexGuardIndex
) {
  console.error('publish-daily.sh is missing the full-run repository release lock:');
  for (const signal of missingRepositoryLockSignals) console.error(`- ${signal}`);
  process.exit(1);
}

const lockFixturePath = path.join(root, '.git', 'openclaw-hub-publish-daily-fixture.lock');
const lockFixture = spawnSync('bash', ['-c', `
set -euo pipefail
lock_file="$1"
exec 8>"$lock_file"
flock -n 8
if flock -n "$lock_file" -c true; then
  echo "competing process unexpectedly acquired the held release lock" >&2
  exit 21
fi
flock -u 8
flock -n "$lock_file" -c true
`, 'bash', lockFixturePath], { encoding: 'utf8' });
if (lockFixture.status !== 0) {
  console.error('repository release lock contention fixture failed:');
  if (lockFixture.stdout) console.error(lockFixture.stdout.trim());
  if (lockFixture.stderr) console.error(lockFixture.stderr.trim());
  process.exit(1);
}

const branchSyncGuardSignals = [
  'CURRENT_BRANCH=$(git branch --show-current)',
  'if [ "$CURRENT_BRANCH" != "main" ]; then',
  'Refusing daily publish: expected branch main, found',
  'if ! git fetch origin main --quiet; then',
  'Refusing daily publish: failed to fetch origin/main; remote freshness is unknown.',
  'LOCAL_MAIN=$(git rev-parse main)',
  'REMOTE_MAIN=$(git rev-parse origin/main)',
  'if [ "$LOCAL_MAIN" != "$REMOTE_MAIN" ]; then',
  'recover_pending_push',
  'Refusing daily publish: local main differs from origin/main and no publisher retry handoff exists.',
];
const missingBranchSyncGuardSignals = branchSyncGuardSignals.filter((signal) => !source.includes(signal));
const branchSyncGuardIndex = source.indexOf('CURRENT_BRANCH=$(git branch --show-current)');
if (
  missingBranchSyncGuardSignals.length > 0
  || branchSyncGuardIndex < 0
  || repositoryLockIndex < 0
  || stagedIndexGuardIndex < 0
  || branchSyncGuardIndex < repositoryLockIndex
  || branchSyncGuardIndex > stagedIndexGuardIndex
  || source.includes('git fetch origin main --quiet || true')
) {
  console.error('publish-daily.sh is missing the fail-closed main/origin synchronization guard:');
  for (const signal of missingBranchSyncGuardSignals) console.error(`- ${signal}`);
  process.exit(1);
}

const pushRetrySignals = [
  'PUSH_RETRY_HANDOFF="${GIT_COMMON_DIR}/openclaw-hub-publish-daily-retry"',
  'write_push_retry_handoff()',
  'commit_and_push_release()',
  'recover_pending_push()',
  'ahead_count=$(git rev-list --count "${REMOTE_MAIN}..${LOCAL_MAIN}")',
  'git merge-base --is-ancestor "$REMOTE_MAIN" "$LOCAL_MAIN"',
  'retry handoff does not describe exactly one publisher commit ahead of origin/main',
  'retry handoff commit contains non-publisher path',
  'commit_and_push_release "weekly" "$week_line"',
  'commit_and_push_release "daily" "$DATE"',
  'handoff retained at ${PUSH_RETRY_HANDOFF}',
  'Recovered pending ${release_kind} release ${release_label} without regenerating or recommitting.',
];
const missingPushRetrySignals = pushRetrySignals.filter((signal) => !source.includes(signal));
const retryFunctionIndex = source.indexOf('recover_pending_push()');
const syncMismatchIndex = source.indexOf('if [ "$LOCAL_MAIN" != "$REMOTE_MAIN" ]; then');
const weeklyCommitIndex = source.indexOf('commit_and_push_release "weekly" "$week_line"');
const dailyCommitIndex = source.indexOf('commit_and_push_release "daily" "$DATE"');
if (
  missingPushRetrySignals.length > 0
  || retryFunctionIndex < 0
  || syncMismatchIndex < 0
  || retryFunctionIndex > syncMismatchIndex
  || weeklyCommitIndex < 0
  || dailyCommitIndex < 0
  || source.includes('git commit -m "content: sync daily site post with Telegram AI/tech brief (${DATE})" || true')
  || source.includes('git commit -m "chore: refresh weekly review (${week_line})" || true')
) {
  console.error('publish-daily.sh is missing the validated post-commit push retry handoff:');
  for (const signal of missingPushRetrySignals) console.error(`- ${signal}`);
  process.exit(1);
}

const stagedIndexGuardSignals = [
  'git diff --cached --quiet --',
  'Refusing daily publish: the Git index already contains staged changes from another task:',
  'git diff --cached --name-only -- >&2',
];
const missingStagedIndexGuardSignals = stagedIndexGuardSignals.filter((signal) => !source.includes(signal));
const firstGeneratedFileWriteIndex = source.indexOf('cat > "$ZH_FILE"');
if (
  missingStagedIndexGuardSignals.length > 0
  || stagedIndexGuardIndex < 0
  || firstGeneratedFileWriteIndex < 0
  || stagedIndexGuardIndex > firstGeneratedFileWriteIndex
) {
  console.error('publish-daily.sh is missing the pre-generation staged-index isolation guard:');
  for (const signal of missingStagedIndexGuardSignals) console.error(`- ${signal}`);
  process.exit(1);
}

const dirtyPublishPathGuardSignals = [
  'PUBLISH_OWNED_PATHS=(',
  '"$EN_FILE"',
  '"$ZH_FILE"',
  '"WEEKLY_REVIEW.md"',
  '"reports/seo-weekly"',
  '"scripts/publish-daily.sh"',
  '"scripts/lib/daily-generator.mjs"',
  '"scripts/lib/daily-zh-generator.mjs"',
  'git status --porcelain=v1 --untracked-files=all -- "${PUBLISH_OWNED_PATHS[@]}"',
  'Refusing daily publish: publish-owned paths already contain unstaged or untracked changes from another task:',
];
const missingDirtyPublishPathGuardSignals = dirtyPublishPathGuardSignals.filter((signal) => !source.includes(signal));
const dirtyPublishPathGuardIndex = source.indexOf('PUBLISH_OWNED_PATHS=(');
const weeklyRefreshIndex = source.indexOf('refresh_weekly_review_if_needed()');
if (
  missingDirtyPublishPathGuardSignals.length > 0
  || dirtyPublishPathGuardIndex < 0
  || weeklyRefreshIndex < 0
  || firstGeneratedFileWriteIndex < 0
  || dirtyPublishPathGuardIndex > weeklyRefreshIndex
  || dirtyPublishPathGuardIndex > firstGeneratedFileWriteIndex
) {
  console.error('publish-daily.sh is missing the pre-generation dirty publish-path isolation guard:');
  for (const signal of missingDirtyPublishPathGuardSignals) console.error(`- ${signal}`);
  process.exit(1);
}

const commitIndex = source.indexOf('commit_and_push_release "daily" "$DATE"');
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

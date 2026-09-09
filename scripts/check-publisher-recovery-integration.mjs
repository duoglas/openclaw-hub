import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, rmSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = readFileSync(join(root, 'scripts/publish-daily.sh'), 'utf8');
const boundary = '# Freeze one Asia/Shanghai calendar date';
assert.equal(source.split(boundary).length, 2, 'publisher preflight boundary must be unique');
// Execute the actual production preflight/recovery, stopping before content generation.
const prefix = source.split(boundary)[0];
const temp = mkdtempSync(join(root, '.publisher-recovery-test-'));
const env = { ...process.env, GIT_CONFIG_GLOBAL: '/dev/null', GIT_CONFIG_SYSTEM: '/dev/null', GIT_TERMINAL_PROMPT: '0', GIT_ALLOW_PROTOCOL: 'file' };
for (const key of Object.keys(env)) {
  if (key.startsWith('GIT_CONFIG_') && !['GIT_CONFIG_GLOBAL', 'GIT_CONFIG_SYSTEM'].includes(key)) delete env[key];
}
for (const key of ['GIT_DIR', 'GIT_WORK_TREE', 'GIT_INDEX_FILE', 'GIT_COMMON_DIR', 'GIT_OBJECT_DIRECTORY', 'GIT_ALTERNATE_OBJECT_DIRECTORIES']) delete env[key];
function run(cwd, command, args, ok = true) {
  const result = spawnSync(command, args, { cwd, env, encoding: 'utf8', timeout: 20000 });
  if (ok) assert.equal(result.status, 0, `${command} ${args.join(' ')}: ${result.stderr || result.error}`);
  return result;
}
const git = (cwd, ...args) => run(cwd, 'git', args).stdout.trim();
const label = '2026-09-06';
const subject = `content: sync daily site post with Telegram AI/tech brief (${label})`;
let count = 0;
function scenario(name, options = {}) {
  const base = join(temp, name);
  mkdirSync(base);
  const remote = join(base, 'remote.git');
  const local = join(base, 'local');
  git(base, 'init', '--bare', '--initial-branch=main', remote);
  git(base, 'init', '--initial-branch=main', local);
  git(local, 'config', 'user.name', 'Recovery Fixture');
  git(local, 'config', 'user.email', 'fixture@example.invalid');
  git(local, 'config', 'commit.gpgsign', 'false');
  mkdirSync(join(local, 'scripts'));
  writeFileSync(join(local, 'scripts/publish-daily.sh'), `${prefix}\nexit 0\n`);
  git(local, 'add', '.');
  git(local, 'commit', '-m', 'fixture baseline');
  git(local, 'remote', 'add', 'origin', remote);
  git(local, 'push', '-u', 'origin', 'main');
  const anchor = git(local, 'rev-parse', 'HEAD');
  if (!options.sync) {
    const path = options.badPath ? 'unrelated.txt' : 'WEEKLY_REVIEW.md';
    writeFileSync(join(local, path), name);
    git(local, 'add', path);
    git(local, 'commit', '-m', options.badSubject ? 'unrelated subject' : options.weekly ? `chore: refresh weekly review (${label})` : subject);
    if (options.twoAhead) {
      writeFileSync(join(local, path), `${name} second`);
      git(local, 'add', path);
      git(local, 'commit', '-m', subject);
    }
  }
  const head = git(local, 'rev-parse', 'HEAD');
  const marker = join(local, '.git/openclaw-hub-publish-daily-retry');
  const state = options.state || 'committed';
  if (!options.missing) writeFileSync(marker, options.malformed ? 'broken\n' : `${state}\n${options.badKind ? 'other' : options.weekly ? 'weekly' : 'daily'}\n${label}\n${options.stale ? '0'.repeat(40) : state === 'prepared' ? anchor : head}\n`);
  const markerBefore = existsSync(marker) ? readFileSync(marker, 'utf8') : null;
  const hook = join(remote, 'hooks/pre-receive');
  if (options.rejectPush) writeFileSync(hook, '#!/bin/sh\nexit 1\n', { mode: 0o755 });
  const result = run(local, 'bash', ['scripts/publish-daily.sh'], false);
  const rejected = options.reject || options.rejectPush;
  assert.equal(result.status, rejected ? options.rejectPush ? 1 : 2 : 0, `${name}: ${result.stdout}\n${result.stderr}`);
  assert.equal(git(local, 'rev-parse', 'HEAD'), head, `${name}: must not recommit`);
  assert.equal(git(remote, 'rev-parse', 'main'), rejected ? anchor : head, `${name}: remote SHA`);
  if (rejected) {
    assert.equal(existsSync(marker) ? readFileSync(marker, 'utf8') : null, markerBefore, `${name}: handoff must remain unchanged`);
  } else assert.equal(existsSync(marker), false, `${name}: marker cleanup`);
  if (options.rejectPush) {
    rmSync(hook);
    run(local, 'bash', ['scripts/publish-daily.sh']);
    assert.equal(git(remote, 'rev-parse', 'main'), head);
    assert.equal(git(local, 'rev-parse', 'HEAD'), head);
    assert.equal(existsSync(marker), false);
  }
  count++;
  console.log(`PASS ${name}`);
}
try {
  scenario('prepared-crash-recovery', { state: 'prepared' });
  scenario('committed-recovery');
  scenario('weekly-recovery', { weekly: true });
  scenario('push-failure-then-retry', { rejectPush: true });
  scenario('missing-marker', { missing: true, reject: true });
  scenario('malformed-marker', { malformed: true, reject: true });
  scenario('stale-committed', { stale: true, reject: true });
  scenario('stale-prepared', { state: 'prepared', stale: true, reject: true });
  scenario('unknown-state', { state: 'other', reject: true });
  scenario('unknown-kind', { badKind: true, reject: true });
  scenario('subject-mismatch', { badSubject: true, reject: true });
  scenario('path-mismatch', { badPath: true, reject: true });
  scenario('two-ahead', { twoAhead: true, reject: true });
  scenario('synced-prepared-cleanup', { sync: true, state: 'prepared' });
  scenario('synced-committed-cleanup', { sync: true });
  scenario('synced-stale', { sync: true, stale: true, reject: true });
  scenario('synced-malformed', { sync: true, malformed: true, reject: true });
  scenario('synced-unknown-state', { sync: true, state: 'other', reject: true });
  console.log(`Publisher recovery integration: ${count} real Git scenarios passed (local file remotes only).`);
} finally {
  rmSync(temp, { recursive: true, force: true });
}

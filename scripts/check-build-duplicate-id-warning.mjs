#!/usr/bin/env node
import { spawnSync } from 'node:child_process';

const clean = spawnSync(process.execPath, ['scripts/clean-astro-cache.mjs'], {
  cwd: process.cwd(),
  encoding: 'utf8',
});

if (clean.stdout) process.stdout.write(clean.stdout);
if (clean.stderr) process.stderr.write(clean.stderr);
if (clean.status !== 0) {
  process.exit(clean.status ?? 1);
}

const build = spawnSync('pnpm', ['exec', 'astro', 'build'], {
  cwd: process.cwd(),
  encoding: 'utf8',
  shell: false,
});

const output = `${build.stdout || ''}${build.stderr || ''}`;
if (build.stdout) process.stdout.write(build.stdout);
if (build.stderr) process.stderr.write(build.stderr);

if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

const duplicateIdLines = output
  .split(/\r?\n/)
  .filter((line) => /Duplicate id/i.test(line));

if (duplicateIdLines.length > 0) {
  console.error('Build duplicate-id warning gate failed:');
  for (const line of duplicateIdLines) console.error(`  ${line}`);
  process.exit(1);
}

console.log('Build duplicate-id warning gate passed');

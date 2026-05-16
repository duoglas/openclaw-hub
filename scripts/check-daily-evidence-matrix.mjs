#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

// Check only the freshest daily posts by default so legacy archive noise does not
// block new publishing. Override with LATEST_COUNT=N when auditing more days.
const latestCount = Number.parseInt(process.env.LATEST_COUNT || '1', 10);
const root = process.cwd();
const langs = ['en', 'zh'];
const failures = [];

function latestDailyFiles(lang) {
  const dir = join(root, 'src', 'content', 'blog', lang);
  try {
    return readdirSync(dir)
      .filter((name) => /^openclaw-daily-\d{4}-\d{2}-\d{2}\.md$/.test(name))
      .sort()
      .slice(-latestCount)
      .map((name) => join(dir, name));
  } catch (error) {
    failures.push(`[FAIL] Cannot read daily directory: ${dir} (${error.message})`);
    return [];
  }
}

function checkFile(file, lang) {
  if (!existsSync(file)) {
    failures.push(`[FAIL] Missing daily file: ${file}`);
    return;
  }

  const content = readFileSync(file, 'utf8');
  const headingPattern = lang === 'en'
    ? /^##\s+Evidence Matrix\s*$/m
    : /^##\s+证据矩阵\s*$/m;
  const match = content.match(headingPattern);
  if (!match || match.index === undefined) {
    failures.push(`[FAIL] Missing evidence matrix heading in ${file}`);
    return;
  }

  const afterHeading = content.slice(match.index + match[0].length);
  const nextHeadingIndex = afterHeading.search(/^##\s+/m);
  const section = nextHeadingIndex === -1 ? afterHeading : afterHeading.slice(0, nextHeadingIndex);
  const bullets = section.split('\n').filter((line) => /^-\s+\S/.test(line.trim()));

  if (bullets.length < 5) {
    failures.push(`[FAIL] Evidence matrix has only ${bullets.length} bullets in ${file}; expected at least 5`);
  }

  bullets.forEach((bullet, index) => {
    const trimmed = bullet.trim();
    if (/^[-*]\s*(…|\.\.\.)\s*$/.test(trimmed) || /(?:-|—|:|：)\s*(…|\.\.\.)\s*$/.test(trimmed) || /\S\s+…$/.test(trimmed)) {
      failures.push(`[FAIL] Truncated evidence matrix bullet ${index + 1} in ${file}: ${trimmed}`);
    }
    if (!/[：:]/.test(trimmed)) {
      failures.push(`[FAIL] Evidence matrix bullet ${index + 1} lacks source/detail separator in ${file}: ${trimmed}`);
    }
  });
}

for (const lang of langs) {
  for (const file of latestDailyFiles(lang)) {
    checkFile(file, lang);
  }
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  console.error('Daily evidence matrix check failed');
  process.exit(1);
}

console.log(`Daily evidence matrix check passed (latest ${latestCount} EN/ZH daily posts)`);

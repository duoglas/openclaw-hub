#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

// Check only the freshest English daily posts by default so legacy archive noise
// does not block new publishing. Override with LATEST_COUNT=N when auditing more days.
const latestCount = Number.parseInt(process.env.LATEST_COUNT || '1', 10);
const root = process.cwd();
const failures = [];

function latestEnglishDailyFiles() {
  const dir = join(root, 'src', 'content', 'blog', 'en');
  try {
    return readdirSync(dir)
      .filter((name) => /^openclaw-daily-\d{4}-\d{2}-\d{2}\.md$/.test(name))
      .sort()
      .slice(-latestCount)
      .map((name) => join(dir, name));
  } catch (error) {
    failures.push(`[FAIL] Cannot read English daily directory: ${dir} (${error.message})`);
    return [];
  }
}

const chineseStructuralPatterns = [
  { label: 'Chinese daily title', pattern: /^#\s*AI[、/]?科技日报/m },
  { label: 'Chinese top-stories heading', pattern: /^##\s*今日要闻/m },
  { label: 'Chinese practical-cases heading', pattern: /^##\s*实战案例/m },
  { label: 'Chinese bottom-line heading', pattern: /^##\s*今日结论/m },
  { label: 'Chinese evidence-matrix heading', pattern: /^##\s*证据矩阵/m },
  { label: 'Chinese CTA heading', pattern: /^##\s*下一步行动/m },
  { label: 'Chinese story label', pattern: /发生了什么：|为什么重要：|可能影响：/ },
  { label: 'Chinese advice/tracking label', pattern: /普通用户建议：|明日跟踪点：|最值得关注：|给普通用户建议：/ },
];

function stripFrontmatter(content) {
  if (!content.startsWith('---\n')) return content;
  const end = content.indexOf('\n---\n', 4);
  return end === -1 ? content : content.slice(end + 5);
}

function countMatches(text, regex) {
  const matches = text.match(regex);
  return matches ? matches.length : 0;
}

function checkFile(file) {
  if (!existsSync(file)) {
    failures.push(`[FAIL] Missing English daily file: ${file}`);
    return;
  }

  const content = readFileSync(file, 'utf8');
  const body = stripFrontmatter(content);

  for (const { label, pattern } of chineseStructuralPatterns) {
    if (pattern.test(body)) {
      failures.push(`[FAIL] ${label} found in English daily: ${file}`);
    }
  }

  const cjkCount = countMatches(body, /[\u3400-\u9fff]/g);
  const latinWordCount = countMatches(body, /\b[A-Za-z][A-Za-z0-9’'\-]*\b/g);
  // Allow a small number of Chinese proper names inside English reporting, but
  // catch full Chinese-body regressions and large untranslated sections.
  if (cjkCount > 80 && cjkCount > latinWordCount * 0.08) {
    failures.push(
      `[FAIL] Excessive CJK text in English daily: ${file} (${cjkCount} CJK chars vs ${latinWordCount} Latin words)`,
    );
  }
}

for (const file of latestEnglishDailyFiles()) {
  checkFile(file);
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  console.error('Daily English language consistency check failed');
  process.exit(1);
}

console.log(`Daily English language consistency check passed (latest ${latestCount} EN daily posts)`);

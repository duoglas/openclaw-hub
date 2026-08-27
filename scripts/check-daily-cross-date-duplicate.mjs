#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const blogRoots = [
  ['en', 'src/content/blog/en'],
  ['zh', 'src/content/blog/zh'],
];

function dailyFiles(dir) {
  return fs.readdirSync(dir)
    .filter((file) => /^openclaw-daily-\d{4}-\d{2}-\d{2}\.md$/.test(file))
    .sort();
}

function sectionBody(markdown, lang) {
  const startPattern = lang === 'zh'
    ? /^(?:##\s+今日要闻(?:（5条）)?|\*\*(?:一、)?今日要闻(?:（5条）)?\*\*)\s*$/m
    : /^##\s+Top 5 Stories\s*$/m;
  const endPattern = lang === 'zh'
    ? /^(?:##\s+(?:实战案例|今日结论)|\*\*(?:二、)?实战案例(?:（\d+个）)?\*\*)\s*$/m
    : /^##\s+(?:Practical Cases|Today['’]s Bottom Line)\s*$/m;
  const startMatch = startPattern.exec(markdown);
  if (!startMatch) return '';
  const contentStart = startMatch.index + startMatch[0].length;
  const endMatch = endPattern.exec(markdown.slice(contentStart));
  if (!endMatch) return '';
  return markdown
    .slice(contentStart, contentStart + endMatch.index)
    .replace(/\d{4}-\d{2}-\d{2}/g, '<date>')
    .replace(/\s+/g, ' ')
    .trim();
}

function duplicatePairs(entries) {
  const firstFileByBody = new Map();
  const duplicates = [];
  for (const entry of entries) {
    const firstFile = firstFileByBody.get(entry.body);
    if (firstFile) duplicates.push([firstFile, entry.file]);
    else firstFileByBody.set(entry.body, entry.file);
  }
  return duplicates;
}

function assertSyntheticSelfTest() {
  const a = '## Top 5 Stories\nSame story on 2026-08-25\n## Practical Cases';
  const b = '## Top 5 Stories\nDifferent story\n## Practical Cases';
  const c = '## Top 5 Stories\n Same   story on 2026-08-27 \n## Practical Cases';
  const duplicates = duplicatePairs([
    { file: 'day-a.md', body: sectionBody(a, 'en') },
    { file: 'day-b.md', body: sectionBody(b, 'en') },
    { file: 'day-c.md', body: sectionBody(c, 'en') },
  ]);
  if (duplicates.length !== 1 || duplicates[0][0] !== 'day-a.md' || duplicates[0][1] !== 'day-c.md') {
    console.error('daily cross-date duplicate synthetic self-test failed');
    process.exit(1);
  }
}

assertSyntheticSelfTest();
const failures = [];
const comparisonWindow = 14;

for (const [lang, dir] of blogRoots) {
  const files = dailyFiles(dir).slice(-comparisonWindow);
  if (files.length < 2) continue;
  const entries = [];
  for (const file of files) {
    const body = sectionBody(fs.readFileSync(path.join(dir, file), 'utf8'), lang);
    if (!body) {
      failures.push(`${lang}: missing Top 5/今日要闻 section in ${file}`);
      continue;
    }
    entries.push({ file, body });
  }
  for (const [firstFile, repeatedFile] of duplicatePairs(entries)) {
    failures.push(`${lang}: ${repeatedFile} repeats the complete story section from ${firstFile}`);
  }
}

if (failures.length) {
  console.error('daily cross-date duplicate check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`daily cross-date duplicate check passed for latest ${comparisonWindow} EN/ZH briefs`);

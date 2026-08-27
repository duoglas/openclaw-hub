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
  const heading = lang === 'zh' ? '## 今日要闻（5条）' : '## Top 5 Stories';
  const nextHeading = lang === 'zh' ? '## 实战案例' : '## Practical Cases';
  const start = markdown.indexOf(heading);
  const end = markdown.indexOf(nextHeading, start + heading.length);
  if (start < 0 || end < 0) return '';
  return markdown
    .slice(start + heading.length, end)
    .replace(/\d{4}-\d{2}-\d{2}/g, '<date>')
    .replace(/\s+/g, ' ')
    .trim();
}

function assertSyntheticSelfTest() {
  const a = '## Top 5 Stories\nSame story\n## Practical Cases';
  const b = '## Top 5 Stories\n Same   story \n## Practical Cases';
  if (sectionBody(a, 'en') !== sectionBody(b, 'en')) {
    console.error('daily cross-date duplicate synthetic self-test failed');
    process.exit(1);
  }
}

assertSyntheticSelfTest();
const failures = [];

for (const [lang, dir] of blogRoots) {
  const files = dailyFiles(dir);
  const latestPair = files.slice(-2);
  if (latestPair.length < 2) continue;
  const [previousFile, latestFile] = latestPair;
  const previousBody = sectionBody(fs.readFileSync(path.join(dir, previousFile), 'utf8'), lang);
  const latestBody = sectionBody(fs.readFileSync(path.join(dir, latestFile), 'utf8'), lang);
  if (!previousBody || !latestBody) {
    failures.push(`${lang}: missing Top 5/今日要闻 section in ${previousFile} or ${latestFile}`);
    continue;
  }
  if (previousBody === latestBody) {
    failures.push(`${lang}: ${latestFile} repeats the complete story section from ${previousFile}`);
  }
}

if (failures.length) {
  console.error('daily cross-date duplicate check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('daily cross-date duplicate check passed for latest EN/ZH pairs');

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

function sectionRaw(markdown, lang) {
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
  return markdown.slice(contentStart, contentStart + endMatch.index).trim();
}

function normalizeStory(text) {
  return text
    .replace(/^###\s+\d+\.\s*/m, '')
    .replace(/^(?:###\s+)?(?:\*\*)?\d+\.\s*/m, '')
    .replace(/\d{4}-\d{2}-\d{2}/g, '<date>')
    .replace(/\s+/g, ' ')
    .trim();
}

function storyBodies(section, lang) {
  const splitPattern = lang === 'zh'
    ? /(?=^(?:###\s+)?(?:\*\*)?\d+\.\s+)/m
    : /(?=^###\s+\d+\.\s+)/m;
  return section
    .split(splitPattern)
    .map(normalizeStory)
    .filter(Boolean);
}

function sectionBody(markdown, lang) {
  return normalizeStory(sectionRaw(markdown, lang));
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

function highOverlapPairs(entries, threshold = 4) {
  const overlaps = [];
  for (let i = 0; i < entries.length; i += 1) {
    for (let j = i + 1; j < entries.length; j += 1) {
      if (entries[i].body === entries[j].body) continue;
      const firstStories = new Set(entries[i].stories);
      const shared = entries[j].stories.filter((story) => firstStories.has(story)).length;
      if (shared >= threshold) overlaps.push([entries[i].file, entries[j].file, shared]);
    }
  }
  return overlaps;
}

// Grandfather the one known pre-guardrail overlap while checking every other pair.
const legacyHighOverlapPairs = new Set([
  'zh:openclaw-daily-2026-08-18.md->openclaw-daily-2026-08-19.md',
]);

function assertSyntheticSelfTest() {
  const fullA = '## Top 5 Stories\nSame story on 2026-08-25\n## Practical Cases';
  const different = '## Top 5 Stories\nDifferent story\n## Practical Cases';
  const fullC = '## Top 5 Stories\n Same   story on 2026-08-27 \n## Practical Cases';
  const duplicates = duplicatePairs([
    { file: 'day-a.md', body: sectionBody(fullA, 'en') },
    { file: 'day-b.md', body: sectionBody(different, 'en') },
    { file: 'day-c.md', body: sectionBody(fullC, 'en') },
  ]);
  if (duplicates.length !== 1 || duplicates[0][0] !== 'day-a.md' || duplicates[0][1] !== 'day-c.md') {
    console.error('daily cross-date duplicate synthetic self-test failed');
    process.exit(1);
  }

  const stories = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'];
  const partialA = `## Top 5 Stories\n${stories.map((story, index) => `### ${index + 1}. ${story}`).join('\n')}\n## Practical Cases`;
  const partialB = `## Top 5 Stories\n${[...stories.slice(0, 4), 'Zeta'].map((story, index) => `### ${index + 1}. ${story}`).join('\n')}\n## Practical Cases`;
  const partialC = `## Top 5 Stories\n${['Eta', 'Theta', 'Iota', 'Kappa', 'Lambda'].map((story, index) => `### ${index + 1}. ${story}`).join('\n')}\n## Practical Cases`;
  const partialEntries = [partialA, partialB, partialC].map((markdown, index) => {
    const section = sectionRaw(markdown, 'en');
    return { file: `partial-${index}.md`, body: normalizeStory(section), stories: storyBodies(section, 'en') };
  });
  const overlaps = highOverlapPairs(partialEntries);
  if (overlaps.length !== 1 || overlaps[0][0] !== 'partial-0.md' || overlaps[0][1] !== 'partial-1.md' || overlaps[0][2] !== 4) {
    console.error('daily cross-date high-overlap synthetic self-test failed');
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
    const markdown = fs.readFileSync(path.join(dir, file), 'utf8');
    const section = sectionRaw(markdown, lang);
    if (!section) {
      failures.push(`${lang}: missing Top 5/今日要闻 section in ${file}`);
      continue;
    }
    const stories = storyBodies(section, lang);
    if (stories.length !== 5) {
      failures.push(`${lang}: expected 5 stories in ${file}, found ${stories.length}`);
      continue;
    }
    entries.push({ file, body: normalizeStory(section), stories });
  }
  for (const [firstFile, repeatedFile] of duplicatePairs(entries)) {
    failures.push(`${lang}: ${repeatedFile} repeats the complete story section from ${firstFile}`);
  }
  for (const [firstFile, repeatedFile, shared] of highOverlapPairs(entries)) {
    const pairKey = `${lang}:${firstFile}->${repeatedFile}`;
    if (legacyHighOverlapPairs.has(pairKey)) continue;
    failures.push(`${lang}: ${repeatedFile} repeats ${shared}/5 stories from ${firstFile}`);
  }
}

if (failures.length) {
  console.error('daily cross-date duplicate check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`daily cross-date duplicate check passed for latest ${comparisonWindow} EN/ZH briefs`);

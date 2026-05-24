#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

// Guard the freshest English daily briefs against fluent but low-specificity
// publish output. Override with LATEST_COUNT=N when auditing a wider window.
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

function stripFrontmatter(content) {
  if (!content.startsWith('---\n')) return content;
  const end = content.indexOf('\n---\n', 4);
  return end === -1 ? content : content.slice(end + 5);
}

function sectionBetween(body, startHeading, nextHeadingPattern = /^##\s+/m) {
  const start = body.search(startHeading);
  if (start === -1) return '';
  const afterStart = body.slice(start);
  const next = afterStart.slice(1).search(nextHeadingPattern);
  return next === -1 ? afterStart : afterStart.slice(0, next + 1);
}

const genericPhrasePatterns = [
  { label: 'same-day brief filler', pattern: /same-day brief section/i },
  { label: 'publish-ready mapping filler', pattern: /mapped to the publish-ready story/i },
  { label: 'concrete AI development filler', pattern: /concrete AI and technology development/i },
  { label: 'source brief filler', pattern: /source brief\s*\d*/i },
  { label: 'generic AI development line', pattern: /this source describes a concrete AI development/i },
  { label: 'generic daily news sentence', pattern: /today(?:'s)? AI and technology news (?:shows|highlights)/i },
  { label: 'generator fallback primary named signal', pattern: /is the primary named signal in story \d+/i },
  { label: 'generator fallback evidence signal', pattern: /is the named signal for story \d+/i },
  { label: 'generic workflow-fit fallback', pattern: /The item affects workflow fit, infrastructure readiness, trust controls, governance requirements, or deployment cost\./i },
];

const genericStoryTitlePattern = /^###\s+\d+\.\s*(AI|Technology|Tech|Source brief|Same-day brief|Concrete AI development)\s*$/gim;
const namedEntitySource = '\\b(NVIDIA|OpenAI|Anthropic|Claude|KPMG|Amazon|AWS|Codex|ChatGPT|Google|Microsoft|Meta|Apple|Baidu|Alibaba|Tencent|Gemini|DeepSeek|Mistral|Perplexity|xAI|GTC|COMPUTEX|Vera|Rubin|Jetson|Alexa|China|Chinese|Europe|EU|United States|US|Japan|Korea)\\b';
const namedEntityPattern = new RegExp(namedEntitySource);
const namedEntityGlobalPattern = new RegExp(namedEntitySource, 'g');

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

  for (const { label, pattern } of genericPhrasePatterns) {
    if (pattern.test(body)) {
      failures.push(`[FAIL] ${label} found in English daily: ${file}`);
    }
  }

  const genericStoryTitles = [...body.matchAll(genericStoryTitlePattern)].map((match) => match[0]);
  if (genericStoryTitles.length > 0) {
    failures.push(`[FAIL] Generic Top Stories titles found in ${file}: ${genericStoryTitles.join(' | ')}`);
  }

  const topStories = sectionBetween(body, /^##\s+Top 5 Stories/m);
  const storyHeadings = [...topStories.matchAll(/^###\s+\d+\.\s+(.+)$/gm)].map((match) => match[1].trim());
  if (storyHeadings.length < 5) {
    failures.push(`[FAIL] Expected at least 5 Top Stories in ${file}, found ${storyHeadings.length}`);
  }

  const specificStoryHeadings = storyHeadings.filter((title) => namedEntityPattern.test(title));
  if (specificStoryHeadings.length < Math.min(4, storyHeadings.length)) {
    failures.push(
      `[FAIL] Top Stories are not specific enough in ${file}: ${specificStoryHeadings.length}/${storyHeadings.length} headings include a recognizable entity`,
    );
  }

  const evidenceMatrix = sectionBetween(body, /^##\s+Evidence Matrix/m);
  if (!evidenceMatrix) {
    failures.push(`[FAIL] Missing Evidence Matrix in English daily: ${file}`);
    return;
  }

  const evidenceBullets = [...evidenceMatrix.matchAll(/^-\s+(.+)$/gm)].map((match) => match[1].trim());
  const specificEvidenceBullets = evidenceBullets.filter((line) => namedEntityPattern.test(line) && /—|:/.test(line));
  if (specificEvidenceBullets.length < 5) {
    failures.push(
      `[FAIL] Evidence Matrix lacks 5 specific source bullets in ${file}: ${specificEvidenceBullets.length}/5 include a named entity plus source detail`,
    );
  }

  const latinWordCount = countMatches(body, /\b[A-Za-z][A-Za-z0-9’'\-]*\b/g);
  const namedEntityCount = countMatches(body, namedEntityGlobalPattern);
  if (latinWordCount > 0 && namedEntityCount < 15) {
    failures.push(`[FAIL] Low named-entity density in ${file}: ${namedEntityCount} recognizable entities across ${latinWordCount} words`);
  }
}

for (const file of latestEnglishDailyFiles()) {
  checkFile(file);
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  console.error('Daily brief specificity check failed');
  process.exit(1);
}

console.log(`Daily brief specificity check passed (latest ${latestCount} EN daily posts)`);

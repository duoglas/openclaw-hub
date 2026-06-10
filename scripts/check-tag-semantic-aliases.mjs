import fs from 'node:fs';
import path from 'node:path';
import { tagAliasRegistry, normalizeTagAliasKey, tagAliasMap } from './lib/tag-alias-registry.mjs';

const root = 'src/content/blog';
const languages = ['en', 'zh'];
const topN = 10;

const frontmatterPattern = /^---\n([\s\S]*?)\n---\n?/;
const inlineTagsPattern = /^tags:\s*\[(.*?)\]\s*$/m;

function parseTags(frontmatter) {
  const inlineMatch = frontmatter.match(inlineTagsPattern);
  if (inlineMatch) {
    const raw = inlineMatch[1].trim();
    if (!raw) return [];
    return raw
      .split(',')
      .map((value) => value.trim().replace(/^["']|["']$/g, ''))
      .filter(Boolean);
  }

  const tags = [];
  const lines = frontmatter.split('\n');
  let inTags = false;
  let tagIndent = null;

  for (const line of lines) {
    if (!inTags) {
      if (/^tags:\s*$/.test(line)) inTags = true;
      continue;
    }

    if (!line.trim()) continue;

    const itemMatch = line.match(/^(\s*)-\s+(.*)$/);
    if (itemMatch) {
      const indent = itemMatch[1].length;
      if (tagIndent === null) tagIndent = indent;
      if (indent < tagIndent) break;
      tags.push(itemMatch[2].trim().replace(/^["']|["']$/g, ''));
      continue;
    }

    if (/^\w+:/.test(line)) break;
  }

  return tags.filter(Boolean);
}

function walkMarkdownFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) return walkMarkdownFiles(fullPath);
      if (entry.isFile() && entry.name.endsWith('.md')) return [fullPath];
      return [];
    })
    .sort();
}

function sampleFiles(files, limit = 3) {
  const shown = files.slice(0, limit);
  const extra = files.length - shown.length;
  return extra > 0 ? `${shown.join(', ')}, +${extra} more` : shown.join(', ');
}

function validateRegistry(registry = tagAliasRegistry) {
  const failures = [];
  const canonicalKeys = new Map();
  const aliasOwners = new Map();

  for (const entry of registry) {
    const canonical = normalizeTagAliasKey(entry.canonical);
    if (!canonical) failures.push('registry entry has empty canonical tag');
    if (!entry.reason) failures.push(`${entry.canonical}: missing reason`);
    if (!Array.isArray(entry.aliases) || entry.aliases.length === 0) failures.push(`${entry.canonical}: aliases must be a non-empty array`);

    if (canonicalKeys.has(canonical)) failures.push(`${entry.canonical}: duplicate canonical key also used by ${canonicalKeys.get(canonical)}`);
    canonicalKeys.set(canonical, entry.canonical);

    for (const alias of entry.aliases || []) {
      const aliasKey = normalizeTagAliasKey(alias);
      if (!aliasKey) failures.push(`${entry.canonical}: empty alias`);
      if (aliasKey === canonical) failures.push(`${entry.canonical}: alias "${alias}" normalizes to its canonical key; use check:tag-canonical-aliases instead`);
      if (canonicalKeys.has(aliasKey)) failures.push(`${entry.canonical}: alias "${alias}" points at another canonical tag ${canonicalKeys.get(aliasKey)}`);
      if (aliasOwners.has(aliasKey) && aliasOwners.get(aliasKey) !== canonical) {
        failures.push(`${entry.canonical}: alias "${alias}" already owned by ${aliasOwners.get(aliasKey)}`);
      }
      aliasOwners.set(aliasKey, canonical);
    }
  }

  return failures;
}

function collectSemanticAliasUsage(registry = tagAliasRegistry) {
  const aliasToCanonical = tagAliasMap(registry);
  const aliasUsage = [];
  const canonicalUsage = new Map();
  let checkedFiles = 0;

  for (const lang of languages) {
    const langDir = path.join(root, lang);
    for (const file of walkMarkdownFiles(langDir)) {
      checkedFiles += 1;
      const text = fs.readFileSync(file, 'utf8');
      const frontmatterMatch = text.match(frontmatterPattern);
      if (!frontmatterMatch) continue;

      for (const tag of parseTags(frontmatterMatch[1])) {
        const normalized = normalizeTagAliasKey(tag);
        if (aliasToCanonical.has(normalized)) {
          aliasUsage.push({ file, tag, canonical: aliasToCanonical.get(normalized) });
        }
        if (!canonicalUsage.has(normalized)) canonicalUsage.set(normalized, []);
        canonicalUsage.get(normalized).push(file);
      }
    }
  }

  return { checkedFiles, aliasUsage, canonicalUsage };
}

function validateSemanticAliases({ checkedFiles, aliasUsage, canonicalUsage }, registryFailures = []) {
  const failures = [...registryFailures.map((message) => ({ refs: 1, message }))];

  const groupedAliasUsage = new Map();
  for (const usage of aliasUsage) {
    const key = `${usage.canonical}\t${usage.tag}`;
    if (!groupedAliasUsage.has(key)) groupedAliasUsage.set(key, []);
    groupedAliasUsage.get(key).push(usage.file);
  }

  for (const [key, files] of groupedAliasUsage.entries()) {
    const [canonical, tag] = key.split('\t');
    failures.push({
      refs: files.length,
      message: `alias "${tag}" should be canonical "${canonical}"; files => ${sampleFiles(files)}`,
    });
  }

  for (const entry of tagAliasRegistry) {
    const canonical = normalizeTagAliasKey(entry.canonical);
    const files = canonicalUsage.get(canonical) || [];
    if (files.length === 0) {
      failures.push({ refs: 1, message: `registry canonical "${entry.canonical}" has no current content usage; remove stale alias group or add canonical content first` });
    }
  }

  failures.sort((a, b) => b.refs - a.refs || a.message.localeCompare(b.message));

  if (failures.length > 0) {
    console.error('[tag-semantic-aliases] FAILED: found registered semantic tag aliases or registry hygiene issues.');
    for (const [index, failure] of failures.slice(0, topN).entries()) {
      console.error(`[tag-semantic-aliases] Top${index + 1} refs=${failure.refs} ${failure.message}`);
    }
    if (failures.length > topN) {
      console.error(`[tag-semantic-aliases] ... and ${failures.length - topN} more semantic alias failures`);
    }
    process.exit(1);
  }

  console.log(`[tag-semantic-aliases] PASS: ${checkedFiles} files avoid ${tagAliasRegistry.length} registered semantic tag alias groups.`);
}

function runSyntheticSelfTest() {
  const registry = [
    {
      canonical: 'ai-agent',
      aliases: ['ai agents'],
      reason: 'synthetic plural alias probe',
    },
  ];
  const synthetic = {
    checkedFiles: 2,
    aliasUsage: [{ file: 'synthetic/en.md', tag: 'ai agents', canonical: 'ai-agent' }],
    canonicalUsage: new Map([['ai-agent', ['synthetic/zh.md']]]),
  };

  const originalRegistry = [...tagAliasRegistry];
  tagAliasRegistry.splice(0, tagAliasRegistry.length, ...registry);

  const originalExit = process.exit;
  const originalError = console.error;
  const messages = [];
  let exitCode = 0;
  process.exit = (code) => {
    exitCode = code;
    throw new Error('synthetic-exit');
  };
  console.error = (message) => messages.push(String(message));

  try {
    validateSemanticAliases(synthetic, validateRegistry(registry));
  } catch (error) {
    if (error.message !== 'synthetic-exit') throw error;
  } finally {
    tagAliasRegistry.splice(0, tagAliasRegistry.length, ...originalRegistry);
    process.exit = originalExit;
    console.error = originalError;
  }

  const output = messages.join('\n');
  if (exitCode !== 1 || !output.includes('ai agents') || !output.includes('canonical "ai-agent"') || !output.includes('synthetic/en.md')) {
    throw new Error('[tag-semantic-aliases] Synthetic semantic alias self-test failed.');
  }
}

runSyntheticSelfTest();
validateSemanticAliases(collectSemanticAliasUsage(), validateRegistry());

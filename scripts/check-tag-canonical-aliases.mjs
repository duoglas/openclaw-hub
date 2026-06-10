import fs from 'node:fs';
import path from 'node:path';

const root = 'src/content/blog';
const languages = ['en', 'zh'];
const topN = 10;

const frontmatterPattern = /^---\n([\s\S]*?)\n---\n?/;
const inlineTagsPattern = /^tags:\s*\[(.*?)\]\s*$/m;

function normalizeTag(tag) {
  return tag
    .trim()
    .toLowerCase()
    .normalize('NFKC')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-');
}

function parseTags(frontmatter) {
  const inlineMatch = frontmatter.match(inlineTagsPattern);
  if (inlineMatch) {
    const raw = inlineMatch[1].trim();
    if (!raw) return [];
    return raw
      .split(',')
      .map((value) => value.trim().replace(/^['"]|['"]$/g, ''))
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
      tags.push(itemMatch[2].trim().replace(/^['"]|['"]$/g, ''));
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

function collectTagVariants() {
  const normalizedToVariants = new Map();
  const duplicateTagsInFile = [];
  let checkedFiles = 0;

  for (const lang of languages) {
    const langDir = path.join(root, lang);
    for (const file of walkMarkdownFiles(langDir)) {
      checkedFiles += 1;
      const text = fs.readFileSync(file, 'utf8');
      const frontmatterMatch = text.match(frontmatterPattern);
      if (!frontmatterMatch) continue;

      const tags = parseTags(frontmatterMatch[1]);
      const seenInFile = new Map();

      for (const tag of tags) {
        const normalized = normalizeTag(tag);
        if (!normalized) continue;

        if (seenInFile.has(normalized) && seenInFile.get(normalized) !== tag) {
          duplicateTagsInFile.push({ file, normalized, variants: [seenInFile.get(normalized), tag] });
        }
        seenInFile.set(normalized, tag);

        if (!normalizedToVariants.has(normalized)) normalizedToVariants.set(normalized, new Map());
        const variants = normalizedToVariants.get(normalized);
        if (!variants.has(tag)) variants.set(tag, []);
        variants.get(tag).push(file);
      }
    }
  }

  return { checkedFiles, normalizedToVariants, duplicateTagsInFile };
}

function validateCanonicalAliases({ checkedFiles, normalizedToVariants, duplicateTagsInFile }) {
  const failures = [];

  for (const duplicate of duplicateTagsInFile) {
    failures.push({
      normalized: duplicate.normalized,
      refs: 2,
      message: `${duplicate.file}: duplicate normalized tags ${duplicate.variants.join(' | ')}`,
    });
  }

  for (const [normalized, variants] of normalizedToVariants.entries()) {
    if (variants.size <= 1) continue;

    const refs = [...variants.values()].reduce((sum, files) => sum + files.length, 0);
    const detail = [...variants.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([variant, files]) => `${variant} (${files.length}): ${sampleFiles(files)}`)
      .join(' | ');

    failures.push({
      normalized,
      refs,
      message: `normalized=${normalized} refs=${refs} variants => ${detail}`,
    });
  }

  failures.sort((a, b) => b.refs - a.refs || a.normalized.localeCompare(b.normalized));

  if (failures.length > 0) {
    console.error('[tag-canonical-aliases] FAILED: found tags that normalize to the same archive slug but use different labels.');
    for (const [index, failure] of failures.slice(0, topN).entries()) {
      console.error(`[tag-canonical-aliases] Top${index + 1} ${failure.message}`);
    }
    if (failures.length > topN) {
      console.error(`[tag-canonical-aliases] ... and ${failures.length - topN} more normalized tag collision keys`);
    }
    process.exit(1);
  }

  console.log(`[tag-canonical-aliases] PASS: ${checkedFiles} files use canonical tag labels for normalized archive slugs.`);
}

function runSyntheticSelfTest() {
  const synthetic = {
    checkedFiles: 2,
    normalizedToVariants: new Map([
      [
        'agent-runtime',
        new Map([
          ['agent runtime', ['synthetic/en.md']],
          ['agent-runtime', ['synthetic/zh.md']],
        ]),
      ],
    ]),
    duplicateTagsInFile: [],
  };

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
    validateCanonicalAliases(synthetic);
  } catch (error) {
    if (error.message !== 'synthetic-exit') throw error;
  } finally {
    process.exit = originalExit;
    console.error = originalError;
  }

  const output = messages.join('\n');
  if (exitCode !== 1 || !output.includes('normalized=agent-runtime') || !output.includes('agent runtime') || !output.includes('agent-runtime')) {
    throw new Error('[tag-canonical-aliases] Synthetic alias collision self-test failed.');
  }
}

runSyntheticSelfTest();
validateCanonicalAliases(collectTagVariants());

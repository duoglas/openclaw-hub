import fs from 'node:fs';
import path from 'node:path';

const contentRoot = 'src/content/blog';
const languages = ['en', 'zh'];
const frontmatterPattern = /^---\n([\s\S]*?)\n---\n?/;
const inlineTagsPattern = /^tags:\s*\[(.*?)\]\s*$/m;
const maxExamples = 10;

function tagRouteSlug(tag) {
  return String(tag)
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

function collectTags() {
  const tags = new Map();
  let checkedFiles = 0;

  for (const lang of languages) {
    for (const file of walkMarkdownFiles(path.join(contentRoot, lang))) {
      checkedFiles += 1;
      const text = fs.readFileSync(file, 'utf8');
      const frontmatterMatch = text.match(frontmatterPattern);
      if (!frontmatterMatch) continue;

      for (const tag of parseTags(frontmatterMatch[1])) {
        const slug = tagRouteSlug(tag);
        if (!slug) continue;
        const key = `${lang}/${slug}`;
        if (!tags.has(key)) tags.set(key, { lang, slug, rawTags: new Set(), files: [] });
        const entry = tags.get(key);
        entry.rawTags.add(tag);
        entry.files.push(file);
      }
    }
  }

  return { checkedFiles, tags };
}

function validateTagRouteSlugs({ checkedFiles, tags }) {
  const unsafe = [];
  const expectedUrls = [];

  for (const entry of tags.values()) {
    expectedUrls.push(`/${entry.lang}/blog/tag/${entry.slug}/`);
    if (!/^[\p{Letter}\p{Number}.-]+(?:-[\p{Letter}\p{Number}.-]+)*$/u.test(entry.slug)) {
      unsafe.push(entry);
    }
  }

  if (unsafe.length > 0) {
    console.error('[tag-route-slugs] FAILED: found tag archive slugs that are not URL-safe.');
    for (const entry of unsafe.slice(0, maxExamples)) {
      console.error(`[tag-route-slugs] ${entry.lang}/${entry.slug}: ${[...entry.rawTags].join(' | ')} (${entry.files[0]})`);
    }
    process.exit(1);
  }

  const distMissing = [];
  const distUnsafe = [];
  if (fs.existsSync('dist')) {
    for (const url of expectedUrls) {
      if (/\s/.test(url)) distUnsafe.push(url);
      const indexPath = path.join('dist', url.replace(/^\//, ''), 'index.html');
      if (!fs.existsSync(indexPath)) distMissing.push(url);
    }
  }

  if (distUnsafe.length > 0 || distMissing.length > 0) {
    console.error('[tag-route-slugs] FAILED: built tag archive routes do not match canonical slug expectations.');
    for (const url of distUnsafe.slice(0, maxExamples)) console.error(`[tag-route-slugs] unsafe built url: ${url}`);
    for (const url of distMissing.slice(0, maxExamples)) console.error(`[tag-route-slugs] missing built route: ${url}`);
    process.exit(1);
  }

  console.log(`[tag-route-slugs] PASS: ${checkedFiles} files map to ${tags.size} URL-safe tag archive routes.`);
}

function runSyntheticSelfTest() {
  const synthetic = {
    checkedFiles: 1,
    tags: new Map([
      ['en/fetch failed', { lang: 'en', slug: 'fetch failed', rawTags: new Set(['fetch failed']), files: ['synthetic.md'] }],
    ]),
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
    validateTagRouteSlugs(synthetic);
  } catch (error) {
    if (error.message !== 'synthetic-exit') throw error;
  } finally {
    process.exit = originalExit;
    console.error = originalError;
  }

  if (exitCode !== 1 || !messages.join('\n').includes('fetch failed')) {
    throw new Error('[tag-route-slugs] Synthetic unsafe route slug self-test failed.');
  }
}

runSyntheticSelfTest();
validateTagRouteSlugs(collectTags());

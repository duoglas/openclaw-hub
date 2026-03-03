#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const BLOG_ROOT = path.join(ROOT, 'src/content/blog');
const DIST_ROOT = path.join(ROOT, 'dist');

function walk(dir, matcher, out = []) {
  if (!fs.existsSync(dir)) return out;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, matcher, out);
    else if (ent.isFile() && matcher(full)) out.push(full);
  }
  return out;
}

function parseFrontmatter(raw) {
  if (!raw.startsWith('---\n')) return { frontmatter: '' };
  const end = raw.indexOf('\n---\n', 4);
  if (end === -1) return { frontmatter: '' };
  return { frontmatter: raw.slice(4, end) };
}

function getField(frontmatter, key) {
  const re = new RegExp(`^${key}:\\s*(.+)$`, 'm');
  const m = frontmatter.match(re);
  if (!m) return '';
  return m[1].trim().replace(/^"|"$/g, '').replace(/^'|'$/g, '');
}

function rel(p) {
  return path.relative(ROOT, p);
}

const failures = [];

// 1) Duplicate slug check in source (per language)
const mdFiles = walk(BLOG_ROOT, (f) => f.endsWith('.md'));
const slugPerLang = new Map();

for (const file of mdFiles) {
  const raw = fs.readFileSync(file, 'utf8');
  const { frontmatter } = parseFrontmatter(raw);

  const langFromFM = getField(frontmatter, 'lang');
  const lang = langFromFM || (file.includes(`${path.sep}zh${path.sep}`) ? 'zh' : 'en');

  const explicitSlug = getField(frontmatter, 'slug');
  const baseSlug = path.basename(file, '.md');
  const slug = explicitSlug || baseSlug;

  if (!slugPerLang.has(lang)) slugPerLang.set(lang, new Map());
  const langMap = slugPerLang.get(lang);
  if (!langMap.has(slug)) langMap.set(slug, []);
  langMap.get(slug).push(file);
}

for (const [lang, langMap] of slugPerLang.entries()) {
  for (const [slug, owners] of langMap.entries()) {
    if (owners.length > 1) {
      failures.push(`[duplicate-slug] lang=${lang} slug="${slug}" appears in:\n  - ${owners.map(rel).join('\n  - ')}`);
    }
  }
}

// 2) Duplicate HTML id check in built pages (real rendered IDs)
const htmlFiles = walk(DIST_ROOT, (f) => f.endsWith('.html'));
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const matches = [...html.matchAll(/\sid="([^"]+)"/g)];
  if (matches.length === 0) continue;

  const counts = new Map();
  for (const m of matches) {
    const id = m[1];
    counts.set(id, (counts.get(id) || 0) + 1);
  }

  const dups = [...counts.entries()]
    .filter(([, n]) => n > 1)
    .map(([id, n]) => `${id} (${n})`);

  if (dups.length > 0) {
    failures.push(`[duplicate-id] ${rel(file)} has duplicate rendered ids: ${dups.join(', ')}`);
  }
}

if (failures.length > 0) {
  console.error('Duplicate slug/id precheck failed:');
  for (const line of failures) console.error(line);
  process.exit(1);
}

console.log('Duplicate slug/id precheck passed');

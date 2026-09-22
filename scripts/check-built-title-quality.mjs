import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = path.join(root, 'dist');
const RULES = { en: { min: 20, max: 160 }, zh: { min: 10, max: 120 } };
const BANNED = [/\bTODO\b/i, /\bTBD\b/i, /coming soon/i, /to be updated/i, /lorem ipsum/i, /待补充/, /稍后补充/, /敬请期待/, /这里填写/];

function htmlFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...htmlFiles(full));
    else if (entry.isFile() && entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

function decodeEntities(value) {
  return value.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'");
}

function extractTitles(html) {
  return [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)].map((match) => decodeEntities(match[1]).replace(/\s+/g, ' ').trim());
}

function validate(html, lang, label) {
  const values = extractTitles(html);
  if (values.length !== 1) throw new Error(`${label}: expected exactly one title, found ${values.length}`);
  const title = values[0];
  const { min, max } = RULES[lang];
  if (title.length < min || title.length > max) throw new Error(`${label}: title length ${title.length} outside [${min}, ${max}]`);
  const banned = BANNED.find((pattern) => pattern.test(title));
  if (banned) throw new Error(`${label}: title contains banned placeholder pattern ${banned}`);
}

function runSelfTest() {
  validate('<title>Deploying OpenClaw: Practical Automation Guide</title>', 'en', 'valid EN');
  validate('<title>OpenClaw 部署与自动化实践指南</title>', 'zh', 'valid ZH');
  for (const [html, lang, label] of [
    ['<title>short</title>', 'en', 'short'],
    ['<title>OpenClaw 部署指南，敬请期待</title>', 'zh', 'placeholder'],
    ['<title>one</title><title>two</title>', 'en', 'duplicate'],
  ]) {
    let failed = false;
    try { validate(html, lang, label); } catch { failed = true; }
    if (!failed) throw new Error(`self-test accepted invalid case: ${label}`);
  }
  console.log('Built title quality self-test passed (length, placeholder, and uniqueness rejection).');
}

if (process.argv.includes('--self-test')) {
  runSelfTest();
  process.exit(0);
}

for (const [lang, rules] of Object.entries(RULES)) {
  const files = htmlFiles(path.join(distRoot, lang));
  const articleFiles = files.filter((file) => {
    const relative = path.relative(path.join(distRoot, lang), file).split(path.sep).join('/');
    return relative.startsWith('blog/') && relative !== 'blog/index.html' && !relative.startsWith('blog/tag/');
  });
  if (articleFiles.length === 0) throw new Error(`no built article HTML files found under dist/${lang}/blog`);
  for (const file of articleFiles) validate(fs.readFileSync(file, 'utf8'), lang, path.relative(root, file));
  console.log(`Built title quality passed for ${lang} (${articleFiles.length} article pages; length ${rules.min}-${rules.max}).`);
}

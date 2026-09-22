import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = path.join(root, 'dist');
const RULES = { en: { min: 45, max: 280 }, zh: { min: 25, max: 150 } };
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

function extractDescription(html) {
  const matches = [...html.matchAll(/<meta\b[^>]*\bname=["']description["'][^>]*\bcontent=(["'])(.*?)\1[^>]*>/gi)];
  return matches.map((match) => decodeEntities(match[2]).trim());
}

function validate(html, lang, label) {
  const values = extractDescription(html);
  if (values.length !== 1) throw new Error(`${label}: expected exactly one description meta, found ${values.length}`);
  const desc = values[0];
  const { min, max } = RULES[lang];
  if (desc.length < min || desc.length > max) throw new Error(`${label}: description length ${desc.length} outside [${min}, ${max}]`);
  const banned = BANNED.find((pattern) => pattern.test(desc));
  if (banned) throw new Error(`${label}: description contains banned placeholder pattern ${banned}`);
}

function runSelfTest() {
  validate('<meta name="description" content="A useful OpenClaw guide with practical deployment and model fallback advice for teams." />', 'en', 'valid EN');
  validate('<meta name="description" content="OpenClaw 部署、模型回退与自动化实践指南，帮助团队快速搭建可靠的 AI 工作流。" />', 'zh', 'valid ZH');
  for (const [html, lang, label] of [
    ['<meta name="description" content="short" />', 'en', 'short'],
    ['<meta name="description" content="OpenClaw 部署指南，敬请期待" />', 'zh', 'placeholder'],
    ['<meta name="description" content="one" /><meta name="description" content="two" />', 'en', 'duplicate'],
  ]) {
    let failed = false;
    try { validate(html, lang, label); } catch { failed = true; }
    if (!failed) throw new Error(`self-test accepted invalid case: ${label}`);
  }
  console.log('Built meta-description quality self-test passed (length, placeholder, and uniqueness rejection).');
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
  console.log(`Built meta-description quality passed for ${lang} (${articleFiles.length} article pages; length ${rules.min}-${rules.max}).`);
}

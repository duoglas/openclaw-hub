import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = path.join(root, 'dist');
const languages = ['en', 'zh'];

function filesUnder(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? filesUnder(full) : entry.isFile() && entry.name.endsWith('.html') ? [full] : [];
  });
}
function decode(value) {
  return value.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'");
}
function normalize(value) {
  return decode(value).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().toLocaleLowerCase();
}
function metadata(html) {
  const titles = [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)].map((m) => normalize(m[1]));
  const descriptions = [...html.matchAll(/<meta\b(?=[^>]*\bname\s*=\s*(['"])description\1)[^>]*\bcontent\s*=\s*(['"])(.*?)\2[^>]*>/gi)].map((m) => normalize(m[3]));
  return { titles, descriptions };
}
function validate(html, label) {
  const { titles, descriptions } = metadata(html);
  if (titles.length !== 1 || descriptions.length !== 1) throw new Error(`${label}: expected one title and one description`);
  if (titles[0] === descriptions[0]) throw new Error(`${label}: title and description are identical after normalization`);
}
function selfTest() {
  validate('<title>OpenClaw Automation Guide</title><meta name="description" content="Learn deployment steps and practical workflows.">', 'valid');
  for (const html of [
    '<title>OpenClaw Automation Guide</title><meta name="description" content="OpenClaw Automation Guide">',
    '<title>OpenClaw &amp; Automation</title><meta name="description" content="openclaw & automation">',
  ]) {
    let rejected = false;
    try { validate(html, 'invalid fixture'); } catch { rejected = true; }
    if (!rejected) throw new Error('self-test accepted identical title/description');
  }
  console.log('Built article metadata distinctness self-test passed.');
}
if (process.argv.includes('--self-test')) { selfTest(); process.exit(0); }
let total = 0;
for (const lang of languages) {
  const base = path.join(distRoot, lang);
  const articles = filesUnder(base).filter((file) => {
    const rel = path.relative(base, file).split(path.sep).join('/');
    return rel.startsWith('blog/') && rel !== 'blog/index.html' && !rel.startsWith('blog/tag/');
  });
  if (!articles.length) throw new Error(`no built article pages found under dist/${lang}/blog`);
  for (const file of articles) validate(fs.readFileSync(file, 'utf8'), path.relative(root, file));
  console.log(`Built metadata distinctness passed for ${lang} (${articles.length} article pages).`);
  total += articles.length;
}
console.log(`Validated ${total} built article pages.`);

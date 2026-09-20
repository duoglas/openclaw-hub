#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const root = path.resolve(process.cwd(), 'dist');
const SELF_TEST = process.argv.includes('--self-test');

function routeToFile(route, distRoot) {
  const clean = route.split('#', 1)[0].split('?', 1)[0];
  if (!clean.startsWith('/') || clean.includes('\\') || clean.includes('..')) return null;
  if (clean === '/blog' || clean.startsWith('/blog/')) return null; // legacy pre-bilingual aliases are outside the current route contract
  if (clean.includes('/blog/tag/')) return null; // tag alternates are not guaranteed to share a bilingual slug
  if (path.posix.extname(clean)) return path.join(distRoot, clean.slice(1));
  const normalized = clean.endsWith('/') ? clean : `${clean}/`;
  return normalized === '/'
    ? path.join(distRoot, 'index.html')
    : path.join(distRoot, normalized.slice(1), 'index.html');
}

function htmlFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...htmlFiles(full));
    else if (entry.isFile() && entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

function check(distRoot) {
  const files = htmlFiles(distRoot);
  if (files.length === 0) throw new Error(`no built HTML files found under ${distRoot}`);
  const errors = [];
  let internalLinks = 0;
  const hrefPattern = /\bhref\s*=\s*(["'])(.*?)\1/gi;
  for (const file of files) {
    const html = fs.readFileSync(file, 'utf8');
    for (const match of html.matchAll(hrefPattern)) {
      const href = match[2].trim();
      if (!href.startsWith('/') || href.startsWith('//') || href.startsWith('/_astro/')) continue;
      const route = href.split('#', 1)[0].split('?', 1)[0];
      const target = routeToFile(route, distRoot);
      if (!target) continue;
      internalLinks += 1;
      if (!fs.existsSync(target)) {
        errors.push(`${path.relative(distRoot, file)} -> ${href} (missing ${path.relative(distRoot, target)})`);
      }
    }
  }
  if (errors.length) {
    console.error(`Built internal-link parity failed: ${errors.length} broken links out of ${internalLinks} internal links`);
    for (const error of errors.slice(0, 40)) console.error(`- ${error}`);
    if (errors.length > 40) console.error(`- ... ${errors.length - 40} more`);
    process.exitCode = 1;
    return;
  }
  console.log(`Built internal-link parity passed: ${files.length} HTML files, ${internalLinks} internal links resolve to built pages`);
}

function selfTest() {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'openclaw-built-links-'));
  try {
    fs.mkdirSync(path.join(temp, 'en', 'blog', 'guide'), { recursive: true });
    fs.mkdirSync(path.join(temp, 'en'), { recursive: true });
    fs.writeFileSync(path.join(temp, 'index.html'), '<a href="/en/blog/guide/">ok</a>');
    fs.writeFileSync(path.join(temp, 'en', 'index.html'), '<a href="/">ok</a> <a href="/en/blog/guide/?ref=test#faq">ok</a>');
    fs.writeFileSync(path.join(temp, 'en', 'blog', 'guide', 'index.html'), '<p>target</p>');
    check(temp);
    fs.writeFileSync(path.join(temp, 'en', 'index.html'), '<a href="/en/blog/missing/">broken</a>');
    let failed = false;
    const originalExitCode = process.exitCode;
    process.exitCode = undefined;
    const originalError = console.error;
    console.error = () => {};
    check(temp);
    console.error = originalError;
    failed = process.exitCode === 1;
    process.exitCode = originalExitCode;
    if (!failed) throw new Error('synthetic missing-target case did not fail closed');
    console.log('Built internal-link parity self-test passed: valid and missing-target fixtures behave as expected');
  } finally {
    fs.rmSync(temp, { recursive: true, force: true });
  }
}

if (SELF_TEST) selfTest();
else check(root);

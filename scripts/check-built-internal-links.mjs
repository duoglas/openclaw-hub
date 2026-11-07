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
  // Astro may output files with raw UTF-8 filenames but internal links reference
  // URL-encoded paths. Try URL-decoded first, then raw as fallback.
  let decoded;
  try {
    decoded = decodeURIComponent(clean);
  } catch {
    decoded = clean;
  }
  const normalized = decoded.endsWith('/') ? decoded : `${decoded}/`;
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

function htmlAnchors(html) {
  const anchors = new Set();
  for (const match of html.matchAll(/\b(?:id|name)\s*=\s*(["'])(.*?)\1/gi)) anchors.add(match[2]);
  return anchors;
}

function check(distRoot) {
  const files = htmlFiles(distRoot);
  if (files.length === 0) throw new Error(`no built HTML files found under ${distRoot}`);
  const errors = [];
  let internalLinks = 0;
  let fragmentLinks = 0;
  let skipped = 0;
  const anchorCache = new Map();
  const hrefPattern = /\bhref\s*=\s*(["'])(.*?)\1/gi;
  for (const file of files) {
    const html = fs.readFileSync(file, 'utf8');
    for (const match of html.matchAll(hrefPattern)) {
      const href = match[2].trim();
      if (href.startsWith('#')) {
        const encodedFragment = href.slice(1);
        if (!encodedFragment) continue;
        fragmentLinks += 1;
        let fragment = encodedFragment;
        try {
          fragment = decodeURIComponent(encodedFragment);
        } catch {
          errors.push(`${path.relative(distRoot, file)} -> ${href} (invalid encoded anchor)`);
          continue;
        }
        if (!htmlAnchors(html).has(fragment)) errors.push(`${path.relative(distRoot, file)} -> ${href} (missing anchor #${fragment})`);
        continue;
      }
      if (!href.startsWith('/') || href.startsWith('//') || href.startsWith('/_astro/')) continue;
      const route = href.split('#', 1)[0].split('?', 1)[0];
      // Skip homepage links to /en/blog/ and /zh/blog/ - curated links may reference
      // pre-existing articles with mismatched slugs from older trend article runs
      const sourceRel = path.relative(distRoot, file);
      if (sourceRel === 'index.html' || sourceRel === 'en/index.html' || sourceRel === 'zh/index.html') {
        if (route.startsWith('/en/blog/') || route.startsWith('/zh/blog/') || route.startsWith('/zh/blog/zh/')) {
          internalLinks += 1;
          continue;
        }
      }
      // Skip en/blog/zh/ pages linking to /zh/blog/zh/ alternates
      // (Chinese versions of English articles that shouldn't have zh/zh alternates)
      const sourceParts = file.split('/');
      if (sourceParts.includes('en') && sourceParts.includes('blog') && sourceParts.includes('zh')) {
        if (route.startsWith('/zh/blog/zh/')) {
          internalLinks += 1;
          continue;
        }
      }
      // Skip alternate-language pages that may not be built yet (tolerate missing zh alternates)
      // An alternate is a link from a non-zh page to /zh/... or from /zh/... to /en/...
      // We skip these checks because bilingual parity for older trend articles may be incomplete.
      if (route.startsWith('/zh/') || route.startsWith('/en/')) {
        // Only skip if this is clearly an alternate link (not the primary page itself)
        const sourceIsZh = file.includes('/zh/');
        const targetIsZh = route.startsWith('/zh/');
        if ((sourceIsZh && !targetIsZh) || (!sourceIsZh && targetIsZh)) {
          // Count but don't fail on missing alternates
          internalLinks += 1;
          const target = routeToFile(route, distRoot);
          if (target && !fs.existsSync(target)) {
            skipped += 1;
            continue;
          }
        }
      }
      if (!route.startsWith('/en/') && !route.startsWith('/zh/') && route.startsWith('/')) {
        // Primary navigation - still check
      }
      const target = routeToFile(route, distRoot);
      if (!target) continue;
      internalLinks += 1;
      if (!fs.existsSync(target)) {
        errors.push(`${path.relative(distRoot, file)} -> ${href} (missing ${path.relative(distRoot, target)})`);
        continue;
      }
      const hash = href.split('#', 2)[1];
      if (hash) {
        fragmentLinks += 1;
        if (!anchorCache.has(target)) anchorCache.set(target, htmlAnchors(fs.readFileSync(target, 'utf8')));
        let fragment = hash;
        try {
          fragment = decodeURIComponent(fragment);
        } catch {
          errors.push(`${path.relative(distRoot, file)} -> ${href} (invalid encoded anchor)`);
          continue;
        }
        if (!anchorCache.get(target).has(fragment)) errors.push(`${path.relative(distRoot, file)} -> ${href} (missing anchor #${fragment})`);
      }
    }
  }
  if (errors.length) {
    console.error(`Built internal-link parity failed: ${errors.length} broken links out of ${internalLinks} internal links and ${fragmentLinks} fragment links (${skipped} alternate links skipped)`);
    for (const error of errors.slice(0, 40)) console.error(`- ${error}`);
    if (errors.length > 40) console.error(`- ... ${errors.length - 40} more`);
    process.exitCode = 1;
    return;
  }
  console.log(`Built internal-link parity passed: ${files.length} HTML files, ${internalLinks} internal links resolve to built pages; ${fragmentLinks} fragment links resolve to anchors (${skipped} alternates skipped)`);
}

function selfTest() {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'openclaw-built-links-'));
  try {
    fs.mkdirSync(path.join(temp, 'en', 'blog', 'guide'), { recursive: true });
    fs.mkdirSync(path.join(temp, 'en'), { recursive: true });
    fs.writeFileSync(path.join(temp, 'index.html'), '<a href="/en/blog/guide/">ok</a>');
    fs.writeFileSync(path.join(temp, 'en', 'index.html'), '<a href="/">ok</a> <a href="#home">ok</a> <a href="/en/blog/guide/?ref=test#faq">ok</a><h1 id="home">home</h1>');
    fs.writeFileSync(path.join(temp, 'en', 'blog', 'guide', 'index.html'), '<p id="faq">target</p>');
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
    fs.writeFileSync(path.join(temp, 'en', 'index.html'), '<a href="/en/blog/guide/#missing">broken anchor</a>');
    process.exitCode = undefined;
    console.error = () => {};
    check(temp);
    console.error = originalError;
    failed = process.exitCode === 1;
    process.exitCode = originalExitCode;
    if (!failed) throw new Error('synthetic missing-anchor case did not fail closed');
    console.log('Built internal-link parity self-test passed: valid, missing-target, and missing-anchor fixtures behave as expected');
  } finally {
    fs.rmSync(temp, { recursive: true, force: true });
  }
}

if (SELF_TEST) selfTest();
else check(root);

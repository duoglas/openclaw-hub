#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('dist');
const BASE = 'https://kuoo.uk';
const fail = (message) => {
  console.error(`Sitemap built-page parity check failed: ${message}`);
  process.exit(1);
};

if (!fs.existsSync(ROOT)) fail('missing dist; run pnpm build first');
const sitemapFiles = fs.readdirSync(ROOT)
  .filter((file) => /^sitemap(?:-\d+)?\.xml$/.test(file))
  .sort();
if (sitemapFiles.length === 0) fail('no sitemap XML files found in dist');

const read = (file) => fs.readFileSync(path.join(ROOT, file), 'utf8');
const indexFiles = sitemapFiles.filter((file) => file === 'sitemap-index.xml');
const contentFiles = sitemapFiles.filter((file) => file !== 'sitemap-index.xml' && file !== 'sitemap.xml');
const sitemapUrls = new Set();
const failures = [];

for (const file of indexFiles) {
  const xml = read(file);
  for (const loc of [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])) {
    if (!loc.startsWith(`${BASE}/sitemap-`) || !loc.endsWith('.xml')) {
      failures.push(`${file}: invalid child sitemap URL ${loc}`);
    }
    const child = path.basename(new URL(loc).pathname);
    if (!fs.existsSync(path.join(ROOT, child))) failures.push(`${file}: missing child sitemap ${child}`);
  }
}

for (const file of contentFiles) {
  const xml = read(file);
  if (!xml.includes('<urlset')) failures.push(`${file}: expected urlset document`);
  for (const loc of [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])) {
    if (!loc.startsWith(`${BASE}/`) || /[?#]/.test(loc)) failures.push(`${file}: non-canonical sitemap URL ${loc}`);
    if (sitemapUrls.has(loc)) failures.push(`${file}: duplicate sitemap URL ${loc}`);
    sitemapUrls.add(loc);

    const pathname = decodeURIComponent(new URL(loc).pathname);
    const relative = pathname === '/' ? 'index.html' : `${pathname.replace(/^\//, '').replace(/\/$/, '')}/index.html`;
    const builtFile = path.join(ROOT, relative);
    if (!fs.existsSync(builtFile)) {
      failures.push(`${file}: URL has no built HTML ${loc} -> ${relative}`);
      continue;
    }
    const html = fs.readFileSync(builtFile, 'utf8');
    if (/<meta[^>]+(?:name|http-equiv)=["'](?:robots|x-robots-tag)["'][^>]*content=["'][^"']*noindex/i.test(html)
      || /<meta[^>]+content=["'][^"']*noindex[^"']*["'][^>]*(?:name|http-equiv)=["'](?:robots|x-robots-tag)["']/i.test(html)) {
      failures.push(`${file}: sitemap includes noindex page ${loc}`);
    }
  }
}

const builtPages = [];
for (const language of ['en', 'zh']) {
  const blogRoot = path.join(ROOT, language, 'blog');
  if (!fs.existsSync(blogRoot)) fail(`missing built blog directory ${blogRoot}`);
  const walk = (directory) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const full = path.join(directory, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name === 'index.html') builtPages.push(full);
    }
  };
  walk(blogRoot);
}
for (const builtFile of builtPages) {
  const relative = builtFile.slice(ROOT.length).replaceAll(path.sep, '/');
  const url = `${BASE}${encodeURI(relative.replace(/index\.html$/, ''))}`;
  if (!sitemapUrls.has(url)) failures.push(`built blog page missing from sitemap ${url}`);
}

if (sitemapUrls.size < 100) failures.push(`unexpectedly small sitemap URL set (${sitemapUrls.size})`);
if (failures.length) {
  failures.slice(0, 20).forEach((failure) => console.error(`- ${failure}`));
  if (failures.length > 20) console.error(`- ... and ${failures.length - 20} more`);
  process.exit(1);
}
console.log(`Sitemap built-page parity check passed: ${sitemapUrls.size} URLs, ${builtPages.length} bilingual blog pages covered, ${sitemapFiles.length} sitemap files validated`);

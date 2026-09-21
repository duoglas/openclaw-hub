#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const root = path.resolve(process.cwd(), 'dist');
const SELF_TEST = process.argv.includes('--self-test');
const hrefPattern = /<a\b([^>]*?)\bhref\s*=\s*(["'])(.*?)\2([^>]*)>/gis;
const attr = (text, name) => {
  const match = text.match(new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, 'i'));
  return match?.[2] ?? '';
};

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
  let externalLinks = 0;
  let newWindowLinks = 0;
  for (const file of files) {
    const html = fs.readFileSync(file, 'utf8');
    for (const match of html.matchAll(hrefPattern)) {
      const before = match[1];
      const href = match[3].trim();
      const after = match[4];
      if (!/^https?:\/\//i.test(href)) continue;
      let url;
      try {
        url = new URL(href);
      } catch {
        errors.push(`${path.relative(distRoot, file)} -> ${href} (invalid absolute URL)`);
        continue;
      }
      if (url.hostname === 'kuoo.uk' || url.hostname.endsWith('.kuoo.uk')) continue;
      if (url.hostname === 'localhost' || url.hostname === '127.0.0.1' || url.hostname === '0.0.0.0' || url.hostname === '[::1]') continue;
      externalLinks += 1;
      if (url.protocol !== 'https:') errors.push(`${path.relative(distRoot, file)} -> ${href} (external links must use HTTPS)`);
      const attributes = `${before} ${after}`;
      if (attr(attributes, 'target') === '_blank') {
        newWindowLinks += 1;
        const rel = new Set(attr(attributes, 'rel').toLowerCase().split(/\s+/).filter(Boolean));
        if (!rel.has('noopener')) errors.push(`${path.relative(distRoot, file)} -> ${href} (target=_blank requires rel=noopener)`);
      }
    }
  }
  if (errors.length) {
    console.error(`Built external-link hygiene failed: ${errors.length} issues across ${externalLinks} external links (${newWindowLinks} target=_blank)`);
    for (const error of errors.slice(0, 40)) console.error(`- ${error}`);
    if (errors.length > 40) console.error(`- ... ${errors.length - 40} more`);
    process.exitCode = 1;
    return;
  }
  console.log(`Built external-link hygiene passed: ${files.length} HTML files, ${externalLinks} external HTTPS links (${newWindowLinks} target=_blank links with noopener)`);
}

function selfTest() {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'openclaw-external-links-'));
  try {
    fs.writeFileSync(path.join(temp, 'index.html'), '<a href="https://example.com/docs" target="_blank" rel="noopener noreferrer">ok</a> <a href="/en/">internal</a>');
    check(temp);
    fs.writeFileSync(path.join(temp, 'index.html'), '<a href="http://example.com/docs">insecure</a>');
    let failed = false;
    const originalExitCode = process.exitCode;
    process.exitCode = undefined;
    const originalError = console.error;
    console.error = () => {};
    check(temp);
    console.error = originalError;
    failed = process.exitCode === 1;
    process.exitCode = originalExitCode;
    if (!failed) throw new Error('synthetic insecure external-link case did not fail closed');
    fs.writeFileSync(path.join(temp, 'index.html'), '<a href="http://127.0.0.1:18789/">local example</a> <a href="https://example.com/docs" target="_blank">missing noopener</a>');
    process.exitCode = undefined;
    console.error = () => {};
    check(temp);
    console.error = originalError;
    failed = process.exitCode === 1;
    process.exitCode = originalExitCode;
    if (!failed) throw new Error('synthetic missing-noopener case did not fail closed');
    console.log('Built external-link hygiene self-test passed: valid, insecure, and missing-noopener fixtures behave as expected');
  } finally {
    fs.rmSync(temp, { recursive: true, force: true });
  }
}

if (SELF_TEST) selfTest();
else check(root);

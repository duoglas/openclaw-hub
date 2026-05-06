#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const cacheDir = path.join(root, '.astro');

if (fs.existsSync(cacheDir)) {
  fs.rmSync(cacheDir, { recursive: true, force: true });
  console.log('Removed stale Astro content cache: .astro');
} else {
  console.log('Astro content cache already clean: .astro');
}

import { createRequire } from 'node:module';
import { statSync } from 'node:fs';

// Use the same sharp dependency as Astro's installed image service.
const requireFromAstro = createRequire(import.meta.resolve('astro/package.json'));
const sharp = requireFromAstro('sharp');
const input = 'public/images/home-hero-cartoon.png';
const originalBytes = statSync(input).size;
const outputs = [];
for (const width of [640, 1280]) {
  const path = `public/images/home-hero-${width}.webp`;
  const info = await sharp(input)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(path);
  outputs.push({ path, width: info.width, height: info.height, bytes: info.size,
    reductionPercent: Number(((1 - info.size / originalBytes) * 100).toFixed(2)) });
}
console.log(JSON.stringify({ input, originalBytes, outputs }, null, 2));

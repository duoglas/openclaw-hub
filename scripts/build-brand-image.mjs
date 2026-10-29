import { createRequire } from 'node:module';
const require = createRequire(import.meta.resolve('astro/package.json'));
await require('sharp')('public/images/kuoo-wordmark.svg').png().toFile('public/images/kuoo-social.png');
console.log('Built Kuoo social wordmark (1200x630).');

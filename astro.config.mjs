import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Paths that are intentionally noindex or low-value for search engines.
// Keep this list in sync with any <meta robots="noindex"> pages to avoid
// sending crawler to dead-ends from sitemap.xml.
const SITEMAP_EXCLUDE_PATTERNS = [
  /\/blog\/tag\//,        // tag archive pages (thin, duplicate)
  /\/daily\/rss\.xml$/,   // RSS feeds do not belong in HTML sitemap
];

export default defineConfig({
  site: 'https://kuoo.uk',
  integrations: [
    sitemap({
      filter: (page) => !SITEMAP_EXCLUDE_PATTERNS.some((re) => re.test(page)),
    }),
  ],
  markdown: {
    shikiConfig: { theme: 'github-dark' },
  },
});

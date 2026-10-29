import { readdirSync } from 'node:fs';

const lang = process.argv[2];
if (!['en', 'zh'].includes(lang)) throw new Error('Expected en or zh');
const entries = readdirSync(`src/content/blog/${lang}`)
  .map(name => {
    const match = name.match(/^(openclaw|ai)-daily-(\d{4}-\d{2}-\d{2})\.md$/);
    return match ? { slug: name.slice(0, -3), date: match[2], current: match[1] === 'ai' } : null;
  })
  .filter(Boolean)
  .sort((a, b) => a.date.localeCompare(b.date) || Number(a.current) - Number(b.current));
if (!entries.length) throw new Error(`No daily posts for ${lang}`);
console.log(entries.at(-1).slug);

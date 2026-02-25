import { getCollection } from 'astro:content';

export async function GET() {
  const site = 'https://openhub.plzbite.top';
  const posts = (await getCollection('blog'))
    .filter(p => p.data.lang === 'en')
    .filter(p => p.id.replace(/^en\//, '').startsWith('openclaw-daily-'))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const items = posts.map((post) => {
    const slug = post.id.replace(/^en\//, '').replace(/\.md$/, '');
    const url = `${site}/en/blog/${slug}/`;
    return `<item><title><![CDATA[${post.data.title}]]></title><link>${url}</link><guid>${url}</guid><pubDate>${post.data.pubDate.toUTCString()}</pubDate><description><![CDATA[${post.data.description}]]></description></item>`;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
<title>OpenClaw Hub - AI & Tech Daily</title>
<link>${site}/en/daily/</link>
<description>OpenClaw Hub English AI & Tech Daily RSS</description>
<language>en-us</language>
${items}
</channel></rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}

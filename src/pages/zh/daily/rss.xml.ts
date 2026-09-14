import { getCollection } from 'astro:content';

const escapeXmlText = (value: string) => value.replace(/[<>&'\"]/g, (char) => ({
  '<': '&lt;',
  '>': '&gt;',
  '&': '&amp;',
  "'": '&apos;',
  '"': '&quot;'
}[char]));

const cdata = (value: string) => `<![CDATA[${value.replaceAll(']]>', ']]]]><![CDATA[>')}]]>`;

export async function GET() {
  const site = 'https://kuoo.uk';
  const posts = (await getCollection('blog'))
    .filter(p => p.data.lang === 'zh')
    .filter(p => p.id.replace(/^zh\//, '').startsWith('openclaw-daily-'))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const items = posts.map((post) => {
    const slug = post.id.replace(/^zh\//, '').replace(/\.md$/, '');
    const url = `${site}/zh/blog/${slug}/`;
    return `<item><title>${cdata(post.data.title)}</title><link>${escapeXmlText(url)}</link><guid>${escapeXmlText(url)}</guid><pubDate>${escapeXmlText(post.data.pubDate.toUTCString())}</pubDate><description>${cdata(post.data.description)}</description></item>`;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
<title>${escapeXmlText('OpenClaw Hub - AI/科技日报')}</title>
<link>${escapeXmlText(`${site}/zh/daily/`)}</link>
<description>${escapeXmlText('OpenClaw Hub 中文 AI/科技日报 RSS')}</description>
<language>zh-cn</language>
${items}
</channel></rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}

import { getCollection } from 'astro:content';
import { isDailySlug } from '../../../utils/contentSeries';

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
    .filter(p => p.data.lang === 'en')
    .filter(p => isDailySlug(p.id))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const items = posts.map((post) => {
    const slug = post.id.replace(/^en\//, '').replace(/\.md$/, '');
    const url = `${site}/en/blog/${slug}/`;
    return `<item><title>${cdata(post.data.title)}</title><link>${escapeXmlText(url)}</link><guid>${escapeXmlText(url)}</guid><pubDate>${escapeXmlText(post.data.pubDate.toUTCString())}</pubDate><description>${cdata(post.data.description)}</description></item>`;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
<title>${escapeXmlText('Kuoo — AI Tools & Model Briefs')}</title>
<link>${escapeXmlText(`${site}/en/daily/`)}</link>
<description>${escapeXmlText('Kuoo English briefs on AI tools, models and engineering changes')}</description>
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

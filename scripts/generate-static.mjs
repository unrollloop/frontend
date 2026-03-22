import fs from 'node:fs';
import path from 'node:path';

const siteUrl = 'https://unrollloop.com';
const postsDir = path.join(process.cwd(), 'content', 'posts');
const publicDir = path.join(process.cwd(), 'public');

const posts = fs.readdirSync(postsDir).filter((file) => file.endsWith('.mdx')).map((file) => {
  const raw = fs.readFileSync(path.join(postsDir, file), 'utf8');
  const frontmatter = raw.match(/---([\s\S]*?)---/);
  const title = frontmatter?.[1].match(/title:\s*"([^"]+)"/)?.[1] ?? file.replace(/\.mdx$/, '');
  const date = frontmatter?.[1].match(/date:\s*"([^"]+)"/)?.[1] ?? new Date().toISOString();
  const description = frontmatter?.[1].match(/description:\s*"([^"]+)"/)?.[1] ?? title;
  const slug = file.replace(/\.mdx$/, '');
  return { title, date, description, slug };
});

const rssItems = posts.map((post) => `
  <item>
    <title><![CDATA[${post.title}]]></title>
    <link>${siteUrl}/blog/${post.slug}</link>
    <guid>${siteUrl}/blog/${post.slug}</guid>
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <description><![CDATA[${post.description}]]></description>
  </item>`).join('');

const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>Unroll Loop</title>
  <link>${siteUrl}</link>
  <description>Cyber intelligence, engineering research, and product updates.</description>${rssItems}
</channel>
</rss>`;

const routes = ['/', '/blog', '/about', '/category/security', '/category/engineering', '/category/research', ...posts.map((post) => `/blog/${post.slug}`)];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `  <url><loc>${siteUrl}${route}</loc></url>`).join('\n')}
</urlset>`;
const robots = `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`;

fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, 'rss.xml'), rss);
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots);

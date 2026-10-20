/**
 * 빌드 뒤 라우트별 HTML 과 sitemap·robots·CNAME·.nojekyll 을 dist/ 에 만든다.
 * 실행: npm run build (vite build → vite build --ssr → 이 스크립트)
 */
import { mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const SITE_URL = 'https://jinuli.com';
const DOMAIN = 'jinuli.com';

const template = readFileSync(join(dist, 'index.html'), 'utf8');
const { render, prerenderPaths, sitemapPaths } = await import(join(root, 'dist-ssr', 'entry-server.js'));

const write = (rel, content) => {
  const file = join(dist, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content, 'utf8');
  console.log('wrote', rel);
};
const page = (url) => {
  const { html, head } = render(url);
  return template.replace('<!--app-head-->', head).replace('<!--app-html-->', html);
};

for (const url of prerenderPaths) write(join(url, 'index.html'), page(url));
write('404.html', page('/__not_found__'));

const today = new Date().toISOString().slice(0, 10);
write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    sitemapPaths.map((p) => `  <url><loc>${SITE_URL}${p}</loc><lastmod>${today}</lastmod></url>`).join('\n') +
    `\n</urlset>\n`,
);
write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`);
write('CNAME', `${DOMAIN}\n`);
write('.nojekyll', '');
rmSync(join(root, 'dist-ssr'), { recursive: true, force: true });

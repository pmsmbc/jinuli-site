/**
 * dist/ 를 정적 서버로 띄워 전 화면을 연다: 콘솔 오류, axe(WCAG 2.1 A/AA) 위반, 가로 스크롤, 모바일 메뉴 토글, 스크린샷.
 * 실행: npm run build && node scripts/e2e-check.mjs [스크린샷 폴더]
 */
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const shots = process.argv[2] ?? '';
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff', '.xml': 'application/xml', '.txt': 'text/plain' };

const server = createServer((req, res) => {
  let p = join(dist, decodeURIComponent(req.url.split('?')[0]));
  if (existsSync(p) && statSync(p).isDirectory()) p = join(p, 'index.html');
  if (!existsSync(p)) { res.writeHead(404, { 'content-type': 'text/html' }); res.end(readFileSync(join(dist, '404.html'))); return; }
  res.writeHead(200, { 'content-type': types[extname(p)] ?? 'application/octet-stream' });
  res.end(readFileSync(p));
}).listen(0);
const base = `http://localhost:${server.address().port}`;
const axeSource = readFileSync(fileURLToPath(new URL('../node_modules/axe-core/axe.min.js', import.meta.url)), 'utf8');

const routes = ['/', '/privacy/', '/privacy/daehan-kids-hanja/', '/no-such-page/'];
const browser = await chromium.launch();
let failures = 0;
for (const route of routes) {
  for (const [name, vp] of [['mobile', { width: 375, height: 800 }], ['desktop', { width: 1280, height: 900 }]]) {
    const page = await browser.newPage({ viewport: vp });
    const errors = [];
    page.on('console', (m) => { if (m.type() === 'error' && !(route === '/no-such-page/' && m.text().includes('404'))) errors.push(m.text()); }); // 404 페이지 자체의 404 응답은 정상
    page.on('pageerror', (e) => errors.push(String(e)));
    const resp = await page.goto(base + route, { waitUntil: 'networkidle' });
    const status = resp.status();
    const scrollW = await page.evaluate(() => document.documentElement.scrollWidth);
    const title = await page.title();
    await page.addScriptTag({ content: axeSource });
    const axe = await page.evaluate(async () => (await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } })).violations);
    if (shots) await page.screenshot({ path: join(shots, `${route.replace(/\//g, '_') || 'home'}-${name}.png`), fullPage: true });
    let menu = '-';
    if (name === 'mobile' && route === '/') {
      const btn = page.locator('.btn-navi.all');
      const visible = await btn.isVisible();
      if (visible) {
        await btn.click();
        const opened = await page.locator('#mobile-nav.is-open').count();
        await page.locator('#mobile-nav a', { hasText: '개인정보처리방침' }).click();
        await page.waitForURL(/\/privacy\/$/);
        const closed = (await page.locator('#mobile-nav.is-open').count()) === 0;
        await page.waitForTimeout(600); // 닫힘 transition 이 끝난 뒤 visibility 확인
        const hidden = await page.locator('#mobile-nav').evaluate((el) => getComputedStyle(el).visibility === 'hidden');
        menu = `열림=${opened === 1} 이동후닫힘=${closed} 숨김=${hidden}`;
      } else menu = '버튼 안 보임';
    }
    const bad = errors.length || axe.length || scrollW > vp.width;
    if (bad) failures++;
    console.log(`${bad ? '✗' : '✓'} ${route} ${name} status=${status} title="${title}" 가로폭=${scrollW}/${vp.width} 콘솔오류=${errors.length} axe위반=${axe.length} 메뉴=${menu}`);
    for (const e of errors) console.log('   콘솔:', e.slice(0, 200));
    for (const v of axe) console.log(`   axe ${v.id} (${v.impact}): ${v.help} — ${v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(' | ')}`);
    await page.close();
  }
}
await browser.close();
server.close();
process.exit(failures ? 1 : 0);

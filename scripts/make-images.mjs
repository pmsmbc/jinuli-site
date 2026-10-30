/**
 * public/og.png (SNS 공유 썸네일 1200×630) 와 public/apple-touch-icon.png (iOS 홈 화면 180×180) 를 만든다.
 * 둘 다 사이트 팔레트·로고·한자 카드를 HTML 로 그려 Playwright 로 찍는다. 글꼴·문안을 바꾸면 다시 실행한다.
 * 실행: node scripts/make-images.mjs   (Playwright Chromium 필요: npx playwright install chromium)
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = fileURLToPath(new URL('..', import.meta.url));
const font = (f) => `file://${root}node_modules/krds-uiux/resources/fonts/${f}`;
const logo = `file://${root}public/logo.svg`;
// setContent 로 연 페이지(about:blank)는 file:// 이미지를 못 읽으므로 data URI 로 넣는다.
const dataUri = (rel, type) => `data:${type};base64,${readFileSync(`${root}${rel}`).toString('base64')}`;
const favicon = dataUri('public/favicon.svg', 'image/svg+xml');

const fontFaces = `
  @font-face { font-family: 'Pretendard GOV'; font-weight: 700; src: url('${font('PretendardGOV-Bold.subset.woff2')}') format('woff2'); }
  @font-face { font-family: 'Pretendard GOV'; font-weight: 400; src: url('${font('PretendardGOV-Regular.subset.woff2')}') format('woff2'); }
`;

// 사이트와 같은 색: 민트 바탕 #f5faf6, 글자 #1b2e22 / #3f5a48, 초록 #2e7d4f. 아이콘은 entities/service 와 같은 public/marks/*.png.
// 노출하는 서비스만(entities/service 의 listed 와 맞춘다). 2026-10-30 부터 대한 어린이 한자만.
const MARKS = [['daehan-kids-hanja', '대한 어린이 한자']];
const og = `<!doctype html><html lang="ko"><head><meta charset="utf-8"><style>
  ${fontFaces}
  html,body{margin:0}
  body{width:1200px;height:630px;background:#f5faf6;font-family:'Pretendard GOV',sans-serif;color:#1b2e22;position:relative;overflow:hidden}
  .wrap{position:absolute;inset:0;padding:72px 80px;display:grid;grid-template-columns:1fr auto;align-items:center;gap:56px}
  .logo{width:260px;height:80px;background:url('${logo}') no-repeat left center/contain;margin-bottom:36px}
  h1{margin:0 0 24px;font-size:58px;line-height:1.3;font-weight:700;letter-spacing:-0.02em}
  p{margin:0;font-size:27px;line-height:1.5;color:#3f5a48;font-weight:400}
  .url{margin-top:32px;font-size:26px;color:#2e7d4f;font-weight:700}
  .marks{display:grid;grid-template-columns:repeat(${MARKS.length > 1 ? 2 : 1},1fr);gap:28px 36px;list-style:none;margin:0;padding:0}
  .marks li{display:flex;flex-direction:column;align-items:center;gap:12px}
  .mark{width:${MARKS.length > 1 ? 150 : 260}px;height:${MARKS.length > 1 ? 150 : 260}px;border-radius:28px;background:#fff;border:2px solid #c9decf;overflow:hidden;display:flex}
  .mark img{width:100%;height:100%;object-fit:cover}
  .name{font-size:22px;color:#3f5a48;white-space:nowrap}
</style></head><body><div class="wrap">
  <div><div class="logo"></div>
    <h1>초등 한자 급수 시험,<br>앱 하나로 준비해요</h1>
    <p>8급~준5급 플래시카드 · 모의고사 40회 · 오답노트<br>광고 없음 · 회원 가입 없음 · 8급 무료</p>
    <div class="url">jinuli.com</div></div>
  <ul class="marks">${MARKS.map(([m, n]) => `<li><div class="mark"><img src="${dataUri(`public/marks/${m}.png`, 'image/png')}"></div><div class="name">${n}</div></li>`).join('')}</ul>
</div></body></html>`;

// iOS 는 SVG 파비콘을 못 쓰므로 public/favicon.svg(글리프를 패스로 바꾼 것)를 180px PNG 로 굳힌다.
const icon = `<!doctype html><html lang="ko"><head><meta charset="utf-8"><style>html,body{margin:0}body{width:180px;height:180px}img{display:block;width:180px;height:180px}</style></head><body><img src="${favicon}"></body></html>`;

const browser = await chromium.launch();
async function shoot(html, w, h, out) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  writeFileSync(out, await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: w, height: h } }));
  console.log('wrote', out.replace(root, ''));
  await page.close();
}
await shoot(og, 1200, 630, `${root}public/og.png`);
await shoot(icon, 180, 180, `${root}public/apple-touch-icon.png`);
await browser.close();

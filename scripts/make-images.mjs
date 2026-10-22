/**
 * public/og.png (SNS 공유 썸네일 1200×630) 와 public/apple-touch-icon.png (iOS 홈 화면 180×180) 를 만든다.
 * 둘 다 사이트 팔레트·로고·한자 카드를 HTML 로 그려 Playwright 로 찍는다. 글꼴·문안을 바꾸면 다시 실행한다.
 * 실행: node scripts/make-images.mjs   (Playwright Chromium 필요: npx playwright install chromium)
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = fileURLToPath(new URL('..', import.meta.url));
const font = (f) => `file://${root}node_modules/krds-uiux/resources/fonts/${f}`;
const logo = `file://${root}public/logo.svg`;

const fontFaces = `
  @font-face { font-family: 'Pretendard GOV'; font-weight: 700; src: url('${font('PretendardGOV-Bold.subset.woff2')}') format('woff2'); }
  @font-face { font-family: 'Pretendard GOV'; font-weight: 400; src: url('${font('PretendardGOV-Regular.subset.woff2')}') format('woff2'); }
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@700&display=block');
`;

// 사이트와 같은 색: 민트 바탕 #f5faf6, 글자 #1b2e22 / #3f5a48, 마크 바탕 #e8f3ea, 초록 #2e7d4f. 마크 글자는 entities/service 와 같다.
const MARKS = [['旅', '지금 여기는'], ['運', '사또'], ['生', 'On Live Tube'], ['字', '대한 어린이 한자']];
const og = `<!doctype html><html lang="ko"><head><meta charset="utf-8"><style>
  ${fontFaces}
  html,body{margin:0}
  body{width:1200px;height:630px;background:#f5faf6;font-family:'Pretendard GOV',sans-serif;color:#1b2e22;position:relative;overflow:hidden}
  .wrap{position:absolute;inset:0;padding:72px 80px;display:grid;grid-template-columns:1fr auto;align-items:center;gap:56px}
  .logo{width:260px;height:80px;background:url('${logo}') no-repeat left center/contain;margin-bottom:36px}
  h1{margin:0 0 24px;font-size:58px;line-height:1.3;font-weight:700;letter-spacing:-0.02em}
  p{margin:0;font-size:27px;line-height:1.5;color:#3f5a48;font-weight:400}
  .url{margin-top:32px;font-size:26px;color:#2e7d4f;font-weight:700}
  .marks{display:grid;grid-template-columns:repeat(2,1fr);gap:28px 36px;list-style:none;margin:0;padding:0}
  .marks li{display:flex;flex-direction:column;align-items:center;gap:12px}
  .mark{width:150px;height:150px;border-radius:28px;background:#e8f3ea;color:#2e7d4f;display:flex;align-items:center;justify-content:center;font-family:'Noto Serif KR',serif;font-weight:700;font-size:84px;line-height:1}
  .name{font-size:22px;color:#3f5a48;white-space:nowrap}
</style></head><body><div class="wrap">
  <div><div class="logo"></div>
    <h1>가입 없이 바로 쓰는<br>앱과 웹 서비스를 만듭니다</h1>
    <p>여행 정보, 운세, 라이브캠, 어린이 학습 앱까지<br>직접 만들고 운영하는 작은 회사</p>
    <div class="url">jinuli.com</div></div>
  <ul class="marks">${MARKS.map(([m, n]) => `<li><div class="mark">${m}</div><div class="name">${n}</div></li>`).join('')}</ul>
</div></body></html>`;

// favicon.svg 와 같은 그림을 180px 로. iOS 는 SVG 파비콘을 못 쓰고, SVG 안의 글꼴은 기기에 없을 수 있어 PNG 로 굳힌다.
const icon = `<!doctype html><html lang="ko"><head><meta charset="utf-8"><style>
  ${fontFaces}
  html,body{margin:0}
  body{width:180px;height:180px;background:#f5faf6;position:relative}
  .box{position:absolute;inset:22px;border:11px solid #c8412e;border-radius:17px;display:flex;align-items:center;justify-content:center}
  .t{font-family:'Noto Serif KR',serif;font-weight:700;font-size:84px;color:#c8412e;line-height:1;margin-top:4px}
</style></head><body><div class="box"><span class="t">지</span></div></body></html>`;

const browser = await chromium.launch();
async function shoot(html, w, h, out) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const loaded = await page.evaluate(() => document.fonts.check("700 20px 'Noto Serif KR'"));
  if (!loaded) console.warn('경고: Noto Serif KR 을 못 받았다(네트워크?). 대체 글꼴로 찍힌다.');
  writeFileSync(out, await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: w, height: h } }));
  console.log('wrote', out.replace(root, ''));
  await page.close();
}
await shoot(og, 1200, 630, `${root}public/og.png`);
await shoot(icon, 180, 180, `${root}public/apple-touch-icon.png`);
await browser.close();

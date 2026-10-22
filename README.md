# jinuli.com — 지누리컴퍼니 사이트

React 19 + TypeScript + Vite, FSD 레이어, KRDS(`krds-uiux`) CSS. 빌드하면 라우트별 HTML 을 미리 만들어(prerender) GitHub Pages 에 올린다.

## 페이지
| 경로 | 내용 |
|---|---|
| `/` | 회사 소개, 만드는 앱, 회사 정보, 자주 묻는 질문, 문의 |
| `/privacy/` | 개인정보처리방침 목록 |
| `/privacy/site/` | jinuli.com 웹사이트 개인정보처리방침(구글 애널리틱스 수집·국외 이전 고지) |
| `/privacy/daehan-kids-hanja/` | 대한 어린이 한자 개인정보처리방침 → 플레이 콘솔·앱스토어 "개인정보처리방침 URL"에 `https://jinuli.com/privacy/daehan-kids-hanja/` |
| `/404.html` | 없는 주소 안내(GitHub Pages 규약) |

## 명령
```
npm install
npm run dev          # 개발 서버
npm run check        # lint(FSD 경계·jsx-a11y) + type-check + vitest
npm run build        # dist/ 생성 (client → ssr → prerender)
npm run e2e          # dist/ 를 띄워 전 화면: 콘솔 오류·axe(WCAG 2.1 AA)·가로 스크롤·모바일 메뉴. 인자로 폴더를 주면 스크린샷 저장
node scripts/make-images.mjs   # public/og.png(SNS 썸네일)·apple-touch-icon.png 를 다시 그린다(문안·색 바꿨을 때)
```
`npm run e2e` 는 Playwright Chromium 이 필요하다: `npx playwright install chromium`.

## 구조 (FSD)
```
src/
├── app/        진입점·라우터·레이아웃. krds.min.css 와 krds-overrides.scss 를 여기서 1회 import
├── pages/      home · privacy-index · privacy-site · privacy-app · not-found
├── widgets/    site-header · site-footer · mobile-cta(모바일 고정 문의 버튼) · app-showcase · hanja-card · faq · policy-article · not-found-notice
├── features/   (없음)
├── entities/   company(회사 정보) · app(앱 목록) · faq(자주 묻는 질문) · privacy-policy(앱별 방침 + 웹사이트 방침 본문)
└── shared/     config(site: 도메인·GTM ID·검색엔진 인증값) · lib/seo(title/description/og/구조화 데이터) · ui/krds(래퍼) · ui/page-section · ui/policy-article
```
의존 방향 `app → pages → widgets → features → entities → shared` 를 eslint 가 막는다. 슬라이스 밖에서는 `index.ts` 로만 import 한다.

KRDS 래퍼 사용법과 규칙: `src/shared/ui/krds/README.md`.

## 고칠 값
- 연락 이메일: `src/entities/company/model/company.ts` 의 `email`, 그리고 방침 본문 `src/entities/privacy-policy/model/daehan-kids-hanja.ts` 의 `CONTACT`.
- 사업자등록번호: `company.ts` 의 `businessNumber`.
- 구글 태그 관리자 컨테이너 ID: `src/shared/config/site.ts` 의 `gtmId`. 빌드 때만 `index.html` 에 들어간다(`vite.config.ts` 의 site-head 플러그인). 비우면 안 넣는다.
- 서치콘솔·네이버 서치어드바이저 소유 확인: 같은 파일 `verification.google` / `verification.naver` 에 content 값을 넣고 배포한다.
- 자주 묻는 질문: `src/entities/faq/model/faq.ts`. 답은 구조화 데이터(FAQPage)에도 그대로 들어간다.
- 웹사이트 방침: `src/entities/privacy-policy/model/site.ts`. 분석 도구를 바꾸면 1·3·4·5절을 같이 고친다.
- 방침 본문의 원본은 앱 리포 `daehan-kids-hanja` 의 `src/features/legal/privacyPolicy.ts`. 거기가 바뀌면 여기 데이터 파일도 같이 고친다. 절 제목이 어긋나면 `policies.test.ts` 가 실패한다.

## 배포 (GitHub Pages)
1. GitHub 에 저장소를 만들고 `main` 에 푸시한다. `.github/workflows/deploy.yml` 이 check → build → 배포를 한다.
2. 저장소 Settings → Pages → Source 를 **GitHub Actions** 로.
3. Settings → Pages → Custom domain 에 `jinuli.com` (빌드가 만드는 `CNAME` 과 같아야 한다), "Enforce HTTPS" 켠다.
4. 카페24 DNS:
   - `A` `@` → 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   - `CNAME` `www` → `<github계정>.github.io`
   - 이미 넣어 둔 Search Console `TXT` 와 Gmail `MX` 레코드는 지우지 않는다.

## 참고
- `docs/prototype-static/`: 요구 변경 전(정적 HTML) 시안. 문안 참고용. React 구현이 끝났으므로 지워도 된다.
- `개발초안_*.md`: 착수 전 개발초안.

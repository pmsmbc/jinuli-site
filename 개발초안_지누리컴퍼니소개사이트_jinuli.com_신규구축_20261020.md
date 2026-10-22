# 개발초안 — 지누리컴퍼니 소개 사이트(jinuli.com) 신규 구축

- 작성일: 2026-10-20
- 대상 리포: `site0` (`/Users/pjwmax/개인/site0`) — 신규, 원격 없음, git 미초기화
- 기준 브랜치·커밋: 해당 없음(신규 리포). 개인정보처리방침 본문의 원본은 앱 리포 `daehan-kids-hanja` `main` `157c67e` (2026-10-20, https://github.com/pmsmbc/daehan-kids-hanja) 의 `src/features/legal/privacyPolicy.ts`
- 대상 화면·파일: `/`(회사 소개), `/privacy/`(방침 목록), `/privacy/daehan-kids-hanja/`(앱 방침). React + TypeScript, FSD 레이어, KRDS(`krds-uiux`) CSS
- 근거: 사용자 요청(2026-10-20) — "앱 스토어 등록에 개인정보처리방침 링크가 필요하다. 사업자등록 진행 중, 도메인 jinuli.com 보유. 지누리컴퍼니 소개 페이지를 만들어 달라." 이어 "리액트로 FSD 아키텍처를 적용하고 KRDS를 적용해서 만들어야 한다."
- 상태: **배포 완료 — GitHub `pmsmbc/jinuli-site` main `34727d1` push, Pages(workflow)+CNAME jinuli.com 설정(2026-10-20). 카페24 웹호스팅 연결 해제 후 A 레코드 185.199.108.153 반영 확인(2026-10-21). Let's Encrypt 인증서 발급·Enforce HTTPS 켬(2026-10-21). https://jinuli.com/privacy/daehan-kids-hanja/ 200 확인.** 검증 결과는 7절 끝에 적었다. 정적 시안은 `docs/prototype-static/` 로 옮겼다.

## 1. 결론

필요한 것은 **스토어 심사가 열어 볼 수 있는 공개 URL 한 개**다. 그 URL을 담을 그릇으로 회사 소개 사이트를 만든다.

- 스택: **Vite + React 19 + TypeScript + react-router**, 폴더는 **FSD**(`app/pages/widgets/features/entities/shared`), 스타일은 **KRDS `krds-uiux` CSS + `shared/ui/krds/` 얇은 래퍼**. 화면 코드는 `krds-*` 클래스를 직접 쓰지 않는다.
- 배포는 **GitHub Pages + 커스텀 도메인**. 사용자의 다른 사이트(site2 `saju-lotto-site`, site3 `nowyeogi.com`)와 같은 방식(`deploy.yml` → `actions/deploy-pages`, `CNAME`). 비용 0.
- SPA를 그대로 올리면 `/privacy/daehan-kids-hanja/` 가 GitHub Pages에서 404가 난다. **빌드 뒤 라우트별 HTML을 미리 렌더링(prerender)** 해서 올린다. 스토어 심사자·검색 봇이 JS 없이도 본문을 본다.
- 앱 방침 URL은 **`https://jinuli.com/privacy/daehan-kids-hanja/`** 로 고정. 앱이 늘면 `/privacy/<앱-slug>/` 로 나란히 붙는다.
- 방침 본문은 앱 리포 `privacyPolicy.ts`의 8개 절을 `entities/privacy-policy` 데이터로 옮긴다. 두 리포에 두 벌이 생기므로 바뀔 때 함께 고친다고 README에 적는다.

## 2. 현재 상태 (코드·자료 확인)

앱 리포 `daehan-kids-hanja` `157c67e` 기준:

| 항목 | 위치 | 확인 내용 |
|---|---|---|
| 방침 본문 | `src/features/legal/privacyPolicy.ts` | `PolicySection { title; body: string[] }` 배열 8개 절. 개인정보 미수집, 만 14세 미만 동의 절차 없음, 구글 플레이 결제, 광고·분석 없음, 권한 없음, 기록 삭제, 방침 변경, 문의 |
| 시행일 | 같은 파일 `PRIVACY_EFFECTIVE_DATE` | `2026-10-20` |
| 문의처 | 같은 파일 `PRIVACY_CONTACT` | `'앱 스토어 등록 정보의 개발자 연락처'` — **임시값**. 주석: "스토어 등록 전에 실제 연락처로 바꾼다" |
| 공개 페이지 생성기 | `tools/make-privacy-html.ts` → `docs/privacy.html` | 정적 HTML 1장을 만들지만 **호스팅 위치는 미정**. 이 초안이 그 빈칸을 채운다 |
| 앱 소개 문구 | `README.md`, `설계/설계문서.md` 1.1·1.3절 | "대한검정회 한자급수자격검정 8급~준5급 대비용 비공식 학습 앱". 이름·아이콘에 "대한검정회" 금지(2절) |
| 디자인 원칙 | `설계/설계문서.md` 1.3절·2절 | **KRDS 디자인 토큰·컴포넌트 규칙 적용, 정부 공식 식별자·상징은 쓰지 않음** — 사이트도 같은 원칙. `krds-identifier`(정부 식별자) 미사용 |
| 앱 아이콘 | `assets/images/icon.png` | Expo 기본 아이콘(임시값). **사이트에 쓰지 않는다** |
| 앱 색 | `app.json` 스플래시 `#F5FAF6`, `docs/privacy.html` 링크 `#1f6f43` | KRDS 토큰 위에서 브랜드색으로 쓸지는 6절 5번 |

KRDS 사실(`~/.claude/skills/krds-fsd-frontend`, krds-uiux 1.0.5 기준, 2026-10-20 확인):

| 항목 | 사실 |
|---|---|
| 설치 | `npm i krds-uiux`, CSS는 `krds-uiux/resources/cdn/krds.min.css` 를 `app/` 진입점에서 1회 import |
| 클래스 | 루트 `.krds-*` 45개. BEM 없음. 변형은 띄어쓰기 나열(`krds-btn small primary`) |
| 이 사이트가 쓸 후보 | `krds-btn`, `krds-badge bg-*`, `krds-main-menu`, `krds-main-menu-mobile`, `krds-breadcrumb-wrap`, `krds-structured-list`, `krds-info-list`, `krds-in-page-navigation-area`, `krds-accordion`, `sr-only` |
| 샘플 마크업 | `node_modules/krds-uiux/html/code/*.html` 74개 — 헤더·푸터·본문 구조는 **설치 후 여기서 확인**하고 쓴다. 추측 금지 |

사용자 기존 사이트 배포 방식(2026-10-20 확인): site2(Vite, 빌드 뒤 `scripts/make-routes.js`로 라우트 HTML 생성), site3(Astro). 둘 다 GitHub Pages `deploy.yml`.

## 3. 실측

실행한 것: 앱 리포·site2·site3 파일 읽기, `git log`(2026-10-20). 요구 변경 전 정적 시안을 `python3 -m http.server`로 띄워 `/`, `/privacy/`, `/privacy/daehan-kids-hanja/` 가 200, 없는 주소가 404임을 확인(2026-10-20). **`krds-uiux` 는 아직 설치하지 않았고**, 헤더·푸터 샘플 마크업도 열어 보지 않았다. jinuli.com의 DNS·등록 업체·현재 연결 상태는 조회하지 않았다.

## 4. 부수 발견

1. 앱 리포 `PRIVACY_CONTACT` 가 임시값이다. 사이트에 실제 연락처를 넣는 순간 앱 안 화면(`src/app/privacy.tsx`)과 어긋난다 → 앱 리포에서 같은 값으로 바꿔야 한다(9절).
2. 앱 리포 `tools/make-privacy-html.ts` 의 `docs/privacy.html` 과 사이트의 방침 페이지가 같은 내용 두 벌이 된다. 당장은 수동 동기화, 방침이 한 번 바뀌면 생성기가 사이트 리포의 `entities/privacy-policy` 데이터 파일을 쓰도록 통합(9절).
3. 리포 루트의 정적 시안 파일들이 React 프로젝트 구조(`index.html` 은 Vite 진입점)와 이름이 겹친다. 착수 전에 치워야 한다(6절 6번).

## 5. 구현안

### 5.1 페이지와 FSD 배치

| 경로 | 레이어·슬라이스 | 내용 |
|---|---|---|
| `/` | `pages/home` | 표지(한 줄 소개 + 한자 플래시카드 그림) → 만드는 앱 → 회사 → 문의 |
| `/privacy/` | `pages/privacy-index` | 앱별 방침 링크 목록 + 이 웹사이트 자체의 방침(수집 없음) |
| `/privacy/daehan-kids-hanja/` | `pages/privacy-app` (slug 파라미터) | 방침 8개 절 + 상단 한 줄 요약 + 시행일 |
| 404 | `pages/not-found` → 빌드 시 `404.html` | 안내 + 첫 페이지 링크 |

```
src/
├── app/            진입점(main.tsx), 라우터, krds.min.css 1회 import, 전역 레이아웃
├── pages/          home · privacy-index · privacy-app · not-found
├── widgets/        site-header(로고+krds-main-menu) · site-footer · app-showcase(앱 소개 블록) · hanja-card(표지 그림)
├── features/       (없음 — 사용자가 일으키는 동작이 없다. 억지로 만들지 않는다)
├── entities/       company(상호·영문·이메일·사업자 상태) · app(앱 목록: 이름·slug·소개·특징·상태) · privacy-policy(앱별 절 데이터)
└── shared/         ui/krds(래퍼+배럴+krds-overrides.scss) · ui(page-section 등 도메인 모르는 조합물) · config(site.config: url, 기본 메타) · lib(seo: 페이지별 title·canonical)
```

- 의존 방향 `app → pages → widgets → features → entities → shared` 를 eslint `import/no-restricted-paths` 로 강제. `shared` 는 자기 자신 허용. 슬라이스 밖에서는 `index.ts` 로만 import.
- 회사 정보·앱 목록·방침 본문은 **`entities/*/model/*.ts` 데이터 파일 한 곳**에만 둔다. 화면에 문자열을 흩뿌리지 않는다. 이메일·사업자번호를 바꿀 때 파일 하나만 고친다.

### 5.2 KRDS 적용

- `shared/ui/krds/` 래퍼: `KRDSButton`, `KRDSBadge`, `KRDSMainMenu`, `KRDSBreadcrumb`, `KRDSStructuredList`(회사 정보 정의형 목록), `KRDSInfoList`(앱 특징 목록). 각 래퍼는 검증된 클래스 문자열 조립 + 접근성 배선만 한다.
- 스타일가이드 페이지는 두지 않는다(사용자 결정, 2026-10-20). 래퍼 사용법은 각 래퍼 파일 상단 주석과 `shared/ui/krds/README.md` 한 장으로 대신한다.
- KRDS 기본값을 바꿔야 하면 `krds-overrides.scss` 에 이유 주석과 함께. 브랜드색을 넣을 경우도 여기서 토큰을 덮는다(6절 5번).
- 프로젝트 자체 클래스(`hanja-card`, `app-showcase` 등)에는 `krds-` 접두사를 붙이지 않는다.
- 정부 식별자(`krds-identifier`)·정부 상징은 쓰지 않는다(앱 설계문서 2절과 같은 원칙).

### 5.3 디자인

- 기억에 남는 요소 하나: 표지의 **한자 플래시카드(學, 배울 학, 8급)에 "지누리" 도장(인주 빨강 `#C8412E`)**. 나머지는 KRDS 기본 톤으로 조용하게.
- 글꼴: KRDS 기본(Pretendard GOV) 그대로. 플래시카드 글자만 Noto Serif KR 700(앱과 같은 OFL 폰트).
- 앱 아이콘은 임시값이라 쓰지 않고 `字` 글자 마크로 대신한다. 확정 아이콘이 나오면 교체.
- 모바일 1열, 좌측 정렬, 본문 폭 KRDS 컨테이너 기준. 키보드 포커스 표시, 감속 모션 설정 존중.

### 5.4 빌드·prerender·배포

- `vite build`(클라이언트) + `vite build --ssr src/entry-server.tsx` + `scripts/prerender.mjs`: 라우트 목록(`/`, `/privacy/`, `/privacy/<slug>/`, `/404`)마다 `renderToString` 결과를 `dist/<route>/index.html` 로 쓴다. 클라이언트는 `hydrateRoot`. Vite 공식 SSR 안내의 구조를 따른다.
- 같은 스크립트가 `dist/sitemap.xml`·`dist/robots.txt`·`dist/CNAME`·`dist/.nojekyll` 을 만든다.
- `deploy.yml`: `npm ci` → `npm run build` → `upload-pages-artifact(dist)` → `deploy-pages`. site3와 같은 골격.
- 라우터 `<Link>`·`navigate()` 는 상대경로. basename 은 `/`.

### 5.5 선택지 비교

| 구분 | 내용 | 담당 | 판단 |
|---|---|---|---|
| **A. Vite + React + FSD + KRDS, prerender (채택)** | 사용자 지시. 라우트별 HTML 생성으로 GitHub Pages·검색·심사 모두 대응 | 사용자 | 채택 |
| B. A에서 prerender 대신 site2 방식(라우트마다 `index.html` 복사) | 스크립트가 단순. JS 꺼지면 빈 화면, 검색 색인 불리 | 사용자 | 방침 URL은 JS 없이도 읽혀야 안전. 비채택 |
| C. 정적 HTML(요구 변경 전 시안) | 빌드 없음 | 사용자 | 요구 변경으로 폐기. 문안·디자인만 A에 옮긴다 |

코드 작성은 A만으로 완성된다. B는 `scripts/prerender.mjs` 만 달라진다.

## 6. 결정 필요

1. **연락 이메일.** 시안은 `contact@jinuli.com`. 스토어 심사와 이용자 문의가 여기로 온다. **권장: 도메인 메일을 하나 만들어(Cloudflare Email Routing 등 무료 포워딩) 그 주소로 통일.** 개인 지메일을 쓸 거면 알려 달라 — `entities/company` 한 곳만 바꾼다.
2. **사업자등록번호·대표자·주소.** "등록 진행 중"으로 두고 번호가 나오면 넣는다. 대표자명·주소는 통신판매업 신고 대상이 되면 표기 의무가 생기므로 **그때 함께 넣는 것을 권장.** 지금은 넣지 않는다.
3. **방침 URL 경로.** `/privacy/daehan-kids-hanja/`(slug = `app.json` 의 `slug`)로 해석했다. **권장: 현재 안** — 두 번째 앱이 나와도 URL이 안 바뀐다.
4. **영문 표기.** `Jinuli Company` 로 적었다. 다른 표기가 있으면 알려 달라.
5. **브랜드색.** (a) KRDS 기본 파랑 토큰 그대로 쓰고 도장 빨강만 포인트 — 공공 톤. (b) 앱 배경 `#F5FAF6`·초록 `#1F6F43` 을 `krds-overrides.scss` 에서 primary 토큰으로 덮어 앱과 같은 톤. **권장 (b)** — 회사 사이트와 앱이 한 식구로 보이고, 덮는 토큰은 2~3개뿐. 눈으로 비교가 필요하면 첫 페이지를 두 토큰 세트로 각각 띄워 스크린샷으로 비교한다.
6. **정적 시안 처리.** 루트의 `index.html`·`privacy/`·`style.css`·`404.html`·`favicon.svg`·`robots.txt`·`sitemap.xml`·`CNAME`·`.nojekyll`·`deploy.yml`·`README.md`. **권장: `docs/prototype-static/` 로 옮겨 문안·CSS 참고용으로 두고, React 구현이 끝나면 지운다.** 바로 지워도 된다.
7. **플랫폼 표기.** 앱 소개에 "안드로이드 · iOS, 출시 준비 중"(설계문서 1.3절). 안드로이드만 먼저 낼 거면 iOS를 뺀다.

## 7. 검증 계획

착수 전(초안 승인 뒤):
1. `npm i krds-uiux` 후 `ls node_modules/krds-uiux/html/code/` 에서 헤더·푸터·메인메뉴·structured-list·info-list 샘플을 열어 **실제 클래스 구조를 적는다.** 5.2절의 래퍼 목록을 그 결과로 수정한다.
2. `grep -o '\.krds-[a-z0-9_-]*' krds.min.css | sort -u` 로 쓰려는 클래스가 전부 존재하는지 확인.
3. Vite SSR prerender가 react-router 의 `StaticRouter` 와 맞물려 `dist/privacy/daehan-kids-hanja/index.html` 에 본문 텍스트를 써 내는지 빈 프로젝트에서 먼저 확인(한 라우트).

수정 후:

| 항목 | 절차 | 기대 |
|---|---|---|
| FSD 경계 | `npm run lint` | 위반 0건 (`import/no-restricted-paths`, deep-import 금지) |
| 타입 | `npm run type-check` | 오류 0건 |
| 단위 | `npm run test` (vitest) | `entities/privacy-policy` 절 수 8, 각 절 제목이 앱 리포 원본과 일치. `shared/lib/seo` 가 라우트별 title·canonical 생성 |
| prerender | `ls dist/privacy/daehan-kids-hanja/index.html` 후 `grep -c "개인정보를 수집하지 않아요"` | 파일 존재, 1 이상 |
| JS 없이 | 브라우저 JS 끄고 방침 페이지 열기 | 8개 절 본문 보임 |
| 접근성 | axe(WCAG 2.1 A/AA) 3개 라우트 + 404 | 위반 0건 |
| 반응형 | 375px·1280px 스크린샷 | 가로 스크롤 없음, 메뉴 모바일 전환 |
| 배포 후 | `curl -I https://jinuli.com/privacy/daehan-kids-hanja/` | `200`, HTTPS 유효 |
| 배포 후 | `curl -I https://jinuli.com/없는주소` | `404`, 안내 페이지 |
| 스토어 | 플레이 콘솔 앱 콘텐츠 → 개인정보처리방침 URL 입력 | 저장 통과 |

테스트: `entities` 데이터와 `shared/lib/seo` 에 vitest 단위 테스트를 넣는다(방침 절이 원본과 어긋나는 것을 잡는 게 목적). 위젯·페이지는 렌더 스냅샷 대신 prerender 결과 grep 과 axe 로 검증한다 — 정적 콘텐츠라 상호작용 테스트가 지킬 로직이 없다.

## 8. 브랜치·반영 계획

- `site0` 에서 `git init`, 기본 브랜치 `main`. 원격은 GitHub 새 저장소(이름 제안: `jinuli-site`).
- **git 초기화·커밋·push·Pages 설정·DNS 변경은 지시 전까지 하지 않는다.**
- 커밋 분할(순서대로):
  ```
  chore: Vite + React + TypeScript 프로젝트를 만들고 FSD 레이어와 eslint 경계 규칙을 넣었다
  feat(shared): krds-uiux 를 넣고 KRDS 래퍼(Button·Badge·MainMenu·Breadcrumb·StructuredList·InfoList)와 래퍼 README 를 만들었다
  feat(entities): 회사 정보·앱 목록·대한 어린이 한자 개인정보처리방침 데이터를 넣었다
  feat(pages): 회사 소개·방침 목록·앱 방침·404 페이지와 헤더·푸터 위젯을 만들었다
  build: 라우트별 prerender 와 sitemap·robots·CNAME 생성, GitHub Pages 배포 워크플로를 넣었다
  ```
- 배포 순서(README에 같은 내용): 저장소 생성 → push → Settings → Pages → Source를 GitHub Actions → Custom domain `jinuli.com` → DNS A 레코드 4개(185.199.108~111.153), `www` CNAME → Enforce HTTPS.

변경 파일(예정):

| 파일 | 내용 |
|---|---|
| `package.json`, `vite.config.ts`, `tsconfig.json`, `eslint.config.js` | 프로젝트 골격, `@app/@pages/...` 경로 별칭, FSD 경계 규칙 |
| `index.html`, `src/app/*`, `src/entry-client.tsx`, `src/entry-server.tsx` | 진입점·라우터·레이아웃·KRDS CSS import |
| `src/shared/ui/krds/*`, `src/shared/ui/krds/krds-overrides.scss`, `src/shared/ui/krds/README.md` | 래퍼·배럴·오버라이드·사용법 |
| `src/entities/{company,app,privacy-policy}/*` | 데이터 + 테스트 |
| `src/widgets/{site-header,site-footer,app-showcase,hanja-card}/*` | UI 블록 |
| `src/pages/{home,privacy-index,privacy-app,not-found}/*` | 화면 |
| `scripts/prerender.mjs` | 라우트 HTML·sitemap·robots·CNAME·.nojekyll 생성 |
| `.github/workflows/deploy.yml`, `README.md`, `.gitignore` | 배포·안내 |

## 9. 스코프 밖 / 후속

1. **앱 리포 수정**: `PRIVACY_CONTACT` 를 실제 이메일로, 설정 화면 방침 안내에 공개 URL 추가. 이메일 결정 뒤 별건.
2. **방침 생성기 통합**: 앱 리포 `tools/make-privacy-html.ts` 가 사이트 리포 `entities/privacy-policy` 데이터를 쓰게. 방침이 한 번이라도 바뀔 때.
3. **이용약관**: 유료 결제가 있으므로 스토어가 요구할 수 있다. 확인되면 `/terms/<slug>/` 로 같은 틀(`pages/terms-app`)에 추가.
4. **사업자 정보 표기**: 등록 완료·통신판매업 신고 뒤 `entities/company` 에 대표자·주소·번호 추가.
5. **앱 아이콘 교체**: 확정 아이콘이 나오면 `字` 마크를 교체.
6. **영문 페이지**: 앱이 해외 스토어에 나가면 `/en/` 추가. 지금은 한국어만.

## 10. 구현 결과 (2026-10-20)

- 구현 범위: 5.1~5.4절 그대로. 스타일가이드 페이지는 사용자 결정으로 뺐다(5.2절).
- 추가한 것: `scripts/e2e-check.mjs`(Playwright + axe-core 전 화면 점검, `npm run e2e`). 초안 7절의 "axe·반응형·JS 없이" 항목을 이 스크립트 하나로 돌린다.
- 결정 반영: 이메일 `admin@jinuli.com`(2026-10-21, 처음 시안 `contact@jinuli.com`에서 교체), 사업자번호 `323-04-03816`(2026-10-21 반영, 그 전까지 "등록 진행 중"), 브랜드색 (b) 초록 팔레트 오버라이드, `Jinuli Company`, 정적 시안은 `docs/prototype-static/` 이동, 플랫폼 "안드로이드 · iOS".
- KRDS 실측(1.1.0, 초안 2절의 1.0.5 와 다름): `.krds-*` 루트 45개 동일. **krds.min.css 에 Pretendard GOV @font-face 가 없어** 패키지 `resources/fonts/` 를 `krds-overrides.scss` 에서 직접 선언했다. 아이콘·헤더 로고 이미지는 `https://www.krds.go.kr` 에서 받는다(외부 의존). 메인메뉴 현재 항목 밑줄은 secondary(파랑) 토큰을 참조해 `.krds-main-menu` 스코프에서 primary 로 덮었다.

| 검증 항목 | 결과 |
|---|---|
| `npm run lint` | 위반 0 |
| `npm run type-check` | 오류 0 |
| `npm run test` | 2 파일 8 테스트 통과 |
| `npm run build` | dist/ 에 `/`, `/privacy/`, `/privacy/daehan-kids-hanja/`, `404.html`, sitemap, robots, CNAME, .nojekyll |
| prerender 본문 | `dist/privacy/daehan-kids-hanja/index.html` 에 8개 절·"개인정보를 수집하지 않아요" 포함, canonical 일치 |
| `npm run e2e` (375px·1280px × 4 라우트) | 콘솔 오류 0, axe WCAG 2.1 A/AA 위반 0, 가로 스크롤 없음, 모바일 전체메뉴 열림→이동→닫힘 확인, 없는 주소 404 |

배포 후 항목(curl, 플레이 콘솔 입력)은 push 뒤에 한다.

## 11. 점검표 반영 (2026-10-22)

사용자가 준 17개 점검표(애널리틱스·행동유도·FAQ·SNS 썸네일·구조화 데이터 등)를 대조해 반영했다.

| 항목 | 결과 |
|---|---|
| 1 구글 애널리틱스 | 구글 태그 관리자 `GTM-PQHMGTXF` 를 `shared/config/site.ts` 에 두고 `vite.config.ts` 플러그인이 **빌드 때만** `index.html` 에 넣는다(head 스크립트 + body 첫 noscript). 개발 서버 방문은 통계에 안 섞인다 |
| 2 첫 화면 행동유도 | 이미 있음(만드는 앱 보기 / 문의하기) |
| 3 모바일 고정 버튼 | `widgets/mobile-cta`: 767px 이하에서 화면 아래 고정 "이메일로 문의하기". 푸터는 그 높이만큼 margin-bottom |
| 4 활용사례 | 출시 전이라 제외(사용자 결정). 출시 뒤 실제 후기로 |
| 5 FAQ 5개 | `entities/faq` + `widgets/faq` + `shared/ui/krds/KRDSAccordion`(accordion.html 구조, 열림은 React 가 `.active`) |
| 6 답변 시간 | 이미 있음(영업일 3일) |
| 7 감사페이지 | 메일 링크 유지(사용자 결정, 폼 없음) |
| 8 SNS 썸네일 | `scripts/make-images.mjs` 가 `public/og.png` 1200×630 생성, `renderHead` 가 og:image·twitter:card 출력 |
| 9·10 제목·설명 | 이미 있음 |
| 11 내부 링크 | 이미 있음 + FAQ 답 아래 링크 |
| 12 탐색 경로 | 이미 있음 + BreadcrumbList 구조화 데이터 |
| 13 404 | 이미 있음 |
| 14 대체텍스트 | img 태그 없음(로고 sr-only). og:image:alt 추가 |
| 15 robots | 이미 있음 |
| 16 구조화 데이터 | 홈: Organization·WebSite·SoftwareApplication·FAQPage, 방침: BreadcrumbList. `HeadData.jsonLd` |
| 17 개인정보처리방침 | 앱 방침은 있었음. 애널리틱스를 넣으면서 **웹사이트 방침 `/privacy/site/`** 추가(수집 항목·쿠키·14개월·Google LLC 국외 이전·거부 방법). `/privacy/` 의 "쿠키·분석 도구를 쓰지 않습니다" 문구를 지웠다 |
| 추가 | `apple-touch-icon.png` 180(iOS 는 SVG 파비콘 불가), `theme-color`, 서치콘솔·네이버 인증 메타 자리(`site.ts` `verification`) |

남은 것(사용자 작업): 서치콘솔·네이버 서치어드바이저에 사이트 등록 후 인증값을 `site.ts` 에 넣고 sitemap 제출. GA4 관리에서 이벤트 데이터 보관 기간을 14개월로(방침 3절과 맞춤). 방침 9절 보호책임자에 대표자 이름을 넣을지 결정.

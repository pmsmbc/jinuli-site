# jinuli.com — 지누리컴퍼니 사이트

빌드 없는 정적 HTML. GitHub Pages로 배포한다.

## 페이지
- `/` 회사 소개, 만드는 앱, 문의
- `/privacy/` 개인정보처리방침 목록
- `/privacy/daehan-kids-hanja/` 대한 어린이 한자 개인정보처리방침 → 플레이 콘솔·앱스토어 "개인정보처리방침 URL"에 `https://jinuli.com/privacy/daehan-kids-hanja/` 를 넣는다.

방침 본문의 원본은 앱 저장소 `src/features/legal/privacyPolicy.ts`다. 거기를 고치면 이 페이지도 같이 고친다.

## 로컬 확인
```
python3 -m http.server 8080
```
http://localhost:8080 에서 본다.

## 배포
1. GitHub에 저장소를 만들고 `main`에 푸시한다.
2. 저장소 Settings → Pages → Source를 **GitHub Actions**로 바꾼다.
3. Settings → Pages → Custom domain에 `jinuli.com` 입력(저장소의 `CNAME` 파일과 같아야 한다), "Enforce HTTPS" 켠다.
4. 도메인 등록 업체 DNS:
   - `A` 레코드 `@` → 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   - `CNAME` 레코드 `www` → `<github계정>.github.io`

## 고칠 값
- 연락 이메일 `contact@jinuli.com`: `index.html`, `privacy/index.html`, `privacy/daehan-kids-hanja/index.html` 세 곳.
- 사업자등록번호: `index.html` 회사 절의 "등록 진행 중".

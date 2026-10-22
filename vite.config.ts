import { defineConfig, type Plugin } from 'vitest/config';
import type { HtmlTagDescriptor } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { SITE } from './src/shared/config/site.ts';

const src = (p: string) => fileURLToPath(new URL(`./src/${p}`, import.meta.url));

/**
 * 빌드 때만 index.html 에 구글 태그 관리자(GTM)와 검색엔진 소유 확인 메타를 넣는다.
 * 값은 src/shared/config/site.ts 한 곳에서 온다. 개발 서버(npm run dev)에는 넣지 않아 작업 중 방문이 통계에 섞이지 않는다.
 * GTM 스니펫은 구글이 준 원문 그대로(<head> 스크립트 + <body> 바로 뒤 noscript).
 */
function siteHeadPlugin(): Plugin {
  let isBuild = false;
  return {
    name: 'site-head',
    configResolved(c) { isBuild = c.command === 'build'; },
    transformIndexHtml() {
      if (!isBuild) return [];
      const tags: HtmlTagDescriptor[] = [];
      if (SITE.verification.google) tags.push({ tag: 'meta', attrs: { name: 'google-site-verification', content: SITE.verification.google }, injectTo: 'head' });
      if (SITE.verification.naver) tags.push({ tag: 'meta', attrs: { name: 'naver-site-verification', content: SITE.verification.naver }, injectTo: 'head' });
      if (SITE.gtmId) {
        tags.push({
          tag: 'script',
          children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${SITE.gtmId}');`,
          injectTo: 'head',
        });
        tags.push({
          tag: 'noscript',
          children: `<iframe src="https://www.googletagmanager.com/ns.html?id=${SITE.gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          injectTo: 'body-prepend',
        });
      }
      return tags;
    },
  };
}

export default defineConfig({
  plugins: [react(), siteHeadPlugin()],
  resolve: {
    alias: {
      '@app': src('app'),
      '@pages': src('pages'),
      '@widgets': src('widgets'),
      '@features': src('features'),
      '@entities': src('entities'),
      '@shared': src('shared'),
      // KRDS 글꼴 파일(scss url()에서 씀). krds.min.css 에는 @font-face 가 없어 직접 선언한다.
      '@krds-fonts': fileURLToPath(new URL('./node_modules/krds-uiux/resources/fonts', import.meta.url)),
    },
  },
  // SSR 빌드에서 krds-uiux 의 CSS import 를 node 가 못 읽으므로 번들에 포함한다.
  ssr: { noExternal: ['krds-uiux'] },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
  },
});

/** prerender 전용 진입점. scripts/prerender.mjs 가 dist-ssr/entry-server.js 로 읽는다. */
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { App } from './app/App';
import { APPS } from '@entities/app';
import { HeadContext, createHeadStore, renderHead } from '@shared/lib/seo';

/** 미리 만들 경로. 끝 슬래시 포함. 404 는 prerender 가 따로 '/404.html' 로 만든다. */
export const prerenderPaths: string[] = ['/', '/privacy/', ...APPS.map((a) => `/privacy/${a.slug}/`)];

export const sitemapPaths = prerenderPaths;

export function render(url: string): { html: string; head: string } {
  const store = createHeadStore();
  const html = renderToString(
    <HeadContext.Provider value={store}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HeadContext.Provider>,
  );
  const head = store.get();
  if (!head) throw new Error(`Seo 가 없는 페이지: ${url}`);
  return { html, head: renderHead(head) };
}

/**
 * 페이지별 <head> 값을 모은다.
 * 서버(prerender)에서는 렌더 중에 HeadStore 에 기록해 HTML 로 찍고, 브라우저에서는 document.title 만 갱신한다.
 */
import { createContext, useContext } from 'react';
import { SITE } from '@shared/config/site';

/** schema.org 객체 하나. @context 는 renderHead 가 붙인다. */
export type JsonLd = Record<string, unknown> & { '@type': string };

export interface HeadData {
  title: string;
  description?: string;
  /** 사이트 루트 기준 경로. '/privacy/' 처럼 슬래시로 시작하고 끝난다. */
  path: string;
  noindex?: boolean;
  /** 구조화 데이터. 객체마다 <script type="application/ld+json"> 하나. */
  jsonLd?: JsonLd[];
}

export interface HeadStore {
  set(h: HeadData): void;
  get(): HeadData | null;
}

/** prerender 가 렌더마다 하나씩 만든다. */
export function createHeadStore(): HeadStore {
  let current: HeadData | null = null;
  return { set: (h) => { current = h; }, get: () => current };
}

export const HeadContext = createContext<HeadStore | null>(null);

export function useHeadStore(): HeadStore | null {
  return useContext(HeadContext);
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function fullTitle(title: string): string {
  return title === SITE.name ? title : `${title} — ${SITE.name}`;
}

/** <script> 안에 넣으므로 '<' 만 유니코드로 바꾼다(JSON 으로는 같은 값). */
const jsonForScript = (o: unknown) => JSON.stringify(o).replace(/</g, '\\u003c');

/** prerender 가 index.html 의 <!--app-head--> 자리에 넣을 문자열. */
export function renderHead(h: HeadData): string {
  const canonical = `${SITE.url}${h.path}`;
  const desc = h.description ?? SITE.defaultDescription;
  const title = fullTitle(h.title);
  const image = `${SITE.url}${SITE.ogImage.path}`;
  const lines = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(desc)}" />`,
    `<link rel="canonical" href="${esc(canonical)}" />`,
    `<meta property="og:site_name" content="${esc(SITE.name)}" />`,
    `<meta property="og:locale" content="ko_KR" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(desc)}" />`,
    `<meta property="og:url" content="${esc(canonical)}" />`,
    `<meta property="og:image" content="${esc(image)}" />`,
    `<meta property="og:image:width" content="${SITE.ogImage.width}" />`,
    `<meta property="og:image:height" content="${SITE.ogImage.height}" />`,
    `<meta property="og:image:alt" content="${esc(SITE.name)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(desc)}" />`,
    `<meta name="twitter:image" content="${esc(image)}" />`,
  ];
  if (h.noindex) lines.push(`<meta name="robots" content="noindex" />`);
  for (const item of h.jsonLd ?? []) {
    lines.push(`<script type="application/ld+json">${jsonForScript({ '@context': 'https://schema.org', ...item })}</script>`);
  }
  return lines.join('\n    ');
}

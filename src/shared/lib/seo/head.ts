/**
 * 페이지별 <head> 값을 모은다.
 * 서버(prerender)에서는 렌더 중에 HeadStore 에 기록해 HTML 로 찍고, 브라우저에서는 document.title 만 갱신한다.
 */
import { createContext, useContext } from 'react';
import { SITE } from '@shared/config/site';

export interface HeadData {
  title: string;
  description?: string;
  /** 사이트 루트 기준 경로. '/privacy/' 처럼 슬래시로 시작하고 끝난다. */
  path: string;
  noindex?: boolean;
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

/** prerender 가 index.html 의 <!--app-head--> 자리에 넣을 문자열. */
export function renderHead(h: HeadData): string {
  const canonical = `${SITE.url}${h.path}`;
  const desc = h.description ?? SITE.defaultDescription;
  const lines = [
    `<title>${esc(fullTitle(h.title))}</title>`,
    `<meta name="description" content="${esc(desc)}" />`,
    `<link rel="canonical" href="${esc(canonical)}" />`,
    `<meta property="og:title" content="${esc(fullTitle(h.title))}" />`,
    `<meta property="og:description" content="${esc(desc)}" />`,
    `<meta property="og:url" content="${esc(canonical)}" />`,
    `<meta property="og:type" content="website" />`,
  ];
  if (h.noindex) lines.push(`<meta name="robots" content="noindex" />`);
  return lines.join('\n    ');
}

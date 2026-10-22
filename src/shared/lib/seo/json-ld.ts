/** 도메인을 모르는 schema.org 조립 도우미. 회사·앱 객체는 그 데이터를 아는 페이지가 만든다. */
import { SITE } from '@shared/config/site';
import type { JsonLd } from './head';

export interface BreadcrumbEntry { name: string; path?: string }

/** 홈을 1번으로 넣는다. 현재 페이지(마지막)는 path 가 없어도 된다. */
export function breadcrumbListJsonLd(items: BreadcrumbEntry[], currentPath: string): JsonLd {
  const all: BreadcrumbEntry[] = [{ name: '홈', path: '/' }, ...items];
  return {
    '@type': 'BreadcrumbList',
    itemListElement: all.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE.url}${c.path ?? currentPath}`,
    })),
  };
}

export interface FaqEntry { question: string; answer: string }

export function faqPageJsonLd(items: FaqEntry[]): JsonLd {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

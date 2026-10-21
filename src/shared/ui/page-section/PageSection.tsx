import type { ReactNode } from 'react';
import './PageSection.scss';

export type PageSectionTone = 'card' | 'emphasis';

export interface PageSectionProps {
  id?: string;
  title: string;
  /** card: 흰 카드(기본). emphasis: 흰 카드 + 초록 실선 테두리(강조할 절 하나에만 쓴다). */
  tone?: PageSectionTone;
  children: ReactNode;
}

/** 제목 하나와 본문으로 된 절. 제목은 민트 바탕 위에, 본문은 흰 카드 안에 둔다. */
export function PageSection({ id, title, tone = 'card', children }: PageSectionProps) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section className="page-section" id={id} aria-labelledby={headingId}>
      <div className="page-section-in">
        <h2 className="page-section-title" id={headingId}>{title}</h2>
        <div className={`page-section-card ${tone}`}>{children}</div>
      </div>
    </section>
  );
}

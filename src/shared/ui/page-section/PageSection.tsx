import type { ReactNode } from 'react';
import './PageSection.scss';

export interface PageSectionProps {
  id?: string;
  title: string;
  children: ReactNode;
}

/** 제목 하나와 본문으로 된 절. 본문 폭·여백을 통일한다. */
export function PageSection({ id, title, children }: PageSectionProps) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section className="page-section" id={id} aria-labelledby={headingId}>
      <div className="page-section-in">
        <h2 className="page-section-title" id={headingId}>{title}</h2>
        {children}
      </div>
    </section>
  );
}

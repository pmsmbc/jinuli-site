import type { ReactNode } from 'react';
import { KRDSBreadcrumb, type Crumb } from '@shared/ui/krds';
import './PageHeader.scss';

export interface PageHeaderProps {
  crumbs: Crumb[];
  /** 페이지 제목(h1). 한 페이지에 하나. */
  title: string;
  /** 제목 아래 한두 문장. */
  lead?: ReactNode;
}

/** 민트 바탕 위 브레드크럼 + 제목 + 요약. 본문 절(PageSection)이 그 아래 이어진다. */
export function PageHeader({ crumbs, title, lead }: PageHeaderProps) {
  return (
    <div className="page-header">
      <div className="page-header-in">
        <KRDSBreadcrumb items={crumbs} />
        <h1 className="page-header-title">{title}</h1>
        {lead && <p className="page-header-lead">{lead}</p>}
      </div>
    </div>
  );
}

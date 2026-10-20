/**
 * KRDS 텍스트 목록 래퍼. 검증된 클래스: krds-info-list + (decimal|dash|hollow|ordered)
 * 출처: node_modules/krds-uiux/html/code/text_list.html (krds-uiux 1.1.0)
 */
import type { ReactNode } from 'react';

export interface KRDSInfoListProps {
  marker?: 'decimal' | 'dash' | 'hollow';
  items: ReactNode[];
  className?: string;
}

export function KRDSInfoList({ marker = 'dash', items, className }: KRDSInfoListProps) {
  return (
    <ul className={['krds-info-list', marker, className].filter(Boolean).join(' ')}>
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  );
}

/**
 * KRDS 배지 래퍼. 검증된 클래스: krds-badge + bg-{tone} | bg-light-{tone} | outline-{tone}
 * tone: primary secondary gray point danger warning success information disabled
 * 출처: node_modules/krds-uiux/html/code/badge.html (krds-uiux 1.1.0)
 */
import type { ReactNode } from 'react';

export type BadgeTone = 'primary' | 'secondary' | 'gray' | 'point' | 'danger' | 'warning' | 'success' | 'information' | 'disabled';
export type BadgeStyle = 'bg' | 'bg-light' | 'outline';

export interface KRDSBadgeProps {
  tone?: BadgeTone;
  style?: BadgeStyle;
  children: ReactNode;
}

export function KRDSBadge({ tone = 'primary', style = 'bg-light', children }: KRDSBadgeProps) {
  return <span className={`krds-badge ${style}-${tone}`}>{children}</span>;
}

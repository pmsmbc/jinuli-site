/**
 * KRDS 브레드크럼 래퍼. 검증된 구조: nav.krds-breadcrumb-wrap > ol.breadcrumb > li(.home) > a.txt
 * 출처: node_modules/krds-uiux/html/code/breadcrumb.html (krds-uiux 1.1.0). id="breadcrumb" 는 건너뛰기 링크의 목적지다.
 */
import { Link } from 'react-router';

export interface Crumb { label: string; to?: string }

export function KRDSBreadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav className="krds-breadcrumb-wrap" aria-label="현재 경로" id="breadcrumb">
      <ol className="breadcrumb">
        <li className="home"><Link to="/" className="txt">홈</Link></li>
        {items.map((c, i) => (
          <li key={i}>
            {c.to ? <Link to={c.to} className="txt">{c.label}</Link> : <span className="txt" aria-current="page">{c.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

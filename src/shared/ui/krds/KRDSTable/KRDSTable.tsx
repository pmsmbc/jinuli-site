/**
 * KRDS 표 래퍼. 검증된 클래스: krds-table-wrap > table.tbl.col.data (+ caption, thead th[scope=col], tbody th[scope=row])
 * 출처: node_modules/krds-uiux/html/code/table.html (krds-uiux 1.1.0)
 * 좁은 화면에서는 krds-table-wrap 이 가로 스크롤을 맡는다.
 */
import type { ReactNode } from 'react';

export interface KRDSTableColumn {
  header: ReactNode;
  /** colgroup 의 너비. 예: '30%' */
  width?: string;
}

export interface KRDSTableProps {
  /** 표 설명(스크린리더용). 화면에는 KRDS 기본대로 보인다. */
  caption: string;
  columns: KRDSTableColumn[];
  /** 행마다 셀 배열. 첫 셀을 행 머리글(th scope=row)로 두려면 rowHeader 를 켠다. */
  rows: ReactNode[][];
  rowHeader?: boolean;
  className?: string;
}

export function KRDSTable({ caption, columns, rows, rowHeader = false, className }: KRDSTableProps) {
  return (
    <div className={['krds-table-wrap', className].filter(Boolean).join(' ')}>
      <table className="tbl col data">
        <caption>{caption}</caption>
        {columns.some((c) => c.width) && (
          <colgroup>
            {columns.map((c, i) => <col key={i} style={c.width ? { width: c.width } : undefined} />)}
          </colgroup>
        )}
        <thead>
          <tr>{columns.map((c, i) => <th key={i} scope="col">{c.header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((cells, r) => (
            <tr key={r}>
              {cells.map((cell, c) =>
                rowHeader && c === 0 ? <th key={c} scope="row">{cell}</th> : <td key={c}>{cell}</td>,
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

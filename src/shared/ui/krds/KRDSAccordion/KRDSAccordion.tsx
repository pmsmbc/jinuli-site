/**
 * KRDS 아코디언 래퍼. 검증된 구조: div.krds-accordion[.type-line] > div.accordion-item[.active]
 *   > hN.accordion-header > button.btn-accordion[.active][aria-controls]
 *   + div.accordion-collapse.collapse[aria-labelledby] > div.accordion-body
 * 출처: node_modules/krds-uiux/html/code/accordion.html, accordion_line.html (krds-uiux 1.1.0).
 * 열림 상태는 KRDS JS 대신 React 가 .active 를 붙여 관리한다. 항목은 여러 개를 동시에 열 수 있다.
 * id 는 서버·브라우저가 같은 값을 내야 하므로(hydration) idPrefix 를 받아 만든다.
 */
import { useState, type ReactNode } from 'react';

export interface KRDSAccordionItem { title: string; content: ReactNode }

interface Props {
  idPrefix: string;
  items: KRDSAccordionItem[];
  /** 제목 요소. 절 제목이 h2 이면 h3 (기본). */
  heading?: 'h3' | 'h4' | 'h5';
  /** 선으로만 나누는 type-line 변형 */
  line?: boolean;
}

export function KRDSAccordion({ idPrefix, items, heading: Heading = 'h3', line = false }: Props) {
  const [open, setOpen] = useState<Set<number>>(() => new Set());
  const toggle = (i: number) =>
    setOpen((prev) => { const next = new Set(prev); if (next.has(i)) next.delete(i); else next.add(i); return next; });

  return (
    <div className={line ? 'krds-accordion type-line' : 'krds-accordion'}>
      {items.map((item, i) => {
        const isOpen = open.has(i);
        const headerId = `${idPrefix}-header-${i}`;
        const panelId = `${idPrefix}-panel-${i}`;
        return (
          <div key={i} className={isOpen ? 'accordion-item active' : 'accordion-item'}>
            <Heading className="accordion-header">
              <button
                type="button"
                id={headerId}
                className={isOpen ? 'btn-accordion active' : 'btn-accordion'}
                aria-controls={panelId}
                aria-expanded={isOpen}
                onClick={() => toggle(i)}
              >
                {item.title}
              </button>
            </Heading>
            <div id={panelId} className="accordion-collapse collapse" role="region" aria-labelledby={headerId}>
              <div className="accordion-body">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

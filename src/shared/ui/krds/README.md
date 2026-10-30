# KRDS 래퍼

`krds-uiux` 는 React 컴포넌트가 아니라 CSS 한 장(`resources/cdn/krds.min.css`)이다. 화면 코드는 `krds-*` 클래스를 직접 쓰지 않고 이 폴더의 래퍼만 쓴다. 배럴 `index.ts` 에서 import 한다.

| 래퍼 | 쓰는 클래스 | 샘플 마크업 |
|---|---|---|
| `KRDSButton` | `krds-btn` + 크기(xsmall~xlarge) + 종류(primary/secondary/tertiary/text/link) | `html/code/button*.html`, `link.html` |
| `KRDSBadge` | `krds-badge` + `bg-*` / `bg-light-*` / `outline-*` | `html/code/badge.html` |
| `KRDSInfoList` | `krds-info-list` + decimal/dash/hollow | `html/code/text_list.html` |
| `KRDSBreadcrumb` | `krds-breadcrumb-wrap > ol.breadcrumb` | `html/code/breadcrumb.html` |
| `KRDSSkipLink` | `#krds-skip-link` | `html/code/skip_link.html` |
| `KRDSTable` | `krds-table-wrap > table.tbl.col.data` + caption/colgroup/thead/tbody | `html/code/table.html` |
| `KRDSAccordion` | `krds-accordion[.type-line] > .accordion-item > .accordion-header > .btn-accordion` + `.accordion-collapse > .accordion-body` (열림은 React 가 `.active`) | `html/code/accordion.html`, `accordion_line.html` |

헤더·푸터(`#krds-header`, `#krds-footer`)는 사이트에 하나뿐이라 래퍼 대신 `widgets/site-header`, `widgets/site-footer` 가 샘플 구조를 그대로 따른다.

새 클래스를 쓰기 전에 반드시 `node_modules/krds-uiux/html/code/` 의 샘플을 열어 구조를 확인한다. 없는 이름은 쓰지 않는다. 기본값을 바꿔야 하면 `krds-overrides.scss` 에 이유와 함께 쓴다.

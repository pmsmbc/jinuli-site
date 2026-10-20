/**
 * 건너뛰기 링크. 검증된 구조: div#krds-skip-link > a
 * 출처: node_modules/krds-uiux/html/code/skip_link.html (krds-uiux 1.1.0)
 */
export function KRDSSkipLink({ target = '#main' }: { target?: string }) {
  return (
    <div id="krds-skip-link">
      <a href={target}>본문 바로가기</a>
    </div>
  );
}

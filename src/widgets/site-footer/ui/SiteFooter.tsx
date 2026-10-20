/**
 * 사이트 푸터. 구조는 node_modules/krds-uiux/html/code/footer.html (1.1.0):
 * footer#krds-footer > .inner > .f-cnt(.f-info) + .f-btm(.f-btm-text > .f-menu + .f-copy)
 * 정부 식별자(.krds-identifier)·SNS·관련 사이트는 넣지 않는다.
 */
import { Link } from 'react-router';
import { COMPANY } from '@entities/company';
import './SiteFooter.scss';

export function SiteFooter() {
  return (
    <footer id="krds-footer">
      <div className="inner">
        <div className="f-cnt">
          <div className="f-info">
            <p className="info-addr">{COMPANY.name} ({COMPANY.nameEn}) · 사업자등록번호 {COMPANY.businessNumber}</p>
            <ul className="info-cs">
              <li><strong className="strong">문의 <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></strong></li>
            </ul>
          </div>
        </div>
        <div className="f-btm">
          <div className="f-btm-text">
            <div className="f-menu">
              <Link to="/privacy/" className="point">개인정보처리방침</Link>
              <Link to="/#company">회사</Link>
            </div>
            <p className="f-copy">© {COMPANY.foundedYear} {COMPANY.name}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

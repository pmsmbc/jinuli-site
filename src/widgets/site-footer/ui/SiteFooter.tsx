/**
 * 사이트 푸터. 구조는 node_modules/krds-uiux/html/code/footer.html (1.1.0) 을 그대로 따른다:
 * footer#krds-footer > .inner > .f-logo + .f-cnt(.f-info + .f-link > .link-go) + .f-btm(.f-btm-text > .f-menu + .f-copy)
 * 정부 식별자(.krds-identifier)·관련 사이트(.foot-quick)·SNS(.link-sns)는 이 사이트에 없어 넣지 않는다.
 * 로고는 헤더와 같은 public/logo.svg (교체 CSS 는 SiteFooter.scss).
 */
import { Link } from 'react-router';
import { COMPANY } from '@entities/company';
import { KRDSButton } from '@shared/ui/krds';
import './SiteFooter.scss';

export function SiteFooter() {
  return (
    <footer id="krds-footer">
      <div className="inner">
        <div className="f-logo">
          <span className="sr-only">{COMPANY.name}</span>
        </div>
        <div className="f-cnt">
          <div className="f-info">
            <p className="info-addr">{COMPANY.name} ({COMPANY.nameEn}) · 사업자등록번호 {COMPANY.businessNumber}</p>
            <ul className="info-cs">
              <li><strong className="strong">문의 {COMPANY.email}</strong><span className="span">(이메일, 영업일 기준 3일 안에 답장)</span></li>
            </ul>
          </div>
          <div className="f-link">
            <div className="link-go">
              <KRDSButton href={`mailto:${COMPANY.email}`} variant="text" size="medium">
                이메일 보내기 <i className="svg-icon ico-angle right" aria-hidden="true"></i>
              </KRDSButton>
              <KRDSButton to="/hanja/" variant="text" size="medium">
                급수별 한자 <i className="svg-icon ico-angle right" aria-hidden="true"></i>
              </KRDSButton>
            </div>
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

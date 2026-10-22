/** 모바일(767px 이하)에서 화면 아래에 고정되는 문의 버튼. PC 에서는 안 보인다(스타일로 숨김). */
import { COMPANY } from '@entities/company';
import { KRDSButton } from '@shared/ui/krds';
import './MobileCta.scss';

export function MobileCta() {
  return (
    <div className="mobile-cta">
      <KRDSButton href={`mailto:${COMPANY.email}`} variant="primary" size="large" className="mobile-cta-btn">
        이메일로 문의하기
      </KRDSButton>
    </div>
  );
}

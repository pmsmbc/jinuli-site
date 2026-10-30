import { KRDSButton } from '@shared/ui/krds';
import './NotFoundNotice.scss';

/** 없는 주소 안내. 404 페이지와 slug 가 틀린 방침 페이지가 같이 쓴다. */
export function NotFoundNotice() {
  return (
    <div className="not-found">
      <h1 className="not-found-title">이 주소에는 페이지가 없어요</h1>
      <p className="not-found-lead">주소가 바뀌었거나 잘못 입력됐을 수 있어요.</p>
      <p className="not-found-actions">
        <KRDSButton to="/" variant="primary" size="large">첫 페이지로 가기</KRDSButton>
        <KRDSButton to="/privacy/" variant="tertiary" size="large">개인정보처리방침 목록</KRDSButton>
      </p>
    </div>
  );
}

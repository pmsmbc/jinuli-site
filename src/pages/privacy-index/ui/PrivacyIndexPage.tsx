import { COMPANY } from '@entities/company';
import { PRIVACY_POLICIES } from '@entities/privacy-policy';
import { Seo } from '@shared/lib/seo';
import { KRDSBreadcrumb, KRDSButton } from '@shared/ui/krds';
import '@shared/ui/policy-article';

export function PrivacyIndexPage() {
  return (
    <>
      <Seo title="개인정보처리방침" path="/privacy/" description="지누리컴퍼니 웹사이트와 앱의 개인정보처리방침 목록." />
      <div className="policy-wrap">
        <KRDSBreadcrumb items={[{ label: '개인정보처리방침' }]} />
        <article className="policy">
          <h2 className="policy-title">개인정보처리방침</h2>
          <p className="policy-meta">앱마다 방침을 따로 둡니다. 해당 앱의 방침을 열어 보세요.</p>

          <section>
            <h3>앱</h3>
            <ul className="policy-list">
              {PRIVACY_POLICIES.map((p) => (
                <li key={p.appSlug}>
                  <KRDSButton to={`/privacy/${p.appSlug}/`} variant="link" size="large">
                    <span className="underline">{p.appName} 개인정보처리방침</span>
                  </KRDSButton>
                  <span className="policy-list-date">시행일 {p.effectiveDate}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3>이 웹사이트</h3>
            <p>jinuli.com은 정적인 안내 페이지로, 방문자의 개인정보를 수집하지 않습니다. 회원 가입, 쿠키, 방문 분석 도구를 쓰지 않습니다. 이메일로 보내 주신 문의 내용은 답변 목적으로만 사용하고, 답변이 끝난 뒤 1년 안에 지웁니다.</p>
            <p>문의: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></p>
          </section>
        </article>
      </div>
    </>
  );
}

import { COMPANY } from '@entities/company';
import { PRIVACY_POLICIES, SITE_PRIVACY_POLICY } from '@entities/privacy-policy';
import { SERVICES } from '@entities/service';
import { Seo, breadcrumbListJsonLd } from '@shared/lib/seo';
import { KRDSBreadcrumb, KRDSButton } from '@shared/ui/krds';
import '@shared/ui/policy-article';

/** 자체 사이트에 방침을 둔 웹 서비스. 방침 주소가 확인된 것만 싣는다(entities/service 의 privacy.href). */
const EXTERNAL = SERVICES.filter((s) => s.kind === 'web' && s.privacy && 'href' in s.privacy);

export function PrivacyIndexPage() {
  return (
    <>
      <Seo
        title="개인정보처리방침"
        path="/privacy/"
        description="지누리컴퍼니 웹사이트와 앱, 운영하는 웹 서비스의 개인정보처리방침 목록."
        jsonLd={[breadcrumbListJsonLd([{ name: '개인정보처리방침' }], '/privacy/')]}
      />
      <div className="policy-wrap">
        <KRDSBreadcrumb items={[{ label: '개인정보처리방침' }]} />
        <article className="policy">
          <h2 className="policy-title">개인정보처리방침</h2>
          <p className="policy-meta">앱과 웹 서비스마다 방침을 따로 두고, 이 웹사이트의 방침은 별도로 둡니다. 해당 방침을 열어 보세요.</p>
          <div className="policy-body">
            <section>
              <h3>앱</h3>
              <ul className="policy-list">
                {PRIVACY_POLICIES.map((p) => (
                  <li key={p.appSlug}>
                    <KRDSButton to={`/privacy/${p.appSlug}/`} variant="secondary" size="large">{p.appName} 개인정보처리방침</KRDSButton>
                    <span className="policy-list-date">시행일 {p.effectiveDate}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3>웹 서비스</h3>
              <p>각 서비스는 자체 사이트에 방침을 둡니다. 아래 버튼을 누르면 그 사이트로 이동합니다.</p>
              <ul className="policy-list">
                {EXTERNAL.map((s) => (
                  <li key={s.slug}>
                    <KRDSButton href={(s.privacy as { href: string }).href} variant="secondary" size="large">
                      {s.name} 개인정보처리방침 <i className="svg-icon ico-angle right" aria-hidden="true"></i>
                    </KRDSButton>
                    <span className="policy-list-date">{s.url?.replace('https://', '').replace(/\/$/, '')}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3>이 웹사이트</h3>
              <p>jinuli.com은 회원 가입이나 문의 폼 없이 운영하는 안내 사이트입니다. 방문 통계를 위해 구글 애널리틱스를 쓰며, 수집 항목과 거부 방법은 웹사이트 방침에 있습니다.</p>
              <ul className="policy-list">
                <li>
                  <KRDSButton to="/privacy/site/" variant="secondary" size="large">{SITE_PRIVACY_POLICY.name} 개인정보처리방침</KRDSButton>
                  <span className="policy-list-date">시행일 {SITE_PRIVACY_POLICY.effectiveDate}</span>
                </li>
              </ul>
              <p>문의: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></p>
            </section>
          </div>
        </article>
      </div>
    </>
  );
}

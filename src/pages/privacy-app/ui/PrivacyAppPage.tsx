import { useParams } from 'react-router';
import { COMPANY } from '@entities/company';
import { findPolicy, splitLinks } from '@entities/privacy-policy';
import { Seo } from '@shared/lib/seo';
import { KRDSBreadcrumb } from '@shared/ui/krds';
import { NotFoundNotice } from '@widgets/not-found-notice';
import '@shared/ui/policy-article';

export function PrivacyAppPage() {
  const { slug = '' } = useParams();
  const policy = findPolicy(slug);
  if (!policy) {
    return (
      <>
        <Seo title="페이지를 찾을 수 없어요" path="/404.html" noindex />
        <NotFoundNotice />
      </>
    );
  }

  return (
    <>
      <Seo
        title={`${policy.appName} 개인정보처리방침`}
        path={`/privacy/${policy.appSlug}/`}
        description={`${COMPANY.name}가 만든 앱 '${policy.appName}'의 개인정보처리방침. ${policy.summary}`}
      />
      <div className="policy-wrap">
        <KRDSBreadcrumb items={[{ label: '개인정보처리방침', to: '/privacy/' }, { label: policy.appName }]} />
        <article className="policy">
          <h2 className="policy-title">{policy.appName} 개인정보처리방침</h2>
          <p className="policy-meta">시행일 {policy.effectiveDate} · 개발사 {COMPANY.name}</p>
          <p className="policy-summary">{policy.summary}</p>

          {policy.sections.map((s) => (
            <section key={s.title}>
              <h3>{s.title}</h3>
              {s.body.map((para, i) => (
                <p key={i}>
                  {splitLinks(para).map((part, j) =>
                    part.type === 'link' ? <a key={j} href={part.value}>{part.value}</a> : <span key={j}>{part.value}</span>,
                  )}
                </p>
              ))}
            </section>
          ))}
        </article>
      </div>
    </>
  );
}

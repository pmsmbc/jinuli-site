import { useParams } from 'react-router';
import { COMPANY } from '@entities/company';
import { findPolicy } from '@entities/privacy-policy';
import { Seo, breadcrumbListJsonLd } from '@shared/lib/seo';
import { NotFoundNotice } from '@widgets/not-found-notice';
import { PolicyArticle } from '@widgets/policy-article';

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

  const path = `/privacy/${policy.appSlug}/`;
  return (
    <>
      <Seo
        title={`${policy.appName} 개인정보처리방침`}
        path={path}
        description={`${COMPANY.name}가 만든 앱 '${policy.appName}'의 개인정보처리방침. ${policy.summary}`}
        jsonLd={[breadcrumbListJsonLd([{ name: '개인정보처리방침', path: '/privacy/' }, { name: policy.appName }], path)]}
      />
      <PolicyArticle
        crumbs={[{ label: '개인정보처리방침', to: '/privacy/' }, { label: policy.appName }]}
        title={`${policy.appName} 개인정보처리방침`}
        meta={`시행일 ${policy.effectiveDate} · 개발사 ${COMPANY.name}`}
        summary={policy.summary}
        sections={policy.sections}
      />
    </>
  );
}

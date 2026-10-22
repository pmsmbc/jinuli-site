import { COMPANY } from '@entities/company';
import { SITE_PRIVACY_POLICY as P } from '@entities/privacy-policy';
import { Seo, breadcrumbListJsonLd } from '@shared/lib/seo';
import { PolicyArticle } from '@widgets/policy-article';

const PATH = '/privacy/site/';

export function PrivacySitePage() {
  return (
    <>
      <Seo
        title={`${P.name} 개인정보처리방침`}
        path={PATH}
        description={`${COMPANY.name} 웹사이트 jinuli.com 의 개인정보처리방침. ${P.summary}`}
        jsonLd={[breadcrumbListJsonLd([{ name: '개인정보처리방침', path: '/privacy/' }, { name: P.name }], PATH)]}
      />
      <PolicyArticle
        crumbs={[{ label: '개인정보처리방침', to: '/privacy/' }, { label: P.name }]}
        title={`${P.name} 개인정보처리방침`}
        meta={`시행일 ${P.effectiveDate} · 운영 ${COMPANY.name}`}
        summary={P.summary}
        sections={P.sections}
      />
    </>
  );
}

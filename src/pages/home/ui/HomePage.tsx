import { COMPANY } from '@entities/company';
import { FAQ } from '@entities/faq';
import { SERVICES } from '@entities/service';
import { Seo, faqPageJsonLd, type JsonLd } from '@shared/lib/seo';
import { SITE } from '@shared/config/site';
import { PageSection } from '@shared/ui';
import { KRDSButton } from '@shared/ui/krds';
import { Faq } from '@widgets/faq';
import { ServiceMark, ServiceShowcase } from '@widgets/service-showcase';
import './HomePage.scss';

const ORG_ID = `${SITE.url}/#organization`;

/** 첫 화면의 구조화 데이터: 회사, 이 사이트, 서비스(웹은 WebSite·앱은 SoftwareApplication), FAQ. 값은 모두 entities 에서 온다. */
const HOME_JSON_LD: JsonLd[] = [
  {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: COMPANY.name,
    alternateName: COMPANY.nameEn,
    url: `${SITE.url}/`,
    logo: `${SITE.url}/logo.svg`,
    email: COMPANY.email,
    foundingDate: String(COMPANY.foundedYear),
    contactPoint: { '@type': 'ContactPoint', email: COMPANY.email, contactType: 'customer support', availableLanguage: 'ko' },
  },
  { '@type': 'WebSite', url: `${SITE.url}/`, name: SITE.name, inLanguage: 'ko', publisher: { '@id': ORG_ID } },
  ...SERVICES.map<JsonLd>((s) =>
    s.kind === 'web'
      ? { '@type': 'WebSite', url: s.url, name: s.name, description: s.summary, publisher: { '@id': ORG_ID } }
      : {
          '@type': 'SoftwareApplication',
          name: s.name,
          applicationCategory: 'EducationalApplication',
          operatingSystem: s.platforms.replace('안드로이드', 'Android').replace(' · ', ', '),
          description: s.summary,
          url: `${SITE.url}/#services`,
          author: { '@id': ORG_ID },
        },
  ),
  faqPageJsonLd(FAQ.map((f) => ({ question: f.question, answer: f.answer }))),
];

export function HomePage() {
  return (
    <>
      <Seo title={SITE.name} path="/" description={SITE.defaultDescription} jsonLd={HOME_JSON_LD} />

      <section className="home-hero" aria-labelledby="hero-title">
        <div className="home-hero-in">
          <div>
            <h2 id="hero-title" className="home-hero-title">가입 없이 바로 쓰는<br />앱과 웹 서비스를<br />만듭니다.</h2>
            <p className="home-hero-lead">{COMPANY.name}는 회원 가입 없이 바로 쓰는 서비스를 직접 만들고 운영하는 작은 회사입니다. 지금은 초등학생 한자 급수 시험 학습 앱 "대한 어린이 한자"를 준비하고 있습니다.</p>
            <p className="home-hero-actions">
              <KRDSButton to="/#services" variant="primary" size="large">만드는 서비스 보기</KRDSButton>
              <KRDSButton to="/#contact" variant="secondary" size="large">문의하기</KRDSButton>
            </p>
          </div>
          <ul className="home-hero-marks" aria-label="서비스 마크">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <ServiceMark service={s} size="large" />
                <span className="home-hero-mark-name">{s.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PageSection id="services" title="만드는 서비스" tone="emphasis">
        {SERVICES.map((s) => <ServiceShowcase key={s.slug} service={s} />)}
      </PageSection>

      <PageSection id="company" title="회사">
        <dl className="home-info">
          <dt>상호</dt><dd>{COMPANY.name} ({COMPANY.nameEn})</dd>
          <dt>하는 일</dt><dd>{COMPANY.description}</dd>
          <dt>사업자등록번호</dt><dd>{COMPANY.businessNumber}</dd>
          <dt>웹사이트</dt><dd><a href={`${SITE.url}/`}>{SITE.url.replace('https://', '')}</a></dd>
        </dl>
      </PageSection>

      <PageSection id="faq" title="자주 묻는 질문">
        <Faq />
      </PageSection>

      <PageSection id="contact" title="문의">
        <p>서비스 이용, 개인정보, 제휴에 관한 문의는 이메일로 보내 주세요. 보통 영업일 기준 3일 안에 답장합니다.</p>
        <p className="home-contact">
          <KRDSButton href={`mailto:${COMPANY.email}`} variant="secondary" size="large">{COMPANY.email}</KRDSButton>
        </p>
      </PageSection>
    </>
  );
}

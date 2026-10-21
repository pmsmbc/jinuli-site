import { APPS } from '@entities/app';
import { COMPANY } from '@entities/company';
import { Seo } from '@shared/lib/seo';
import { SITE } from '@shared/config/site';
import { PageSection } from '@shared/ui';
import { KRDSButton } from '@shared/ui/krds';
import { AppShowcase } from '@widgets/app-showcase';
import { HanjaCard } from '@widgets/hanja-card';
import './HomePage.scss';

export function HomePage() {
  return (
    <>
      <Seo title={SITE.name} path="/" description={SITE.defaultDescription} />

      <section className="home-hero" aria-labelledby="hero-title">
        <div className="home-hero-in">
          <div>
            <h2 id="hero-title" className="home-hero-title">아이가 혼자서도<br />끝까지 풀 수 있는<br />학습 앱을 만듭니다.</h2>
            <p className="home-hero-lead">{COMPANY.name}는 어린이용 모바일 학습 앱을 만드는 작은 회사입니다. 광고 없이, 계정 없이, 기기 안에서만 동작하는 앱을 만듭니다.</p>
            <p className="home-hero-actions">
              <KRDSButton to="/#apps" variant="primary" size="large">만드는 앱 보기</KRDSButton>
              <KRDSButton to="/#contact" variant="secondary" size="large">문의하기</KRDSButton>
            </p>
          </div>
          <HanjaCard glyph="學" reading="배울 학" grade="8급" seal="지누리" />
        </div>
      </section>

      <PageSection id="apps" title="만드는 앱" tone="dashed">
        {APPS.map((app) => <AppShowcase key={app.slug} app={app} />)}
      </PageSection>

      <PageSection id="company" title="회사">
        <dl className="home-info">
          <dt>상호</dt><dd>{COMPANY.name} ({COMPANY.nameEn})</dd>
          <dt>하는 일</dt><dd>{COMPANY.description}</dd>
          <dt>사업자등록번호</dt><dd>{COMPANY.businessNumber}</dd>
          <dt>웹사이트</dt><dd><a href={`${SITE.url}/`}>{SITE.url.replace('https://', '')}</a></dd>
        </dl>
      </PageSection>

      <PageSection id="contact" title="문의">
        <p>앱 이용, 개인정보, 제휴에 관한 문의는 이메일로 보내 주세요. 보통 영업일 기준 3일 안에 답장합니다.</p>
        <p className="home-contact">
          <KRDSButton href={`mailto:${COMPANY.email}`} variant="secondary" size="large">{COMPANY.email}</KRDSButton>
        </p>
      </PageSection>
    </>
  );
}

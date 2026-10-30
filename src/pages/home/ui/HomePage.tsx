import { COMPANY } from '@entities/company';
import { FAQ } from '@entities/faq';
import { LEVELS } from '@entities/hanja';
import { DAEHAN_KIDS_HANJA_PRICING as P, findService } from '@entities/service';
import { Seo, faqPageJsonLd, type JsonLd } from '@shared/lib/seo';
import { SITE } from '@shared/config/site';
import { PageSection } from '@shared/ui';
import { KRDSButton } from '@shared/ui/krds';
import { Faq } from '@widgets/faq';
import { LevelFormatTable } from '@widgets/level-format-table';
import { ServiceMark, ServiceShowcase } from '@widgets/service-showcase';
import './HomePage.scss';

const ORG_ID = `${SITE.url}/#organization`;
const APP = findService('daehan-kids-hanja')!;

/** 앱 화면 4장. 원본은 앱 리포 설계/스토어/스크린샷(1080×1920), 540px 로 줄여 public/screens 에 둔다. */
const SCREENS = [
  { src: '/screens/home.png', caption: '홈 — 급수를 고르고 바로 시작' },
  { src: '/screens/study.png', caption: '한자 공부 — 급수별 한자 목록과 훈음' },
  { src: '/screens/exam.png', caption: '모의고사 — 실제 시험과 같은 문항 수·제한 시간' },
  { src: '/screens/review.png', caption: '해설 — 틀린 문제만 골라 보기' },
];

const TOTAL_QUESTIONS = LEVELS.reduce((n, l) => n + l.questionBank, 0);

/** 첫 화면의 구조화 데이터: 회사, 이 사이트, 앱(MobileApplication, 무료 + 일회성 결제), FAQ. 값은 모두 entities 에서 온다. */
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
  {
    '@type': 'MobileApplication',
    name: APP.name,
    applicationCategory: 'EducationalApplication',
    applicationSubCategory: '한자 급수 시험 학습',
    operatingSystem: 'Android, iOS',
    inLanguage: 'ko',
    description: APP.summary,
    image: `${SITE.url}${APP.icon}`,
    url: `${SITE.url}/#app`,
    ...(APP.url ? { installUrl: APP.url } : {}),
    isAccessibleForFree: true,
    offers: [
      { '@type': 'Offer', price: '0', priceCurrency: 'KRW', description: `${P.freeLevel} 전체와 다른 급수의 ${P.freeInPaidLevels}` },
      { '@type': 'Offer', name: P.unlockName, price: String(P.unlockPriceKrw), priceCurrency: 'KRW', description: '7급·6급·준5급 전체, 일회성 결제' },
    ],
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
  },
  faqPageJsonLd(FAQ.map((f) => ({ question: f.question, answer: f.answer }))),
];

export function HomePage() {
  return (
    <>
      <Seo title="대한 어린이 한자, 초등 한자 급수 시험 학습 앱" path="/" description={SITE.defaultDescription} jsonLd={HOME_JSON_LD} />

      <section className="home-hero" aria-labelledby="hero-title">
        <div className="home-hero-in">
          <div>
            <h1 id="hero-title" className="home-hero-title">초등학생 한자 급수 시험,<br />앱 하나로 준비하는<br />대한 어린이 한자</h1>
            <p className="home-hero-lead">
              대한검정회 한자급수자격검정 8급·7급·6급·준5급을 준비하는 초등학생을 위한 학습 앱입니다. 급수별 한자를 플래시카드로 외우고, 실제 시험과 같은 문항 수와 제한 시간으로 모의고사 40회를 풉니다. 광고 없음, 회원 가입 없음, {P.freeLevel} 무료.
            </p>
            <p className="home-hero-actions">
              {APP.url ? (
                <KRDSButton href={APP.url} variant="primary" size="large">앱 설치하기</KRDSButton>
              ) : (
                <KRDSButton to="/#app" variant="primary" size="large">앱 자세히 보기</KRDSButton>
              )}
              <KRDSButton to="/hanja/" variant="secondary" size="large">급수별 한자 보기</KRDSButton>
            </p>
          </div>
          <div className="home-hero-mark">
            <ServiceMark service={APP} size="large" />
            <span className="home-hero-mark-name">{APP.name}</span>
          </div>
        </div>
      </section>

      <PageSection id="app" title="앱 소개" tone="emphasis">
        <ServiceShowcase service={APP} />
        <p className="home-note">대한 어린이 한자는 대한검정회 한자급수자격검정을 준비하기 위한 비공식 학습 앱이며, 대한검정회와 관련이 없습니다. 문항은 자체 제작했습니다.</p>
      </PageSection>

      <PageSection id="screens" title="앱 화면">
        <ul className="home-screens">
          {SCREENS.map((s) => (
            <li key={s.src}>
              <figure>
                <img src={s.src} alt={`${APP.name} ${s.caption}`} width={540} height={960} loading="lazy" />
                <figcaption>{s.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection id="levels" title="급수별 분량과 시험 형식">
        <p>
          급수마다 한자가 누적되고 문항 수와 시간이 늘어납니다. 앱에는 급수별 모의고사 10회(모두 40회)와 문항 {TOTAL_QUESTIONS.toLocaleString('ko-KR')}개가 들어 있습니다. 급수 이름을 누르면 그 급수의 배정 한자 전체를 볼 수 있습니다.
        </p>
        <LevelFormatTable linkLevels />
        <p className="home-note">
          앱 문항 수: {LEVELS.map((l) => `${l.name} ${l.questionBank.toLocaleString('ko-KR')}개`).join(' · ')}. 2026년 일부 급수 시험 시간이 바뀐다는 안내가 있으니 접수 전 공식 시간표를 확인하세요.
        </p>
      </PageSection>

      <PageSection id="price" title="무료와 유료">
        <dl className="home-info">
          <dt>{P.freeLevel}</dt><dd>한자 공부, 플래시카드, 유형별 연습, 모의고사 10회 모두 무료</dd>
          <dt>7급·6급·준5급</dt><dd>{P.freeInPaidLevels} 무료. 나머지 플래시카드·유형별 연습·모의고사 2~10회는 아래 결제로 열림</dd>
          <dt>{P.unlockName}</dt><dd>{P.unlockPriceKrw.toLocaleString('ko-KR')}원 한 번 결제(구독 아님). 7급·6급·준5급이 모두 열림. 결제 전 보호자 확인({P.parentalGate})</dd>
          <dt>그 밖에</dt><dd>광고 없음, 회원 가입·로그인 없음, 개인정보 수집 없음. 인터넷 없이 공부할 수 있음(결제·구매 확인에만 사용)</dd>
        </dl>
      </PageSection>

      <PageSection id="faq" title="자주 묻는 질문">
        <Faq />
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

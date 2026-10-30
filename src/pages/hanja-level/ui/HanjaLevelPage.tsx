import { useParams } from 'react-router';
import { MOCK_EXAMS_PER_LEVEL, findLevel, hanjaOfLevel, lowerLevels, nextLevel } from '@entities/hanja';
import { Seo, breadcrumbListJsonLd } from '@shared/lib/seo';
import { PageHeader, PageSection } from '@shared/ui';
import { KRDSButton } from '@shared/ui/krds';
import { AppCta } from '@widgets/app-cta';
import { HanjaInline, HanjaTable } from '@widgets/hanja-table';
import { LevelFormatTable } from '@widgets/level-format-table';
import { NotFoundNotice } from '@widgets/not-found-notice';
import '@shared/ui/hanja-page';

export function HanjaLevelPage() {
  const { level: id = '' } = useParams();
  const level = findLevel(id);
  if (!level) {
    return (
      <>
        <Seo title="페이지를 찾을 수 없어요" path="/404.html" noindex />
        <NotFoundNotice />
      </>
    );
  }

  const path = `/hanja/${level.id}/`;
  const fresh = hanjaOfLevel(level.id);
  const lower = lowerLevels(level.id);
  const next = nextLevel(level.id);
  const chars = fresh.map((h) => h.char).join('');

  return (
    <>
      <Seo
        title={`한자 ${level.name} 배정 한자 ${level.hanjaTotal}자와 시험 형식 (${level.questionCount}문항 ${level.timeLimitMin}분)`}
        path={path}
        description={`대한검정회 한자급수자격검정 ${level.name} 배정 한자 ${level.hanjaTotal}자 중 새로 배우는 ${level.newCount}자(${chars})의 훈·음, 획수, 뜻, 낱말. 시험은 ${level.questionCount}문항 ${level.timeLimitMin}분, ${level.passScore}점 이상 합격.`}
        jsonLd={[breadcrumbListJsonLd([{ name: '급수별 한자', path: '/hanja/' }, { name: `${level.name} 배정 한자` }], path)]}
      />
      <PageHeader
        crumbs={[{ label: '급수별 한자', to: '/hanja/' }, { label: `${level.name} 배정 한자` }]}
        title={`한자 ${level.name} 배정 한자 ${level.hanjaTotal}자, 시험은 ${level.questionCount}문항 ${level.timeLimitMin}분`}
        lead={
          lower.length === 0
            ? `${level.name}은 한자 급수 시험의 첫 단계입니다. 한자 ${level.hanjaTotal}자를 외우면 됩니다. 시험은 ${level.questionCount}문항을 ${level.timeLimitMin}분 안에 풀고, ${level.passScore}점(${level.minCorrect}문항) 이상이면 합격입니다.`
            : `${level.name}은 ${lower.map((l) => l.name).join('·')} 한자 ${lower[lower.length - 1].hanjaTotal}자에 새로 ${level.newCount}자를 더해 모두 ${level.hanjaTotal}자 범위입니다. 시험은 ${level.questionCount}문항을 ${level.timeLimitMin}분 안에 풀고, ${level.passScore}점(${level.minCorrect}문항) 이상이면 합격입니다.`
        }
      />

      <PageSection id="new" title={`${level.name}에서 새로 배우는 한자 ${level.newCount}자`} tone="emphasis">
        <HanjaTable items={fresh} caption={`${level.name} 신출 한자 ${level.newCount}자의 훈·음, 획수, 뜻, 갈래, 낱말`} />
        <p className="hanja-note">음(소리) 가나다순입니다. 낱말은 대한 어린이 한자 앱에서 이 한자로 익히는 낱말입니다.</p>
      </PageSection>

      {lower.length > 0 && (
        <PageSection id="lower" title={`아래 급수에서 이어지는 한자 ${lower[lower.length - 1].hanjaTotal}자`}>
          <p>{level.name} 시험에는 아래 급수 한자도 그대로 나옵니다. 급수 이름을 누르면 그 급수의 표로 갑니다.</p>
          {lower.map((l) => (
            <section key={l.id} className="lower-level">
              <h3 className="lower-level-title">
                <KRDSButton to={`/hanja/${l.id}/`} variant="text" size="medium">
                  {l.name} 한자 {l.newCount}자 <i className="svg-icon ico-angle right" aria-hidden="true"></i>
                </KRDSButton>
              </h3>
              <HanjaInline items={hanjaOfLevel(l.id)} />
            </section>
          ))}
        </PageSection>
      )}

      <PageSection id="format" title={`${level.name} 시험 형식`}>
        <LevelFormatTable levels={[level]} />
        <p className="hanja-note">
          문항당 {level.pointsPerQuestion}점, {level.questionCount}문항 중 {level.minCorrect}문항을 맞히면 {level.minCorrect * level.pointsPerQuestion}점으로 합격입니다.
          {next ? ` 다음 급수는 ${next.name}(한자 ${next.hanjaTotal}자)입니다.` : ' 준5급 다음은 5급입니다(앱은 준5급까지 다룹니다).'} 2026년 일부 급수 시험 시간이 바뀐다는 안내가 있으니 접수 전 공식 시간표를 확인하세요.
        </p>
        <p className="level-nav">
          <KRDSButton to="/hanja/" variant="tertiary" size="medium">급수 전체 보기</KRDSButton>
          {next && <KRDSButton to={`/hanja/${next.id}/`} variant="tertiary" size="medium">{next.name} 배정 한자 <i className="svg-icon ico-angle right" aria-hidden="true"></i></KRDSButton>}
        </p>
      </PageSection>

      <PageSection id="app" title={`${level.name} 모의고사 ${MOCK_EXAMS_PER_LEVEL}회로 연습하기`}>
        <AppCta level={level} />
        <p className="hanja-note">대한 어린이 한자는 대한검정회 한자급수자격검정을 준비하기 위한 비공식 학습 앱이며, 대한검정회와 관련이 없습니다. 문항은 자체 제작했습니다.</p>
      </PageSection>
    </>
  );
}

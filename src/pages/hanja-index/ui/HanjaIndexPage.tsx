import { Link } from 'react-router';
import { LEVELS, hanjaOfLevel } from '@entities/hanja';
import { Seo, breadcrumbListJsonLd } from '@shared/lib/seo';
import { PageHeader, PageSection } from '@shared/ui';
import { KRDSButton } from '@shared/ui/krds';
import { AppCta } from '@widgets/app-cta';
import { LevelFormatTable } from '@widgets/level-format-table';
import '@shared/ui/hanja-page';

const PATH = '/hanja/';

export function HanjaIndexPage() {
  return (
    <>
      <Seo
        title="한자 급수 시험 안내 — 8급·7급·6급·준5급 배정 한자와 시험 형식"
        path={PATH}
        description="초등학생이 많이 보는 대한검정회 한자급수자격검정 8급·7급·6급·준5급의 배정 한자 수, 문항 수, 제한 시간, 합격 기준을 한 표로 정리했습니다. 급수별 배정 한자 목록도 볼 수 있습니다."
        jsonLd={[breadcrumbListJsonLd([{ name: '급수별 한자' }], PATH)]}
      />
      <PageHeader
        crumbs={[{ label: '급수별 한자' }]}
        title="한자 급수 시험, 급수별로 무엇을 외우고 어떻게 보나요?"
        lead="대한검정회 한자급수자격검정은 8급에서 시작해 7급·6급·준5급으로 올라갑니다. 급수가 오를수록 한자가 누적되고 문항 수와 시간이 늘어납니다. 급수를 누르면 그 급수의 배정 한자 전체를 볼 수 있습니다."
      />

      <PageSection id="format" title="급수별 시험 형식" tone="emphasis">
        <LevelFormatTable linkLevels />
        <p className="hanja-note">배점·합격 기준은 대한검정회 급수 기준을 따랐습니다. 2026년 일부 급수 시험 시간이 바뀐다는 안내가 있으니 접수 전 공식 시간표를 확인하세요.</p>
      </PageSection>

      <PageSection id="levels" title="급수별 배정 한자">
        <ul className="level-cards">
          {LEVELS.map((l) => {
            const sample = hanjaOfLevel(l.id).slice(0, 8).map((h) => h.char).join(' ');
            return (
              <li key={l.id} className="level-card">
                <h3 className="level-card-title"><Link to={`/hanja/${l.id}/`}>{l.name} 배정 한자 {l.hanjaTotal}자</Link></h3>
                <p className="level-card-sample" lang="zh-Hant">{sample} …</p>
                <p className="level-card-meta">새로 배우는 한자 {l.newCount}자 · {l.questionCount}문항 {l.timeLimitMin}분</p>
                <KRDSButton to={`/hanja/${l.id}/`} variant="text" size="medium">
                  {l.name} 한자 전체 보기 <i className="svg-icon ico-angle right" aria-hidden="true"></i>
                </KRDSButton>
              </li>
            );
          })}
        </ul>
      </PageSection>

      <PageSection id="app" title="앱으로 준비하기">
        <AppCta />
        <p className="hanja-note">대한 어린이 한자는 대한검정회 한자급수자격검정을 준비하기 위한 비공식 학습 앱이며, 대한검정회와 관련이 없습니다.</p>
      </PageSection>
    </>
  );
}

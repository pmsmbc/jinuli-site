/**
 * "대한 어린이 한자" 앱으로 잇는 안내 블록. 급수 페이지 아래와 홈이 쓴다.
 * 스토어 링크(services.ts 의 url)가 생기면 주 버튼이 설치로 바뀐다. 출시 전에는 앱 소개로 보낸다.
 */
import { MOCK_EXAMS_PER_LEVEL, type LevelInfo } from '@entities/hanja';
import { findService, statusLabel } from '@entities/service';
import { KRDSBadge, KRDSButton, KRDSInfoList } from '@shared/ui/krds';
import { ServiceMark } from '@widgets/service-showcase';
import './AppCta.scss';

const APP = findService('daehan-kids-hanja')!;

export function AppCta({ level }: { level?: LevelInfo }) {
  const scope = level ? `${level.name} 한자 ${level.hanjaTotal}자` : '8급부터 준5급까지 한자 100자';
  return (
    <aside className="app-cta" aria-labelledby="app-cta-title">
      <ServiceMark service={APP} size="large" />
      <div>
        <h3 className="app-cta-title" id="app-cta-title">{level ? `${level.name} 시험, ` : ''}{APP.name} 앱으로 준비하세요</h3>
        <p className="app-cta-meta">
          <KRDSBadge tone={APP.status === 'released' ? 'success' : 'primary'}>{statusLabel(APP)}</KRDSBadge>
          <span>{APP.platforms}</span>
        </p>
        <KRDSInfoList
          marker="dash"
          items={[
            `${scope} 플래시카드로 외우고, 실제 시험과 같은 문항 수·제한 시간으로 모의고사 ${level ? `${MOCK_EXAMS_PER_LEVEL}회` : '40회'}`,
            level ? `${level.name} 문항 ${level.questionBank.toLocaleString('ko-KR')}개, 틀린 문제는 오답노트로` : '급수별 문항 668~4,215개, 틀린 문제는 오답노트로',
            '8급은 전부 무료, 광고 없음, 회원 가입 없음, 인터넷 없이 동작',
          ]}
        />
        <p className="app-cta-actions">
          {APP.url ? (
            <KRDSButton href={APP.url} variant="primary" size="large">앱 설치하기</KRDSButton>
          ) : (
            <KRDSButton to="/#app" variant="primary" size="large">앱 자세히 보기</KRDSButton>
          )}
          <KRDSButton to="/#faq" variant="secondary" size="large">출시 일정·가격</KRDSButton>
        </p>
      </div>
    </aside>
  );
}

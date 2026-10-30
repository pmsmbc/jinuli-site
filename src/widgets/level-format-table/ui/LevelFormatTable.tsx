/** 급수별 시험 형식 표. 데이터는 entities/hanja 의 LEVELS. 홈·급수 안내·급수 페이지가 같이 쓴다. */
import { Link } from 'react-router';
import { LEVELS, type LevelInfo } from '@entities/hanja';
import { KRDSTable } from '@shared/ui/krds';

export function LevelFormatTable({ levels = LEVELS, linkLevels = false }: { levels?: LevelInfo[]; linkLevels?: boolean }) {
  return (
    <KRDSTable
      caption="급수별 한자 범위, 문항 수, 제한 시간, 문항당 배점, 합격 기준"
      columns={[{ header: '급수', width: '14%' }, { header: '한자 범위' }, { header: '문항 수' }, { header: '제한 시간' }, { header: '배점' }, { header: '합격 기준' }]}
      rowHeader
      rows={levels.map((l) => [
        linkLevels ? <Link to={`/hanja/${l.id}/`}>{l.name}</Link> : l.name,
        `${l.hanjaTotal}자 (새로 ${l.newCount}자)`,
        `${l.questionCount}문항`,
        `${l.timeLimitMin}분`,
        `문항당 ${l.pointsPerQuestion}점`,
        `${l.passScore}점 이상 (${l.questionCount}문항 중 ${l.minCorrect}문항)`,
      ])}
    />
  );
}

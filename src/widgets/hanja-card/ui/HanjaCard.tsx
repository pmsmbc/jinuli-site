/** 표지 그림: 한자 플래시카드에 회사 도장이 찍힌 모습. 장식이라 role=img 로 한 문장만 읽힌다. */
import './HanjaCard.scss';

export interface HanjaCardProps {
  glyph: string;
  reading: string;
  grade: string;
  seal: string;
}

export function HanjaCard({ glyph, reading, grade, seal }: HanjaCardProps) {
  return (
    <div className="hanja-card" role="img" aria-label={`한자 플래시카드: ${glyph}, ${reading}, ${grade}. ${seal} 도장이 찍혀 있다.`}>
      <span className="hanja-card-grade" aria-hidden="true">{grade}</span>
      <span className="hanja-card-glyph" aria-hidden="true">{glyph}</span>
      <span className="hanja-card-reading" aria-hidden="true">{reading}</span>
      <span className="hanja-card-seal" aria-hidden="true">{seal}</span>
    </div>
  );
}

/** 배정 한자 표(한자·훈음·획수·뜻·낱말). 데이터는 entities/hanja. 글자 크기만 KRDS 토큰으로 키운다. */
import { CATEGORY_LABEL, type HanjaInfo } from '@entities/hanja';
import { KRDSTable } from '@shared/ui/krds';
import './HanjaTable.scss';

export function HanjaTable({ items, caption }: { items: HanjaInfo[]; caption: string }) {
  return (
    <KRDSTable
      className="hanja-table"
      caption={caption}
      columns={[{ header: '한자', width: '10%' }, { header: '훈·음', width: '16%' }, { header: '획수', width: '9%' }, { header: '뜻' }, { header: '갈래', width: '10%' }, { header: '낱말', width: '24%' }]}
      rowHeader
      rows={items.map((h) => [
        <span className="hanja-char" lang="zh-Hant">{h.char}</span>,
        `${h.hun} ${h.eum}`,
        `${h.strokes}획`,
        h.gloss,
        CATEGORY_LABEL[h.category],
        <span lang="zh-Hant">{h.words.join(' · ')}</span>,
      ])}
    />
  );
}

/** 한자 여러 자를 한 줄 목록으로. 아래 급수에서 이어지는 한자처럼 요약만 보일 때 쓴다. */
export function HanjaInline({ items }: { items: HanjaInfo[] }) {
  return (
    <ul className="hanja-inline" aria-label="한자 목록">
      {items.map((h) => (
        <li key={h.char}>
          <span className="hanja-char" lang="zh-Hant">{h.char}</span>
          <span className="hanja-inline-reading">{h.hun} {h.eum}</span>
        </li>
      ))}
    </ul>
  );
}

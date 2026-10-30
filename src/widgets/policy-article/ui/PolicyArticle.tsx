/**
 * 방침 한 편을 브레드크럼 + 제목 + 요약 + 절 목록으로 그린다. 앱 방침 페이지와 웹사이트 방침 페이지가 같이 쓴다.
 * 본문 안의 URL 은 splitLinks 로 링크가 된다. 스타일은 shared/ui/policy-article.
 */
import { splitLinks, type PolicySection } from '@entities/privacy-policy';
import { KRDSBreadcrumb, type Crumb } from '@shared/ui/krds';
import '@shared/ui/policy-article';

interface Props {
  crumbs: Crumb[];
  title: string;
  meta: string;
  summary: string;
  sections: PolicySection[];
}

export function PolicyArticle({ crumbs, title, meta, summary, sections }: Props) {
  return (
    <div className="policy-wrap">
      <KRDSBreadcrumb items={crumbs} />
      <article className="policy">
        <h1 className="policy-title">{title}</h1>
        <p className="policy-meta">{meta}</p>
        <div className="policy-body">
          <p className="policy-summary">{summary}</p>
          {sections.map((s) => (
            <section key={s.title}>
              <h3>{s.title}</h3>
              {s.body.map((para, i) => (
                <p key={i}>
                  {splitLinks(para).map((part, j) =>
                    part.type === 'link' ? <a key={j} href={part.value}>{part.value}</a> : <span key={j}>{part.value}</span>,
                  )}
                </p>
              ))}
            </section>
          ))}
        </div>
      </article>
    </div>
  );
}

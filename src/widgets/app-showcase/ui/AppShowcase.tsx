/** 앱 하나를 소개하는 블록. 마크 + 이름 + 상태 배지 + 소개 + 특징 목록 + 방침 버튼. */
import { APP_STATUS_LABEL, type AppInfo } from '@entities/app';
import { KRDSBadge, KRDSButton, KRDSInfoList } from '@shared/ui/krds';
import './AppShowcase.scss';

export function AppShowcase({ app }: { app: AppInfo }) {
  return (
    <article className="app-showcase" aria-labelledby={`app-${app.slug}`}>
      <div className="app-showcase-mark" aria-hidden="true">{app.mark}</div>
      <div className="app-showcase-body">
        <h3 className="app-showcase-name" id={`app-${app.slug}`}>{app.name}</h3>
        <p className="app-showcase-meta">
          <KRDSBadge tone={app.status === 'released' ? 'success' : 'primary'}>{APP_STATUS_LABEL[app.status]}</KRDSBadge>
          <span>{app.platforms}</span>
        </p>
        <p className="app-showcase-summary">{app.summary}</p>
        <KRDSInfoList marker="dash" items={app.features} />
        <p className="app-showcase-links">
          <KRDSButton to={`/privacy/${app.slug}/`} variant="secondary" size="medium">{app.name} 개인정보처리방침</KRDSButton>
        </p>
      </div>
    </article>
  );
}

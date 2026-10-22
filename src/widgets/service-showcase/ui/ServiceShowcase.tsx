/** 서비스 하나를 소개하는 블록. 마크 + 이름 + 상태 배지 + 소개 + 특징 목록 + 바로가기·방침 버튼. */
import { statusLabel, type ServiceInfo } from '@entities/service';
import { KRDSBadge, KRDSButton, KRDSInfoList } from '@shared/ui/krds';
import { ServiceMark } from './ServiceMark';
import './ServiceShowcase.scss';

export function ServiceShowcase({ service }: { service: ServiceInfo }) {
  const headingId = `service-${service.slug}`;
  return (
    <article className="service-showcase" aria-labelledby={headingId}>
      <ServiceMark service={service} />
      <div className="service-showcase-body">
        <h3 className="service-showcase-name" id={headingId}>{service.name}</h3>
        <p className="service-showcase-meta">
          <KRDSBadge tone={service.status === 'released' ? 'success' : 'primary'}>{statusLabel(service)}</KRDSBadge>
          <span>{service.platforms}</span>
        </p>
        <p className="service-showcase-summary">{service.summary}</p>
        <KRDSInfoList marker="dash" items={service.features} />
        <p className="service-showcase-links">
          {service.url && (
            <KRDSButton href={service.url} variant="primary" size="medium">
              {service.name} 열기 <i className="svg-icon ico-angle right" aria-hidden="true"></i>
            </KRDSButton>
          )}
          {service.privacy && 'to' in service.privacy && (
            <KRDSButton to={service.privacy.to} variant="secondary" size="medium">{service.name} 개인정보처리방침</KRDSButton>
          )}
          {service.privacy && 'href' in service.privacy && (
            <KRDSButton href={service.privacy.href} variant="secondary" size="medium">{service.name} 개인정보처리방침</KRDSButton>
          )}
        </p>
      </div>
    </article>
  );
}

/** 서비스 마크(한자 한 글자 타일). 소개 블록과 첫 화면이 같이 쓴다. */
import type { ServiceInfo } from '@entities/service';
import './ServiceShowcase.scss';

export function ServiceMark({ service, size = 'medium' }: { service: Pick<ServiceInfo, 'mark'>; size?: 'medium' | 'large' }) {
  return <div className={`service-mark ${size}`} aria-hidden="true">{service.mark}</div>;
}

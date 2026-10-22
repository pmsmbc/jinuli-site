/** 서비스 아이콘 타일. 소개 블록과 첫 화면이 같이 쓴다. 그림은 장식이라 alt 를 비운다(이름은 옆 글자가 말한다). */
import type { ServiceInfo } from '@entities/service';
import './ServiceShowcase.scss';

export function ServiceMark({ service, size = 'medium' }: { service: Pick<ServiceInfo, 'icon'>; size?: 'medium' | 'large' }) {
  return (
    <div className={`service-mark ${size}`}>
      <img src={service.icon} alt="" width={size === 'large' ? 96 : 72} height={size === 'large' ? 96 : 72} loading="lazy" />
    </div>
  );
}

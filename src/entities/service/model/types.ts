export type ServiceKind = 'app' | 'web';
export type ServiceStatus = 'preparing' | 'released';

export interface ServiceInfo {
  /** URL 조각·요소 id 에 쓴다. 앱은 앱 리포 app.json 의 slug 와 같다. */
  slug: string;
  name: string;
  kind: ServiceKind;
  /** 서비스 아이콘(정사각 PNG, public/marks/). 각 서비스 리포의 로고를 192px 로 줄여 복사한 것이다. */
  icon: string;
  /** 플랫폼·언어 한 줄. 예: '안드로이드 · iOS', '웹 · 한국어·English·日本語' */
  platforms: string;
  status: ServiceStatus;
  /** 운영 중인 웹 서비스의 주소. 앱은 스토어에 올라가면 넣는다. */
  url?: string;
  summary: string;
  features: string[];
  /** 사이트에 노출할지. false 면 홈·방침 목록·구조화 데이터·썸네일 어디에도 싣지 않는다(데이터는 남겨 둔다). 기본 true. */
  listed?: boolean;
  /** 개인정보처리방침. 이 사이트 안 경로(to) 또는 서비스 자체 사이트의 주소(href). 없으면 아직 공개된 방침이 없는 것이다. */
  privacy?: { to: string } | { href: string };
}

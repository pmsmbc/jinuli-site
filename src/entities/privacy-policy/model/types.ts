export interface PolicySection { title: string; body: string[] }

/** 방침 본문 공통 틀. 앱 방침과 웹사이트 방침이 같이 쓴다. */
export interface PolicyDoc {
  effectiveDate: string;
  /** 맨 위 한 줄 요약 */
  summary: string;
  sections: PolicySection[];
}

export interface PrivacyPolicy extends PolicyDoc {
  /** entities/app 의 slug 와 같다. */
  appSlug: string;
  appName: string;
}

export interface PolicySection { title: string; body: string[] }

export interface PrivacyPolicy {
  /** entities/app 의 slug 와 같다. */
  appSlug: string;
  appName: string;
  effectiveDate: string;
  /** 맨 위 한 줄 요약 */
  summary: string;
  sections: PolicySection[];
}

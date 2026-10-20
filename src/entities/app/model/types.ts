export type AppStatus = 'preparing' | 'released';

export interface AppInfo {
  /** URL 조각. /privacy/<slug>/ 에 쓴다. 앱 리포 app.json 의 slug 와 같다. */
  slug: string;
  name: string;
  /** 앱 마크에 보일 한 글자. 확정 아이콘이 나오면 iconUrl 로 교체한다. */
  mark: string;
  platforms: string;
  status: AppStatus;
  summary: string;
  features: string[];
}

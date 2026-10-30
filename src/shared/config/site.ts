/** 사이트 전역 설정. 도메인·기본 메타·분석 도구 ID. 회사 정보는 entities/company 에 있다. */
export const SITE = {
  url: 'https://jinuli.com',
  name: '지누리컴퍼니',
  defaultDescription: '지누리컴퍼니는 회원 가입 없이 바로 쓰는 앱과 웹 서비스를 만듭니다. 초등학생 한자 급수 시험 학습 앱 대한 어린이 한자를 준비하고 있습니다.',
  /** SNS 공유 썸네일(1200×630). scripts/make-images.mjs 가 public/og.png 를 만든다. */
  ogImage: { path: '/og.png', width: 1200, height: 630 },
  /** 구글 태그 관리자 컨테이너. vite.config.ts 가 빌드 때만 index.html 에 넣는다(개발 서버 방문은 통계에 안 섞이게). 비우면 안 넣는다. */
  gtmId: 'GTM-PQHMGTXF',
  /** 검색엔진 소유 확인 메타태그 값. 서치콘솔·서치어드바이저가 주는 content 값을 넣으면 vite.config.ts 가 <head> 에 넣는다. */
  verification: { google: '', naver: '' },
} as const;

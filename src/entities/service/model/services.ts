/**
 * 지누리컴퍼니가 만들고 운영하는 서비스. 운영 중인 것을 앞에, 준비 중인 것을 뒤에 둔다.
 * 소개 문안은 각 서비스 사이트의 소개·메타 설명(2026-10-22 확인)을 바탕으로 썼다. 서비스가 바뀌면 여기만 고친다.
 * 아이콘 출처: site3/public/brand/logo-mark-192.png, site2/public/logo.png, site/public/favicon/apple-icon-180x180.png, app1/assets/images/icon.png
 */
import type { ServiceInfo, ServiceStatus } from './types';

export const SERVICES: ServiceInfo[] = [
  {
    slug: 'nowyeogi',
    name: '지금 여기는',
    kind: 'web',
    icon: '/marks/nowyeogi.png',
    platforms: '웹 · 한국어 · English · 日本語',
    status: 'released',
    url: 'https://nowyeogi.com/',
    summary:
      '처음 가는 도시에서 어디에 묵고 무엇을 먹을지 한곳에서 보는 여행 정보 사이트입니다. 서울과 한국의 도시에서 시작해 도시를 하나씩 넓혀 갑니다.',
    features: [
      '도시별·동네별 여행 총정리와 이번 시즌 축제·단풍 정보',
      '공식 안내와 공개된 후기를 바탕으로 정리하고, 참고한 자료를 글마다 표시',
      '가격·영업시간은 작성 시점을 적고, 바뀌면 글을 고쳐 수정 날짜를 남김',
      '한국어·영어·일본어로 읽을 수 있음',
    ],
    privacy: { href: 'https://nowyeogi.com/privacy/' },
  },
  {
    slug: 'satto',
    name: '사또',
    kind: 'web',
    icon: '/marks/satto.png',
    platforms: '웹 · 한국어',
    status: 'released',
    url: 'https://satto.kr/',
    summary:
      '오늘의 일진으로 계산하는 12띠 운세와 궁합, 상황별 꿈해몽을 근거와 함께 보여주는 사이트입니다. 띠별·사주 행운 번호와 스피또 1등 남은 현황을 참고 자료로 함께 제공합니다.',
    features: [
      '명리학의 공개된 규칙으로 계산한 오늘의 운세와 그 근거(일진·합충·오행)',
      '연인·부부·직장·친구 관계별 궁합',
      '전통 해몽과 현대 심리학 해석을 나눠 적은 꿈해몽',
      '동행복권 공개 자료로 매일 갱신하는 스피또 1등 잔여 현황',
    ],
    privacy: { href: 'https://satto.kr/privacy/' },
  },
  {
    slug: 'onlivetube',
    name: 'On Live Tube',
    kind: 'web',
    icon: '/marks/onlivetube.png',
    platforms: '웹 · English',
    status: 'released',
    url: 'https://onlivetube.com/',
    summary:
      '버튼을 누를 때마다 지금 방송 중인 전 세계 라이브캠 하나를 무작위로 보여주는 사이트입니다. 도시 거리, 바다, 하늘, 자연, 동물, 공항, 기차의 실시간 카메라를 봅니다.',
    features: [
      'YouTube Data API 로 지금 방송 중인 스트림만 고름(녹화 영상 없음)',
      '도시·바다·하늘·자연·동물·우주·공항·기차 카테고리',
      '보고 있는 화면을 그대로 여는 공유 링크',
      '가입도 재생목록도 없이 한 번 클릭',
    ],
  },
  {
    slug: 'daehan-kids-hanja',
    name: '대한 어린이 한자',
    kind: 'app',
    icon: '/marks/daehan-kids-hanja.png',
    platforms: '안드로이드 · iOS',
    status: 'preparing',
    summary:
      '대한검정회 한자급수자격검정 8급부터 준5급까지 준비하는 초등학생을 위한 비공식 학습 앱입니다. 급수를 고르면 그 급수의 한자를 플래시카드로 외우고, 실제 시험과 같은 문항 수와 제한 시간으로 모의고사를 풉니다.',
    features: [
      '급수별 한자 플래시카드와 암기 체크',
      '실제 시험 형식의 모의고사, 점수와 합격 여부, 해설',
      '틀린 문제가 쌓이는 오답노트, 유형별 연습과 통계',
      '인터넷 없이 동작, 광고 없음, 회원 가입 없음',
    ],
    privacy: { to: '/privacy/daehan-kids-hanja/' },
  },
];

/** 상태 표시 글자. 웹은 "운영 중", 앱은 "출시됨". */
export function statusLabel(s: Pick<ServiceInfo, 'kind' | 'status'>): string {
  const labels: Record<ServiceStatus, string> = { preparing: '출시 준비 중', released: s.kind === 'web' ? '운영 중' : '출시됨' };
  return labels[s.status];
}

export const findService = (slug: string): ServiceInfo | undefined => SERVICES.find((s) => s.slug === slug);

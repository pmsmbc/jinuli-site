import type { AppInfo } from './types';

export const APPS: AppInfo[] = [
  {
    slug: 'daehan-kids-hanja',
    name: '대한 어린이 한자',
    mark: '字',
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
  },
];

export const APP_STATUS_LABEL: Record<AppInfo['status'], string> = {
  preparing: '출시 준비 중',
  released: '출시됨',
};

export const findApp = (slug: string): AppInfo | undefined => APPS.find((a) => a.slug === slug);

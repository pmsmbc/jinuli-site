/** 대한 어린이 한자 무료·유료 범위. 출처: 앱 리포 설계/스토어/등록정보.md (가격 2026-10-21 결정, 인앱 상품 full_unlock). */
export const DAEHAN_KIDS_HANJA_PRICING = {
  /** 전부 무료인 급수. */
  freeLevel: '8급',
  /** 유료 급수에서도 무료로 열리는 것. */
  freeInPaidLevels: '한자 목록과 모의고사 1회',
  unlockName: '전체 급수 열기',
  unlockPriceKrw: 4900,
  /** 결제 전 보호자 확인 방식. */
  parentalGate: '두 자리 수 덧셈',
} as const;

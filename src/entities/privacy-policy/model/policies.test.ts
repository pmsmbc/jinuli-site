import { describe, expect, it } from 'vitest';
import { PRIVACY_POLICIES, findPolicy, splitLinks } from './policies';
import { DAEHAN_KIDS_HANJA_POLICY } from './daehan-kids-hanja';

// 앱 리포 src/features/legal/privacyPolicy.ts (157c67e) 의 절 제목. 어긋나면 두 벌이 갈린 것이다.
const ORIGINAL_TITLES = [
  '1. 개인정보를 수집하지 않아요',
  '2. 어린이 이용자',
  '3. 결제 정보',
  '4. 광고와 분석 도구',
  '5. 권한과 네트워크',
  '6. 기록 삭제',
  '7. 방침 변경',
  '8. 문의',
];

describe('대한 어린이 한자 개인정보처리방침', () => {
  it('앱 리포 원본과 절 수·제목이 같다', () => {
    expect(DAEHAN_KIDS_HANJA_POLICY.sections.map((s) => s.title)).toEqual(ORIGINAL_TITLES);
  });
  it('모든 절에 본문이 있고 임시 문의처가 남아 있지 않다', () => {
    for (const s of DAEHAN_KIDS_HANJA_POLICY.sections) expect(s.body.length).toBeGreaterThan(0);
    const all = DAEHAN_KIDS_HANJA_POLICY.sections.flatMap((s) => s.body).join('\n');
    expect(all).not.toContain('앱 스토어 등록 정보의 개발자 연락처');
    expect(all).toContain('admin@jinuli.com');
  });
  it('slug 로 찾는다', () => {
    expect(findPolicy('daehan-kids-hanja')).toBe(DAEHAN_KIDS_HANJA_POLICY);
    expect(findPolicy('nope')).toBeUndefined();
    expect(PRIVACY_POLICIES).toHaveLength(1);
  });
});

describe('splitLinks', () => {
  it('괄호 안 URL 을 링크 조각으로 분리한다', () => {
    expect(splitLinks('방침(https://policies.google.com/privacy)이 적용')).toEqual([
      { type: 'text', value: '방침(' },
      { type: 'link', value: 'https://policies.google.com/privacy' },
      { type: 'text', value: ')이 적용' },
    ]);
  });
  it('URL 이 없으면 통째로 텍스트다', () => {
    expect(splitLinks('그냥 문장')).toEqual([{ type: 'text', value: '그냥 문장' }]);
  });
});

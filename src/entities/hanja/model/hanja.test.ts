import { describe, expect, it } from 'vitest';
import { HANJA, hanjaOfLevel } from './hanja';
import { LEVELS, findLevel, lowerLevels, nextLevel } from './levels';

describe('급수', () => {
  it('누적 한자 수는 신출 수를 8급부터 더한 값이다', () => {
    let sum = 0;
    for (const l of LEVELS) {
      sum += l.newCount;
      expect(l.hanjaTotal).toBe(sum);
    }
    expect(LEVELS.map((l) => l.hanjaTotal)).toEqual([30, 50, 70, 100]);
  });
  it('최소 정답 수 × 배점이 합격 점수 이상이고, 하나 적으면 미달이다', () => {
    for (const l of LEVELS) {
      expect(l.minCorrect * l.pointsPerQuestion).toBeGreaterThanOrEqual(l.passScore);
      expect((l.minCorrect - 1) * l.pointsPerQuestion).toBeLessThan(l.passScore);
    }
  });
  it('아래 급수·다음 급수를 찾는다', () => {
    expect(lowerLevels('8')).toEqual([]);
    expect(lowerLevels('6').map((l) => l.id)).toEqual(['8', '7']);
    expect(nextLevel('7')?.id).toBe('6');
    expect(nextLevel('j5')).toBeUndefined();
    expect(findLevel('5')).toBeUndefined();
  });
});

describe('배정 한자', () => {
  it('급수별 신출 수가 급수 표와 맞고 모두 100자다', () => {
    for (const l of LEVELS) expect(hanjaOfLevel(l.id)).toHaveLength(l.newCount);
    expect(HANJA).toHaveLength(100);
  });
  it('한자가 겹치지 않고 훈·음·낱말이 비어 있지 않다', () => {
    expect(new Set(HANJA.map((h) => h.char)).size).toBe(100);
    for (const h of HANJA) {
      expect(h.hun).not.toBe('');
      expect(h.eum).not.toBe('');
      expect(h.words.length).toBeGreaterThan(0);
      expect(h.strokes).toBeGreaterThan(0);
    }
  });
});

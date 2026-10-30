/**
 * 급수별 시험 형식. 앱 리포 content/levels.json (5406c72) 과 같은 값에 신출 수·최소 정답 수·앱 문항 수를 더했다.
 * 출처: 대한검정회 시험 형식(앱 설계문서 3절, 2026년 기준). 시험시간 변경 안내가 있어 공식 시간표는 따로 확인한다.
 */
import type { LevelId, LevelInfo } from './types';

export const LEVELS: LevelInfo[] = [
  { id: '8', name: '8급', hanjaTotal: 30, newCount: 30, questionCount: 25, timeLimitMin: 15, pointsPerQuestion: 4, passScore: 70, minCorrect: 18, questionBank: 668 },
  { id: '7', name: '7급', hanjaTotal: 50, newCount: 20, questionCount: 25, timeLimitMin: 15, pointsPerQuestion: 4, passScore: 70, minCorrect: 18, questionBank: 1527 },
  { id: '6', name: '6급', hanjaTotal: 70, newCount: 20, questionCount: 50, timeLimitMin: 25, pointsPerQuestion: 2, passScore: 70, minCorrect: 35, questionBank: 3007 },
  { id: 'j5', name: '준5급', hanjaTotal: 100, newCount: 30, questionCount: 50, timeLimitMin: 25, pointsPerQuestion: 2, passScore: 70, minCorrect: 35, questionBank: 4215 },
];

/** 급수별 모의고사 회차 수(모든 급수 같음). */
export const MOCK_EXAMS_PER_LEVEL = 10;

export const findLevel = (id: string): LevelInfo | undefined => LEVELS.find((l) => l.id === id);

/** 이 급수보다 쉬운 급수들(8급부터 차례로). 7급이면 [8급]. */
export const lowerLevels = (id: LevelId): LevelInfo[] => LEVELS.slice(0, LEVELS.findIndex((l) => l.id === id));

/** 이 급수 다음 급수. 준5급이면 없음. */
export const nextLevel = (id: LevelId): LevelInfo | undefined => LEVELS[LEVELS.findIndex((l) => l.id === id) + 1];

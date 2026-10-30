/**
 * 배정 한자 100자. hanja.json 은 앱 리포 content/hanja.json (5406c72) 을 그대로 복사한 것이다.
 * 앱 콘텐츠를 검수해 고치면 이 파일도 같이 바꾼다(README).
 */
import raw from './hanja.json';
import type { HanjaInfo, LevelId } from './types';

export const HANJA: HanjaInfo[] = raw as HanjaInfo[];

/** 이 급수에서 새로 배우는 한자. 음 가나다순. */
export function hanjaOfLevel(level: LevelId): HanjaInfo[] {
  return HANJA.filter((h) => h.level === level).sort(byEum);
}

const byEum = (a: HanjaInfo, b: HanjaInfo) => a.eum.localeCompare(b.eum, 'ko') || a.strokes - b.strokes;

export const CATEGORY_LABEL: Record<HanjaInfo['category'], string> = {
  number: '숫자',
  nature: '자연',
  family: '가족',
  body: '몸',
  direction: '방향',
  animal: '동물',
  other: '그 밖',
};

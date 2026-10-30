/** 급수 id. 앱 리포 content/levels.json 의 id 와 같다(URL 조각으로도 쓴다). */
export type LevelId = '8' | '7' | '6' | 'j5';

export interface LevelInfo {
  id: LevelId;
  /** 표시 이름. 예: '8급', '준5급' */
  name: string;
  /** 이 급수 시험 범위의 누적 한자 수(아래 급수 포함). */
  hanjaTotal: number;
  /** 이 급수에서 새로 배우는 한자 수. */
  newCount: number;
  questionCount: number;
  timeLimitMin: number;
  pointsPerQuestion: number;
  /** 합격 기준 점수(100점 만점). */
  passScore: number;
  /** 합격에 필요한 최소 정답 수. */
  minCorrect: number;
  /** 앱 안 문항 수(스토어 문안 기준, 2026-10-28). */
  questionBank: number;
}

export type HanjaCategory = 'animal' | 'body' | 'direction' | 'family' | 'nature' | 'number' | 'other';

export interface HanjaInfo {
  char: string;
  /** 훈(뜻). 예: '아홉' */
  hun: string;
  /** 음(소리). 예: '구' */
  eum: string;
  /** 처음 나오는 급수. */
  level: LevelId;
  strokes: number;
  /** 아이 눈높이 뜻풀이. */
  gloss: string;
  category: HanjaCategory;
  /** 이 한자가 들어간 낱말. */
  words: string[];
}

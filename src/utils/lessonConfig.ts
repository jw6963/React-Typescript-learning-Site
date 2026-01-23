import type { LessonInfo } from '../types/lesson';

// 모든 레슨의 순서 정의
export const LESSONS: LessonInfo[] = [
  { key: 'step1-1', label: 'Step 1-1: 기본 타입', order: 1 },
  { key: 'step1-2', label: 'Step 1-2: Interface', order: 2 },
  { key: 'step1-3', label: 'Step 1-3: Type Alias', order: 3 },
  { key: 'step3', label: 'Step 3: 고급 타입', order: 4 },
  { key: 'step2', label: 'Step 2: React 기초', order: 5 },
  { key: 'step4', label: 'Step 4: Hooks & TypeScript', order: 6 },
  { key: 'step5-todo', label: 'Step 5: Todo 앱', order: 7 },
  { key: 'step5-api', label: 'Step 5: API 연동', order: 8 },
  { key: 'ebook', label: 'E-Book: TS 학습 가이드', order: 9 },
];

// 레슨 키로 정보 찾기
export function getLessonByKey(key: string): LessonInfo | undefined {
  return LESSONS.find(lesson => lesson.key === key);
}

// 다음 레슨 찾기
export function getNextLesson(currentKey: string): LessonInfo | null {
  const current = getLessonByKey(currentKey);
  if (!current) return null;

  const nextLesson = LESSONS.find(lesson => lesson.order === current.order + 1);
  return nextLesson || null;
}

// 이전 레슨 찾기
export function getPrevLesson(currentKey: string): LessonInfo | null {
  const current = getLessonByKey(currentKey);
  if (!current) return null;

  const prevLesson = LESSONS.find(lesson => lesson.order === current.order - 1);
  return prevLesson || null;
}

// 전체 레슨 개수
export const TOTAL_LESSONS = LESSONS.length;

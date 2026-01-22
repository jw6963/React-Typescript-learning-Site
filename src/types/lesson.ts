export interface LessonInfo {
  key: string;
  label: string;
  order: number; // 전체 순서 (1부터 시작)
}

export interface LessonProgress {
  [lessonKey: string]: {
    completed: boolean;
    lastVisited?: number; // timestamp
  };
}

export interface SavedCode {
  [lessonKey: string]: {
    [playgroundTitle: string]: string;
  };
}

export type Theme = 'light' | 'dark';

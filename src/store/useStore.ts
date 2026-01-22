import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LessonProgress, SavedCode, Theme } from '../types/lesson';

interface AppState {
  // 다크 모드
  theme: Theme;
  toggleTheme: () => void;

  // 학습 진행 상황
  lessonProgress: LessonProgress;
  markLessonComplete: (lessonKey: string) => void;
  markLessonIncomplete: (lessonKey: string) => void;
  visitLesson: (lessonKey: string) => void;
  getCompletedCount: () => number;

  // 코드 저장
  savedCode: SavedCode;
  saveCode: (lessonKey: string, playgroundTitle: string, code: string) => void;
  getSavedCode: (lessonKey: string, playgroundTitle: string) => string | undefined;
  clearSavedCode: (lessonKey: string, playgroundTitle: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // 초기 테마 (시스템 설정 감지)
      theme: 'light',

      toggleTheme: () => set((state) => ({
        theme: state.theme === 'light' ? 'dark' : 'light'
      })),

      // 초기 학습 진행 상황
      lessonProgress: {},

      markLessonComplete: (lessonKey: string) =>
        set((state) => ({
          lessonProgress: {
            ...state.lessonProgress,
            [lessonKey]: {
              ...state.lessonProgress[lessonKey],
              completed: true,
              lastVisited: Date.now(),
            },
          },
        })),

      markLessonIncomplete: (lessonKey: string) =>
        set((state) => ({
          lessonProgress: {
            ...state.lessonProgress,
            [lessonKey]: {
              ...state.lessonProgress[lessonKey],
              completed: false,
            },
          },
        })),

      visitLesson: (lessonKey: string) =>
        set((state) => ({
          lessonProgress: {
            ...state.lessonProgress,
            [lessonKey]: {
              completed: state.lessonProgress[lessonKey]?.completed || false,
              lastVisited: Date.now(),
            },
          },
        })),

      getCompletedCount: () => {
        const progress = get().lessonProgress;
        return Object.values(progress).filter((p) => p.completed).length;
      },

      // 초기 코드 저장소
      savedCode: {},

      saveCode: (lessonKey: string, playgroundTitle: string, code: string) =>
        set((state) => ({
          savedCode: {
            ...state.savedCode,
            [lessonKey]: {
              ...state.savedCode[lessonKey],
              [playgroundTitle]: code,
            },
          },
        })),

      getSavedCode: (lessonKey: string, playgroundTitle: string) => {
        const lessonCode = get().savedCode[lessonKey];
        return lessonCode?.[playgroundTitle];
      },

      clearSavedCode: (lessonKey: string, playgroundTitle: string) =>
        set((state) => {
          const newSavedCode = { ...state.savedCode };
          if (newSavedCode[lessonKey]) {
            delete newSavedCode[lessonKey][playgroundTitle];
          }
          return { savedCode: newSavedCode };
        }),
    }),
    {
      name: 'ts-learning-storage', // localStorage key
    }
  )
);

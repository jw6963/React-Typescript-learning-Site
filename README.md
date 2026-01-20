# TypeScript + React 학습 환경

`ts-learning` 폴더의 학습 자료를 실제 React 환경에서 실행하며 공부할 수 있는 프로젝트입니다.

## 🚀 실행 방법

### 1. 의존성 설치 (이미 완료됨)
```bash
cd ts-learning-practice
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 **http://localhost:5173** 을 열어주세요.

### 3. 개발 서버 종료
터미널에서 `Ctrl + C`를 눌러 종료합니다.

## 📚 학습 구조

왼쪽 사이드바 메뉴에서 학습하고 싶은 단계를 선택할 수 있습니다:

### 기초 학습
- **Step 1: TypeScript 기초** - 순수 TypeScript 파일들 (`.ts`)
  - step1-basic-types.ts
  - step1-interface.ts
  - step1-type-alias.ts
  - step3-advanced-types.ts

### React + TypeScript
- **Step 2: React 기초** - 함수 컴포넌트, Props, 이벤트 처리
- **Step 4: Hooks & TypeScript** - useState, useEffect, useRef, useContext, useReducer, Custom Hooks

### 프로젝트
- **Step 5: Todo 앱** - 실전 Todo 앱 구현
- **Step 5: API 연동** - API 호출, 에러 처리, 페이지네이션

## 📝 학습 파일 위치

모든 학습 파일들은 `src/lessons/` 폴더에 있습니다:
- `src/lessons/step2-react-basics.tsx`
- `src/lessons/step4-hooks-typescript.tsx`
- `src/lessons/step5-project-todo.tsx`
- `src/lessons/step5-api-integration.tsx`

각 파일을 VS Code에서 열어보고, 코드를 읽고, 수정하며 학습할 수 있습니다.

## 🎯 학습 방법

1. **왼쪽 메뉴에서 단계 선택** - 학습하고 싶은 단계를 클릭
2. **화면에서 예제 확인** - 각 단계의 예제들이 실제로 실행되는 것을 확인
3. **코드 읽기** - `src/lessons/` 폴더에서 해당 파일을 열어 코드 읽기
4. **코드 수정** - 파일을 수정하면 브라우저에서 자동으로 업데이트됨 (Hot Module Replacement)
5. **연습 문제 풀기** - 각 파일 하단의 TODO 부분을 채워보기

## 🛠️ 기술 스택

- **React 18** - UI 라이브러리
- **TypeScript** - 타입 시스템
- **Vite** - 빌드 도구 (빠른 개발 서버)
- **Ant Design** - UI 컴포넌트 라이브러리

## 📖 추가 자료

`src/lessons/` 폴더에는 다음과 같은 참고 자료도 있습니다:
- `CHEATSHEET.md` - TypeScript + React 치트시트
- `STUDY-GUIDE.md` - 학습 가이드
- `UI-LIBRARY-GUIDE.md` - UI 라이브러리 가이드

## 💡 팁

- 파일을 수정하면 브라우저가 자동으로 새로고침됩니다
- 브라우저 개발자 도구(F12)를 열어서 콘솔 메시지를 확인하세요
- TypeScript 오류가 있으면 VS Code와 브라우저에서 모두 표시됩니다
- 원본 파일(`../ts-learning`)은 수정되지 않으며, 이 프로젝트의 파일만 수정됩니다

## 🎓 학습 순서 추천

1. Step 2: React 기초 → React + TypeScript 기본 문법 익히기
2. Step 4: Hooks & TypeScript → React Hooks 타입 정의 배우기
3. Step 5: Todo 앱 → 간단한 프로젝트 만들어보기
4. Step 5: API 연동 → 실제 API 사용법 익히기

Happy Learning! 🚀

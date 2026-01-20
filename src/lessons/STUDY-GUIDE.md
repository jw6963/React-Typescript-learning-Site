# TypeScript + React 완벽 학습 가이드

## 📖 전체 커리큘럼

### 1단계: TypeScript 기초 (1-2주)
- `step1-basic-types.ts` - 기본 타입, 배열, 함수, any
- `step1-interface.ts` - Interface, Optional, Readonly, 확장
- `step1-type-alias.ts` - Type, Union Type, Interface vs Type
- `step1-solutions.ts` - 연습문제 정답

### 2단계: React + TypeScript 기본 (1주)
- `step2-react-basics.tsx` - 컴포넌트, Props, Event, useState

### 3단계: 고급 타입 (1-2주)
- `step3-advanced-types.ts` - Utility Types, Generic, Type Assertion

### 4단계: Hooks + TypeScript (1주)
- `step4-hooks-typescript.tsx` - useState, useEffect, useRef, useContext, useReducer, Custom Hooks

### 5단계: 실전 프로젝트
- `step5-project-todo.tsx` - Todo 앱 완성
- `step5-api-integration.tsx` - API 연동, 에러 처리

---

## 🚀 시작하기

### 설치

```bash
# TypeScript 설치
npm install -g typescript

# 버전 확인
tsc --version
```

### 실행 방법

```bash
# TS 파일 컴파일
tsc step1-basic-types.ts

# 생성된 JS 파일 실행
node step1-basic-types.js

# 또는 한 번에
tsc step1-basic-types.ts && node step1-basic-ts.js
```

### Watch 모드 (자동 컴파일)

```bash
tsc step1-basic-types.ts --watch
```

---

## 📚 학습 방법

### 1. 순서대로 진행
1. 파일 열기
2. 주석과 코드 읽기
3. 직접 타이핑해보기
4. 연습 문제 풀기
5. 정답과 비교

### 2. 실습 중심
- 모든 예제 코드를 직접 실행
- 의도적으로 오류 만들어보기
- 타입 변경하면서 실험

### 3. 반복 학습
- 막히는 부분은 반복
- 이전 단계 복습
- 개념 정리 노트 작성

---

## 💡 학습 팁

### TypeScript 오류 읽는 법
```
Type 'string' is not assignable to type 'number'.
→ string 타입을 number 타입에 할당할 수 없습니다
```

### VSCode 활용
- 마우스 올리면 타입 표시
- `Ctrl + Space` 자동완성
- `F12` 정의로 이동

### 자주하는 실수
1. `:` 대신 `=` 사용
2. Interface와 Type 혼동
3. Optional(`?`) 빼먹기
4. Generic 타입 안 넣기

---

## 🎯 단계별 체크리스트

### 1단계 완료 기준
- [ ] 기본 타입 5가지 설명 가능
- [ ] Interface 작성 가능
- [ ] Type과 Interface 차이 이해
- [ ] Union Type 사용 가능
- [ ] 모든 연습 문제 풀이

### 2단계 완료 기준
- [ ] Props 타입 정의 가능
- [ ] Event 타입 지정 가능
- [ ] useState 타입 작성 가능
- [ ] 간단한 컴포넌트 작성 가능

### 3단계 완료 기준
- [ ] Utility Types 5개 사용 가능
- [ ] Generic 이해하고 작성 가능
- [ ] Type Guard 사용 가능

### 4단계 완료 기준
- [ ] 모든 Hook 타입 지정 가능
- [ ] useContext 타입 정의 가능
- [ ] useReducer 타입 작성 가능
- [ ] Custom Hook 만들 수 있음

### 5단계 완료 기준
- [ ] Todo 앱 완성
- [ ] API 연동 구현
- [ ] 에러 처리 추가
- [ ] 자신만의 프로젝트 시작

---

## 📌 자주 묻는 질문

### Q1. Interface vs Type 언제 뭘 써야 하나요?
**A:** 객체 구조는 Interface, Union/Primitive는 Type 사용 권장

### Q2. any는 언제 써도 되나요?
**A:** 가급적 사용 금지. 정말 타입을 모를 때만 `unknown` 사용

### Q3. React.FC 써야 하나요?
**A:** 최신 React에서는 일반 함수 권장

### Q4. Generic이 너무 어려워요
**A:** 배열부터 시작 (`Array<number>`), 천천히 확장

---

## 🔗 추가 학습 자료

### 공식 문서
- TypeScript: https://www.typescriptlang.org/docs/
- React+TS: https://react.dev/learn/typescript

### 추천 연습
1. DefinitelyTyped 코드 읽기
2. 기존 JS 프로젝트를 TS로 변환
3. 타입 챌린지 풀기

---

## ✅ 다음 단계

1단계 완료 → 2단계로
막히면 → 다시 1단계 복습
전부 완료 → 나만의 프로젝트 시작!

**화이팅! 🚀**

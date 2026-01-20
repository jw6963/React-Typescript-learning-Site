# 🎓 TypeScript + React 학습 환경

TypeScript와 React를 **브라우저에서 직접 코드를 작성하고 실행하며** 학습할 수 있는 인터랙티브 학습 플랫폼입니다.

## ✨ 주요 기능

- 🖥️ **실시간 코드 에디터** - Monaco Editor (VS Code 엔진) 내장
- ▶️ **즉시 실행** - 코드를 수정하고 바로 결과 확인
- 👁️ **정답 보기** - 막힐 때 정답 코드 확인 가능
- 📝 **TODO 연습 문제** - 직접 코드를 채워넣으며 학습
- 🔄 **Hot Reload** - 파일 수정 시 자동 새로고침
- 🎨 **깔끔한 UI** - Ant Design 기반 사이드바 메뉴

## 🚀 빠른 시작

### 1. 저장소 클론

```bash
git clone https://github.com/YOUR_USERNAME/ts-learning-practice.git
cd ts-learning-practice
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

### 4. 브라우저에서 열기

http://localhost:5173 접속하여 학습 시작!

## 📚 학습 커리큘럼

### 📘 TypeScript 기초 (Step 1)

- **Step 1-1: 기본 타입** - string, number, boolean, array, object, function
- **Step 1-2: Interface** - 인터페이스, Optional, Readonly, 확장
- **Step 1-3: Type Alias** - Union Type, Intersection Type, Literal Type

### 📗 고급 타입 (Step 3)

- **Step 3: 고급 타입** - Generics, Utility Types (Partial, Omit, Pick, Record)

### ⚛️ React + TypeScript (Step 2, 4)

- **Step 2: React 기초** - 컴포넌트, Props, 이벤트 타입
- **Step 4: Hooks** - useState, useEffect, useRef, useContext, useReducer, Custom Hooks

### 🚀 실전 프로젝트 (Step 5)

- **Step 5-1: Todo 앱** - 상태 관리, CRUD 기능 구현
- **Step 5-2: API 연동** - fetch, 에러 처리, 페이지네이션

## 🎯 학습 방법

### 1단계: 기본 개념 학습
왼쪽 사이드바에서 단계를 선택하고 예제를 확인합니다.

### 2단계: 코드 에디터에서 실습
화면의 코드 에디터에서 직접 코드를 수정해봅니다.

### 3단계: 실행하여 결과 확인
**실행** 버튼을 클릭하여 코드의 결과를 즉시 확인합니다.

### 4단계: 연습 문제 풀기
TODO 부분을 채워넣으며 직접 구현합니다. 막히면 **정답 보기**!

### 5단계: VS Code에서 심화 학습
`src/lessons/` 폴더의 파일을 열어 전체 코드를 학습합니다.

## 🛠️ 기술 스택

| 기술 | 용도 | 버전 |
|------|------|------|
| **React** | UI 라이브러리 | 18.x |
| **TypeScript** | 타입 시스템 | 5.x |
| **Vite** | 빌드 도구 | 7.x |
| **Monaco Editor** | 코드 에디터 | 최신 |
| **Ant Design** | UI 컴포넌트 | 최신 |

## 📁 프로젝트 구조

```
ts-learning-practice/
├── src/
│   ├── App.tsx                    # 메인 앱 (라우팅, 레이아웃)
│   ├── components/
│   │   └── CodePlayground.tsx     # 코드 에디터 컴포넌트
│   ├── lessons/                   # 학습 자료
│   │   ├── Step1BasicTypes.tsx    # Step 1-1: 기본 타입
│   │   ├── Step1Interface.tsx     # Step 1-2: Interface
│   │   ├── Step1TypeAlias.tsx     # Step 1-3: Type Alias
│   │   ├── Step3AdvancedTypes.tsx # Step 3: 고급 타입
│   │   ├── step2-react-basics.tsx # Step 2: React 기초
│   │   ├── step4-hooks-typescript.tsx # Step 4: Hooks
│   │   ├── step5-project-todo.tsx # Step 5: Todo 앱
│   │   └── step5-api-integration.tsx # Step 5: API 연동
│   └── ...
├── package.json
├── README.md
└── GIT-GUIDE.md                   # Git 사용 가이드
```

## 🎓 추천 학습 순서

### 초급: TypeScript 기초 다지기
1. Step 1-1: 기본 타입
2. Step 1-2: Interface
3. Step 1-3: Type Alias

### 중급: React와 통합
4. Step 2: React 기초
5. Step 4: Hooks & TypeScript

### 고급: 실전 적용
6. Step 3: 고급 타입
7. Step 5-1: Todo 앱
8. Step 5-2: API 연동

## 💡 학습 팁

### 브라우저 개발자 도구 활용
`F12`를 눌러 콘솔에서 실행 결과와 오류를 확인하세요.

### 단축키
- **실행**: 코드를 실행하고 결과 확인
- **초기화**: 원래 예제 코드로 되돌리기
- **정답 보기**: 막힐 때 정답 코드 확인

### 오류 해결
TypeScript 오류는 에디터에서 빨간 줄로 표시됩니다. 마우스를 올려 오류 메시지를 확인하세요.

## 🔧 개발 명령어

```bash
# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 빌드 미리보기
npm run preview

# 타입 체크
tsc --noEmit
```

## 📖 추가 자료

프로젝트에 포함된 추가 학습 자료:

- **GIT-GUIDE.md** - Git 저장소 설정 및 사용 가이드
- **src/lessons/CHEATSHEET.md** - TypeScript + React 치트시트
- **src/lessons/STUDY-GUIDE.md** - 상세 학습 가이드
- **src/lessons/UI-LIBRARY-GUIDE.md** - UI 라이브러리 사용법

## 🤝 기여하기

버그 리포트, 기능 제안, Pull Request를 환영합니다!

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

## 🙋‍♂️ 문의

문제가 발생하거나 질문이 있으시면 [Issues](../../issues)에 남겨주세요.

---

**Happy Learning!** 🚀

TypeScript와 React를 마스터하는 여정을 응원합니다!

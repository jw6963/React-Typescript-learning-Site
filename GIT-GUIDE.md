# Git 저장소 설정 가이드

이 프로젝트를 Git에 올려서 다른 환경에서도 사용할 수 있습니다.

## ✅ Git에 올릴 준비 완료

이 프로젝트는 Git에 올릴 준비가 되어있습니다:
- ✅ `.gitignore` 설정됨 (node_modules, dist 등 제외)
- ✅ `README.md` 작성됨 (실행 방법 포함)
- ✅ `package.json` 있음 (의존성 관리)
- ✅ 학습 자료 모두 포함

## 🚀 GitHub에 올리기

### 1. GitHub에서 새 저장소 생성
1. https://github.com 접속
2. 우측 상단 "+" → "New repository" 클릭
3. Repository name: `ts-learning-practice` (원하는 이름)
4. Public 또는 Private 선택
5. **"Add a README file" 체크 해제** (이미 있음)
6. "Create repository" 클릭

### 2. 로컬에서 Git 초기화 및 업로드

```bash
# ts-learning-practice 폴더로 이동
cd ts-learning-practice

# Git 초기화
git init

# 모든 파일 추가
git add .

# 첫 커밋
git commit -m "Initial commit: TypeScript + React 학습 환경"

# GitHub 저장소와 연결 (YOUR_USERNAME을 실제 GitHub 아이디로 변경)
git remote add origin https://github.com/YOUR_USERNAME/ts-learning-practice.git

# 업로드
git branch -M main
git push -u origin main
```

### 3. 다른 환경에서 사용하기

다른 컴퓨터나 환경에서 이렇게 사용할 수 있습니다:

```bash
# 프로젝트 클론
git clone https://github.com/YOUR_USERNAME/ts-learning-practice.git

# 폴더로 이동
cd ts-learning-practice

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

그러면 http://localhost:5173 에서 바로 사용할 수 있습니다!

## 📦 포함된 내용

### 학습 자료
- ✅ Step 1-1, 1-2, 1-3: TypeScript 기초
- ✅ Step 2: React + TypeScript 기초
- ✅ Step 3: 고급 타입
- ✅ Step 4: Hooks & TypeScript
- ✅ Step 5: Todo 앱, API 연동

### 기능
- ✅ 인터랙티브 코드 에디터 (Monaco Editor)
- ✅ 실시간 코드 실행
- ✅ 정답 보기 기능
- ✅ TODO 형태의 연습 문제

## 🔒 제외되는 파일 (.gitignore)

다음 파일들은 Git에 업로드되지 않습니다:
- `node_modules/` - npm 패키지 (다운로드 가능)
- `dist/` - 빌드 결과물
- `.idea/` - IDE 설정
- `*.log` - 로그 파일

## 💡 팁

### Private vs Public
- **Public**: 누구나 볼 수 있음. 포트폴리오나 오픈소스로 좋음
- **Private**: 본인만 볼 수 있음. 개인 학습용으로 좋음

### 저장소 크기
현재 프로젝트 크기: 약 1-2MB (node_modules 제외)
- Git에 올라가는 실제 크기는 매우 작습니다
- node_modules는 `npm install`로 다시 설치

### 업데이트하기
나중에 코드를 수정하면:

```bash
git add .
git commit -m "학습 내용 업데이트"
git push
```

## 🎓 다른 환경에서 학습 시작하기

1. **프로젝트 클론**
   ```bash
   git clone [저장소 URL]
   ```

2. **의존성 설치**
   ```bash
   cd ts-learning-practice
   npm install
   ```

3. **개발 서버 실행**
   ```bash
   npm run dev
   ```

4. **브라우저에서 확인**
   - http://localhost:5173 열기
   - 학습 시작!

## ❓ 자주 묻는 질문

**Q: 원본 ts-learning 폴더도 올려야 하나요?**
A: 아니요. `ts-learning-practice` 프로젝트에 모든 학습 자료가 포함되어 있습니다.

**Q: 다른 컴퓨터에서 수정한 내용을 동기화하려면?**
A: `git pull`을 사용하면 최신 버전을 가져올 수 있습니다.

**Q: Private 저장소를 만들면 안전한가요?**
A: 네, Private 저장소는 본인과 초대한 사람만 볼 수 있습니다.

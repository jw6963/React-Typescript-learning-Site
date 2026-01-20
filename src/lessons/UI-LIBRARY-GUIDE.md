# 디자인 없을 때 생존 전략: UI 라이브러리

## 🎯 핵심 전략

**디자인 나올 때까지 기다리지 말고, UI 라이브러리로 시작**

---

## 추천 라이브러리 (우선순위)

### 1. Ant Design (제일 추천)
```bash
npm install antd
```

**장점:**
- B2B/Admin에 최적화 (MRO/SSP 통합몰 딱 맞음)
- 컴포넌트 완성도 높음
- 한국어 지원
- 테이블/폼/레이아웃 강력

**단점:**
- 디자인 개성 강함 (나중에 커스터마이징 필요)

**사용 예시:**
```tsx
import { Button, Table, Form, Input } from 'antd';

function ProductList() {
  return (
    <Table
      dataSource={products}
      columns={[
        { title: '상품명', dataIndex: 'name' },
        { title: '가격', dataIndex: 'price' },
      ]}
    />
  );
}
```

### 2. MUI (Material UI)
```bash
npm install @mui/material @emotion/react @emotion/styled
```

**장점:**
- 커스터마이징 쉬움
- 디자인 깔끔
- 컴포넌트 많음

**단점:**
- B2B보다는 B2C 느낌

### 3. Chakra UI
```bash
npm install @chakra-ui/react @emotion/react
```

**장점:**
- 커스터마이징 제일 쉬움
- 코드 깔끔

**단점:**
- 테이블 같은 복잡한 건 직접 만들어야 함

---

## 🎨 디자이너와 협상하기

### 회의 때 이렇게 말하세요

**나쁜 예:**
"디자인 언제 나와요? 기다리고 있어요."

**좋은 예:**
"디자인 나올 때까지 Ant Design으로 기능 먼저 구현하겠습니다.
디자인 나오면 스타일만 덮어쓰면 됩니다.
이렇게 하면 병렬 작업 가능합니다."

### 최소한 받아야 할 것

```
[ ] 컬러 팔레트 (Primary, Secondary, Gray 등)
[ ] 타이포그래피 (폰트, 사이즈)
[ ] 버튼 스타일 (높이, 라운드, 색상)
[ ] 스페이싱 (8px, 16px, 24px...)
[ ] 아이콘 (어떤 라이브러리 쓸지)
```

**이것만 있어도 80% 진행 가능합니다.**

---

## 🛠️ 실전 진행 방법

### Phase 1: UI 라이브러리로 기능 구현 (2-3주)

```tsx
// 일단 Ant Design으로 빠르게
import { Button, Card, Table } from 'antd';

function ProductCard({ product }) {
  return (
    <Card
      title={product.name}
      extra={<Button>장바구니</Button>}
    >
      <p>{product.price}원</p>
    </Card>
  );
}
```

### Phase 2: 디자인 나오면 커스터마이징 (1주)

```tsx
// 스타일만 덮어쓰기
import styled from 'styled-components';
import { Card as AntCard } from 'antd';

const StyledCard = styled(AntCard)`
  border-radius: 12px;  /* 디자인 가이드 */
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);

  .ant-card-head {
    background: #f5f5f5;  /* 디자인 컬러 */
  }
`;

function ProductCard({ product }) {
  return (
    <StyledCard title={product.name}>
      {/* 내용 동일 */}
    </StyledCard>
  );
}
```

### Phase 3: 필요하면 완전 교체 (나중에)

```tsx
// 진짜 커스텀 필요하면 그때 교체
function ProductCard({ product }) {
  return (
    <div className="custom-card">
      {/* 완전히 새로 */}
    </div>
  );
}
```

---

## 📋 팀에 제안할 문서

### [제안] 디자인 대기 시간 최소화 방안

**현황:**
- 디자인 미완성
- 개발 대기 시간 손실

**제안:**
1. Ant Design으로 기능 우선 구현
2. 디자인 가이드 최소본 먼저 전달 (색상, 폰트)
3. 디자인 완성 시 스타일 커스터마이징

**장점:**
- 병렬 작업 가능
- 기능 검증 빠름
- 시간 절약

**단점:**
- 스타일 2차 작업 필요 (1-2주 추가)

**의견:**
현재 일정상 이 방법이 최선입니다.

---

## 🎯 현실적인 타임라인

### 기존 방식 (순차)
```
디자인 대기 (3주)
  ↓
공통 컴포넌트 개발 (2주)
  ↓
화면 개발 (4주)
---
총 9주
```

### 제안 방식 (병렬)
```
디자인 작업 (3주)  ||  UI 라이브러리로 기능 구현 (3주)
  ↓
스타일 커스터마이징 (1주)
  ↓
화면 개발 (3주)
---
총 7주 (2주 절약)
```

---

## 💻 즉시 시작할 수 있는 템플릿

### Ant Design Pro (강력 추천)
```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install antd @ant-design/pro-components
```

**특징:**
- Admin 레이아웃 기본 제공
- 로그인, 목록, 폼 예제 다 있음
- 그대로 써도 70% 완성

**데모:** https://preview.pro.ant.design/

### 직접 설정
```bash
npm install antd
npm install @ant-design/icons  # 아이콘
```

```tsx
// App.tsx
import { ConfigProvider } from 'antd';
import koKR from 'antd/locale/ko_KR';

function App() {
  return (
    <ConfigProvider locale={koKR}>
      {/* 앱 내용 */}
    </ConfigProvider>
  );
}
```

---

## ⚠️ 주의사항

### 하지 말아야 할 것
❌ 디자인 없이 커스텀 컴포넌트 만들기
❌ "어림짐작으로" 디자인하기
❌ 여러 UI 라이브러리 섞어쓰기

### 해야 할 것
✅ 하나만 선택 (Ant Design 추천)
✅ 디자이너에게 계획 공유
✅ 기능 > 디자인 우선순위

---

## 🎤 회의에서 말할 것

"디자인 대기하면 2-3주 손실입니다.
Ant Design으로 기능 먼저 만들고,
디자인 나오면 스타일만 입히겠습니다.

최소 디자인 가이드 (색상, 폰트)만 먼저 주시면
병렬 작업 가능합니다."

---

## 🚀 내일 할 것

1. [ ] Ant Design 설치
2. [ ] 기본 레이아웃 만들기
3. [ ] 상품 목록 화면 (기능만)
4. [ ] 디자이너에게 최소 가이드 요청

**디자인 기다리면 프로젝트 죽습니다.**
**일단 움직이되, 현명하게 움직이세요.**

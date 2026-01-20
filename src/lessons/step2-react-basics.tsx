// ========================================
// React + TypeScript 기본
// ========================================

import React from 'react';
import { Divider } from 'antd';
import { CodePlayground } from '../components/CodePlayground';

// ========================================
// 1. 함수 컴포넌트 기본
// ========================================

// 방법 1: React.FC 사용 (예전 방식)
const Greeting: React.FC = () => {
  return <h1>안녕하세요!</h1>;
};

// 방법 2: 일반 함수 (권장)
function Welcome() {
  return <h1>환영합니다!</h1>;
}

// ========================================
// 2. Props 타입 정의
// ========================================

// 인터페이스로 Props 정의
interface UserCardProps {
  name: string;
  age: number;
  email: string;
}

function UserCard(props: UserCardProps) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>나이: {props.age}</p>
      <p>이메일: {props.email}</p>
    </div>
  );
}

// 구조분해 할당 사용
function UserCardDestruct({ name, age, email }: UserCardProps) {
  return (
    <div>
      <h2>{name}</h2>
      <p>나이: {age}</p>
      <p>이메일: {email}</p>
    </div>
  );
}

// ========================================
// 3. Optional Props
// ========================================

interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;  // 선택적
  color?: string;      // 선택적
}

function Button({ text, onClick, disabled = false, color = "blue" }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ backgroundColor: color }}
    >
      {text}
    </button>
  );
}

// ========================================
// 4. Children Props
// ========================================

interface ContainerProps {
  children: React.ReactNode;  // 자식 요소
  title?: string;
}

function Container({ children, title }: ContainerProps) {
  return (
    <div>
      {title && <h2>{title}</h2>}
      <div>{children}</div>
    </div>
  );
}

// ========================================
// 5. Event 타입
// ========================================

function FormExample() {
  // 클릭 이벤트
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("버튼 클릭!", e.currentTarget);
  };

  // Input 변경 이벤트
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("입력값:", e.target.value);
  };

  // Form 제출 이벤트
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("폼 제출!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={handleChange} />
      <button onClick={handleClick}>제출</button>
    </form>
  );
}

// ========================================
// 6. useState 타입
// ========================================

function Counter() {
  // 타입 추론 (자동으로 number로 인식)
  const [count, setCount] = React.useState(0);

  // 명시적 타입 지정
  const [name, setName] = React.useState<string>("");

  // 객체 타입
  interface User {
    name: string;
    age: number;
  }
  const [user, setUser] = React.useState<User>({
    name: "홍길동",
    age: 25
  });

  // null 가능한 타입
  const [data, setData] = React.useState<string | null>(null);

  return (
    <div>
      <p>카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}

// ========================================
// 🎯 연습 문제
// ========================================

// TODO 1: ProductCard 컴포넌트 만들기
// Props: name(string), price(number), inStock(boolean)
interface ProductCardProps {
  // 여기에 타입 정의
}

function ProductCard(props: ProductCardProps) {
  // 여기에 코드 작성
  return <div></div>;
}

// TODO 2: Input 컴포넌트 만들기
// Props: value(string), onChange(함수), placeholder(선택적)
interface InputProps {
  // 여기에 타입 정의
}

function Input(props: InputProps) {
  // 여기에 코드 작성
  return <input />;
}

// TODO 3: TodoItem 컴포넌트
// Props: text(string), completed(boolean), onToggle(함수)
// completed면 취소선 스타일 적용

// ========================================
// 메인 학습 컴포넌트
// ========================================

export default function Step2ReactBasics() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>📘 Step 2: React + TypeScript 기본</h1>

      <section style={{ marginBottom: '40px' }}>
        <h2>1. 함수 컴포넌트</h2>
        <Greeting />
        <Welcome />
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>2. Props 타입 정의</h2>
        <UserCard name="홍길동" age={25} email="hong@example.com" />
        <UserCardDestruct name="김철수" age={30} email="kim@example.com" />
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>3. Optional Props</h2>
        <Button text="클릭!" onClick={() => alert('Hello')} />
        <Button text="비활성" onClick={() => {}} disabled={true} />
        <Button text="빨간 버튼" onClick={() => {}} color="red" />
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>4. Children Props</h2>
        <Container title="컨테이너 제목">
          <p>이것은 자식 요소입니다.</p>
          <p>여러 개의 자식을 가질 수 있습니다.</p>
        </Container>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>5. Event 타입</h2>
        <FormExample />
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>6. useState 타입</h2>
        <Counter />
      </section>

      <section className="exercise-section">
        <h2>🎯 연습 문제</h2>
        <p>위의 코드를 참고하여 다음 컴포넌트들을 만들어보세요:</p>
        <ol>
          <li><strong>ProductCard</strong>: name, price, inStock props를 받는 상품 카드</li>
          <li><strong>Input</strong>: value, onChange, placeholder(optional) props를 받는 입력 컴포넌트</li>
          <li><strong>TodoItem</strong>: text, completed, onToggle props를 받는 할 일 아이템</li>
        </ol>
        <p>파일 위치: <code>src/lessons/step2-react-basics.tsx</code></p>
      </section>

      <Divider orientation="left">💻 TypeScript 타입 연습</Divider>

      <CodePlayground
        title="예제 1: Props 인터페이스 정의"
        defaultCode={`// Props 인터페이스 정의
interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

interface UserCardProps {
  name: string;
  age: number;
  email: string;
}

// Props 객체 생성 (컴포넌트에 전달할 값)
const buttonProps: ButtonProps = {
  text: "클릭하세요",
  onClick: () => console.log("버튼 클릭!"),
  disabled: false
};

const userProps: UserCardProps = {
  name: "홍길동",
  age: 25,
  email: "hong@example.com"
};

console.log("Button Props:", buttonProps);
console.log("User Props:", userProps);

// onClick 실행
buttonProps.onClick();`}
      />

      <CodePlayground
        title="예제 2: Event 핸들러 타입"
        defaultCode={`// Event 핸들러 함수 타입
type ClickHandler = (event: { target: { value: string } }) => void;
type ChangeHandler = (value: string) => void;

// 핸들러 함수 구현
const handleClick: ClickHandler = (e) => {
  console.log("클릭된 값:", e.target.value);
};

const handleChange: ChangeHandler = (value) => {
  console.log("변경된 값:", value);
};

// 테스트
handleClick({ target: { value: "버튼1" } });
handleChange("새로운 텍스트");

// 여러 핸들러를 객체로 관리
const handlers = {
  onClick: handleClick,
  onChange: handleChange
};

console.log("핸들러 객체:", handlers);`}
      />

      <CodePlayground
        title="예제 3: State 타입"
        defaultCode={`// State 타입 정의
interface User {
  name: string;
  age: number;
}

interface TodoState {
  todos: string[];
  filter: "all" | "active" | "completed";
}

// State 초기값
let user: User = {
  name: "홍길동",
  age: 25
};

let todoState: TodoState = {
  todos: ["공부하기", "운동하기", "독서하기"],
  filter: "all"
};

console.log("초기 사용자:", user);
console.log("초기 Todo:", todoState);

// State 업데이트 시뮬레이션
user = { ...user, age: 26 };
todoState = { ...todoState, filter: "active" };

console.log("업데이트된 사용자:", user);
console.log("업데이트된 Todo:", todoState);`}
        height="400px"
      />

      <CodePlayground
        title="연습 문제: Props 인터페이스 만들기"
        defaultCode={`// TODO 1: ProductCard Props 정의
interface ProductCardProps {
  // name, price, inStock 추가
}

// TODO 2: Input Props 정의
interface InputProps {
  // value, onChange, placeholder(optional) 추가
}

// TODO 3: TodoItem Props 정의
interface TodoItemProps {
  // text, completed, onToggle 추가
}

// 테스트
const productProps: ProductCardProps = {
  name: "노트북",
  price: 1500000,
  inStock: true
};

const inputProps: InputProps = {
  value: "테스트",
  onChange: (val: string) => console.log(val),
  placeholder: "입력하세요"
};

const todoProps: TodoItemProps = {
  text: "TypeScript 공부",
  completed: false,
  onToggle: (id: number) => console.log("Toggle", id)
};

console.log("Product:", productProps);
console.log("Input:", inputProps);
console.log("Todo:", todoProps);`}
        solution={`// TODO 1: ProductCard Props 정의
interface ProductCardProps {
  name: string;
  price: number;
  inStock: boolean;
}

// TODO 2: Input Props 정의
interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;  // Optional
}

// TODO 3: TodoItem Props 정의
interface TodoItemProps {
  text: string;
  completed: boolean;
  onToggle: (id: number) => void;
}

// 테스트
const productProps: ProductCardProps = {
  name: "노트북",
  price: 1500000,
  inStock: true
};

const inputProps: InputProps = {
  value: "테스트",
  onChange: (val: string) => console.log(val),
  placeholder: "입력하세요"
};

const todoProps: TodoItemProps = {
  text: "TypeScript 공부",
  completed: false,
  onToggle: (id: number) => console.log("Toggle", id)
};

console.log("Product:", productProps);
console.log("Input:", inputProps);
console.log("Todo:", todoProps);

// Props 실제 사용
inputProps.onChange("새로운 값");
todoProps.onToggle(1);`}
        height="450px"
      />
    </div>
  );
}

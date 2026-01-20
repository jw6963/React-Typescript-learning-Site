// ========================================
// React Hooks + TypeScript
// ========================================

import React, { useState, useEffect, useRef, useContext, useReducer } from 'react';
import { Divider } from 'antd';
import { CodePlayground } from '../components/CodePlayground';

// ========================================
// 1. useState (복습 + 심화)
// ========================================

function UseStateExamples() {
  // 기본 타입
  const [count, setCount] = useState<number>(0);
  const [name, setName] = useState<string>("");

  // 객체 타입
  interface User {
    name: string;
    age: number;
  }
  const [user, setUser] = useState<User>({ name: "홍길동", age: 25 });

  // null 가능
  const [data, setData] = useState<string | null>(null);

  // 초기값이 함수인 경우
  const [items, setItems] = useState<number[]>(() => {
    return [1, 2, 3];
  });

  return <div>useState 예제</div>;
}

// ========================================
// 2. useEffect
// ========================================

function UseEffectExample() {
  const [count, setCount] = useState(0);

  // 타입 지정 불필요 (void 반환)
  useEffect(() => {
    document.title = `카운트: ${count}`;

    // cleanup 함수
    return () => {
      console.log("cleanup");
    };
  }, [count]);

  // API 호출 예제
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/data");
        const json = await response.json();
        console.log(json);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return <div>useEffect 예제</div>;
}

// ========================================
// 3. useRef
// ========================================

function UseRefExample() {
  // DOM 요소 참조
  const inputRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();  // optional chaining
  };

  // 값 저장용 useRef
  const countRef = useRef<number>(0);

  useEffect(() => {
    countRef.current += 1;
    console.log(`렌더링 횟수: ${countRef.current}`);
  });

  return (
    <div ref={divRef}>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>포커스</button>
    </div>
  );
}

// ========================================
// 4. useContext
// ========================================

// Context 타입 정의
interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

// Provider 컴포넌트
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Context 사용
function ThemedComponent() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("ThemeProvider 안에서 사용해야 합니다");
  }

  const { theme, toggleTheme } = context;

  return (
    <div style={{ background: theme === "light" ? "#fff" : "#333" }}>
      <p>현재 테마: {theme}</p>
      <button onClick={toggleTheme}>테마 변경</button>
    </div>
  );
}

// ========================================
// 5. useReducer
// ========================================

// State 타입
interface CounterState {
  count: number;
}

// Action 타입
type CounterAction =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "RESET" }
  | { type: "SET"; payload: number };

// Reducer 함수
function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "RESET":
      return { count: 0 };
    case "SET":
      return { count: action.payload };
    default:
      return state;
  }
}

function UseReducerExample() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <p>카운트: {state.count}</p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+1</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-1</button>
      <button onClick={() => dispatch({ type: "RESET" })}>초기화</button>
      <button onClick={() => dispatch({ type: "SET", payload: 100 })}>100으로 설정</button>
    </div>
  );
}

// ========================================
// 6. Custom Hook
// ========================================

// API 호출 Custom Hook
interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [url]);

  return { data, loading, error };
}

// 사용 예시
function UserList() {
  interface User {
    id: number;
    name: string;
  }

  const { data, loading, error } = useFetch<User[]>("/api/users");

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error.message}</div>;

  return (
    <ul>
      {data?.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// ========================================
// 🎯 연습 문제
// ========================================

// TODO 1: useLocalStorage Custom Hook 만들기
// localStorage에 값을 저장하고 불러오는 Hook
function useLocalStorage<T>(key: string, initialValue: T) {
  // 여기에 코드 작성
  const [value, setValue] = useState<T>(initialValue);
  return [value, setValue] as const;
}

// TODO 2: useToggle Custom Hook
// boolean 값을 토글하는 Hook
function useToggle(initialValue: boolean = false) {
  // 여기에 코드 작성
}

// TODO 3: 타이머 컴포넌트
// useRef로 interval ID 저장하고 시작/정지/리셋 기능
function TimerComponent() {
  // 여기에 코드 작성
  return <div></div>;
}

// TODO 4: Form 상태 관리 useReducer
// 이름, 이메일, 메시지 필드를 가진 폼
// UPDATE_FIELD, RESET 액션 구현

// ========================================
// 메인 학습 컴포넌트
// ========================================

export default function Step4HooksTypescript() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>🪝 Step 4: React Hooks + TypeScript</h1>

      <section style={{ marginBottom: '40px' }}>
        <h2>1. useState</h2>
        <UseStateExamples />
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>2. useEffect</h2>
        <UseEffectExample />
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>3. useRef</h2>
        <UseRefExample />
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>4. useContext</h2>
        <ThemeProvider>
          <ThemedComponent />
        </ThemeProvider>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>5. useReducer</h2>
        <UseReducerExample />
      </section>

      <section className="exercise-section">
        <h2>🎯 연습 문제</h2>
        <p>위의 코드를 참고하여 다음을 구현해보세요:</p>
        <ol>
          <li><strong>useLocalStorage</strong>: localStorage에 값을 저장/불러오는 Custom Hook</li>
          <li><strong>useToggle</strong>: boolean 값을 토글하는 Custom Hook</li>
          <li><strong>TimerComponent</strong>: useRef로 interval 관리하는 타이머</li>
          <li><strong>Form with useReducer</strong>: 폼 상태를 useReducer로 관리</li>
        </ol>
        <p>파일 위치: <code>src/lessons/step4-hooks-typescript.tsx</code></p>
      </section>

      <Divider orientation="left">💻 Hooks 타입 연습</Divider>

      <CodePlayground
        title="예제 1: useState 타입 정의"
        defaultCode={`// useState 타입 정의하기
// 기본 타입
let count: number = 0;
let name: string = "홍길동";
let isActive: boolean = true;

console.log("count:", count);
console.log("name:", name);
console.log("isActive:", isActive);

// 객체 타입
interface User {
  id: number;
  name: string;
  email: string;
}

let user: User = {
  id: 1,
  name: "김철수",
  email: "kim@example.com"
};

console.log("user:", user);

// 배열 타입
let items: string[] = ["사과", "바나나", "오렌지"];
console.log("items:", items);`}
      />

      <CodePlayground
        title="예제 2: useReducer 타입 정의"
        defaultCode={`// Reducer State와 Action 타입 정의
interface CounterState {
  count: number;
  lastAction: string;
}

type CounterAction =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' }
  | { type: 'SET'; payload: number };

// Reducer 함수
function counterReducer(
  state: CounterState,
  action: CounterAction
): CounterState {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1,
        lastAction: 'INCREMENT'
      };
    case 'DECREMENT':
      return {
        count: state.count - 1,
        lastAction: 'DECREMENT'
      };
    case 'RESET':
      return {
        count: 0,
        lastAction: 'RESET'
      };
    case 'SET':
      return {
        count: action.payload,
        lastAction: 'SET'
      };
    default:
      return state;
  }
}

// 테스트
let state: CounterState = { count: 0, lastAction: 'INIT' };

state = counterReducer(state, { type: 'INCREMENT' });
console.log("INCREMENT:", state);

state = counterReducer(state, { type: 'SET', payload: 100 });
console.log("SET to 100:", state);

state = counterReducer(state, { type: 'RESET' });
console.log("RESET:", state);`}
        height="450px"
      />

      <CodePlayground
        title="예제 3: Custom Hook 타입 정의"
        defaultCode={`// Custom Hook의 반환 타입 정의
interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

// Hook 시뮬레이션
function createUseFetchResult<T>(data: T): UseFetchResult<T> {
  return {
    data: data,
    loading: false,
    error: null
  };
}

// 사용 예시
interface Post {
  id: number;
  title: string;
  body: string;
}

const result: UseFetchResult<Post> = createUseFetchResult({
  id: 1,
  title: "첫 번째 글",
  body: "내용입니다"
});

console.log("Fetch result:", result);
console.log("Data:", result.data);
console.log("Loading:", result.loading);

// 배열 타입으로도 사용 가능
const listResult: UseFetchResult<Post[]> = createUseFetchResult([
  { id: 1, title: "글1", body: "내용1" },
  { id: 2, title: "글2", body: "내용2" }
]);

console.log("List result:", listResult);
console.log("Posts count:", listResult.data?.length);`}
        height="450px"
      />

      <CodePlayground
        title="연습 문제: Hooks 타입 정의하기"
        defaultCode={`// TODO 1: useToggle Hook 타입 정의
// [boolean, () => void] 형태의 반환 타입
type UseToggleReturn = any;  // 여기에 코드 작성

// TODO 2: Form State와 Action 타입 정의
interface FormState {
  // name, email, message 필드 추가
}

type FormAction = any;  // UPDATE_FIELD, RESET 액션 추가

// TODO 3: useLocalStorage 반환 타입 정의
type UseLocalStorageReturn<T> = any;  // [T, (value: T) => void] 형태

// 테스트
const toggleReturn: UseToggleReturn = [true, () => console.log("toggle")];
console.log("Toggle state:", toggleReturn[0]);

const formState: FormState = {
  name: "홍길동",
  email: "hong@example.com",
  message: "안녕하세요"
};
console.log("Form state:", formState);

const storageReturn: UseLocalStorageReturn<string> = [
  "저장된 값",
  (val) => console.log("Save:", val)
];
console.log("Stored value:", storageReturn[0]);`}
        solution={`// TODO 1: useToggle Hook 타입 정의
type UseToggleReturn = [boolean, () => void];

// TODO 2: Form State와 Action 타입 정의
interface FormState {
  name: string;
  email: string;
  message: string;
}

type FormAction =
  | { type: 'UPDATE_FIELD'; field: keyof FormState; value: string }
  | { type: 'RESET' };

// TODO 3: useLocalStorage 반환 타입 정의
type UseLocalStorageReturn<T> = [T, (value: T) => void];

// 테스트
const toggleReturn: UseToggleReturn = [true, () => console.log("toggle")];
console.log("Toggle state:", toggleReturn[0]);
toggleReturn[1](); // toggle 함수 호출

const formState: FormState = {
  name: "홍길동",
  email: "hong@example.com",
  message: "안녕하세요"
};
console.log("Form state:", formState);

const storageReturn: UseLocalStorageReturn<string> = [
  "저장된 값",
  (val) => console.log("Save:", val)
];
console.log("Stored value:", storageReturn[0]);
storageReturn[1]("새로운 값"); // 저장 함수 호출`}
        height="500px"
      />
    </div>
  );
}

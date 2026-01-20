// ========================================
// React Hooks + TypeScript
// ========================================

import React, { useState, useEffect, useRef, useContext, useReducer } from 'react';

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
    </div>
  );
}

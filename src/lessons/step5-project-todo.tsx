// ========================================
// 실전 프로젝트: Todo 앱
// ========================================

import React, { useState, useReducer } from 'react';
import { Divider } from 'antd';
import { CodePlayground } from '../components/CodePlayground';

// ========================================
// 1. 타입 정의
// ========================================

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

type FilterType = "all" | "active" | "completed";

// ========================================
// 2. Reducer 방식 (선택 1)
// ========================================

interface TodoState {
  todos: Todo[];
  filter: FilterType;
}

type TodoAction =
  | { type: "ADD_TODO"; payload: string }
  | { type: "TOGGLE_TODO"; payload: number }
  | { type: "DELETE_TODO"; payload: number }
  | { type: "SET_FILTER"; payload: FilterType }
  | { type: "CLEAR_COMPLETED" };

function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case "ADD_TODO":
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
        createdAt: new Date()
      };
      return {
        ...state,
        todos: [...state.todos, newTodo]
      };

    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };

    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };

    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload
      };

    case "CLEAR_COMPLETED":
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed)
      };

    default:
      return state;
  }
}

// ========================================
// 3. 컴포넌트들
// ========================================

// TodoInput 컴포넌트
interface TodoInputProps {
  onAdd: (text: string) => void;
}

function TodoInput({ onAdd }: TodoInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onAdd(input);
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="할 일을 입력하세요"
      />
      <button type="submit">추가</button>
    </form>
  );
}

// TodoItem 컴포넌트
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
        {todo.text}
      </span>
      <button onClick={() => onDelete(todo.id)}>삭제</button>
    </li>
  );
}

// Filter 컴포넌트
interface FilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

function Filter({ currentFilter, onFilterChange }: FilterProps) {
  const filters: FilterType[] = ["all", "active", "completed"];

  return (
    <div>
      {filters.map(filter => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          style={{ fontWeight: currentFilter === filter ? "bold" : "normal" }}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

// ========================================
// 4. 메인 App 컴포넌트
// ========================================

function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
    filter: "all"
  });

  // 필터링된 Todo 목록
  const filteredTodos = state.todos.filter(todo => {
    if (state.filter === "active") return !todo.completed;
    if (state.filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div>
      <h1>Todo List</h1>

      <TodoInput onAdd={(text) => dispatch({ type: "ADD_TODO", payload: text })} />

      <Filter
        currentFilter={state.filter}
        onFilterChange={(filter) => dispatch({ type: "SET_FILTER", payload: filter })}
      />

      <ul>
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={(id) => dispatch({ type: "TOGGLE_TODO", payload: id })}
            onDelete={(id) => dispatch({ type: "DELETE_TODO", payload: id })}
          />
        ))}
      </ul>

      <div>
        <p>전체: {state.todos.length}개</p>
        <p>완료: {state.todos.filter(t => t.completed).length}개</p>
        <button onClick={() => dispatch({ type: "CLEAR_COMPLETED" })}>
          완료된 항목 삭제
        </button>
      </div>
    </div>
  );
}

// ========================================
// 학습용 메인 컴포넌트
// ========================================

export default function Step5ProjectTodo() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>🚀 Step 5: Todo 앱 프로젝트</h1>

      <section style={{ marginBottom: '40px' }}>
        <h2>실행 예제</h2>
        <TodoApp />
      </section>

      <Divider orientation="left">💻 Todo 타입 연습</Divider>

      <CodePlayground
        title="예제 1: Todo 타입 정의"
        defaultCode={`// Todo 인터페이스
interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

// Todo 생성 함수
function createTodo(text: string): Todo {
  return {
    id: Date.now(),
    text: text,
    completed: false,
    createdAt: new Date()
  };
}

// Todo 목록
const todos: Todo[] = [
  createTodo("TypeScript 공부하기"),
  createTodo("React 프로젝트 만들기"),
  createTodo("포트폴리오 작성하기")
];

console.log("Todo 목록:", todos);
console.log("첫 번째 Todo:", todos[0]);

// Todo 토글
function toggleTodo(todo: Todo): Todo {
  return { ...todo, completed: !todo.completed };
}

const toggled = toggleTodo(todos[0]);
console.log("토글된 Todo:", toggled);`}
        height="400px"
      />

      <CodePlayground
        title="예제 2: Reducer 타입 정의"
        defaultCode={`// State 타입
interface TodoState {
  todos: Array<{ id: number; text: string; completed: boolean }>;
  filter: 'all' | 'active' | 'completed';
}

// Action 타입
type TodoAction =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'DELETE_TODO'; payload: number }
  | { type: 'SET_FILTER'; payload: 'all' | 'active' | 'completed' };

// Reducer 함수
function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false
          }
        ]
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };
    default:
      return state;
  }
}

// 테스트
let state: TodoState = {
  todos: [],
  filter: 'all'
};

state = todoReducer(state, { type: 'ADD_TODO', payload: '첫 번째 할 일' });
console.log("ADD_TODO:", state);

state = todoReducer(state, { type: 'ADD_TODO', payload: '두 번째 할 일' });
console.log("ADD_TODO 2:", state);

state = todoReducer(state, { type: 'TOGGLE_TODO', payload: state.todos[0].id });
console.log("TOGGLE_TODO:", state);`}
        height="550px"
      />

      <CodePlayground
        title="연습 문제: Todo 기능 구현하기"
        defaultCode={`// TODO 1: Todo 인터페이스 정의
interface Todo {
  // id, text, completed, priority 추가
  // priority는 'low' | 'medium' | 'high'
}

// TODO 2: 필터 함수 구현
function filterTodos(
  todos: Todo[],
  filter: 'all' | 'active' | 'completed'
): Todo[] {
  // 여기에 코드 작성
  return [];
}

// TODO 3: 정렬 함수 구현
function sortTodosByPriority(todos: Todo[]): Todo[] {
  // high > medium > low 순으로 정렬
  // 여기에 코드 작성
  return [];
}

// 테스트
const todos: Todo[] = [
  { id: 1, text: "긴급 버그 수정", completed: false, priority: 'high' },
  { id: 2, text: "문서 작성", completed: false, priority: 'low' },
  { id: 3, text: "코드 리뷰", completed: true, priority: 'medium' }
];

console.log("전체 Todos:", todos);

const activeTodos = filterTodos(todos, 'active');
console.log("Active Todos:", activeTodos);

const sortedTodos = sortTodosByPriority(todos);
console.log("Sorted Todos:", sortedTodos);`}
        solution={`// TODO 1: Todo 인터페이스 정의
interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

// TODO 2: 필터 함수 구현
function filterTodos(
  todos: Todo[],
  filter: 'all' | 'active' | 'completed'
): Todo[] {
  if (filter === 'active') {
    return todos.filter(todo => !todo.completed);
  }
  if (filter === 'completed') {
    return todos.filter(todo => todo.completed);
  }
  return todos;
}

// TODO 3: 정렬 함수 구현
function sortTodosByPriority(todos: Todo[]): Todo[] {
  const priorityOrder = { high: 3, medium: 2, low: 1 };
  return [...todos].sort((a, b) =>
    priorityOrder[b.priority] - priorityOrder[a.priority]
  );
}

// 테스트
const todos: Todo[] = [
  { id: 1, text: "긴급 버그 수정", completed: false, priority: 'high' },
  { id: 2, text: "문서 작성", completed: false, priority: 'low' },
  { id: 3, text: "코드 리뷰", completed: true, priority: 'medium' }
];

console.log("전체 Todos:", todos);

const activeTodos = filterTodos(todos, 'active');
console.log("Active Todos:", activeTodos);

const completedTodos = filterTodos(todos, 'completed');
console.log("Completed Todos:", completedTodos);

const sortedTodos = sortTodosByPriority(todos);
console.log("Sorted Todos (high to low):", sortedTodos);`}
        height="550px"
      />

      <section className="exercise-section" style={{ marginTop: '40px' }}>
        <h2>🎯 개선 과제</h2>
        <p>위의 Todo 앱에 다음 기능을 추가해보세요:</p>
        <ol>
          <li><strong>localStorage 저장</strong>: useEffect로 todos가 변경될 때마다 저장</li>
          <li><strong>수정 기능</strong>: EDIT_TODO 액션과 수정 모드 UI</li>
          <li><strong>정렬 기능</strong>: 생성일, 이름순 정렬</li>
          <li><strong>카테고리/태그</strong>: Todo에 category 필드 추가</li>
          <li><strong>API 연동</strong>: fetch로 서버에서 데이터 가져오기</li>
        </ol>
        <p>파일 위치: <code>src/lessons/step5-project-todo.tsx</code></p>
      </section>
    </div>
  );
}

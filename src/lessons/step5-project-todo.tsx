// ========================================
// 실전 프로젝트: Todo 앱
// ========================================

import React, { useState, useReducer } from 'react';

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

export default TodoApp;

// ========================================
// 🎯 개선 과제
// ========================================

// TODO 1: localStorage에 저장/불러오기 기능 추가
// useEffect로 todos가 변경될 때마다 저장

// TODO 2: 수정 기능 추가
// EDIT_TODO 액션과 수정 모드 UI

// TODO 3: 정렬 기능
// 생성일, 이름순 정렬

// TODO 4: 카테고리/태그 기능
// Todo에 category 필드 추가

// TODO 5: API 연동
// fetch로 서버에서 데이터 가져오기

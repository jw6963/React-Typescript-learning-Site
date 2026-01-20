// ========================================
// 실전: API 연동 + 에러 처리
// ========================================

import React, { useState, useEffect } from 'react';
import { Divider } from 'antd';
import { CodePlayground } from '../components/CodePlayground';

// ========================================
// 1. API 응답 타입 정의
// ========================================

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface ApiError {
  message: string;
  status: number;
}

// Generic API Response
interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
  loading: boolean;
}

// ========================================
// 2. API 함수들
// ========================================

// 사용자 목록 가져오기
async function fetchUsers(): Promise<User[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

// 게시물 가져오기
async function fetchPosts(): Promise<Post[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

// 게시물 생성
async function createPost(post: Omit<Post, "id">): Promise<Post> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  return response.json();
}

// ========================================
// 3. Custom Hook: useFetch
// ========================================

function useFetch<T>(fetchFn: () => Promise<T>): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchFn();

        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError({
            message: err instanceof Error ? err.message : "Unknown error",
            status: 500
          });
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadData();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, []);

  return { data, error, loading };
}

// ========================================
// 4. 사용자 목록 컴포넌트
// ========================================

function UserList() {
  const { data: users, error, loading } = useFetch<User[]>(fetchUsers);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러: {error.message}</div>;
  }

  if (!users || users.length === 0) {
    return <div>사용자가 없습니다.</div>;
  }

  return (
    <div>
      <h2>사용자 목록</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

// ========================================
// 5. 게시물 목록 + 페이지네이션
// ========================================

function PostList() {
  const { data: posts, error, loading } = useFetch<Post[]>(fetchPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error.message}</div>;
  if (!posts) return <div>게시물이 없습니다.</div>;

  // 페이지네이션
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <div>
      <h2>게시물 목록</h2>

      {currentPosts.map(post => (
        <div key={post.id} style={{ border: "1px solid #ddd", margin: "10px", padding: "10px" }}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}

      <div>
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          이전
        </button>
        <span> 페이지 {currentPage} / {totalPages} </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          다음
        </button>
      </div>
    </div>
  );
}

// ========================================
// 6. 게시물 작성 폼
// ========================================

function CreatePostForm() {
  const [formData, setFormData] = useState({
    userId: 1,
    title: "",
    body: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Post | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      const newPost = await createPost(formData);
      setResult(newPost);
      setFormData({ userId: 1, title: "", body: "" });
    } catch (err) {
      console.error("게시물 생성 실패:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>게시물 작성</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="제목"
            required
          />
        </div>
        <div>
          <textarea
            name="body"
            value={formData.body}
            onChange={handleChange}
            placeholder="내용"
            required
          />
        </div>
        <button type="submit" disabled={submitting}>
          {submitting ? "작성 중..." : "작성"}
        </button>
      </form>

      {result && (
        <div>
          <h3>작성 완료!</h3>
          <p>ID: {result.id}</p>
          <p>제목: {result.title}</p>
        </div>
      )}
    </div>
  );
}

// ========================================
// 7. 메인 App
// ========================================

function ApiApp() {
  const [activeTab, setActiveTab] = useState<"users" | "posts" | "create">("users");

  return (
    <div>
      <h1>API 연동 예제</h1>

      <nav>
        <button onClick={() => setActiveTab("users")}>사용자</button>
        <button onClick={() => setActiveTab("posts")}>게시물</button>
        <button onClick={() => setActiveTab("create")}>작성</button>
      </nav>

      {activeTab === "users" && <UserList />}
      {activeTab === "posts" && <PostList />}
      {activeTab === "create" && <CreatePostForm />}
    </div>
  );
}

// ========================================
// 학습용 메인 컴포넌트
// ========================================

export default function Step5ApiIntegration() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>🌐 Step 5: API 연동 + 에러 처리</h1>

      <section style={{ marginBottom: '40px' }}>
        <h2>실행 예제</h2>
        <ApiApp />
      </section>

      <Divider orientation="left">💻 API 타입 연습</Divider>

      <CodePlayground
        title="예제 1: API 응답 타입 정의"
        defaultCode={`// API 응답 타입 정의하기
interface User {
  id: number;
  name: string;
  email: string;
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Generic API Response 타입
interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

// 사용 예시
const userResponse: ApiResponse<User> = {
  data: { id: 1, name: "홍길동", email: "hong@example.com" },
  error: null,
  loading: false
};

console.log("User Response:", userResponse);

const postListResponse: ApiResponse<Post[]> = {
  data: [
    { userId: 1, id: 1, title: "첫 번째 글", body: "내용입니다" },
    { userId: 1, id: 2, title: "두 번째 글", body: "내용입니다" }
  ],
  error: null,
  loading: false
};

console.log("Post List Response:", postListResponse);
console.log("Posts count:", postListResponse.data?.length);`}
        height="450px"
      />

      <CodePlayground
        title="예제 2: 에러 처리 타입"
        defaultCode={`// 에러 처리를 위한 타입 정의
interface ApiError {
  message: string;
  status: number;
  timestamp?: Date;
}

// Result 타입 (성공 또는 실패)
type Result<T> =
  | { success: true; data: T }
  | { success: false; error: ApiError };

// 사용 예시 - 성공 케이스
const successResult: Result<string> = {
  success: true,
  data: "데이터 로드 성공!"
};

console.log("Success:", successResult);

// 실패 케이스
const errorResult: Result<string> = {
  success: false,
  error: {
    message: "서버 오류",
    status: 500,
    timestamp: new Date()
  }
};

console.log("Error:", errorResult);

// 타입 가드를 사용한 처리
function handleResult<T>(result: Result<T>): void {
  if (result.success) {
    console.log("데이터:", result.data);
  } else {
    console.log("에러:", result.error.message);
  }
}

handleResult(successResult);
handleResult(errorResult);`}
        height="450px"
      />

      <CodePlayground
        title="예제 3: Fetch 함수 타입 정의"
        defaultCode={`// API 호출 함수의 타입 정의
interface ApiConfig {
  baseUrl: string;
  timeout: number;
}

const config: ApiConfig = {
  baseUrl: "https://api.example.com",
  timeout: 5000
};

// Generic fetch 함수 타입
type FetchFunction<T> = (url: string) => Promise<T>;

// 사용 예시 시뮬레이션
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// fetch 함수 시뮬레이션
const fetchTodos: FetchFunction<Todo[]> = async (url: string) => {
  // 실제로는 fetch를 호출하지만, 여기서는 시뮬레이션
  console.log("Fetching from:", url);
  return [
    { id: 1, title: "TypeScript 공부", completed: false },
    { id: 2, title: "React 프로젝트", completed: true }
  ];
};

// 실행
fetchTodos("/todos").then(todos => {
  console.log("Todos:", todos);
  console.log("Total:", todos.length);
});`}
        height="450px"
      />

      <CodePlayground
        title="연습 문제: API Hook 타입 구현하기"
        defaultCode={`// TODO 1: useFetch Hook 반환 타입 정의
interface UseFetchResult<T> {
  // data, loading, error, refetch 필드 추가
}

// TODO 2: HTTP Method 타입 정의
type HttpMethod = any; // 'GET' | 'POST' | 'PUT' | 'DELETE'

// TODO 3: API 옵션 타입 정의
interface ApiOptions {
  // method, headers, body 필드 추가
}

// 테스트
const fetchResult: UseFetchResult<string> = {
  data: "데이터",
  loading: false,
  error: null,
  refetch: () => console.log("refetch")
};

console.log("Fetch Result:", fetchResult);

const method: HttpMethod = 'GET';
console.log("Method:", method);

const options: ApiOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: "새 글" })
};

console.log("Options:", options);`}
        solution={`// TODO 1: useFetch Hook 반환 타입 정의
interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

// TODO 2: HTTP Method 타입 정의
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// TODO 3: API 옵션 타입 정의
interface ApiOptions {
  method: HttpMethod;
  headers?: Record<string, string>;
  body?: string;
}

// 테스트
const fetchResult: UseFetchResult<string> = {
  data: "데이터",
  loading: false,
  error: null,
  refetch: () => console.log("refetch")
};

console.log("Fetch Result:", fetchResult);
console.log("Has data:", fetchResult.data !== null);

const method: HttpMethod = 'GET';
console.log("Method:", method);

const options: ApiOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: "새 글" })
};

console.log("Options:", options);
console.log("Headers:", options.headers);`}
        height="500px"
      />

      <section className="exercise-section" style={{ marginTop: '40px' }}>
        <h2>🎯 개선 과제</h2>
        <p>위의 API 연동 예제에 다음 기능을 추가해보세요:</p>
        <ol>
          <li><strong>검색 기능</strong>: 사용자/게시물을 이름/제목으로 필터링</li>
          <li><strong>상세보기 모달</strong>: 게시물 클릭 시 상세 내용 보기</li>
          <li><strong>무한 스크롤</strong>: 페이지네이션 대신 스크롤로 자동 로드</li>
          <li><strong>에러 바운더리</strong>: 에러 발생 시 fallback UI 표시</li>
          <li><strong>낙관적 업데이트</strong>: 삭제/수정 시 즉시 UI 업데이트 후 API 호출</li>
        </ol>
        <p>파일 위치: <code>src/lessons/step5-api-integration.tsx</code></p>
      </section>
    </div>
  );
}

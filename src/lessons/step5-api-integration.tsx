// ========================================
// 실전: API 연동 + 에러 처리
// ========================================

import React, { useState, useEffect } from 'react';

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

export default ApiApp;

// ========================================
// 🎯 연습 과제
// ========================================

// TODO 1: 검색 기능 추가
// 사용자/게시물을 이름/제목으로 필터링

// TODO 2: 상세보기 모달
// 게시물 클릭 시 상세 내용 보기

// TODO 3: 무한 스크롤
// 페이지네이션 대신 스크롤로 자동 로드

// TODO 4: 에러 바운더리
// 에러 발생 시 fallback UI 표시

// TODO 5: 낙관적 업데이트
// 삭제/수정 시 즉시 UI 업데이트 후 API 호출

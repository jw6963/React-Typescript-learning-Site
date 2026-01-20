// ========================================
// 1단계 연습문제 정답
// ========================================

// step1-basic-types.ts 정답
// ========================================

// TODO 1: greet 함수
function greet(name: string): string {
  return `안녕하세요, ${name}님!`;
}

console.log(greet("홍길동")); // "안녕하세요, 홍길동님!"

// TODO 2: 학생 객체
let student: { name: string; grade: number; isPassed: boolean } = {
  name: "김철수",
  grade: 85,
  isPassed: true
};

// TODO 3: 배열 평균 계산
function getAverage(nums: number[]): number {
  if (nums.length === 0) return 0;
  const sum = nums.reduce((acc, num) => acc + num, 0);
  return sum / nums.length;
}

console.log(getAverage([80, 90, 100])); // 90

// step1-interface.ts 정답
// ========================================

// TODO 1: Book 인터페이스
interface Book {
  readonly isbn: string;
  title: string;
  author: string;
  publishedYear?: number;
}

// TODO 2: Book 객체
const myBook: Book = {
  isbn: "978-1234567890",
  title: "타입스크립트 입문",
  author: "홍길동",
  publishedYear: 2024
};

// TODO 3: GraduateStudent 인터페이스
interface Student {
  studentId: string;
  name: string;
  major: string;
}

interface GraduateStudent extends Student {
  advisor: string;
  researchTopic: string;
}

const gradStudent: GraduateStudent = {
  studentId: "2024001",
  name: "이영희",
  major: "컴퓨터공학",
  advisor: "박교수",
  researchTopic: "인공지능"
};

// step1-type-alias.ts 정답
// ========================================

// TODO 1: HTTP 메서드 타입
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

let method: HttpMethod = "GET";

// TODO 2: 상품 상태 타입
type ProductStatus = "in-stock" | "out-of-stock" | "discontinued";

let status: ProductStatus = "in-stock";

// TODO 3: 권한 객체
type Role = "admin" | "user" | "guest";

type Permission = {
  role: Role;
  canEdit: boolean;
  canDelete: boolean;
};

const adminPermission: Permission = {
  role: "admin",
  canEdit: true,
  canDelete: true
};

// TODO 4: API 응답 활용
type Response<T> = {
  status: "success" | "error";
  data: T;
  message?: string;
};

const numberListResponse: Response<number[]> = {
  status: "success",
  data: [1, 2, 3, 4, 5],
  message: "성공적으로 불러왔습니다"
};

// ========================================
// Interface (인터페이스)
// ========================================

// 객체의 구조를 정의
interface User {
  id: number;
  name: string;
  email: string;
}

const user1: User = {
  id: 1,
  name: "홍길동",
  email: "hong@example.com"
};

// ========================================
// Optional 속성 (선택적 속성)
// ========================================

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;  // ? = 선택적 (있어도 되고 없어도 됨)
}

const product1: Product = {
  id: 1,
  name: "노트북",
  price: 1500000
  // description 없어도 OK
};

const product2: Product = {
  id: 2,
  name: "마우스",
  price: 30000,
  description: "무선 마우스"  // 있어도 OK
};

// ========================================
// Readonly 속성 (읽기 전용)
// ========================================

interface Config {
  readonly apiUrl: string;
  readonly timeout: number;
}

const config: Config = {
  apiUrl: "https://api.example.com",
  timeout: 5000
};

// config.apiUrl = "다른 주소";  // ❌ 오류! readonly라서 변경 불가

// ========================================
// 함수 타입 인터페이스
// ========================================

interface Calculate {
  (x: number, y: number): number;
}

const add: Calculate = (a, b) => a + b;
const subtract: Calculate = (a, b) => a - b;

// ========================================
// Interface 확장 (상속)
// ========================================

interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  employeeId: string;
  department: string;
}

const employee: Employee = {
  name: "김철수",
  age: 28,
  employeeId: "E001",
  department: "개발팀"
};

// ========================================
// 🎯 연습 문제
// ========================================

// TODO 1: Book 인터페이스 정의
// title(필수), author(필수), publishedYear(선택), isbn(읽기전용)
interface Book {
  // 여기에 코드 작성
}

// TODO 2: Book 타입의 객체 만들기
const myBook: Book = {
  // 여기에 코드 작성
};

// TODO 3: Student를 확장한 GraduateStudent 인터페이스
interface Student {
  studentId: string;
  name: string;
  major: string;
}

interface GraduateStudent extends Student {
  // advisor(지도교수), researchTopic(연구주제) 속성 추가
}

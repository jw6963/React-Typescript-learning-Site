// ========================================
// 고급 타입
// ========================================

// ========================================
// 1. Union Types (복습 + 심화)
// ========================================

type Status = "loading" | "success" | "error";

function handleStatus(status: Status) {
  if (status === "loading") {
    console.log("로딩 중...");
  } else if (status === "success") {
    console.log("성공!");
  } else {
    console.log("에러 발생");
  }
}

// 여러 타입 조합
type StringOrNumber = string | number;
type ID = StringOrNumber;

function printId(id: ID) {
  // 타입 가드
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id.toFixed(2));
  }
}

// ========================================
// 2. Intersection Types (교집합)
// ========================================

interface Person {
  name: string;
  age: number;
}

interface Employee {
  employeeId: string;
  department: string;
}

// 두 타입을 합침
type Staff = Person & Employee;

const staff: Staff = {
  name: "김철수",
  age: 30,
  employeeId: "E001",
  department: "개발팀"
};

// ========================================
// 3. Utility Types
// ========================================

// Partial - 모든 속성을 선택적으로
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

type PartialUser = Partial<User>;
const user1: PartialUser = { name: "홍길동" };  // 일부만 있어도 OK

// Required - 모든 속성을 필수로
interface Config {
  apiUrl?: string;
  timeout?: number;
}

type RequiredConfig = Required<Config>;
const config: RequiredConfig = {
  apiUrl: "https://api.com",  // 필수
  timeout: 5000                // 필수
};

// Readonly - 모든 속성을 읽기전용으로
type ReadonlyUser = Readonly<User>;
const user2: ReadonlyUser = {
  id: 1,
  name: "이영희",
  email: "lee@example.com",
  age: 25
};
// user2.name = "박철수";  // ❌ 오류! readonly

// Pick - 특정 속성만 선택
type UserPreview = Pick<User, "id" | "name">;
const preview: UserPreview = {
  id: 1,
  name: "홍길동"
  // email, age 없어도 OK
};

// Omit - 특정 속성 제외
type UserWithoutEmail = Omit<User, "email">;
const user3: UserWithoutEmail = {
  id: 1,
  name: "홍길동",
  age: 30
  // email 없음
};

// Record - 키-값 쌍 객체 생성
type Role = "admin" | "user" | "guest";
type RolePermissions = Record<Role, boolean>;

const permissions: RolePermissions = {
  admin: true,
  user: true,
  guest: false
};

// ========================================
// 4. Generic (제네릭)
// ========================================

// 기본 제네릭
function identity<T>(arg: T): T {
  return arg;
}

const num = identity<number>(123);
const str = identity<string>("hello");

// 배열 제네릭
function getFirstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

const firstNum = getFirstElement([1, 2, 3]);      // number
const firstStr = getFirstElement(["a", "b", "c"]); // string

// 인터페이스 제네릭
interface Box<T> {
  value: T;
}

const numberBox: Box<number> = { value: 123 };
const stringBox: Box<string> = { value: "hello" };

// API 응답 제네릭
interface ApiResponse<T> {
  status: number;
  data: T;
  message: string;
}

interface UserData {
  id: number;
  name: string;
}

const response: ApiResponse<UserData> = {
  status: 200,
  data: { id: 1, name: "홍길동" },
  message: "성공"
};

// ========================================
// 5. Type Assertion (타입 단언)
// ========================================

// as 키워드 사용
const someValue: any = "this is a string";
const strLength: number = (someValue as string).length;

// DOM 요소
const inputElement = document.getElementById("username") as HTMLInputElement;
// inputElement.value = "hello";

// ========================================
// 6. Literal Types
// ========================================

let direction: "up" | "down" | "left" | "right";
direction = "up";     // ✅
// direction = "middle";  // ❌ 오류!

// 함수 매개변수에 사용
function move(direction: "up" | "down" | "left" | "right", distance: number) {
  console.log(`${direction}으로 ${distance}만큼 이동`);
}

move("up", 10);

// ========================================
// 🎯 연습 문제
// ========================================

// TODO 1: API 응답 타입 만들기
// 성공 응답: { status: "success", data: T }
// 에러 응답: { status: "error", error: string }
type ApiResult<T> = any;  // 수정하세요

// TODO 2: Partial을 사용한 업데이트 함수
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

function updateProduct(id: number, updates: Partial<Product>) {
  // 일부 필드만 업데이트
}

// TODO 3: 제네릭 배열 함수
// 배열의 마지막 요소를 반환하는 함수
function getLastElement<T>(arr: T[]): T | undefined {
  // 여기에 코드 작성
  return undefined;
}

// TODO 4: Record 타입 활용
// 요일별 영업시간을 저장하는 타입
type DayOfWeek = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
type BusinessHours = any;  // Record 사용해서 수정

const hours: BusinessHours = {
  mon: "09:00-18:00",
  tue: "09:00-18:00",
  wed: "09:00-18:00",
  thu: "09:00-18:00",
  fri: "09:00-18:00",
  sat: "10:00-15:00",
  sun: "휴무"
};

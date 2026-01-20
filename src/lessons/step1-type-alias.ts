// ========================================
// Type Alias (타입 별칭)
// ========================================

// interface와 비슷하지만 더 유연함
type UserID = number;
type Username = string;

let id: UserID = 123;
let name: Username = "홍길동";

// ========================================
// 객체 타입
// ========================================

type User = {
  id: number;
  name: string;
  email: string;
};

const user: User = {
  id: 1,
  name: "김철수",
  email: "kim@example.com"
};

// ========================================
// Union Type (여러 타입 중 하나)
// ========================================

type Status = "pending" | "approved" | "rejected";

let orderStatus: Status = "pending";  // ✅
// orderStatus = "cancelled";  // ❌ 오류! 정의된 값만 가능

type ID = number | string;
let userId: ID = 123;      // ✅
userId = "USER_001";        // ✅

// ========================================
// 함수 타입
// ========================================

type MathOperation = (a: number, b: number) => number;

const add: MathOperation = (x, y) => x + y;
const multiply: MathOperation = (x, y) => x * y;

// ========================================
// Interface vs Type 차이점
// ========================================

// 1. Interface는 확장(extends), Type은 교집합(&)
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

// Type으로 동일한 작업
type AnimalType = {
  name: string;
};

type DogType = AnimalType & {
  breed: string;
};

// 2. Type은 Union, Primitive 가능
type Result = "success" | "error";  // ✅ type만 가능
type Count = number;  // ✅ type만 가능

// ========================================
// 실용적인 예제
// ========================================

type Response<T> = {
  status: "success" | "error";
  data: T;
  message?: string;
};

type UserData = {
  id: number;
  name: string;
};

const apiResponse: Response<UserData> = {
  status: "success",
  data: {
    id: 1,
    name: "홍길동"
  }
};

// ========================================
// 🎯 연습 문제
// ========================================

// TODO 1: HTTP 메서드 타입 정의
// "GET", "POST", "PUT", "DELETE" 중 하나만 가능
type HttpMethod = string;  // 수정하세요

// TODO 2: 상품 상태 타입
// "in-stock", "out-of-stock", "discontinued" 중 하나
type ProductStatus = string;  // 수정하세요

// TODO 3: 사용자 역할 타입과 권한 객체
type Role = "admin" | "user" | "guest";

type Permission = {
  // role(필수), canEdit(불린), canDelete(불린) 추가
};

// TODO 4: API 응답 타입 활용
// 숫자 배열을 반환하는 API 응답 객체 만들기
const numberListResponse: Response<number[]> = {
  // 여기에 코드 작성
};

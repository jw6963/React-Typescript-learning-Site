// ========================================
// 1. 기본 타입 (Primitive Types)
// ========================================

// string
let username: string = "홍길동";
let email: string = "hong@example.com";

// number
let age: number = 25;
let price: number = 9.99;

// boolean
let isActive: boolean = true;
let hasPermission: boolean = false;

// ========================================
// 2. 배열 (Array)
// ========================================

// 방법 1: 타입[]
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["김", "이", "박"];

// 방법 2: Array<타입>
let scores: Array<number> = [90, 85, 100];

// ========================================
// 3. 객체 (Object)
// ========================================

// 인라인 타입 정의
let user: { name: string; age: number } = {
  name: "김철수",
  age: 30
};

// ========================================
// 4. 함수 (Function)
// ========================================

// 매개변수와 반환값 타입 지정
function add(a: number, b: number): number {
  return a + b;
}

// 반환값 없는 함수
function printMessage(message: string): void {
  console.log(message);
}

// 화살표 함수
const multiply = (x: number, y: number): number => x * y;

// ========================================
// 5. any (가급적 사용 금지)
// ========================================

let anything: any = "문자열";
anything = 123;  // 오류 없음
anything = true;  // 오류 없음

// ========================================
// 🎯 연습 문제
// ========================================

// TODO 1: greet 함수를 완성하세요
// 이름을 받아서 "안녕하세요, [이름]님!"을 반환
function greet(name: string): string {
  // 여기에 코드 작성
  return "";
}

// TODO 2: 학생 객체를 만드세요
// name(문자열), grade(숫자), isPassed(불린) 속성 포함
let student: { name: string; grade: number; isPassed: boolean } = {
  name: "",
  grade: 0,
  isPassed: false
};

// TODO 3: 숫자 배열의 평균을 계산하는 함수
function getAverage(nums: number[]): number {
  // 여기에 코드 작성
  return 0;
}

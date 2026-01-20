import { Card, Space, Typography, Divider, Tag } from 'antd';
import { CodePlayground } from '../components/CodePlayground';

const { Title, Paragraph, Text } = Typography;

// 인터페이스 정의
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // Optional
}

interface Product {
  id: number;
  name: string;
  price: number;
  readonly category: string; // Readonly
}

interface Admin extends User {
  role: string;
  permissions: string[];
}

export default function Step1Interface() {
  // 예제 데이터
  const user: User = {
    id: 1,
    name: '홍길동',
    email: 'hong@example.com',
    age: 25,
  };

  const userWithoutAge: User = {
    id: 2,
    name: '김철수',
    email: 'kim@example.com',
    // age는 optional이므로 생략 가능
  };

  const product: Product = {
    id: 101,
    name: '노트북',
    price: 1500000,
    category: '전자기기',
  };

  const admin: Admin = {
    id: 1,
    name: '관리자',
    email: 'admin@example.com',
    role: 'super_admin',
    permissions: ['read', 'write', 'delete'],
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>📘 Step 1-2: Interface (인터페이스)</Title>
      <Paragraph>
        인터페이스는 객체의 구조를 정의하는 TypeScript의 핵심 기능입니다.
      </Paragraph>

      <Divider />

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* 1. 기본 인터페이스 */}
        <Card title="1. 기본 인터페이스" style={{ marginBottom: 16 }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Text code style={{ display: 'block', whiteSpace: 'pre-wrap' }}>
              {`interface User {
  id: number;
  name: string;
  email: string;
  age?: number;  // Optional
}`}
            </Text>
            <Divider />
            <div>
              <Text strong>예제 1 (모든 속성 포함):</Text>
              <div style={{ marginLeft: 20, marginTop: 8 }}>
                <Tag color="blue">id: {user.id}</Tag>
                <Tag color="green">name: {user.name}</Tag>
                <Tag color="orange">email: {user.email}</Tag>
                <Tag color="purple">age: {user.age}</Tag>
              </div>
            </div>
            <div>
              <Text strong>예제 2 (age 생략):</Text>
              <div style={{ marginLeft: 20, marginTop: 8 }}>
                <Tag color="blue">id: {userWithoutAge.id}</Tag>
                <Tag color="green">name: {userWithoutAge.name}</Tag>
                <Tag color="orange">email: {userWithoutAge.email}</Tag>
                <Tag>age: undefined (선택적 속성)</Tag>
              </div>
            </div>
          </Space>
        </Card>

        {/* 2. Optional 속성 */}
        <Card title="2. Optional 속성 (?)" style={{ marginBottom: 16 }}>
          <Paragraph>
            <Text code>?</Text>를 사용하면 속성을 선택적으로 만들 수 있습니다.
          </Paragraph>
          <Text code style={{ display: 'block', whiteSpace: 'pre-wrap' }}>
            {`interface Config {
  apiUrl: string;      // 필수
  timeout?: number;    // 선택적
  retries?: number;    // 선택적
}`}
          </Text>
          <Divider />
          <Paragraph>
            <Text type="success">✅ 필수 속성은 반드시 제공해야 합니다.</Text>
            <br />
            <Text type="secondary">📝 선택적 속성은 생략 가능합니다.</Text>
          </Paragraph>
        </Card>

        {/* 3. Readonly 속성 */}
        <Card title="3. Readonly 속성" style={{ marginBottom: 16 }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Text code style={{ display: 'block', whiteSpace: 'pre-wrap' }}>
              {`interface Product {
  id: number;
  name: string;
  price: number;
  readonly category: string;  // 읽기 전용
}`}
            </Text>
            <Divider />
            <div>
              <Text strong>상품 정보:</Text>
              <div style={{ marginLeft: 20, marginTop: 8 }}>
                <Tag color="blue">id: {product.id}</Tag>
                <Tag color="green">name: {product.name}</Tag>
                <Tag color="orange">price: {product.price.toLocaleString()}원</Tag>
                <Tag color="red">category: {product.category} (읽기 전용)</Tag>
              </div>
            </div>
            <Paragraph type="warning">
              ⚠️ category는 readonly이므로 생성 후 변경할 수 없습니다.
            </Paragraph>
          </Space>
        </Card>

        {/* 4. 인터페이스 확장 */}
        <Card title="4. 인터페이스 확장 (extends)" style={{ marginBottom: 16 }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Text code style={{ display: 'block', whiteSpace: 'pre-wrap' }}>
              {`interface User {
  id: number;
  name: string;
  email: string;
}

interface Admin extends User {
  role: string;
  permissions: string[];
}`}
            </Text>
            <Divider />
            <div>
              <Text strong>Admin 객체:</Text>
              <div style={{ marginLeft: 20, marginTop: 8 }}>
                <Tag color="blue">id: {admin.id}</Tag>
                <Tag color="green">name: {admin.name}</Tag>
                <Tag color="orange">email: {admin.email}</Tag>
                <Tag color="purple">role: {admin.role}</Tag>
                <Tag color="cyan">permissions: {admin.permissions.join(', ')}</Tag>
              </div>
            </div>
            <Paragraph type="success">
              ✅ Admin은 User의 모든 속성을 상속받고, 추가 속성을 가집니다.
            </Paragraph>
          </Space>
        </Card>

        {/* 5. 함수 시그니처 */}
        <Card title="5. 함수 시그니처 인터페이스" style={{ marginBottom: 16 }}>
          <Text code style={{ display: 'block', whiteSpace: 'pre-wrap' }}>
            {`interface Calculator {
  (a: number, b: number): number;
}

const add: Calculator = (a, b) => a + b;
const subtract: Calculator = (a, b) => a - b;`}
          </Text>
          <Divider />
          <Paragraph>
            함수의 시그니처(매개변수와 반환 타입)를 인터페이스로 정의할 수 있습니다.
          </Paragraph>
        </Card>

        {/* 연습 문제 */}
        <Card
          title="🎯 연습 문제"
          style={{ background: '#fff8e6', borderLeft: '4px solid #faad14' }}
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            <Paragraph>
              <Text strong>TODO 1:</Text> Book 인터페이스 만들기
              <br />
              <Text code>title, author, price, isbn(optional)</Text>
            </Paragraph>
            <Paragraph>
              <Text strong>TODO 2:</Text> Person 인터페이스를 확장하여 Employee 만들기
              <br />
              <Text code>Employee는 Person + employeeId, department</Text>
            </Paragraph>
            <Paragraph>
              <Text strong>TODO 3:</Text> readonly로 불변 객체 만들기
              <br />
              <Text code>Config 인터페이스의 모든 속성을 readonly로</Text>
            </Paragraph>
          </Space>
        </Card>

        {/* 코드 실습 */}
        <Divider orientation="left">💻 코드를 직접 수정하고 실행해보세요!</Divider>

        <CodePlayground
          title="예제 1: 기본 인터페이스"
          defaultCode={`// 인터페이스 정의
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;  // Optional
}

// 인터페이스 사용
const user1: User = {
  id: 1,
  name: "홍길동",
  email: "hong@example.com",
  age: 25
};

const user2: User = {
  id: 2,
  name: "김철수",
  email: "kim@example.com"
  // age는 optional이므로 생략 가능
};

console.log("사용자 1:", user1);
console.log("사용자 2:", user2);`}
        />

        <CodePlayground
          title="예제 2: Readonly 속성"
          defaultCode={`// Readonly 인터페이스
interface Product {
  id: number;
  name: string;
  readonly category: string;
}

const product: Product = {
  id: 101,
  name: "노트북",
  category: "전자기기"
};

console.log("상품:", product);

// name은 수정 가능
product.name = "게이밍 노트북";
console.log("수정된 이름:", product.name);

// category는 readonly라서 수정 불가
// product.category = "컴퓨터";  // ❌ 오류!`}
        />

        <CodePlayground
          title="예제 3: 인터페이스 확장"
          defaultCode={`// 기본 인터페이스
interface Person {
  name: string;
  age: number;
}

// 확장 인터페이스
interface Student extends Person {
  studentId: string;
  grade: number;
}

const student: Student = {
  name: "이학생",
  age: 20,
  studentId: "2024001",
  grade: 3
};

console.log("학생 정보:", student);
console.log("이름:", student.name);
console.log("학년:", student.grade);`}
          height="400px"
        />

        <CodePlayground
          title="연습 문제: 직접 풀어보세요!"
          defaultCode={`// TODO 1: Book 인터페이스 만들기
interface Book {
  // title, author, price, isbn(optional) 추가
}

// TODO 2: Person을 확장하여 Employee 만들기
interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  // employeeId, department 추가
}

// TODO 3: readonly Config 만들기
interface Config {
  // apiUrl, timeout을 readonly로
}

// 테스트
const book: Book = {
  title: "TypeScript 입문",
  author: "홍길동",
  price: 25000
};

const employee: Employee = {
  name: "김직원",
  age: 30,
  employeeId: "E001",
  department: "개발팀"
};

console.log("책:", book);
console.log("직원:", employee);`}
          solution={`// TODO 1: Book 인터페이스 만들기
interface Book {
  title: string;
  author: string;
  price: number;
  isbn?: string;  // Optional
}

// TODO 2: Person을 확장하여 Employee 만들기
interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  employeeId: string;
  department: string;
}

// TODO 3: readonly Config 만들기
interface Config {
  readonly apiUrl: string;
  readonly timeout: number;
}

// 테스트
const book: Book = {
  title: "TypeScript 입문",
  author: "홍길동",
  price: 25000
};

const employee: Employee = {
  name: "김직원",
  age: 30,
  employeeId: "E001",
  department: "개발팀"
};

const config: Config = {
  apiUrl: "https://api.example.com",
  timeout: 3000
};

console.log("책:", book);
console.log("직원:", employee);
console.log("설정:", config);

// config.timeout = 5000;  // ❌ 오류! readonly 속성`}
          height="450px"
        />

        {/* 파일 위치 */}
        <Card style={{ background: '#f0f5ff' }}>
          <Paragraph>
            <Text strong>📝 학습 파일:</Text> <Text code>src/lessons/step1-interface.ts</Text>
          </Paragraph>
          <Paragraph>
            VS Code에서 파일을 열어 전체 코드를 확인하고, 직접 수정하며 학습해보세요!
          </Paragraph>
        </Card>
      </Space>
    </div>
  );
}

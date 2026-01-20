import { Card, Space, Typography, Divider, Tag, Alert } from 'antd';
import { CodePlayground } from '../components/CodePlayground';

const { Title, Paragraph, Text } = Typography;

// Generics 예제
function identity<T>(value: T): T {
  return value;
}

// Utility Types 예제
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

type UserWithoutPassword = Omit<User, 'password'>;
type PartialUser = Partial<User>;
type ReadonlyUser = Readonly<User>;
type UserPick = Pick<User, 'id' | 'name'>;

export default function Step3AdvancedTypes() {
  // Generics 예제
  const num = identity<number>(42);
  const str = identity<string>('Hello');
  const arr = identity<number[]>([1, 2, 3]);

  // Utility Types 예제
  const publicUser: UserWithoutPassword = {
    id: 1,
    name: '홍길동',
    email: 'hong@example.com',
    // password 없음
  };

  const partialUser: PartialUser = {
    name: '김철수',
    // 모든 속성이 optional
  };

  const userBasic: UserPick = {
    id: 1,
    name: '홍길동',
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>📘 Step 3: 고급 타입</Title>
      <Paragraph>
        TypeScript의 고급 타입 기능들을 학습합니다.
      </Paragraph>

      <Divider />

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* 1. Generics */}
        <Card title="1. Generics (제네릭)" style={{ marginBottom: 16 }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Paragraph>
              제네릭을 사용하면 여러 타입에서 동작하는 재사용 가능한 컴포넌트를 만들 수 있습니다.
            </Paragraph>
            <Text code style={{ display: 'block', whiteSpace: 'pre-wrap' }}>
              {`function identity<T>(value: T): T {
  return value;
}

const num = identity<number>(42);
const str = identity<string>('Hello');
const arr = identity<number[]>([1, 2, 3]);`}
            </Text>
            <Divider />
            <div>
              <Text strong>예제:</Text>
              <div style={{ marginLeft: 20, marginTop: 8 }}>
                <Tag color="blue">identity&lt;number&gt;(42) = {num}</Tag>
                <Tag color="green">identity&lt;string&gt;('Hello') = {str}</Tag>
                <Tag color="orange">identity&lt;number[]&gt;([1,2,3]) = {JSON.stringify(arr)}</Tag>
              </div>
            </div>
          </Space>
        </Card>

        {/* 2. Utility Types - Partial */}
        <Card title="2. Utility Types: Partial<T>" style={{ marginBottom: 16 }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Paragraph>
              모든 속성을 선택적(optional)으로 만듭니다.
            </Paragraph>
            <Text code style={{ display: 'block', whiteSpace: 'pre-wrap' }}>
              {`interface User {
  id: number;
  name: string;
  email: string;
}

type PartialUser = Partial<User>;
// = { id?: number; name?: string; email?: string; }`}
            </Text>
            <Divider />
            <div>
              <Text strong>예제:</Text>
              <div style={{ marginLeft: 20, marginTop: 8 }}>
                <Text>partialUser = </Text>
                <Tag color="green">{JSON.stringify(partialUser)}</Tag>
                <Text type="secondary"> (name만 있어도 OK)</Text>
              </div>
            </div>
          </Space>
        </Card>

        {/* 3. Utility Types - Omit */}
        <Card title="3. Utility Types: Omit<T, K>" style={{ marginBottom: 16 }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Paragraph>
              특정 속성을 제외한 타입을 생성합니다.
            </Paragraph>
            <Text code style={{ display: 'block', whiteSpace: 'pre-wrap' }}>
              {`interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

type UserWithoutPassword = Omit<User, 'password'>;
// = { id: number; name: string; email: string; }`}
            </Text>
            <Divider />
            <div>
              <Text strong>예제 (비밀번호 제외):</Text>
              <div style={{ marginLeft: 20, marginTop: 8 }}>
                <Tag color="blue">id: {publicUser.id}</Tag>
                <Tag color="green">name: {publicUser.name}</Tag>
                <Tag color="orange">email: {publicUser.email}</Tag>
                <Tag color="red">password: ❌ (제외됨)</Tag>
              </div>
            </div>
          </Space>
        </Card>

        {/* 4. Utility Types - Pick */}
        <Card title="4. Utility Types: Pick<T, K>" style={{ marginBottom: 16 }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Paragraph>
              특정 속성만 선택하여 새로운 타입을 생성합니다.
            </Paragraph>
            <Text code style={{ display: 'block', whiteSpace: 'pre-wrap' }}>
              {`type UserPick = Pick<User, 'id' | 'name'>;
// = { id: number; name: string; }`}
            </Text>
            <Divider />
            <div>
              <Text strong>예제 (id와 name만):</Text>
              <div style={{ marginLeft: 20, marginTop: 8 }}>
                <Tag color="blue">id: {userBasic.id}</Tag>
                <Tag color="green">name: {userBasic.name}</Tag>
              </div>
            </div>
          </Space>
        </Card>

        {/* 5. Utility Types - Readonly */}
        <Card title="5. Utility Types: Readonly<T>" style={{ marginBottom: 16 }}>
          <Text code style={{ display: 'block', whiteSpace: 'pre-wrap' }}>
            {`type ReadonlyUser = Readonly<User>;
// = { readonly id: number; readonly name: string; ... }

const user: ReadonlyUser = { id: 1, name: 'Hong' };
// user.name = 'Kim';  // ❌ 오류! readonly 속성`}
          </Text>
          <Divider />
          <Paragraph>
            모든 속성을 읽기 전용으로 만듭니다.
          </Paragraph>
        </Card>

        {/* 6. 유용한 Utility Types 목록 */}
        <Card title="6. 자주 사용하는 Utility Types" style={{ marginBottom: 16 }}>
          <Alert
            message="TypeScript 내장 Utility Types"
            description={
              <Space direction="vertical" style={{ width: '100%' }}>
                <div>
                  <Tag color="blue">Partial&lt;T&gt;</Tag>
                  <Text> - 모든 속성을 선택적으로</Text>
                </div>
                <div>
                  <Tag color="green">Required&lt;T&gt;</Tag>
                  <Text> - 모든 속성을 필수로</Text>
                </div>
                <div>
                  <Tag color="orange">Readonly&lt;T&gt;</Tag>
                  <Text> - 모든 속성을 읽기 전용으로</Text>
                </div>
                <div>
                  <Tag color="purple">Pick&lt;T, K&gt;</Tag>
                  <Text> - 특정 속성만 선택</Text>
                </div>
                <div>
                  <Tag color="cyan">Omit&lt;T, K&gt;</Tag>
                  <Text> - 특정 속성 제외</Text>
                </div>
                <div>
                  <Tag color="red">Record&lt;K, T&gt;</Tag>
                  <Text> - 키-값 쌍의 타입 생성</Text>
                </div>
                <div>
                  <Tag color="gold">Exclude&lt;T, U&gt;</Tag>
                  <Text> - Union에서 특정 타입 제외</Text>
                </div>
                <div>
                  <Tag color="lime">Extract&lt;T, U&gt;</Tag>
                  <Text> - Union에서 특정 타입 추출</Text>
                </div>
              </Space>
            }
            type="info"
          />
        </Card>

        {/* 7. Type Guards */}
        <Card title="7. Type Guards (타입 가드)" style={{ marginBottom: 16 }}>
          <Text code style={{ display: 'block', whiteSpace: 'pre-wrap' }}>
            {`function isString(value: any): value is string {
  return typeof value === 'string';
}

function process(value: string | number) {
  if (isString(value)) {
    console.log(value.toUpperCase());  // string 메서드 사용 가능
  } else {
    console.log(value.toFixed(2));     // number 메서드 사용 가능
  }
}`}
          </Text>
          <Divider />
          <Paragraph>
            런타임에 타입을 체크하고 TypeScript가 타입을 좁힐 수 있게 합니다.
          </Paragraph>
        </Card>

        {/* 연습 문제 */}
        <Card
          title="🎯 연습 문제"
          style={{ background: '#fff8e6', borderLeft: '4px solid #faad14' }}
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            <Paragraph>
              <Text strong>TODO 1:</Text> Generic 배열 함수 만들기
              <br />
              <Text code>{`function getFirstElement<T>(arr: T[]): T | undefined`}</Text>
            </Paragraph>
            <Paragraph>
              <Text strong>TODO 2:</Text> Partial로 업데이트 함수 만들기
              <br />
              <Text code>{`function updateUser(user: User, updates: Partial<User>)`}</Text>
            </Paragraph>
            <Paragraph>
              <Text strong>TODO 3:</Text> Record 타입 사용하기
              <br />
              <Text code>{`type UserMap = Record<string, User>  // { [key: string]: User }`}</Text>
            </Paragraph>
          </Space>
        </Card>

        {/* 코드 실습 */}
        <Divider orientation="left">💻 코드를 직접 수정하고 실행해보세요!</Divider>

        <CodePlayground
          title="예제 1: Generics 함수"
          defaultCode={`// Generic 함수 - 여러 타입에서 동작
function identity<T>(value: T): T {
  return value;
}

function getFirstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

function getLastElement<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}

// 사용
console.log("identity(42):", identity(42));
console.log("identity('Hello'):", identity('Hello'));

const numbers = [1, 2, 3, 4, 5];
const names = ['김', '이', '박'];

console.log("첫 번째 숫자:", getFirstElement(numbers));
console.log("첫 번째 이름:", getFirstElement(names));
console.log("마지막 숫자:", getLastElement(numbers));`}
        />

        <CodePlayground
          title="예제 2: Partial과 Omit"
          defaultCode={`// User 인터페이스
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Partial - 모든 속성을 선택적으로
function updateUser(user: User, updates: Partial<User>): User {
  return { ...user, ...updates };
}

// Omit - 특정 속성 제외
type UserWithoutPassword = Omit<User, 'age'>;

// 테스트
const user: User = {
  id: 1,
  name: "홍길동",
  email: "hong@example.com",
  age: 25
};

const updatedUser = updateUser(user, { age: 26 });
console.log("업데이트 전:", user);
console.log("업데이트 후:", updatedUser);

const publicUser: UserWithoutPassword = {
  id: 1,
  name: "김철수",
  email: "kim@example.com"
};
console.log("공개 사용자:", publicUser);`}
          height="400px"
        />

        <CodePlayground
          title="예제 3: Pick과 Record"
          defaultCode={`// Pick - 특정 속성만 선택
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
}

type ProductPreview = Pick<Product, 'id' | 'name' | 'price'>;

// Record - 키-값 타입 정의
type UserRole = 'admin' | 'user' | 'guest';
type RolePermissions = Record<UserRole, string[]>;

const permissions: RolePermissions = {
  admin: ['read', 'write', 'delete'],
  user: ['read', 'write'],
  guest: ['read']
};

const preview: ProductPreview = {
  id: 1,
  name: "노트북",
  price: 1500000
};

console.log("상품 미리보기:", preview);
console.log("권한 설정:", permissions);
console.log("관리자 권한:", permissions.admin);`}
          height="400px"
        />

        <CodePlayground
          title="연습 문제: 직접 풀어보세요!"
          defaultCode={`// TODO 1: Generic 배열 함수 만들기
// 배열의 첫 번째 요소를 반환 (없으면 undefined)
function getFirstElement<T>(arr: T[]): T | undefined {
  // 여기에 코드 작성
}

// TODO 2: Partial로 업데이트 함수 만들기
interface User {
  id: number;
  name: string;
  email: string;
}

function updateUser(user: User, updates: any): User {
  // 여기에 코드 작성 (Partial<User> 사용)
  return user;
}

// TODO 3: Record 타입으로 UserMap 만들기
// key는 문자열, value는 User
type UserMap = any;  // Record 사용

// 테스트
const numbers = [10, 20, 30];
const names = ['Alice', 'Bob', 'Charlie'];

console.log("첫 숫자:", getFirstElement(numbers));
console.log("첫 이름:", getFirstElement(names));

const user: User = {
  id: 1,
  name: "홍길동",
  email: "hong@example.com"
};

const updated = updateUser(user, { name: "김철수" });
console.log("업데이트된 사용자:", updated);

const userMap: UserMap = {
  "user1": { id: 1, name: "홍길동", email: "hong@example.com" },
  "user2": { id: 2, name: "김철수", email: "kim@example.com" }
};

console.log("사용자 맵:", userMap);`}
          solution={`// TODO 1: Generic 배열 함수 만들기
function getFirstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

// TODO 2: Partial로 업데이트 함수 만들기
interface User {
  id: number;
  name: string;
  email: string;
}

function updateUser(user: User, updates: Partial<User>): User {
  return { ...user, ...updates };
}

// TODO 3: Record 타입으로 UserMap 만들기
type UserMap = Record<string, User>;

// 테스트
const numbers = [10, 20, 30];
const names = ['Alice', 'Bob', 'Charlie'];

console.log("첫 숫자:", getFirstElement(numbers));
console.log("첫 이름:", getFirstElement(names));

const user: User = {
  id: 1,
  name: "홍길동",
  email: "hong@example.com"
};

const updated = updateUser(user, { name: "김철수" });
console.log("업데이트된 사용자:", updated);

const userMap: UserMap = {
  "user1": { id: 1, name: "홍길동", email: "hong@example.com" },
  "user2": { id: 2, name: "김철수", email: "kim@example.com" }
};

console.log("사용자 맵:", userMap);
console.log("user1:", userMap["user1"]);`}
          height="550px"
        />

        {/* 파일 위치 */}
        <Card style={{ background: '#f0f5ff' }}>
          <Paragraph>
            <Text strong>📝 학습 파일:</Text> <Text code>src/lessons/step3-advanced-types.ts</Text>
          </Paragraph>
          <Paragraph>
            VS Code에서 파일을 열어 전체 코드를 확인하고, 직접 수정하며 학습해보세요!
          </Paragraph>
        </Card>
      </Space>
    </div>
  );
}

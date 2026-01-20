import { Card, Space, Typography, Divider, Tag, Alert } from 'antd';
import { CodePlayground } from '../components/CodePlayground';

const { Title, Paragraph, Text } = Typography;

// Type Alias 정의
type UserID = string | number;
type Status = 'active' | 'inactive' | 'pending';
type Point = { x: number; y: number };

type UserType = {
  id: UserID;
  name: string;
  status: Status;
};

// Union Type
type Result = string | number | boolean;

// Intersection Type
type Person = { name: string; age: number };
type Employee = { employeeId: string; department: string };
type EmployeePerson = Person & Employee;

export default function Step1TypeAlias() {
  // 예제 데이터
  const userId1: UserID = 123;
  const userId2: UserID = 'user-abc-123';

  const userStatus: Status = 'active';

  const point: Point = { x: 10, y: 20 };

  const user: UserType = {
    id: 1,
    name: '홍길동',
    status: 'active',
  };

  const result1: Result = 'success';
  const result2: Result = 200;
  const result3: Result = true;

  const employee: EmployeePerson = {
    name: '김철수',
    age: 30,
    employeeId: 'E001',
    department: '개발팀',
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>📘 Step 1-3: Type Alias (타입 별칭)</Title>
      <Paragraph>
        Type Alias는 타입에 이름을 부여하여 재사용하고 코드를 더 읽기 쉽게 만듭니다.
      </Paragraph>

      <Divider />

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* 1. 기본 Type Alias */}
        <Card title="1. 기본 Type Alias" style={{ marginBottom: 16 }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Text code style={{ display: 'block', whiteSpace: 'pre-wrap' }}>
              {`type UserID = string | number;
type Status = 'active' | 'inactive' | 'pending';
type Point = { x: number; y: number };`}
            </Text>
            <Divider />
            <div>
              <Text strong>UserID 예제:</Text>
              <div style={{ marginLeft: 20, marginTop: 8 }}>
                <Tag color="blue">userId1: {userId1} (number)</Tag>
                <Tag color="green">userId2: {userId2} (string)</Tag>
              </div>
            </div>
            <div>
              <Text strong>Status 예제:</Text>
              <div style={{ marginLeft: 20, marginTop: 8 }}>
                <Tag color={userStatus === 'active' ? 'success' : 'default'}>
                  status: {userStatus}
                </Tag>
              </div>
            </div>
            <div>
              <Text strong>Point 예제:</Text>
              <div style={{ marginLeft: 20, marginTop: 8 }}>
                <Tag color="purple">x: {point.x}</Tag>
                <Tag color="cyan">y: {point.y}</Tag>
              </div>
            </div>
          </Space>
        </Card>

        {/* 2. Union Type */}
        <Card title="2. Union Type (|)" style={{ marginBottom: 16 }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Paragraph>
              여러 타입 중 하나가 될 수 있는 값을 나타냅니다.
            </Paragraph>
            <Text code style={{ display: 'block', whiteSpace: 'pre-wrap' }}>
              {`type Result = string | number | boolean;

const result1: Result = 'success';
const result2: Result = 200;
const result3: Result = true;`}
            </Text>
            <Divider />
            <div>
              <Text strong>Result 예제:</Text>
              <div style={{ marginLeft: 20, marginTop: 8 }}>
                <Tag color="blue">result1: "{result1}" (string)</Tag>
                <Tag color="green">result2: {result2} (number)</Tag>
                <Tag color="orange">result3: {result3.toString()} (boolean)</Tag>
              </div>
            </div>
          </Space>
        </Card>

        {/* 3. Intersection Type */}
        <Card title="3. Intersection Type (&)" style={{ marginBottom: 16 }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Paragraph>
              여러 타입을 하나로 합칩니다. 모든 속성을 포함해야 합니다.
            </Paragraph>
            <Text code style={{ display: 'block', whiteSpace: 'pre-wrap' }}>
              {`type Person = { name: string; age: number };
type Employee = { employeeId: string; department: string };
type EmployeePerson = Person & Employee;`}
            </Text>
            <Divider />
            <div>
              <Text strong>EmployeePerson 예제:</Text>
              <div style={{ marginLeft: 20, marginTop: 8 }}>
                <Tag color="blue">name: {employee.name}</Tag>
                <Tag color="green">age: {employee.age}</Tag>
                <Tag color="orange">employeeId: {employee.employeeId}</Tag>
                <Tag color="purple">department: {employee.department}</Tag>
              </div>
            </div>
            <Paragraph type="success">
              ✅ EmployeePerson은 Person과 Employee의 모든 속성을 가져야 합니다.
            </Paragraph>
          </Space>
        </Card>

        {/* 4. Type vs Interface */}
        <Card title="4. Type vs Interface 비교" style={{ marginBottom: 16 }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Alert
              message="Type과 Interface의 차이점"
              description={
                <div>
                  <Paragraph>
                    <Text strong>공통점:</Text> 둘 다 객체의 구조를 정의할 수 있습니다.
                  </Paragraph>
                  <Paragraph>
                    <Text strong>Type의 장점:</Text>
                    <ul>
                      <li>Union Type 지원 (A | B)</li>
                      <li>Intersection Type 지원 (A & B)</li>
                      <li>Primitive, Tuple, Union 등 다양한 타입 별칭 가능</li>
                    </ul>
                  </Paragraph>
                  <Paragraph>
                    <Text strong>Interface의 장점:</Text>
                    <ul>
                      <li>선언 병합 (Declaration Merging) 가능</li>
                      <li>extends로 확장 가능</li>
                      <li>객체 지향 프로그래밍에 더 적합</li>
                    </ul>
                  </Paragraph>
                </div>
              }
              type="info"
            />
            <Divider />
            <Text code style={{ display: 'block', whiteSpace: 'pre-wrap' }}>
              {`// Type으로만 가능
type ID = string | number;
type Callback = (data: string) => void;

// Interface로 가능
interface User {
  name: string;
}
interface User {  // 선언 병합
  age: number;
}

// 둘 다 가능
type UserType = { name: string; age: number };
interface UserInterface { name: string; age: number; }`}
            </Text>
          </Space>
        </Card>

        {/* 5. Literal Type */}
        <Card title="5. Literal Type (리터럴 타입)" style={{ marginBottom: 16 }}>
          <Text code style={{ display: 'block', whiteSpace: 'pre-wrap' }}>
            {`type Direction = 'up' | 'down' | 'left' | 'right';
type HttpStatus = 200 | 404 | 500;
type Toggle = true | false;  // = boolean

function move(direction: Direction) {
  // direction은 4개 값 중 하나만 가능
}`}
          </Text>
          <Divider />
          <Paragraph>
            리터럴 타입을 사용하면 정확한 값만 허용하여 타입 안정성을 높일 수 있습니다.
          </Paragraph>
        </Card>

        {/* 연습 문제 */}
        <Card
          title="🎯 연습 문제"
          style={{ background: '#fff8e6', borderLeft: '4px solid #faad14' }}
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            <Paragraph>
              <Text strong>TODO 1:</Text> Response 타입 만들기
              <br />
              <Text code>{`type Response = { success: true; data: any } | { success: false; error: string }`}</Text>
            </Paragraph>
            <Paragraph>
              <Text strong>TODO 2:</Text> 색상 리터럴 타입 만들기
              <br />
              <Text code>{`type Color = 'red' | 'green' | 'blue'`}</Text>
            </Paragraph>
            <Paragraph>
              <Text strong>TODO 3:</Text> Intersection으로 타입 합치기
              <br />
              <Text code>Timestamp & Document = 문서 + 타임스탬프</Text>
            </Paragraph>
          </Space>
        </Card>

        {/* 코드 실습 */}
        <Divider orientation="left">💻 코드를 직접 수정하고 실행해보세요!</Divider>

        <CodePlayground
          title="예제 1: Union Type"
          defaultCode={`// Union Type - 여러 타입 중 하나
type UserID = string | number;
type Status = 'active' | 'inactive' | 'pending';

// 사용
let userId1: UserID = 123;
let userId2: UserID = "user-abc";
let status: Status = 'active';

console.log("userId1:", userId1);
console.log("userId2:", userId2);
console.log("status:", status);

// 함수에서 사용
function printId(id: UserID) {
  console.log("ID:", id);
}

printId(123);
printId("user-456");`}
        />

        <CodePlayground
          title="예제 2: Intersection Type"
          defaultCode={`// Intersection Type - 여러 타입을 합침
type Person = {
  name: string;
  age: number;
};

type Employee = {
  employeeId: string;
  department: string;
};

type EmployeePerson = Person & Employee;

// 모든 속성이 필요
const employee: EmployeePerson = {
  name: "김철수",
  age: 30,
  employeeId: "E001",
  department: "개발팀"
};

console.log("직원 정보:", employee);
console.log("이름:", employee.name);
console.log("부서:", employee.department);`}
          height="400px"
        />

        <CodePlayground
          title="예제 3: Literal Type"
          defaultCode={`// Literal Type - 정확한 값만 허용
type Direction = 'up' | 'down' | 'left' | 'right';
type HttpStatus = 200 | 404 | 500;

function move(direction: Direction) {
  console.log("이동 방향:", direction);
}

function handleResponse(status: HttpStatus) {
  if (status === 200) {
    console.log("✅ 성공!");
  } else if (status === 404) {
    console.log("❌ 찾을 수 없음");
  } else {
    console.log("🔥 서버 오류");
  }
}

move('up');
move('right');

handleResponse(200);
handleResponse(404);
handleResponse(500);`}
        />

        <CodePlayground
          title="연습 문제: 직접 풀어보세요!"
          defaultCode={`// TODO 1: Response 타입 만들기
// 성공 시: { success: true, data: any }
// 실패 시: { success: false, error: string }
type Response = any;  // 여기에 코드 작성

// TODO 2: 색상 리터럴 타입 만들기
type Color = any;  // 'red' | 'green' | 'blue'

// TODO 3: Intersection으로 타입 합치기
type Timestamp = {
  createdAt: Date;
  updatedAt: Date;
};

type Document = {
  id: string;
  title: string;
};

type TimestampedDocument = any;  // Timestamp & Document

// 테스트
const successResponse: Response = {
  success: true,
  data: { message: "성공!" }
};

const errorResponse: Response = {
  success: false,
  error: "오류 발생"
};

const color: Color = 'red';

const doc: TimestampedDocument = {
  id: "doc-1",
  title: "문서",
  createdAt: new Date(),
  updatedAt: new Date()
};

console.log("성공 응답:", successResponse);
console.log("오류 응답:", errorResponse);
console.log("색상:", color);
console.log("문서:", doc);`}
          solution={`// TODO 1: Response 타입 만들기
type Response =
  | { success: true; data: any }
  | { success: false; error: string };

// TODO 2: 색상 리터럴 타입 만들기
type Color = 'red' | 'green' | 'blue';

// TODO 3: Intersection으로 타입 합치기
type Timestamp = {
  createdAt: Date;
  updatedAt: Date;
};

type Document = {
  id: string;
  title: string;
};

type TimestampedDocument = Timestamp & Document;

// 테스트
const successResponse: Response = {
  success: true,
  data: { message: "성공!" }
};

const errorResponse: Response = {
  success: false,
  error: "오류 발생"
};

const color: Color = 'red';

const doc: TimestampedDocument = {
  id: "doc-1",
  title: "문서",
  createdAt: new Date(),
  updatedAt: new Date()
};

console.log("성공 응답:", successResponse);
console.log("오류 응답:", errorResponse);
console.log("색상:", color);
console.log("문서:", doc);`}
          height="500px"
        />

        {/* 파일 위치 */}
        <Card style={{ background: '#f0f5ff' }}>
          <Paragraph>
            <Text strong>📝 학습 파일:</Text> <Text code>src/lessons/step1-type-alias.ts</Text>
          </Paragraph>
          <Paragraph>
            VS Code에서 파일을 열어 전체 코드를 확인하고, 직접 수정하며 학습해보세요!
          </Paragraph>
        </Card>
      </Space>
    </div>
  );
}

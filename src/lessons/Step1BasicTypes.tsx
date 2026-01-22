import { useState } from 'react';
import { Card, Button, Input, Space, Typography, Divider } from 'antd';
import { CodePlayground } from '../components/CodePlayground';

const { Title, Paragraph, Text } = Typography;

export default function Step1BasicTypes() {
  const [name, setName] = useState<string>('홍길동');
  const [age, setAge] = useState<number>(25);
  const [isActive, setIsActive] = useState<boolean>(true);

  // 배열 예제
  const [numbers] = useState<number[]>([1, 2, 3, 4, 5]);

  // 함수 예제
  const add = (a: number, b: number): number => a + b;

  // 연습 문제 1
  const greet = (inputName: string): string => {
    return `안녕하세요, ${inputName}님!`;
  };

  // 연습 문제 3
  const getAverage = (nums: number[]): number => {
    const sum = nums.reduce((acc, curr) => acc + curr, 0);
    return sum / nums.length;
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>📘 Step 1: TypeScript 기본 타입</Title>
      <Paragraph>
        TypeScript의 기본 타입들을 실제로 사용해보며 학습합니다.
      </Paragraph>

      <Divider />

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* 1. 기본 타입 */}
        <Card title="1. 기본 타입 (Primitive Types)" style={{ marginBottom: 16 }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <div>
              <Text strong>string: </Text>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: 200 }}
              />
              <Text> (타입: string)</Text>
            </div>
            <div>
              <Text strong>number: </Text>
              <Input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                style={{ width: 200 }}
              />
              <Text> (타입: number)</Text>
            </div>
            <div>
              <Text strong>boolean: </Text>
              <Button onClick={() => setIsActive(!isActive)}>
                {isActive ? '활성화됨 ✅' : '비활성화됨 ❌'} (클릭하여 토글)
              </Button>
              <Text> (타입: boolean)</Text>
            </div>
          </Space>
          <Divider />
          <Text code>
            {`let name: string = "${name}";\nlet age: number = ${age};\nlet isActive: boolean = ${isActive};`}
          </Text>
        </Card>

        {/* 2. 배열 */}
        <Card title="2. 배열 (Array)" style={{ marginBottom: 16 }}>
          <Space direction="vertical">
            <div>
              <Text strong>숫자 배열: </Text>
              <Text code>{JSON.stringify(numbers)}</Text>
            </div>
            <div>
              <Text strong>배열 합계: </Text>
              <Text>{numbers.reduce((a, b) => a + b, 0)}</Text>
            </div>
            <div>
              <Text strong>배열 평균: </Text>
              <Text>{getAverage(numbers).toFixed(2)}</Text>
            </div>
          </Space>
          <Divider />
          <Text code>
            {`let numbers: number[] = ${JSON.stringify(numbers)};\nlet names: string[] = ["김", "이", "박"];`}
          </Text>
        </Card>

        {/* 3. 객체 */}
        <Card title="3. 객체 (Object)" style={{ marginBottom: 16 }}>
          <Space direction="vertical">
            <div>
              <Text strong>사용자 객체: </Text>
              <Text code>{`{ name: "${name}", age: ${age} }`}</Text>
            </div>
          </Space>
          <Divider />
          <Text code>
            {`let user: { name: string; age: number } = {\n  name: "${name}",\n  age: ${age}\n};`}
          </Text>
        </Card>

        {/* 4. 함수 */}
        <Card title="4. 함수 (Function)" style={{ marginBottom: 16 }}>
          <Space direction="vertical">
            <div>
              <Text strong>덧셈 함수: </Text>
              <Text>add(5, 3) = {add(5, 3)}</Text>
            </div>
            <div>
              <Text strong>인사 함수: </Text>
              <Text>{greet(name)}</Text>
            </div>
          </Space>
          <Divider />
          <Text code>
            {`function add(a: number, b: number): number {\n  return a + b;\n}\n\nconst greet = (name: string): string => {\n  return \`안녕하세요, \${name}님!\`;\n};`}
          </Text>
        </Card>

        {/* 연습 문제 */}
        <Card
          title="🎯 연습 문제"
          style={{ background: '#fff8e6', borderLeft: '4px solid #faad14' }}
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            <Paragraph>
              <Text strong>TODO 1:</Text> greet 함수 - 이름을 받아서 인사말 반환
              <br />
              <Text type="success">✅ 위에서 구현됨: {greet('테스트')}</Text>
            </Paragraph>
            <Paragraph>
              <Text strong>TODO 2:</Text> 학생 객체 만들기
              <br />
              <Text code>
                {`let student: { name: string; grade: number; isPassed: boolean } = {\n  name: "김학생",\n  grade: 95,\n  isPassed: true\n};`}
              </Text>
            </Paragraph>
            <Paragraph>
              <Text strong>TODO 3:</Text> 배열 평균 계산 함수
              <br />
              <Text type="success">✅ 위에서 구현됨: {numbers} 의 평균 = {getAverage(numbers).toFixed(2)}</Text>
            </Paragraph>
          </Space>
        </Card>

        {/* 코드 실습 */}
        <Divider orientation="left">💻 코드를 직접 수정하고 실행해보세요!</Divider>

        <CodePlayground
          title="예제 1: 기본 타입 연습"
          lessonKey="step1-1"
          defaultCode={`// 기본 타입 선언하기
let username: string = "홍길동";
let age: number = 25;
let isActive: boolean = true;

console.log("이름:", username);
console.log("나이:", age);
console.log("활성 상태:", isActive);

// 값을 변경해보세요!
username = "김철수";
age = 30;
console.log("변경된 이름:", username);`}
        />

        <CodePlayground
          title="예제 2: 배열 다루기"
          lessonKey="step1-1"
          defaultCode={`// 배열 선언
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["김", "이", "박"];

console.log("숫자 배열:", numbers);
console.log("이름 배열:", names);

// 배열 메서드 사용
let sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log("합계:", sum);
console.log("평균:", sum / numbers.length);

// 배열 추가
numbers.push(6);
console.log("추가 후:", numbers);`}
        />

        <CodePlayground
          title="예제 3: 함수 만들기"
          lessonKey="step1-1"
          defaultCode={`// 함수 타입 지정
function add(a: number, b: number): number {
  return a + b;
}

function greet(name: string): string {
  return \`안녕하세요, \${name}님!\`;
}

// 함수 실행
console.log("5 + 3 =", add(5, 3));
console.log(greet("홍길동"));

// 화살표 함수
const multiply = (x: number, y: number): number => x * y;
console.log("4 × 5 =", multiply(4, 5));`}
        />

        <CodePlayground
          title="연습 문제: 직접 풀어보세요!"
          lessonKey="step1-1"
          defaultCode={`// TODO 1: greet 함수 완성하기
// 이름을 받아서 "안녕하세요, [이름]님!" 반환
function greet(name: string): string {
  // 여기에 코드 작성
  return \`\`;
}

// TODO 2: 학생 객체 만들기
// name(문자열), grade(숫자), isPassed(불린) 속성 포함
let student = {
  // 여기에 코드 작성
};

// TODO 3: 배열 평균 계산 함수
function getAverage(nums: number[]): number {
  // 여기에 코드 작성
  return 0;
}

// 테스트
console.log(greet("홍길동"));
console.log("학생:", student);
console.log("평균:", getAverage([90, 85, 95, 88]));`}
          solution={`// TODO 1: greet 함수 완성하기
function greet(name: string): string {
  return \`안녕하세요, \${name}님!\`;
}

// TODO 2: 학생 객체 만들기
let student: { name: string; grade: number; isPassed: boolean } = {
  name: "김학생",
  grade: 95,
  isPassed: true
};

// TODO 3: 배열 평균 계산 함수
function getAverage(nums: number[]): number {
  const sum = nums.reduce((acc, curr) => acc + curr, 0);
  return sum / nums.length;
}

// 테스트
console.log(greet("홍길동"));
console.log("학생:", student);
console.log("평균:", getAverage([90, 85, 95, 88]));`}
          height="400px"
        />

        {/* 파일 위치 */}
        <Card style={{ background: '#f0f5ff' }}>
          <Paragraph>
            <Text strong>📝 학습 파일:</Text> <Text code>src/lessons/step1-basic-types.ts</Text>
          </Paragraph>
          <Paragraph>
            VS Code에서 파일을 열어 전체 코드를 확인하고, 직접 수정하며 학습해보세요!
          </Paragraph>
        </Card>
      </Space>
    </div>
  );
}

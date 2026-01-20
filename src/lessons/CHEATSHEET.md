# React + TypeScript 급할 때 치트시트

## 자주 쓰는 것만 모음

### Props
```typescript
interface Props {
  name: string;          // 필수
  age?: number;          // 선택
  onClick: () => void;   // 함수
  children?: React.ReactNode;  // 자식
}

function MyComponent({ name, age = 0, onClick }: Props) {
  return <div onClick={onClick}>{name}</div>;
}
```

### State
```typescript
const [text, setText] = useState<string>("");
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);
const [items, setItems] = useState<string[]>([]);
```

### Event
```typescript
// 버튼 클릭
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {};

// Input 입력
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
};

// Form 제출
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};
```

### API
```typescript
interface User {
  id: number;
  name: string;
}

async function fetchUser(): Promise<User> {
  const res = await fetch("/api/user");
  return res.json();
}

// 사용
const [user, setUser] = useState<User | null>(null);

useEffect(() => {
  fetchUser().then(setUser);
}, []);
```

### useRef
```typescript
const inputRef = useRef<HTMLInputElement>(null);
inputRef.current?.focus();
```

### 배열/객체
```typescript
// 배열
const users: User[] = [];

// 객체
const user: User = { id: 1, name: "홍길동" };

// Optional
const email: string | undefined = user.email;
```

### 모르겠으면
```typescript
// 일단 any 쓰고 나중에 고치기
const data: any = response.data;
```

---

## 에러 해결

### "Type 'X' is not assignable to type 'Y'"
→ 타입이 안 맞음. X를 Y로 바꾸거나 타입 정의 수정

### "Property 'X' does not exist"
→ 속성이 없음. Interface에 추가하거나 Optional(?) 사용

### "Cannot find name 'React'"
→ `import React from 'react';` 추가

---

## 복붙용 템플릿

### 기본 컴포넌트
```typescript
interface MyComponentProps {
  title: string;
}

function MyComponent({ title }: MyComponentProps) {
  const [value, setValue] = useState("");

  return (
    <div>
      <h1>{title}</h1>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
}
```

### API 호출 컴포넌트
```typescript
interface Data {
  id: number;
  name: string;
}

function DataComponent() {
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/data")
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <ul>
      {data.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

### Form
```typescript
function MyForm() {
  const [form, setForm] = useState({ name: "", email: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} />
      <input name="email" value={form.email} onChange={handleChange} />
      <button type="submit">제출</button>
    </form>
  );
}
```

// ========================================
// Ant Design 빠른 시작 (MRO+SSP 통합몰)
// ========================================

import React, { useState } from 'react';
import {
  Layout,
  Menu,
  Button,
  Table,
  Card,
  Input,
  Form,
  Select,
  Tag,
  Space,
  Drawer,
  Badge,
} from 'antd';
import {
  ShoppingCartOutlined,
  UserOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Header, Content } = Layout;
const { Search } = Input;

// ========================================
// 타입 (PROJECT-TYPES.ts에서 가져올 것)
// ========================================
interface Product {
  id: number;
  name: string;
  category: 'MRO' | 'SSP';
  price: number;
  stock: number;
}

// ========================================
// 1. 레이아웃 (공통)
// ========================================
function AppLayout({ children }: { children: React.ReactNode }) {
  const [cartCount] = useState(3);

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
          MRO+SSP 통합몰
        </div>

        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={[
            { key: '1', label: 'MRO' },
            { key: '2', label: 'SSP' },
            { key: '3', label: '주문내역' },
          ]}
          style={{ flex: 1, minWidth: 0, marginLeft: 40 }}
        />

        <Space>
          <Badge count={cartCount}>
            <Button type="text" icon={<ShoppingCartOutlined style={{ color: 'white', fontSize: 20 }} />} />
          </Badge>
          <Button type="text" icon={<UserOutlined style={{ color: 'white', fontSize: 20 }} />} />
        </Space>
      </Header>

      <Content style={{ padding: '24px', minHeight: 'calc(100vh - 64px)' }}>
        {children}
      </Content>
    </Layout>
  );
}

// ========================================
// 2. 상품 목록 페이지
// ========================================
function ProductListPage() {
  const [products] = useState<Product[]>([
    { id: 1, name: '볼트 M8x20', category: 'MRO', price: 500, stock: 100 },
    { id: 2, name: '나사못 3x15', category: 'MRO', price: 300, stock: 200 },
    { id: 3, name: '안전장갑', category: 'SSP', price: 5000, stock: 50 },
  ]);

  const columns: ColumnsType<Product> = [
    {
      title: '상품명',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '카테고리',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => (
        <Tag color={category === 'MRO' ? 'blue' : 'green'}>
          {category}
        </Tag>
      ),
    },
    {
      title: '가격',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `${price.toLocaleString()}원`,
    },
    {
      title: '재고',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock: number) => (
        <span style={{ color: stock < 10 ? 'red' : 'inherit' }}>
          {stock}개
        </span>
      ),
    },
    {
      title: '액션',
      key: 'action',
      render: () => (
        <Space>
          <Button type="primary" size="small">장바구니</Button>
          <Button size="small">상세</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* 검색 바 */}
        <Card>
          <Space style={{ width: '100%' }}>
            <Search
              placeholder="상품명 검색"
              style={{ width: 300 }}
              onSearch={(value) => console.log(value)}
            />
            <Select
              placeholder="카테고리"
              style={{ width: 120 }}
              options={[
                { value: 'all', label: '전체' },
                { value: 'MRO', label: 'MRO' },
                { value: 'SSP', label: 'SSP' },
              ]}
            />
            <Select
              placeholder="정렬"
              style={{ width: 150 }}
              defaultValue="latest"
              options={[
                { value: 'latest', label: '최신순' },
                { value: 'price-asc', label: '가격 낮은순' },
                { value: 'price-desc', label: '가격 높은순' },
              ]}
            />
          </Space>
        </Card>

        {/* 상품 목록 */}
        <Table
          columns={columns}
          dataSource={products}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Space>
    </div>
  );
}

// ========================================
// 3. 상품 카드 (그리드 뷰)
// ========================================
function ProductGrid() {
  const products: Product[] = [
    { id: 1, name: '볼트 M8x20', category: 'MRO', price: 500, stock: 100 },
    { id: 2, name: '나사못 3x15', category: 'MRO', price: 300, stock: 200 },
    { id: 3, name: '안전장갑', category: 'SSP', price: 5000, stock: 50 },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
      {products.map(product => (
        <Card
          key={product.id}
          hoverable
          cover={
            <div style={{ height: 200, background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              상품 이미지
            </div>
          }
          actions={[
            <Button type="link" key="detail">상세보기</Button>,
            <Button type="primary" key="cart">장바구니</Button>,
          ]}
        >
          <Card.Meta
            title={product.name}
            description={
              <Space direction="vertical">
                <Tag color={product.category === 'MRO' ? 'blue' : 'green'}>
                  {product.category}
                </Tag>
                <span style={{ fontSize: 16, fontWeight: 'bold' }}>
                  {product.price.toLocaleString()}원
                </span>
                <span style={{ fontSize: 12, color: '#999' }}>
                  재고: {product.stock}개
                </span>
              </Space>
            }
          />
        </Card>
      ))}
    </div>
  );
}

// ========================================
// 4. 주문 폼
// ========================================
function OrderForm() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('주문 데이터:', values);
  };

  return (
    <Card title="주문하기">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="받는 분"
          name="recipientName"
          rules={[{ required: true, message: '받는 분 이름을 입력하세요' }]}
        >
          <Input placeholder="홍길동" />
        </Form.Item>

        <Form.Item
          label="연락처"
          name="phone"
          rules={[{ required: true, message: '연락처를 입력하세요' }]}
        >
          <Input placeholder="010-1234-5678" />
        </Form.Item>

        <Form.Item
          label="주소"
          name="address"
          rules={[{ required: true, message: '주소를 입력하세요' }]}
        >
          <Input.TextArea rows={3} placeholder="서울시 강남구..." />
        </Form.Item>

        <Form.Item
          label="결제 방법"
          name="paymentMethod"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="결제 방법 선택"
            options={[
              { value: 'card', label: '신용카드' },
              { value: 'bank', label: '계좌이체' },
              { value: 'virtual', label: '가상계좌' },
            ]}
          />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" size="large">
              주문하기
            </Button>
            <Button size="large">취소</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
}

// ========================================
// 5. 장바구니 Drawer
// ========================================
function CartDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="primary"
        icon={<ShoppingCartOutlined />}
        onClick={() => setOpen(true)}
      >
        장바구니 (3)
      </Button>

      <Drawer
        title="장바구니"
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
        width={400}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          {[1, 2, 3].map(i => (
            <Card key={i} size="small">
              <Space direction="vertical" style={{ width: '100%' }}>
                <div>상품명 {i}</div>
                <div>
                  <Input
                    type="number"
                    defaultValue={1}
                    style={{ width: 60 }}
                    size="small"
                  />
                  <span style={{ marginLeft: 8 }}>x 10,000원</span>
                </div>
                <Button type="link" danger size="small">삭제</Button>
              </Space>
            </Card>
          ))}

          <Card>
            <div style={{ fontSize: 18, fontWeight: 'bold' }}>
              총 금액: 30,000원
            </div>
          </Card>

          <Button type="primary" size="large" block>
            주문하기
          </Button>
        </Space>
      </Drawer>
    </>
  );
}

// ========================================
// App
// ========================================
function App() {
  return (
    <AppLayout>
      <ProductListPage />
      {/* 또는 <ProductGrid /> */}
      {/* 또는 <OrderForm /> */}
    </AppLayout>
  );
}

export default App;

// ========================================
// 📝 사용 방법
// ========================================

/*
1. 설치:
   npm install antd @ant-design/icons

2. 이 파일 복사해서 App.tsx로

3. 바로 실행:
   npm run dev

4. 디자인 나오면 스타일만 수정:
   - 색상 변경
   - 폰트 변경
   - 간격 조정
   - 필요하면 styled-components 추가

5. 기능은 그대로 유지
*/

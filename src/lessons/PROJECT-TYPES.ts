// ========================================
// MRO + SSP 통합몰 프로젝트 타입 정의
// ========================================

// ========================================
// 1. 상품 (Product) 관련
// ========================================

// 상품 카테고리
type ProductCategory = "MRO" | "SSP";

// 상품 상태
type ProductStatus = "active" | "inactive" | "out-of-stock" | "discontinued";

// 기본 상품 정보
interface Product {
  id: number;
  name: string;
  category: ProductCategory;
  price: number;
  stock: number;
  status: ProductStatus;
  imageUrl?: string;
  description?: string;
  specifications?: Record<string, string>;  // 제품 사양
  createdAt: Date;
  updatedAt: Date;
}

// MRO 전용 필드
interface MROProduct extends Product {
  category: "MRO";
  partNumber: string;      // 부품 번호
  manufacturer: string;    // 제조사
  warrantyPeriod?: number; // 보증 기간(개월)
  minOrderQty: number;     // 최소 주문 수량
}

// SSP 전용 필드
interface SSPProduct extends Product {
  category: "SSP";
  supplierId: number;      // 공급업체 ID
  deliveryTime: number;    // 배송 소요일
  bulkDiscounts?: BulkDiscount[];
}

// 대량 구매 할인
interface BulkDiscount {
  quantity: number;
  discountRate: number;    // 할인율 (%)
}

// ========================================
// 2. 장바구니 (Cart)
// ========================================

interface CartItem {
  productId: number;
  product: Product;
  quantity: number;
  addedAt: Date;
}

interface Cart {
  userId: number;
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
}

// ========================================
// 3. 주문 (Order)
// ========================================

type OrderStatus =
  | "pending"          // 대기
  | "confirmed"        // 확인
  | "processing"       // 처리중
  | "shipped"          // 배송중
  | "delivered"        // 배송완료
  | "cancelled"        // 취소
  | "refunded";        // 환불

interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface Order {
  id: number;
  orderNumber: string;     // 주문번호
  userId: number;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  shippingAddress: Address;
  paymentMethod: PaymentMethod;
  createdAt: Date;
  updatedAt: Date;
}

// ========================================
// 4. 사용자 (User)
// ========================================

type UserRole = "admin" | "buyer" | "seller" | "guest";

interface User {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  company?: string;        // 회사명 (B2B)
  businessNumber?: string; // 사업자번호
  phone: string;
  createdAt: Date;
}

// ========================================
// 5. 주소 (Address)
// ========================================

interface Address {
  id?: number;
  recipientName: string;
  phone: string;
  zipCode: string;
  address: string;
  addressDetail: string;
  isDefault?: boolean;
}

// ========================================
// 6. 결제 (Payment)
// ========================================

type PaymentMethod = "card" | "bank-transfer" | "virtual-account" | "corporate";

interface Payment {
  id: number;
  orderId: number;
  amount: number;
  method: PaymentMethod;
  status: "pending" | "completed" | "failed" | "cancelled";
  paidAt?: Date;
}

// ========================================
// 7. 검색 (Search)
// ========================================

interface SearchFilter {
  category?: ProductCategory;
  keyword?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: ProductStatus[];
  sortBy?: "price-asc" | "price-desc" | "name" | "latest";
  page?: number;
  limit?: number;
}

interface SearchResult<T> {
  items: T[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

// ========================================
// 8. API 응답 (Response)
// ========================================

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
}

interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

// 페이지네이션 응답
interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
}

// ========================================
// 9. 폼 데이터 (Form)
// ========================================

// 상품 등록 폼
interface ProductFormData {
  name: string;
  category: ProductCategory;
  price: number;
  stock: number;
  description?: string;
  imageUrl?: string;
}

// 주문 생성 폼
interface OrderFormData {
  items: {
    productId: number;
    quantity: number;
  }[];
  shippingAddress: Omit<Address, "id">;
  paymentMethod: PaymentMethod;
}

// 회원가입 폼
interface SignUpFormData {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phone: string;
  company?: string;
  businessNumber?: string;
}

// ========================================
// 10. 컴포넌트 Props (자주 쓸 것들)
// ========================================

// 상품 카드
interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: number) => void;
  onViewDetail?: (productId: number) => void;
}

// 주문 목록 아이템
interface OrderListItemProps {
  order: Order;
  onViewDetail: (orderId: number) => void;
  onCancel?: (orderId: number) => void;
}

// 페이지네이션
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// 검색 바
interface SearchBarProps {
  onSearch: (keyword: string) => void;
  placeholder?: string;
  initialValue?: string;
}

// ========================================
// 11. 유틸리티 타입
// ========================================

// 상품 목록 필터
type ProductListFilter = Pick<SearchFilter, "category" | "keyword" | "sortBy">;

// 주문 요약
type OrderSummary = Pick<Order, "id" | "orderNumber" | "totalAmount" | "status" | "createdAt">;

// 사용자 프로필 (민감정보 제외)
type UserProfile = Omit<User, "password">;

// ========================================
// 12. Enum 대안 (const assertion)
// ========================================

export const ORDER_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
  REFUNDED: "refunded"
} as const;

export const PAYMENT_METHODS = {
  CARD: "card",
  BANK_TRANSFER: "bank-transfer",
  VIRTUAL_ACCOUNT: "virtual-account",
  CORPORATE: "corporate"
} as const;

// ========================================
// Export 필요한 것들
// ========================================

export type {
  Product,
  MROProduct,
  SSPProduct,
  Cart,
  CartItem,
  Order,
  OrderItem,
  User,
  Address,
  Payment,
  SearchFilter,
  SearchResult,
  ApiResponse,
  ApiError,
  PaginatedResponse,
  ProductFormData,
  OrderFormData,
  SignUpFormData,
  ProductCardProps,
  OrderListItemProps,
  PaginationProps,
  SearchBarProps,
  ProductCategory,
  ProductStatus,
  OrderStatus,
  UserRole,
  PaymentMethod
};

// ========================================
// MRO + SSP 통합몰 실전 컴포넌트 예제
// ========================================

import React, { useState, useEffect } from 'react';
import type {
  Product,
  Cart,
  Order,
  SearchFilter,
  ApiResponse,
  PaginatedResponse
} from './PROJECT-TYPES';

// ========================================
// 1. 상품 카드 컴포넌트
// ========================================

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: number, quantity: number) => void;
}

function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(product.id, quantity);
  };

  return (
    <div className="product-card">
      <img src={product.imageUrl || "/placeholder.png"} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="category">{product.category}</p>
      <p className="price">{product.price.toLocaleString()}원</p>
      <p className="stock">재고: {product.stock}개</p>

      <div className="actions">
        <input
          type="number"
          min="1"
          max={product.stock}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <button onClick={handleAddToCart} disabled={product.stock === 0}>
          장바구니 담기
        </button>
      </div>
    </div>
  );
}

// ========================================
// 2. 상품 목록 컴포넌트
// ========================================

interface ProductListProps {
  category?: "MRO" | "SSP";
}

function ProductList({ category }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const url = category
          ? `/api/products?category=${category}`
          : '/api/products';

        const response = await fetch(url);
        const data: ApiResponse<Product[]> = await response.json();

        if (data.success && data.data) {
          setProducts(data.data);
        } else {
          setError(data.error?.message || "상품을 불러올 수 없습니다");
        }
      } catch (err) {
        setError("서버 오류가 발생했습니다");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [category]);

  const handleAddToCart = async (productId: number, quantity: number) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity })
      });

      const data: ApiResponse<Cart> = await response.json();

      if (data.success) {
        alert('장바구니에 추가되었습니다');
      }
    } catch (err) {
      alert('장바구니 추가에 실패했습니다');
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류: {error}</div>;

  return (
    <div className="product-list">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}

// ========================================
// 3. 검색 바 컴포넌트
// ========================================

interface SearchBarProps {
  onSearch: (filter: SearchFilter) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState<"MRO" | "SSP" | "">("");
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "latest">("latest");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      keyword: keyword || undefined,
      category: category || undefined,
      sortBy
    });
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="상품명 검색"
      />

      <select value={category} onChange={(e) => setCategory(e.target.value as any)}>
        <option value="">전체</option>
        <option value="MRO">MRO</option>
        <option value="SSP">SSP</option>
      </select>

      <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}>
        <option value="latest">최신순</option>
        <option value="price-asc">가격 낮은순</option>
        <option value="price-desc">가격 높은순</option>
      </select>

      <button type="submit">검색</button>
    </form>
  );
}

// ========================================
// 4. 장바구니 컴포넌트
// ========================================

function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  async function fetchCart() {
    try {
      const response = await fetch('/api/cart');
      const data: ApiResponse<Cart> = await response.json();

      if (data.success && data.data) {
        setCart(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleQuantityChange = async (productId: number, quantity: number) => {
    try {
      await fetch(`/api/cart/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity })
      });
      fetchCart(); // 새로고침
    } catch (err) {
      alert('수량 변경에 실패했습니다');
    }
  };

  const handleRemove = async (productId: number) => {
    try {
      await fetch(`/api/cart/${productId}`, { method: 'DELETE' });
      fetchCart();
    } catch (err) {
      alert('삭제에 실패했습니다');
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (!cart || cart.items.length === 0) {
    return <div>장바구니가 비어있습니다</div>;
  }

  return (
    <div className="cart-page">
      <h1>장바구니</h1>

      <ul className="cart-items">
        {cart.items.map(item => (
          <li key={item.productId}>
            <div className="item-info">
              <h3>{item.product.name}</h3>
              <p>{item.product.price.toLocaleString()}원</p>
            </div>

            <div className="item-actions">
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.productId, Number(e.target.value))}
              />
              <button onClick={() => handleRemove(item.productId)}>삭제</button>
            </div>

            <div className="item-total">
              {(item.product.price * item.quantity).toLocaleString()}원
            </div>
          </li>
        ))}
      </ul>

      <div className="cart-summary">
        <p>총 상품 수: {cart.totalItems}개</p>
        <p className="total-price">총 금액: {cart.totalPrice.toLocaleString()}원</p>
        <button className="checkout-btn">주문하기</button>
      </div>
    </div>
  );
}

// ========================================
// 5. 주문 목록 컴포넌트
// ========================================

function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch('/api/orders');
        const data: ApiResponse<Order[]> = await response.json();

        if (data.success && data.data) {
          setOrders(data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  const getStatusText = (status: Order['status']) => {
    const statusMap = {
      pending: "대기중",
      confirmed: "확인됨",
      processing: "처리중",
      shipped: "배송중",
      delivered: "배송완료",
      cancelled: "취소됨",
      refunded: "환불됨"
    };
    return statusMap[status];
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <div className="order-list">
      <h1>주문 내역</h1>

      {orders.map(order => (
        <div key={order.id} className="order-item">
          <div className="order-header">
            <span>주문번호: {order.orderNumber}</span>
            <span className={`status status-${order.status}`}>
              {getStatusText(order.status)}
            </span>
          </div>

          <div className="order-items">
            {order.items.map((item, idx) => (
              <div key={idx}>
                {item.productName} x {item.quantity}
              </div>
            ))}
          </div>

          <div className="order-footer">
            <span>총 금액: {order.totalAmount.toLocaleString()}원</span>
            <span>{new Date(order.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ========================================
// 6. 페이지네이션 컴포넌트
// ========================================

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        이전
      </button>

      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={currentPage === page ? "active" : ""}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        다음
      </button>
    </div>
  );
}

// Export
export { ProductCard, ProductList, SearchBar, CartPage, OrderList, Pagination };

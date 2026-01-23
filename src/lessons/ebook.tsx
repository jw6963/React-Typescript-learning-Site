import { useState, useRef, forwardRef } from 'react';
import { Button, Typography, Space } from 'antd';
import { LeftOutlined, RightOutlined, BookOutlined } from '@ant-design/icons';
import { useStore } from '../store/useStore';
import HTMLFlipBook from 'react-pageflip';

const { Title, Paragraph } = Typography;

interface PageContent {
  id: number;
  title: string;
  content: string;
  image: string;
}

const pagesData: PageContent[] = [
  {
    id: 1,
    title: '타입스크립트의 시작',
    content: `타입스크립트는 자바스크립트에 타입 시스템을 추가한 프로그래밍 언어입니다.

마이크로소프트에서 개발하고 유지보수하며, 대규모 애플리케이션 개발에 적합합니다.

주요 특징:
• 정적 타입 검사
• 향상된 IDE 지원
• 최신 JavaScript 기능 사용
• 점진적 도입 가능`,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop',
  },
  {
    id: 2,
    title: 'React와 TypeScript',
    content: `React와 TypeScript를 함께 사용하면 컴포넌트의 타입 안정성을 확보할 수 있습니다.

Props, State, Event Handler 등에 타입을 명시하여 런타임 에러를 사전에 방지합니다.

장점:
• Props 타입 자동 완성
• 오타나 잘못된 타입 사용 방지
• 리팩토링 시 안정성 향상
• 더 나은 개발자 경험`,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=500&fit=crop',
  },
  {
    id: 3,
    title: '실전 프로젝트',
    content: `이제 배운 내용을 바탕으로 실제 프로젝트를 만들어봅시다!

Todo 앱, API 연동 등 다양한 예제를 통해 실력을 향상시킬 수 있습니다.

학습 팁:
• 작은 프로젝트부터 시작하기
• 에러 메시지를 주의 깊게 읽기
• 타입 정의를 명확하게 작성하기
• 실제로 코드를 작성하며 연습하기

화이팅! 🚀`,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop',
  },
];

// 표지 페이지 컴포넌트
const CoverPage = forwardRef<HTMLDivElement>((props, ref) => {
  const theme = useStore((state) => state.theme);

  return (
    <div
      ref={ref}
      style={{
        padding: '40px',
        background: theme === 'dark'
          ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
          : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        boxShadow: 'inset 0 0 50px rgba(0,0,0,0.2)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      } as React.CSSProperties}
    >
      <BookOutlined style={{ fontSize: '80px', marginBottom: '24px' }} />
      <Title level={1} style={{ color: 'white', textAlign: 'center', margin: 0 }}>
        TypeScript
      </Title>
      <Title level={2} style={{ color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginTop: '8px' }}>
        학습 가이드
      </Title>
      <Paragraph style={{ color: 'rgba(255,255,255,0.8)', textAlign: 'center', marginTop: '16px', fontSize: '16px' }}>
        TypeScript와 React의 핵심 개념
      </Paragraph>
      <div style={{ marginTop: '40px', fontSize: '14px', opacity: 0.7 }}>
        우측을 클릭하거나 버튼으로 넘기기 →
      </div>
    </div>
  );
});

CoverPage.displayName = 'CoverPage';

// 일반 페이지 컴포넌트
const PageComponent = forwardRef<HTMLDivElement, { pageData: PageContent }>(({ pageData }, ref) => {
  const theme = useStore((state) => state.theme);

  return (
    <div
      ref={ref}
      style={{
        padding: '40px 35px',
        background: theme === 'dark' ? '#262626' : '#ffffff',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'inset 0 0 30px rgba(0,0,0,0.05)',
        overflow: 'hidden',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      } as React.CSSProperties}
    >
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <img
          src={pageData.image}
          alt={pageData.title}
          style={{
            width: '100%',
            height: '180px',
            objectFit: 'cover',
            borderRadius: '8px',
          }}
        />
      </div>

      <Title
        level={3}
        style={{
          color: theme === 'dark' ? '#e5e5e5' : '#1f2937',
          marginBottom: '20px',
          marginTop: 0,
          textAlign: 'center',
          fontSize: '20px',
        }}
      >
        {pageData.title}
      </Title>

      <div
        style={{
          fontSize: '13px',
          lineHeight: '2',
          color: theme === 'dark' ? '#bfbfbf' : '#4b5563',
          whiteSpace: 'pre-line',
          flex: 1,
          overflowY: 'auto',
          padding: '0 20px',
        }}
      >
        {pageData.content}
      </div>

      <div
        style={{
          marginTop: '20px',
          textAlign: 'center',
          fontSize: '11px',
          color: theme === 'dark' ? '#666' : '#999',
        }}
      >
        Page {pageData.id}
      </div>
    </div>
  );
});

PageComponent.displayName = 'PageComponent';

// 마지막 페이지 (뒷표지)
const BackCoverPage = forwardRef<HTMLDivElement>((props, ref) => {
  const theme = useStore((state) => state.theme);

  return (
    <div
      ref={ref}
      style={{
        padding: '40px',
        background: theme === 'dark'
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
          : 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        boxShadow: 'inset 0 0 50px rgba(0,0,0,0.2)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      } as React.CSSProperties}
    >
      <Title level={2} style={{ color: 'white', textAlign: 'center' }}>
        즐거운 학습 되세요! 🎉
      </Title>
      <Paragraph style={{ color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginTop: '16px', fontSize: '16px' }}>
        더 많은 내용은 메뉴에서 확인하세요
      </Paragraph>
    </div>
  );
});

BackCoverPage.displayName = 'BackCoverPage';

export default function EBook() {
  const [currentPage, setCurrentPage] = useState(0);
  const theme = useStore((state) => state.theme);
  const bookRef = useRef<any>(null);

  const totalPages = pagesData.length + 2; // 표지 + 내용 + 뒷표지

  const handlePrevPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipPrev();
    }
  };

  const handleNextPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipNext();
    }
  };

  const handlePageChange = (e: any) => {
    setCurrentPage(e.data);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px', textAlign: 'center' }}>
        <Title level={2} style={{ color: theme === 'dark' ? '#e5e5e5' : '#1f2937' }}>
          <BookOutlined /> TypeScript 학습 E-Book
        </Title>
        <Paragraph style={{ fontSize: '16px', color: theme === 'dark' ? '#bfbfbf' : '#666' }}>
          책처럼 페이지를 넘기며 학습하세요 (클릭하거나 드래그)
        </Paragraph>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '24px',
          perspective: '2000px',
        }}
      >
        <HTMLFlipBook
          ref={bookRef}
          width={450}
          height={600}
          size="stretch"
          minWidth={315}
          maxWidth={450}
          minHeight={400}
          maxHeight={600}
          showCover={true}
          flippingTime={1000}
          style={{
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          }}
          maxShadowOpacity={0.5}
          mobileScrollSupport={true}
          onFlip={handlePageChange}
          className="flip-book"
        >
          <CoverPage />
          {pagesData.map((page) => (
            <PageComponent key={page.id} pageData={page} />
          ))}
          <BackCoverPage />
        </HTMLFlipBook>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '600px',
          margin: '0 auto',
        }}
      >
        <Button
          size="large"
          icon={<LeftOutlined />}
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          style={{
            borderRadius: '8px',
          }}
        >
          이전 페이지
        </Button>

        <Space direction="vertical" align="center" size={0}>
          <div
            style={{
              fontSize: '16px',
              fontWeight: 600,
              color: theme === 'dark' ? '#e5e5e5' : '#1f2937',
            }}
          >
            {currentPage + 1} / {totalPages}
          </div>
          <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
            {Array.from({ length: totalPages }).map((_, index) => (
              <div
                key={index}
                style={{
                  width: index === currentPage ? '30px' : '20px',
                  height: '5px',
                  borderRadius: '3px',
                  background:
                    index === currentPage
                      ? '#6366f1'
                      : theme === 'dark'
                        ? '#3f3f3f'
                        : '#d1d5db',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
        </Space>

        <Button
          size="large"
          type="primary"
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
          style={{
            borderRadius: '8px',
          }}
        >
          다음 페이지
          <RightOutlined />
        </Button>
      </div>

      <div
        style={{
          marginTop: '24px',
          padding: '16px',
          background: theme === 'dark' ? '#262626' : '#f3f4f6',
          borderRadius: '8px',
          textAlign: 'center',
          color: theme === 'dark' ? '#bfbfbf' : '#666',
        }}
      >
        💡 팁: 페이지를 클릭하거나 드래그해서 넘길 수 있습니다. 모바일에서는 스와이프도 가능합니다!
      </div>

      <style>{`
        .flip-book {
          margin: 0 auto;
        }

        .flip-book .stf__wrapper {
          overflow: visible !important;
        }

        .flip-book .stf__item {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          -moz-backface-visibility: hidden;
        }

        .flip-book .stf__parent > div {
          background: ${theme === 'dark' ? '#262626' : '#ffffff'};
        }
      `}</style>
    </div>
  );
}

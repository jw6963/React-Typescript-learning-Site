import { useState, useEffect } from 'react';
import { Layout, Menu, Typography, Button, Progress, Space, Switch } from 'antd';
import { BookOutlined, CodeOutlined, RocketOutlined, LeftOutlined, RightOutlined, BulbOutlined, CheckCircleOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import './App.css';
import { useStore } from './store/useStore';
import { LESSONS, getNextLesson, getPrevLesson, getLessonByKey, TOTAL_LESSONS } from './utils/lessonConfig';

// 학습 단계별 임포트
import Step1BasicTypes from './lessons/Step1BasicTypes';
import Step1Interface from './lessons/Step1Interface';
import Step1TypeAlias from './lessons/Step1TypeAlias';
import Step3AdvancedTypes from './lessons/Step3AdvancedTypes';
import Step2ReactBasics from './lessons/step2-react-basics';
import Step4HooksTypescript from './lessons/step4-hooks-typescript';
import Step5ProjectTodo from './lessons/step5-project-todo';
import Step5ApiIntegration from './lessons/step5-api-integration';
import EBook from './lessons/ebook';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

type MenuItem = Required<MenuProps>['items'][number];

function App() {
  const [selectedLesson, setSelectedLesson] = useState<string>('welcome');
  const [collapsed, setCollapsed] = useState<boolean>(false);

  // Zustand store
  const theme = useStore((state) => state.theme);
  const toggleTheme = useStore((state) => state.toggleTheme);
  const lessonProgress = useStore((state) => state.lessonProgress);
  const markLessonComplete = useStore((state) => state.markLessonComplete);
  const markLessonIncomplete = useStore((state) => state.markLessonIncomplete);
  const visitLesson = useStore((state) => state.visitLesson);
  const getCompletedCount = useStore((state) => state.getCompletedCount);

  // 다크모드 적용
  useEffect(() => {
    document.body.style.backgroundColor = theme === 'dark' ? '#141414' : '#f8fafc';
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  // 레슨 방문 기록
  useEffect(() => {
    if (selectedLesson !== 'welcome') {
      visitLesson(selectedLesson);
    }
  }, [selectedLesson, visitLesson]);

  // 다음/이전 레슨 이동
  const handleNextLesson = () => {
    const next = getNextLesson(selectedLesson);
    if (next) {
      setSelectedLesson(next.key);
    }
  };

  const handlePrevLesson = () => {
    const prev = getPrevLesson(selectedLesson);
    if (prev) {
      setSelectedLesson(prev.key);
    }
  };

  // 키보드 단축키
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          handlePrevLesson();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          handleNextLesson();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedLesson]);

  const completedCount = getCompletedCount();
  const progressPercent = Math.round((completedCount / TOTAL_LESSONS) * 100);

  // Monaco Editor 전역 설정 (한 번만 실행)
  useEffect(() => {
    const setupMonaco = () => {
      const monaco = (window as any).monaco;
      if (monaco) {
        // TypeScript 컴파일러 옵션 설정
        monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
          target: monaco.languages.typescript.ScriptTarget.ES2020,
          lib: ['es2020', 'dom'],
          moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
          module: monaco.languages.typescript.ModuleKind.ESNext,
          strict: true,
          noImplicitAny: true,
          strictNullChecks: true,
          strictFunctionTypes: true,
          strictPropertyInitialization: true,
          noImplicitThis: true,
          alwaysStrict: true,
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
        });

        // 진단 옵션 설정
        monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
          noSemanticValidation: false,
          noSyntaxValidation: false,
        });
      }
    };

    // Monaco가 로드될 때까지 대기
    const checkMonaco = setInterval(() => {
      if ((window as any).monaco) {
        setupMonaco();
        clearInterval(checkMonaco);
      }
    }, 100);

    return () => clearInterval(checkMonaco);
  }, []);

  // 메뉴 아이템에 완료 체크마크 추가
  const createLabel = (key: string, label: string) => (
    <span>
      {label}
      {lessonProgress[key]?.completed && (
        <CheckCircleOutlined style={{ marginLeft: 8, color: '#52c41a' }} />
      )}
    </span>
  );

  const menuItems: MenuItem[] = [
    {
      key: 'basics',
      icon: <BookOutlined />,
      label: '기초 학습',
      children: [
        { key: 'step1-1', label: createLabel('step1-1', 'Step 1-1: 기본 타입') },
        { key: 'step1-2', label: createLabel('step1-2', 'Step 1-2: Interface') },
        { key: 'step1-3', label: createLabel('step1-3', 'Step 1-3: Type Alias') },
        { key: 'step3', label: createLabel('step3', 'Step 3: 고급 타입') },
      ],
    },
    {
      key: 'react',
      icon: <CodeOutlined />,
      label: 'React + TypeScript',
      children: [
        { key: 'step2', label: createLabel('step2', 'Step 2: React 기초') },
        { key: 'step4', label: createLabel('step4', 'Step 4: Hooks & TypeScript') },
      ],
    },
    {
      key: 'projects',
      icon: <RocketOutlined />,
      label: '프로젝트',
      children: [
        { key: 'step5-todo', label: createLabel('step5-todo', 'Step 5: Todo 앱') },
        { key: 'step5-api', label: createLabel('step5-api', 'Step 5: API 연동') },
        { key: 'ebook', label: createLabel('ebook', 'E-Book: TS 학습 가이드') },
      ],
    },
  ];

  const renderLesson = () => {
    switch (selectedLesson) {
      case 'step1-1':
        return <Step1BasicTypes />;
      case 'step1-2':
        return <Step1Interface />;
      case 'step1-3':
        return <Step1TypeAlias />;
      case 'step3':
        return <Step3AdvancedTypes />;
      case 'step2':
        return <Step2ReactBasics />;
      case 'step4':
        return <Step4HooksTypescript />;
      case 'step5-todo':
        return <Step5ProjectTodo />;
      case 'step5-api':
        return <Step5ApiIntegration />;
      case 'ebook':
        return <EBook />;
      default:
        return (
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div
              style={{
                background: theme === 'dark'
                  ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
                  : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                padding: '48px 40px',
                borderRadius: '16px',
                marginBottom: '32px',
                boxShadow: theme === 'dark'
                  ? '0 10px 15px -3px rgb(0 0 0 / 0.4)'
                  : '0 10px 15px -3px rgb(99 102 241 / 0.2)',
              }}
            >
              <Title level={1} style={{ color: 'white', margin: 0, fontSize: '2.5rem', fontWeight: 700 }}>
                👋 환영합니다!
              </Title>
              <p style={{ color: 'rgba(255,255,255,0.95)', fontSize: '1.125rem', marginTop: '12px', marginBottom: 0 }}>
                TypeScript + React 학습 환경에 오신 것을 환영합니다
              </p>
            </div>

            <div style={{ fontSize: '16px', lineHeight: '1.8' }}>
              <div
                style={{
                  padding: '32px',
                  background: theme === 'dark'
                    ? 'linear-gradient(135deg, #262626 0%, #1f1f1f 100%)'
                    : 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
                  borderRadius: '12px',
                  marginBottom: '24px',
                  border: theme === 'dark' ? '1px solid #303030' : '1px solid #e5e7eb',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)',
                }}
              >
                <p style={{ fontSize: '1.05rem', color: theme === 'dark' ? '#bfbfbf' : '#374151', margin: 0 }}>
                  이 프로젝트는 <strong style={{ color: '#6366f1' }}>ts-learning</strong> 폴더의 학습 자료를 실제 React 환경에서 실행하며 공부할 수 있도록 만들어졌습니다.
                </p>
              </div>

              <div
                style={{
                  padding: '32px',
                  background: theme === 'dark' ? '#262626' : 'white',
                  borderRadius: '12px',
                  marginBottom: '24px',
                  border: theme === 'dark' ? '1px solid #303030' : '1px solid #e5e7eb',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)',
                }}
              >
                <Title level={3} style={{ marginTop: 0, marginBottom: '24px', color: theme === 'dark' ? '#e5e5e5' : '#1f2937' }}>
                  📚 학습 방법
                </Title>
                <ol style={{ fontSize: '1rem', paddingLeft: '24px', color: theme === 'dark' ? '#bfbfbf' : '#4b5563' }}>
                  <li style={{ marginBottom: '12px', paddingLeft: '8px' }}>
                    <strong style={{ color: theme === 'dark' ? '#e5e5e5' : '#1f2937' }}>왼쪽 메뉴에서 단계 선택</strong> - 학습하고 싶은 단계를 클릭하세요
                  </li>
                  <li style={{ marginBottom: '12px', paddingLeft: '8px' }}>
                    <strong style={{ color: theme === 'dark' ? '#e5e5e5' : '#1f2937' }}>화면에서 예제 확인</strong> - 각 단계의 예제들이 실제로 실행되는 것을 확인하세요
                  </li>
                  <li style={{ marginBottom: '12px', paddingLeft: '8px' }}>
                    <strong style={{ color: theme === 'dark' ? '#e5e5e5' : '#1f2937' }}>코드 읽기</strong> - VS Code에서 <code>src/lessons/</code> 폴더의 파일을 열어 코드를 읽으세요
                  </li>
                  <li style={{ marginBottom: '12px', paddingLeft: '8px' }}>
                    <strong style={{ color: theme === 'dark' ? '#e5e5e5' : '#1f2937' }}>코드 수정</strong> - 파일을 수정하면 브라우저에서 자동으로 업데이트됩니다 (Hot Reload)
                  </li>
                  <li style={{ marginBottom: '0', paddingLeft: '8px' }}>
                    <strong style={{ color: theme === 'dark' ? '#e5e5e5' : '#1f2937' }}>연습 문제 풀기</strong> - 각 파일 하단의 TODO 부분을 채워보세요
                  </li>
                </ol>
              </div>

              <div
                style={{
                  padding: '32px',
                  background: theme === 'dark' ? '#262626' : 'white',
                  borderRadius: '12px',
                  marginBottom: '24px',
                  border: theme === 'dark' ? '1px solid #303030' : '1px solid #e5e7eb',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)',
                }}
              >
                <Title level={3} style={{ marginTop: 0, marginBottom: '24px', color: theme === 'dark' ? '#e5e5e5' : '#1f2937' }}>
                  🎓 추천 학습 순서
                </Title>
                <div
                  style={{
                    padding: '24px',
                    background: theme === 'dark'
                      ? 'linear-gradient(135deg, #334155 0%, #1e293b 100%)'
                      : 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                    borderRadius: '10px',
                    border: theme === 'dark' ? '1px solid #475569' : '1px solid #93c5fd',
                  }}
                >
                  <div style={{ marginBottom: '24px' }}>
                    <p style={{ fontWeight: 600, fontSize: '1.05rem', marginBottom: '12px', color: theme === 'dark' ? '#94a3b8' : '#1e40af' }}>
                      1단계: TypeScript 기초
                    </p>
                    <ul style={{ marginLeft: '20px', color: theme === 'dark' ? '#bfbfbf' : '#1f2937' }}>
                      <li>Step 1-1: 기본 타입 (string, number, boolean, array, object)</li>
                      <li>Step 1-2: Interface (객체 구조 정의)</li>
                      <li>Step 1-3: Type Alias (Union, Intersection)</li>
                      <li>Step 3: 고급 타입 (Generics, Utility Types)</li>
                    </ul>
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <p style={{ fontWeight: 600, fontSize: '1.05rem', marginBottom: '12px', color: theme === 'dark' ? '#94a3b8' : '#1e40af' }}>
                      2단계: React + TypeScript
                    </p>
                    <ul style={{ marginLeft: '20px', color: theme === 'dark' ? '#bfbfbf' : '#1f2937' }}>
                      <li>Step 2: React 기초 (컴포넌트, Props, 이벤트)</li>
                      <li>Step 4: Hooks & TypeScript (useState, useEffect, useRef, etc.)</li>
                    </ul>
                  </div>

                  <div>
                    <p style={{ fontWeight: 600, fontSize: '1.05rem', marginBottom: '12px', color: theme === 'dark' ? '#94a3b8' : '#1e40af' }}>
                      3단계: 실전 프로젝트
                    </p>
                    <ul style={{ marginLeft: '20px', color: theme === 'dark' ? '#bfbfbf' : '#1f2937', marginBottom: 0 }}>
                      <li>Step 5: Todo 앱 (상태 관리, CRUD)</li>
                      <li>Step 5: API 연동 (fetch, 에러 처리, 페이지네이션)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div
                style={{
                  padding: '32px',
                  background: theme === 'dark' ? '#262626' : 'white',
                  borderRadius: '12px',
                  marginBottom: '24px',
                  border: theme === 'dark' ? '1px solid #303030' : '1px solid #e5e7eb',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)',
                }}
              >
                <Title level={3} style={{ marginTop: 0, marginBottom: '20px', color: theme === 'dark' ? '#e5e5e5' : '#1f2937' }}>
                  💡 학습 팁
                </Title>
                <ul style={{ fontSize: '1rem', marginLeft: '20px', color: theme === 'dark' ? '#bfbfbf' : '#4b5563' }}>
                  <li style={{ marginBottom: '10px' }}>브라우저 개발자 도구(F12)를 열어서 콘솔 메시지를 확인하세요</li>
                  <li style={{ marginBottom: '10px' }}>TypeScript 오류가 있으면 VS Code와 브라우저에서 모두 표시됩니다</li>
                  <li style={{ marginBottom: '10px' }}>
                    원본 파일(<code>../ts-learning</code>)은 수정되지 않으며, 이 프로젝트의 파일만 수정됩니다
                  </li>
                  <li style={{ marginBottom: 0 }}>파일을 수정하면 브라우저가 자동으로 새로고침됩니다</li>
                </ul>
              </div>

              <div
                style={{
                  padding: '32px',
                  background: theme === 'dark'
                    ? 'linear-gradient(135deg, #334155 0%, #1e293b 100%)'
                    : 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                  borderRadius: '12px',
                  border: theme === 'dark' ? '2px solid #475569' : '2px solid #f59e0b',
                  boxShadow: theme === 'dark'
                    ? '0 10px 15px -3px rgb(0 0 0 / 0.4)'
                    : '0 10px 15px -3px rgb(245 158 11 / 0.2)',
                }}
              >
                <Title level={3} style={{ marginTop: 0, marginBottom: '16px', color: theme === 'dark' ? '#e2e8f0' : '#92400e' }}>
                  🚀 시작하기
                </Title>
                <p style={{ fontSize: '1.05rem', marginBottom: 0, color: theme === 'dark' ? '#cbd5e1' : '#78350f' }}>
                  왼쪽 사이드바에서 <strong>"기초 학습 → Step 1-1: 기본 타입"</strong>을 선택하여 학습을 시작하세요!
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', background: theme === 'dark' ? '#141414' : '#f8fafc' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={360}
        collapsedWidth={80}
        style={{
          background: theme === 'dark'
            ? 'linear-gradient(180deg, #1f1f1f 0%, #141414 100%)'
            : 'linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)',
          boxShadow: '2px 0 12px rgba(0,0,0,0.08)',
          borderRight: theme === 'dark' ? '1px solid #303030' : '1px solid #e5e7eb',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
        }}
      >
        <div
          style={{
            padding: collapsed ? '20px 10px' : '20px 24px',
            textAlign: collapsed ? 'center' : 'left',
            borderBottom: theme === 'dark' ? '1px solid #303030' : '1px solid #e5e7eb',
            background: theme === 'dark'
              ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
              : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            flexShrink: 0,
            transition: 'all 0.2s',
          }}
        >
          {collapsed ? (
            <div style={{ fontSize: '24px' }}>🎓</div>
          ) : (
            <>
              <Title level={4} style={{ margin: 0, color: 'white', fontWeight: 700 }}>
                🎓 TS Learning
              </Title>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.9)', marginTop: '6px' }}>
                TypeScript + React
              </div>
            </>
          )}
        </div>

        {/* 진행률 표시 */}
        {!collapsed && (
          <div style={{
            padding: '16px 24px',
            borderBottom: theme === 'dark' ? '1px solid #303030' : '1px solid #e5e7eb',
            background: theme === 'dark' ? '#1f1f1f' : 'white',
          }}>
            <div style={{
              fontSize: '13px',
              color: theme === 'dark' ? '#bfbfbf' : '#666',
              marginBottom: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>학습 진행률</span>
              <span style={{ fontWeight: 600, color: theme === 'dark' ? '#fff' : '#1f2937' }}>
                {completedCount}/{TOTAL_LESSONS}
              </span>
            </div>
            <Progress
              percent={progressPercent}
              strokeColor="#52c41a"
              size="small"
            />
          </div>
        )}

        {/* 다크모드 스위치 */}
        {!collapsed && (
          <div style={{
            padding: '12px 24px',
            borderBottom: theme === 'dark' ? '1px solid #303030' : '1px solid #e5e7eb',
            background: theme === 'dark' ? '#1f1f1f' : 'white',
          }}>
            <Space>
              <BulbOutlined style={{ color: theme === 'dark' ? '#ffd666' : '#faad14' }} />
              <span style={{ fontSize: '13px', color: theme === 'dark' ? '#bfbfbf' : '#666' }}>
                다크 모드
              </span>
              <Switch
                checked={theme === 'dark'}
                onChange={toggleTheme}
                size="small"
              />
            </Space>
          </div>
        )}

        <div style={{ flex: 1, overflow: 'hidden' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['welcome']}
            defaultOpenKeys={collapsed ? [] : ['basics']}
            inlineCollapsed={collapsed}
            items={menuItems}
            onClick={({ key }) => setSelectedLesson(key)}
            style={{
              borderRight: 0,
              height: '100%',
              overflowY: 'auto',
              background: 'transparent',
              padding: collapsed ? '12px 8px' : '12px 16px',
            }}
            theme={theme === 'dark' ? 'dark' : 'light'}
          />
        </div>
      </Sider>
      <Layout>
        <Header
          style={{
            background: theme === 'dark'
              ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
              : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            padding: '0 32px',
            boxShadow: theme === 'dark'
              ? '0 4px 12px rgba(0, 0, 0, 0.3)'
              : '0 4px 12px rgba(99, 102, 241, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Title level={3} style={{ margin: 0, color: 'white', fontWeight: 600 }}>
            React + TypeScript 학습
          </Title>
          {selectedLesson !== 'welcome' && (
            <Button
              type="primary"
              ghost
              onClick={() => {
                const isCompleted = lessonProgress[selectedLesson]?.completed;
                if (isCompleted) {
                  markLessonIncomplete(selectedLesson);
                } else {
                  markLessonComplete(selectedLesson);
                }
              }}
              style={{ color: 'white', borderColor: 'white' }}
            >
              {lessonProgress[selectedLesson]?.completed ? '완료 취소' : '완료 표시'}
            </Button>
          )}
        </Header>
        <Content
          style={{
            margin: '24px',
            padding: '32px',
            background: theme === 'dark' ? '#1f1f1f' : 'white',
            minHeight: 280,
            overflowY: 'auto',
            height: 'calc(100vh - 112px)',
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
            color: theme === 'dark' ? '#e5e5e5' : 'inherit',
          }}
        >
          {renderLesson()}

          {/* 다음/이전 네비게이션 */}
          {selectedLesson !== 'welcome' && (
            <div
              style={{
                marginTop: '48px',
                paddingTop: '24px',
                borderTop: theme === 'dark' ? '1px solid #303030' : '1px solid #e5e7eb',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Button
                size="large"
                icon={<LeftOutlined />}
                onClick={handlePrevLesson}
                disabled={!getPrevLesson(selectedLesson)}
              >
                이전 단계
              </Button>

              <div style={{ fontSize: '14px', color: theme === 'dark' ? '#bfbfbf' : '#666' }}>
                {getLessonByKey(selectedLesson)?.order} / {TOTAL_LESSONS}
                <div style={{ fontSize: '12px', marginTop: '4px', textAlign: 'center' }}>
                  Ctrl + ← / →
                </div>
              </div>

              <Button
                size="large"
                type="primary"
                onClick={handleNextLesson}
                disabled={!getNextLesson(selectedLesson)}
              >
                다음 단계
                <RightOutlined />
              </Button>
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;

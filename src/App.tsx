import { useState } from 'react';
import { Layout, Menu, Typography } from 'antd';
import { BookOutlined, CodeOutlined, RocketOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import './App.css';

// 학습 단계별 임포트
import Step1BasicTypes from './lessons/Step1BasicTypes';
import Step1Interface from './lessons/Step1Interface';
import Step1TypeAlias from './lessons/Step1TypeAlias';
import Step3AdvancedTypes from './lessons/Step3AdvancedTypes';
import Step2ReactBasics from './lessons/step2-react-basics';
import Step4HooksTypescript from './lessons/step4-hooks-typescript';
import Step5ProjectTodo from './lessons/step5-project-todo';
import Step5ApiIntegration from './lessons/step5-api-integration';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

type MenuItem = Required<MenuProps>['items'][number];

function App() {
  const [selectedLesson, setSelectedLesson] = useState<string>('welcome');

  const menuItems: MenuItem[] = [
    {
      key: 'basics',
      icon: <BookOutlined />,
      label: '기초 학습',
      children: [
        { key: 'step1-1', label: 'Step 1-1: 기본 타입' },
        { key: 'step1-2', label: 'Step 1-2: Interface' },
        { key: 'step1-3', label: 'Step 1-3: Type Alias' },
        { key: 'step3', label: 'Step 3: 고급 타입' },
      ],
    },
    {
      key: 'react',
      icon: <CodeOutlined />,
      label: 'React + TypeScript',
      children: [
        { key: 'step2', label: 'Step 2: React 기초' },
        { key: 'step4', label: 'Step 4: Hooks & TypeScript' },
      ],
    },
    {
      key: 'projects',
      icon: <RocketOutlined />,
      label: '프로젝트',
      children: [
        { key: 'step5-todo', label: 'Step 5: Todo 앱' },
        { key: 'step5-api', label: 'Step 5: API 연동' },
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
      default:
        return (
          <div style={{ padding: '24px' }}>
            <Title level={2}>👋 TypeScript + React 학습 환경에 오신 것을 환영합니다!</Title>
            <div style={{ marginTop: '24px', fontSize: '16px', lineHeight: '1.8' }}>
              <p>이 프로젝트는 <strong>ts-learning</strong> 폴더의 학습 자료를 실제 React 환경에서 실행하며 공부할 수 있도록 만들어졌습니다.</p>

              <Title level={3} style={{ marginTop: '32px' }}>📚 학습 방법</Title>
              <ol style={{ fontSize: '16px' }}>
                <li><strong>왼쪽 메뉴에서 단계 선택</strong> - 학습하고 싶은 단계를 클릭하세요</li>
                <li><strong>화면에서 예제 확인</strong> - 각 단계의 예제들이 실제로 실행되는 것을 확인하세요</li>
                <li><strong>코드 읽기</strong> - VS Code에서 <code>src/lessons/</code> 폴더의 파일을 열어 코드를 읽으세요</li>
                <li><strong>코드 수정</strong> - 파일을 수정하면 브라우저에서 자동으로 업데이트됩니다 (Hot Reload)</li>
                <li><strong>연습 문제 풀기</strong> - 각 파일 하단의 TODO 부분을 채워보세요</li>
              </ol>

              <Title level={3} style={{ marginTop: '32px' }}>🎓 추천 학습 순서</Title>
              <div style={{ padding: '16px', background: '#f0f5ff', borderRadius: '8px', marginTop: '16px' }}>
                <p><strong>1단계: TypeScript 기초</strong></p>
                <ul>
                  <li>Step 1-1: 기본 타입 (string, number, boolean, array, object)</li>
                  <li>Step 1-2: Interface (객체 구조 정의)</li>
                  <li>Step 1-3: Type Alias (Union, Intersection)</li>
                  <li>Step 3: 고급 타입 (Generics, Utility Types)</li>
                </ul>

                <p style={{ marginTop: '16px' }}><strong>2단계: React + TypeScript</strong></p>
                <ul>
                  <li>Step 2: React 기초 (컴포넌트, Props, 이벤트)</li>
                  <li>Step 4: Hooks & TypeScript (useState, useEffect, useRef, etc.)</li>
                </ul>

                <p style={{ marginTop: '16px' }}><strong>3단계: 실전 프로젝트</strong></p>
                <ul>
                  <li>Step 5: Todo 앱 (상태 관리, CRUD)</li>
                  <li>Step 5: API 연동 (fetch, 에러 처리, 페이지네이션)</li>
                </ul>
              </div>

              <Title level={3} style={{ marginTop: '32px' }}>💡 팁</Title>
              <ul style={{ fontSize: '16px' }}>
                <li>브라우저 개발자 도구(F12)를 열어서 콘솔 메시지를 확인하세요</li>
                <li>TypeScript 오류가 있으면 VS Code와 브라우저에서 모두 표시됩니다</li>
                <li>원본 파일(<code>../ts-learning</code>)은 수정되지 않으며, 이 프로젝트의 파일만 수정됩니다</li>
                <li>파일을 수정하면 브라우저가 자동으로 새로고침됩니다</li>
              </ul>

              <div style={{ marginTop: '40px', padding: '20px', background: '#fff8e6', borderRadius: '8px', borderLeft: '4px solid #faad14' }}>
                <Title level={4}>🚀 시작하기</Title>
                <p>왼쪽 사이드바에서 <strong>"기초 학습 → Step 1-1: 기본 타입"</strong>을 선택하여 학습을 시작하세요!</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        width={280}
        style={{
          background: '#fff',
          boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
        }}
      >
        <div style={{ padding: '16px', textAlign: 'center', borderBottom: '1px solid #f0f0f0' }}>
          <Title level={4} style={{ margin: 0 }}>
            🎓 TS Learning
          </Title>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['welcome']}
          defaultOpenKeys={['basics']}
          items={menuItems}
          onClick={({ key }) => setSelectedLesson(key)}
          style={{ borderRight: 0, height: 'calc(100vh - 73px)', overflowY: 'auto' }}
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <Title level={3} style={{ margin: '16px 0' }}>
            React + TypeScript 학습
          </Title>
        </Header>
        <Content
          style={{
            margin: '0',
            padding: '0',
            background: '#fff',
            minHeight: 280,
            overflowY: 'auto',
            height: 'calc(100vh - 64px)',
          }}
        >
          {renderLesson()}
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;

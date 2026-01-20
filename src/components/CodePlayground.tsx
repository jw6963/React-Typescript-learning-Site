import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Button, Card, Space, Alert } from 'antd';
import { PlayCircleOutlined, ReloadOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import * as ts from 'typescript';

interface CodePlaygroundProps {
  title: string;
  defaultCode: string;
  solution?: string;  // 정답 코드 (선택적)
  height?: string;
}

export function CodePlayground({ title, defaultCode, solution, height = '300px' }: CodePlaygroundProps) {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showingSolution, setShowingSolution] = useState(false);
  const [userEditedCode, setUserEditedCode] = useState<string>(defaultCode); // 사용자가 편집한 코드 저장

  const handleRun = () => {
    setOutput('');
    setError('');

    try {
      // TypeScript를 JavaScript로 변환
      const result = ts.transpileModule(code, {
        compilerOptions: {
          module: ts.ModuleKind.ESNext,
          target: ts.ScriptTarget.ES2020,
          jsx: ts.JsxEmit.React,
        },
      });

      // console.log을 캡처하기 위한 배열
      const logs: string[] = [];
      const originalLog = console.log;
      console.log = (...args: any[]) => {
        logs.push(args.map(arg =>
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' '));
        originalLog(...args);
      };

      try {
        // JavaScript 코드 실행
        // eslint-disable-next-line no-new-func
        new Function(result.outputText)();

        if (logs.length > 0) {
          setOutput(logs.join('\n'));
        } else {
          setOutput('✅ 코드가 성공적으로 실행되었습니다. (출력 없음)');
        }
      } finally {
        // console.log 복원
        console.log = originalLog;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  const handleReset = () => {
    setCode(defaultCode);
    setUserEditedCode(defaultCode);
    setOutput('');
    setError('');
    setShowingSolution(false);
  };

  const handleToggleSolution = () => {
    if (showingSolution) {
      // 정답 숨기기 - 사용자가 편집했던 코드로 복원
      setCode(userEditedCode);
      setShowingSolution(false);
    } else {
      // 정답 보기 - 현재 코드를 저장한 후 정답 표시
      if (solution) {
        setUserEditedCode(code); // 현재 편집 중인 코드 저장
        setCode(solution);
        setShowingSolution(true);
      }
    }
    setOutput('');
    setError('');
  };

  return (
    <Card
      title={
        <span>
          {title}
          {showingSolution && <span style={{ marginLeft: 8, color: '#52c41a' }}>✅ 정답</span>}
        </span>
      }
      extra={
        <Space>
          <Button
            type="primary"
            icon={<PlayCircleOutlined />}
            onClick={handleRun}
          >
            실행
          </Button>
          {solution && (
            <Button
              icon={showingSolution ? <EyeInvisibleOutlined /> : <EyeOutlined />}
              onClick={handleToggleSolution}
              style={{
                color: showingSolution ? '#ff4d4f' : '#faad14',
                borderColor: showingSolution ? '#ff4d4f' : '#faad14'
              }}
            >
              {showingSolution ? '정답 숨기기' : '정답 보기'}
            </Button>
          )}
          <Button
            icon={<ReloadOutlined />}
            onClick={handleReset}
          >
            초기화
          </Button>
        </Space>
      }
      style={{ marginBottom: 16 }}
    >
      <Space direction="vertical" style={{ width: '100%' }} size="middle">
        <div style={{ border: '1px solid #d9d9d9', borderRadius: '4px', overflow: 'hidden' }}>
          <Editor
            height={height}
            defaultLanguage="typescript"
            value={code}
            onChange={(value) => {
              const newCode = value || '';
              setCode(newCode);
              // 정답을 보고 있지 않을 때만 사용자 편집 코드 업데이트
              if (!showingSolution) {
                setUserEditedCode(newCode);
              }
            }}
            theme="vs-light"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
            }}
          />
        </div>

        {output && (
          <Alert
            message="실행 결과"
            description={<pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{output}</pre>}
            type="success"
            showIcon
          />
        )}

        {error && (
          <Alert
            message="오류"
            description={<pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{error}</pre>}
            type="error"
            showIcon
          />
        )}
      </Space>
    </Card>
  );
}

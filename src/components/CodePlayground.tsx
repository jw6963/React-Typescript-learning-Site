import { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Button, Card, Space, Alert } from 'antd';
import { PlayCircleOutlined, ReloadOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import * as ts from 'typescript';
import type { editor } from 'monaco-editor';

interface CodePlaygroundProps {
  title: string;
  defaultCode: string;
  solution?: string;  // 정답 코드 (선택적)
  height?: string;
}

// 고유한 파일 ID 생성
let fileIdCounter = 0;

export function CodePlayground({ title, defaultCode, solution, height = '300px' }: CodePlaygroundProps) {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showingSolution, setShowingSolution] = useState(false);
  const [userEditedCode, setUserEditedCode] = useState<string>(defaultCode); // 사용자가 편집한 코드 저장
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const filePathRef = useRef(`file:///playground-${fileIdCounter++}.ts`);

  const handleRun = async () => {
    setOutput('');
    setError('');

    try {
      // Monaco Editor에서 타입 체크 결과 가져오기
      if (editorRef.current) {
        const monaco = (window as any).monaco;
        if (monaco) {
          const model = editorRef.current.getModel();
          if (model) {
            // 모델 업데이트 후 타입 체크가 완료될 때까지 대기
            await new Promise(resolve => setTimeout(resolve, 800));

            // 마커(에러/경고) 가져오기
            const markers = monaco.editor.getModelMarkers({ resource: model.uri });

            // 표준 라이브러리/타입 목록
            const standardTypes = [
              'console', 'Date', 'Array', 'Promise', 'Map', 'Set', 'WeakMap', 'WeakSet',
              'String', 'Number', 'Boolean', 'Object', 'Function', 'RegExp', 'Error',
              'Partial', 'Required', 'Readonly', 'Pick', 'Omit', 'Record', 'Exclude', 'Extract',
              'NonNullable', 'Parameters', 'ReturnType', 'InstanceType', 'ThisType',
              'JSON', 'Math', 'Intl', 'Symbol', 'BigInt',
              'HTMLElement', 'Document', 'Window', 'Event', 'MouseEvent', 'KeyboardEvent'
            ];

            // 에러 필터링: 표준 라이브러리 관련 에러는 제외
            const errors = markers.filter((marker: any) => {
              if (marker.severity !== monaco.MarkerSeverity.Error) {
                return false;
              }

              // "Cannot find name 'XXX'" 형태의 에러에서 표준 타입은 무시
              const cannotFindMatch = marker.message.match(/Cannot find name '(\w+)'/);
              if (cannotFindMatch && standardTypes.includes(cannotFindMatch[1])) {
                return false;
              }

              // "Cannot find global type 'XXX'" 형태의 에러는 무시
              if (marker.message.includes("Cannot find global type")) {
                return false;
              }

              // lib.d.ts 관련 에러는 무시
              if (marker.message.includes("lib.d.ts")) {
                return false;
              }

              // target library 관련 에러는 무시
              if (marker.message.includes("Do you need to change your target library")) {
                return false;
              }

              // Property 'XXX' does not exist on type '{}' 같은 표준 메서드 에러는 무시
              // 단, 사용자 정의 인터페이스 관련 에러는 표시해야 함
              const propertyMatch = marker.message.match(/Property '(\w+)' does not exist on type '{}'/);
              if (propertyMatch) {
                // reduce, map, filter, length 등 표준 메서드는 무시
                const standardMethods = [
                  'reduce', 'map', 'filter', 'forEach', 'find', 'some', 'every', 'length',
                  'push', 'pop', 'shift', 'unshift', 'slice', 'splice', 'sort', 'reverse',
                  'join', 'concat', 'indexOf', 'lastIndexOf', 'includes', 'toString',
                  'toLocaleString', 'keys', 'values', 'entries'
                ];
                if (standardMethods.includes(propertyMatch[1])) {
                  return false;
                }
              }

              // 'any' type 관련 경고는 무시 (엄격한 타입 체크용이므로)
              if (marker.message.includes("implicitly has an 'any' type")) {
                return false;
              }

              // 변수 재선언 에러는 무시 (여러 에디터가 같은 페이지에 있을 때 발생)
              if (marker.message.includes("Cannot redeclare block-scoped variable")) {
                return false;
              }

              // optional 속성 누락 에러는 무시 (예제에서 의도적으로 누락하는 경우가 있음)
              if (marker.message.includes("is missing in type") && marker.message.includes("but required in type")) {
                return false;
              }

              return true;
            });

            if (errors.length > 0) {
              const errorMessages = errors
                .map((marker: any) =>
                  `Line ${marker.startLineNumber}, Col ${marker.startColumn}: ${marker.message}`
                )
                .join('\n\n');

              setError('❌ TypeScript 타입 오류:\n\n' + errorMessages);
              return;
            }
          }
        }
      }

      // TypeScript 컴파일러 옵션
      const compilerOptions: ts.CompilerOptions = {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ES2020,
        jsx: ts.JsxEmit.React,
      };

      // JavaScript로 변환
      const result = ts.transpileModule(code, {
        compilerOptions,
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
            path={filePathRef.current}
            value={code}
            onChange={(value) => {
              const newCode = value || '';
              setCode(newCode);
              // 정답을 보고 있지 않을 때만 사용자 편집 코드 업데이트
              if (!showingSolution) {
                setUserEditedCode(newCode);
              }
            }}
            onMount={(editor, monaco) => {
              editorRef.current = editor;

              // 각 에디터마다 TypeScript 설정 적용
              monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
                target: monaco.languages.typescript.ScriptTarget.ES2020,
                lib: ['ES2020', 'DOM'],
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

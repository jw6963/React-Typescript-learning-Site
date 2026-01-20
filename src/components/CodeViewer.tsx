import { Typography } from 'antd';

const { Title, Paragraph, Text } = Typography;

interface CodeViewerProps {
  title: string;
  description: string;
  filePath: string;
  children?: React.ReactNode;
}

export function CodeViewer({ title, description, filePath, children }: CodeViewerProps) {
  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>{title}</Title>
      <Paragraph>{description}</Paragraph>
      <Paragraph>
        <Text code>{filePath}</Text> 파일을 VS Code에서 열어서 학습하세요.
      </Paragraph>
      {children}
    </div>
  );
}

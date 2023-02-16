import { Space } from 'antd';
import { DocumentHeader, DocumentPaper } from './components';
import { Papers } from './styled-components';

const Document = () => {
  return (
    <>
      <DocumentHeader />

      <Papers>
        <Space direction="vertical" size={16}>
          <DocumentPaper />
        </Space>
      </Papers>
    </>
  );
};

export default Document;

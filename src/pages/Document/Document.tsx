import { Space } from 'antd';
import { useParams } from 'react-router-dom';
import { DocumentHeader, DocumentPaper } from './components';
import { Papers } from './styled-components';

type Params = {
  documentId: string;
};

const Document = () => {
  const { documentId } = useParams<Params>();
  console.log('🚀 ~ file: Document.tsx:12 ~ Document ~ documentId:', documentId);

  return (
    <>
      <DocumentHeader />

      <Papers>
        <Space direction="vertical" size={16}>
          <DocumentPaper content="" />
        </Space>
      </Papers>
    </>
  );
};

export default Document;

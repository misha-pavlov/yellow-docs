import { Space, Spin } from 'antd';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  useEditDocumentMutation,
  useGetOneDocumentQuery,
} from '../../store/documentApi/document.api';
import { DocumentHeader, DocumentPaper } from './components';
import { Papers } from './styled-components';

type Params = {
  documentId: string;
};

const Document = () => {
  const { documentId } = useParams<Params>();
  const { data: document, isLoading } = useGetOneDocumentQuery(
    // use 'as string', because for handle undefined is skip
    { documentId: documentId as string },
    { skip: !documentId }
  );
  const [editDocumentMutate] = useEditDocumentMutation();

  useEffect(() => {
    if (documentId) {
      editDocumentMutate({ documentId, updateOpenHistory: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading || !document) {
    return <Spin tip="Loading" size="large" />;
  }

  return (
    <>
      <DocumentHeader document={document} />

      <Papers>
        <Space direction="vertical" size={16}>
          <DocumentPaper content={document.content} />
        </Space>
      </Papers>
    </>
  );
};

export default Document;

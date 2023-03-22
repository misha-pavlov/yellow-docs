import { Space, Spin } from 'antd';
import { memo, useCallback, useEffect, useMemo } from 'react';
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
    { skip: !documentId, pollingInterval: 10000 }
  );
  const [editDocumentMutate] = useEditDocumentMutation();

  const editDocument = useCallback(
    ({
      newFavouriteUserId,
      newReadOnlyMemberId,
    }: {
      newFavouriteUserId?: string;
      newReadOnlyMemberId?: string;
    }) => {
      if (documentId) {
        if (newFavouriteUserId) {
          editDocumentMutate({
            documentId,
            newFavouriteUserId,
          });
        }

        if (newReadOnlyMemberId) {
          editDocumentMutate({
            documentId,
            newReadOnlyMemberId,
          });
          editDocumentMutate({
            documentId,
            newVisibleForUserId: newReadOnlyMemberId,
          });
        }
      }
    },
    [documentId, editDocumentMutate]
  );

  useEffect(() => {
    if (documentId) {
      editDocumentMutate({ documentId, updateOpenHistory: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderHeader = useMemo(
    () => document && <DocumentHeader document={document} editDocument={editDocument} />,
    [document, editDocument]
  );

  if (isLoading || !document) {
    return (
      <Space align="center">
        <Spin tip="Loading" size="large" />
      </Space>
    );
  }

  return (
    <>
      {renderHeader}

      <Papers>
        <Space direction="vertical" size={16}>
          <DocumentPaper content={document.content} documentId={document._id} />
        </Space>
      </Papers>
    </>
  );
};

export default memo(Document);

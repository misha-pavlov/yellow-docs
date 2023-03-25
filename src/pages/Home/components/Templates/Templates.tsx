import { List, Space, Spin } from 'antd';
import { FC, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { SerializedError } from '@reduxjs/toolkit';
import { constants } from '../../../../config';
import {
  useApplyTemplateMutation,
  useCreateDocumentMutation,
} from '../../../../store/documentApi/document.api';
import { TemplateCard, TemplatesHeader } from './components';
import { Container } from './styled-components';
import { DocumentType } from '../../../../types/document.types';
import { useGetTemplatesForUserQuery } from '../../../../store/templatesApi/templates.api';

type TemplatesProps = {
  showOnlyTemplates: boolean;
  toggleShowOnlyTemplates: VoidFunction;
  isInModal?: boolean;
};

const BLANK = 'Blank';
const DEFAULT_LIMIT = 6;

const Templates: FC<TemplatesProps> = ({
  showOnlyTemplates,
  toggleShowOnlyTemplates,
  isInModal,
}) => {
  const navigate = useNavigate();
  const [createDocumentMutation] = useCreateDocumentMutation();
  const [applyTemplateMutation] = useApplyTemplateMutation();
  const {
    data: templatesForUser,
    isLoading: templatesForUserLoading,
  } = useGetTemplatesForUserQuery({
    // use undefined for showing all templates
    limit: showOnlyTemplates ? undefined : DEFAULT_LIMIT,
  });

  const thenCreateDocument = useCallback(
    (
      res:
        | {
            data: DocumentType;
          }
        | {
            error: FetchBaseQueryError | SerializedError;
          }
    ) => {
      const newDocumentId = ((res as unknown) as { data: DocumentType }).data._id;
      navigate(`${constants.routes.Document}/${newDocumentId}`);
    },
    [navigate]
  );

  const createDocument = () => {
    createDocumentMutation().then(thenCreateDocument);
  };

  const renderTemplates = useMemo(() => {
    if (templatesForUserLoading || !templatesForUser) {
      return <Spin />;
    }

    if (!showOnlyTemplates) {
      return templatesForUser.map((template, index) => {
        const { owner, title, content } = template;

        return (
          <TemplateCard
            key={index}
            title={title}
            content={content}
            onClick={() =>
              applyTemplateMutation({ owner, title, content }).then(thenCreateDocument)
            }
          />
        );
      });
    }

    if (showOnlyTemplates) {
      return (
        <List
          grid={{
            column: 6,
          }}
          dataSource={templatesForUser}
          renderItem={template => {
            const { owner, title, content } = template;

            return (
              <List.Item>
                <TemplateCard
                  title={title}
                  content={content}
                  onClick={() =>
                    applyTemplateMutation({ owner, title, content }).then(thenCreateDocument)
                  }
                />
              </List.Item>
            );
          }}
        />
      );
    }
  }, [
    applyTemplateMutation,
    showOnlyTemplates,
    templatesForUser,
    templatesForUserLoading,
    thenCreateDocument,
  ]);

  return (
    <Container isInModal={isInModal}>
      <TemplatesHeader
        showOnlyTemplates={showOnlyTemplates}
        toggleShowOnlyTemplates={toggleShowOnlyTemplates}
      />

      <Space size={16} className="render-templates">
        {!showOnlyTemplates && <TemplateCard isBlankCard title={BLANK} onClick={createDocument} />}
        {renderTemplates}
      </Space>
    </Container>
  );
};

export default Templates;

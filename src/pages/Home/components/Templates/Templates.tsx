import { Space } from 'antd';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { constants } from '../../../../config';
import { useCreateDocumentMutation } from '../../../../store/documentApi/document.api';
import { TemplateCard, TemplatesHeader } from './components';
import { Container } from './styled-components';
import { DocumentType } from '../../../../types/document.types';

type TemplatesProps = {
  showOnlyTemplates: boolean;
  toggleShowOnlyTemplates: VoidFunction;
  isInModal?: boolean;
};

const BLANK = 'Blank';

const Templates: FC<TemplatesProps> = ({
  showOnlyTemplates,
  toggleShowOnlyTemplates,
  isInModal,
}) => {
  const navigate = useNavigate();
  const [createDocumentMutation] = useCreateDocumentMutation();

  const createDocument = () => {
    createDocumentMutation().then(res => {
      const newDocumentId = ((res as unknown) as { data: DocumentType }).data._id;
      navigate(`${constants.routes.Document}/${newDocumentId}`);
    });
  };

  return (
    <Container isInModal={isInModal}>
      <TemplatesHeader
        showOnlyTemplates={showOnlyTemplates}
        toggleShowOnlyTemplates={toggleShowOnlyTemplates}
      />

      <Space size={16} className="render-templates">
        <TemplateCard
          isBlankCard
          title={BLANK}
          onClick={createDocument}
        />
        <TemplateCard
          title="Meeting notes"
          subTitle="Modern white"
          onClick={() => console.log('123')}
        />
        <TemplateCard
          title="Project proposai"
          subTitle="Tropic"
          onClick={() => console.log('123')}
        />
        <TemplateCard
          title="Project proposai"
          subTitle="Spearmint"
          onClick={() => console.log('123')}
        />
        <TemplateCard title="Brochure" subTitle="Geometric" onClick={() => console.log('123')} />
        <TemplateCard title="Newsletter" subTitle="Lively" onClick={() => console.log('123')} />
        <TemplateCard
          title="Buisness letter"
          subTitle="Geometric"
          onClick={() => console.log('123')}
        />
      </Space>
    </Container>
  );
};

export default Templates;

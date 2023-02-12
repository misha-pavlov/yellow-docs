import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { constants } from '../../../../config';
import { TemplateCard, TemplatesHeader } from './components';
import { Container } from './styled-components';

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

  return (
    <Container isInModal={isInModal}>
      <TemplatesHeader
        showOnlyTemplates={showOnlyTemplates}
        toggleShowOnlyTemplates={toggleShowOnlyTemplates}
      />

      <div className="render-templates">
        <TemplateCard
          isBlankCard
          title={BLANK}
          onClick={() => navigate(`${constants.routes.Document}/1234`)}
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
      </div>
    </Container>
  );
};

export default Templates;

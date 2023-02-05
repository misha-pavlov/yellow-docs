import { FC } from 'react';
import { TemplateCard, TemplatesHeader } from './components';
import { Container } from './styled-components';

type TemplatesProps = {
  showOnlyTemplates: boolean;
  toggleShowOnlyTemplates: VoidFunction;
};

const BLANK = 'Blank';

const Templates: FC<TemplatesProps> = ({ showOnlyTemplates, toggleShowOnlyTemplates }) => {
  return (
    <Container>
      <TemplatesHeader
        showOnlyTemplates={showOnlyTemplates}
        toggleShowOnlyTemplates={toggleShowOnlyTemplates}
      />

      <div className="render-templates">
        <TemplateCard isBlankCard title={BLANK} />
        <TemplateCard title="Meeting notes" subTitle="Modern white" />
        <TemplateCard title="Project proposai" subTitle="Tropic" />
        <TemplateCard title="Project proposai" subTitle="Spearmint" />
        <TemplateCard title="Brochure" subTitle="Geometric" />
        <TemplateCard title="Newsletter" subTitle="Lively" />
        <TemplateCard title="Buisness letter" subTitle="Geometric" />
      </div>
    </Container>
  );
};

export default Templates;

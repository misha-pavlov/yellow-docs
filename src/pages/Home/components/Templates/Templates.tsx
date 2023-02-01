import { FC } from 'react';
import { TemplatesHeader } from './components';
import { Container } from './styled-components';

type TemplatesProps = {
  showOnlyTemplates: boolean;
  toggleShowOnlyTemplates: VoidFunction;
};

const Templates: FC<TemplatesProps> = ({ showOnlyTemplates, toggleShowOnlyTemplates }) => {
  return (
    <Container>
      <TemplatesHeader
        showOnlyTemplates={showOnlyTemplates}
        toggleShowOnlyTemplates={toggleShowOnlyTemplates}
      />
      Templates
    </Container>
  );
};

export default Templates;

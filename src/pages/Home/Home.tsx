import { useState } from 'react';
import { HomeHeader, Templates } from './components';
import { Container } from './styled-components';

const Home = () => {
  const [showOnlyTemplates, setShowOnlyTemplates] = useState(false);

  const toggleShowOnlyTemplates = () => {
    setShowOnlyTemplates(prevProps => !prevProps);
  };

  return (
    <Container>
      <HomeHeader
        showOnlyTemplates={showOnlyTemplates}
        toggleShowOnlyTemplates={toggleShowOnlyTemplates}
      />
      <Templates
        showOnlyTemplates={showOnlyTemplates}
        toggleShowOnlyTemplates={toggleShowOnlyTemplates}
      />
      Home
    </Container>
  );
};

export default Home;

import { useState } from 'react';
import { FloatButton } from 'antd';
import { HomeHeader, RecentDocuments, Templates } from './components';
import { Container } from './styled-components';
import { PlusOutlined } from '@ant-design/icons';

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

      <RecentDocuments showOnlyTemplates={showOnlyTemplates} />

      <FloatButton type='primary' icon={<PlusOutlined />} />
    </Container>
  );
};

export default Home;

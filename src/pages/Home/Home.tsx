import { useState } from 'react';
import { FloatButton } from 'antd';
import { HomeHeader, RecentDocuments, Templates } from './components';
import { Container, TemplatesModal } from './styled-components';
import { PlusOutlined } from '@ant-design/icons';

const Home = () => {
  const [showOnlyTemplates, setShowOnlyTemplates] = useState(false);
  const [showTemplatesModal, setShowTemplatesModal] = useState(false);

  const toggleShowOnlyTemplates = () => {
    setShowOnlyTemplates(prevProps => !prevProps);
  };

  const toggleShowTemplatesModal = () => {
    setShowTemplatesModal(prevProps => !prevProps);
  };

  return (
    <>
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

        {!showTemplatesModal && (
          <FloatButton type="primary" icon={<PlusOutlined />} onClick={toggleShowTemplatesModal} />
        )}
      </Container>

      {showTemplatesModal && (
        <TemplatesModal onClick={toggleShowTemplatesModal}>
          <div className="templates" onClick={e => e.stopPropagation()}>
            <Templates
              isInModal
              showOnlyTemplates={showOnlyTemplates}
              toggleShowOnlyTemplates={toggleShowOnlyTemplates}
            />
          </div>
        </TemplatesModal>
      )}
    </>
  );
};

export default Home;

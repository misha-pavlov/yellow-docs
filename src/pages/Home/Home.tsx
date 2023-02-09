import { useState } from 'react';
import { FloatButton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { HomeHeader, RecentDocuments, Templates } from './components';
import { Container, TemplatesModal } from './styled-components';
import { Flip, Rotate, Slide } from './types';

const Home = () => {
  const [showOnlyTemplates, setShowOnlyTemplates] = useState(false);
  const [showTemplatesModal, setShowTemplatesModal] = useState(false);
  const [floatButtonAnim, setFloatButtonAnim] = useState<Rotate | Flip>(Rotate.RotateIn);
  const [templatesModalAnim, setTemplatesModalAnim] = useState(Slide.SlideInDown);

  const toggleShowOnlyTemplates = () => {
    setShowOnlyTemplates(prevProps => !prevProps);
  };

  const toggleShowTemplatesModal = () => {
    setFloatButtonAnim(prevProps =>
      prevProps === Rotate.RotateIn ? Flip.FlipOutY : Rotate.RotateIn
    );
    setTemplatesModalAnim(prevProps =>
      prevProps === Slide.SlideInDown ? Slide.SlideOutUp : Slide.SlideInDown
    );
    setTimeout(() => setShowTemplatesModal(prevProps => !prevProps), 1000);
  };

  return (
    <>
      <Container floatButtonAnim={floatButtonAnim}>
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
          <FloatButton
            type="primary"
            icon={<PlusOutlined />}
            className="rotate-button"
            onClick={toggleShowTemplatesModal}
          />
        )}
      </Container>

      {showTemplatesModal && (
        <TemplatesModal onClick={toggleShowTemplatesModal} templatesModalAnim={templatesModalAnim}>
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

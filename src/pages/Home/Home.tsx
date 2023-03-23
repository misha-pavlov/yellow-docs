import { useEffect, useMemo, useState } from 'react';
import { FloatButton } from 'antd';
import { EditOutlined, FileOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { HomeHeader, RecentDocuments, Templates } from './components';
import { Container, TemplatesModal } from './styled-components';
import { Flip, Rotate, Slide } from './types';
import { constants } from '../../config';
import { useCreateUserSettingsMutation } from '../../store/userSettingsApi/userSettings.api';

const Home = () => {
  const [showOnlyTemplates, setShowOnlyTemplates] = useState(false);
  const [showTemplatesModal, setShowTemplatesModal] = useState(false);
  const [floatButtonAnim, setFloatButtonAnim] = useState<Rotate | Flip>(Rotate.RotateIn);
  const [templatesModalAnim, setTemplatesModalAnim] = useState(Slide.SlideInDown);

  const navigate = useNavigate();

  const [createUserSettingsMutate] = useCreateUserSettingsMutation();

  useEffect(() => {
    createUserSettingsMutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const renderFloatButtons = useMemo(() => {
    // change float button if showTemplates === false
    const something = null;
    if (something) {
      return (
        <FloatButton.Group
          trigger="hover"
          type="primary"
          className="rotate-button"
          icon={<PlusOutlined />}
        >
          <FloatButton
            icon={<FileOutlined />}
            tooltip={<div>Choose template</div>}
            onClick={toggleShowOnlyTemplates}
          />
          <FloatButton
            icon={<EditOutlined />}
            tooltip={<div>Create new document</div>}
            onClick={() => navigate(`${constants.routes.Document}/123`)}
          />
        </FloatButton.Group>
      );
    }

    return (
      // hide add button when templates modal has shown
      !showTemplatesModal && (
        <FloatButton
          type="primary"
          icon={<PlusOutlined />}
          className="rotate-button"
          onClick={toggleShowTemplatesModal}
        />
      )
    );
  }, [navigate, showTemplatesModal]);

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

        {renderFloatButtons}
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

import { QuestionCircleOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Checkbox, Divider, Modal } from 'antd';
import { FC, useState } from 'react';
import {
  useGetUserSettingsQuery,
  useUpdateUserSettingsMutation,
} from '../../../../../../store/userSettingsApi/userSettings.api';
import { SidebarItem } from './components';
import { Container } from './styled-components';
import { Fade } from './types';

type SidebarProps = {
  onPressOutside: VoidFunction;
};

const Sidebar: FC<SidebarProps> = ({ onPressOutside }) => {
  const [anim, setAnim] = useState(Fade.FadeIn);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: userSettings } = useGetUserSettingsQuery();

  const [displayRecentTemplates, setDisplayRecentTemplates] = useState(
    userSettings?.settings.displayRecentTemplates
  );

  const [updateUserSettingsMutate] = useUpdateUserSettingsMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);

    const newSettings = {
      displayRecentTemplates: displayRecentTemplates || false,
    };

    updateUserSettingsMutate({ newSettings });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = () => {
    setDisplayRecentTemplates(prevProps => !prevProps);
  };

  const onClick = () => {
    setAnim(Fade.FadeOut);
    setTimeout(onPressOutside, 1000);
  };

  return (
    <Container onClick={onClick} anim={anim}>
      <div className="sidebar" onClick={e => e.stopPropagation()}>
        <span className="logo">
          <span className="yellow">Yellow</span>
          <span> Docs</span>
        </span>

        <Divider className="divider" />

        <SidebarItem text="Settings" icon={<SettingOutlined />} onClick={showModal} />
        <SidebarItem text="Help & Feedback" icon={<QuestionCircleOutlined />} />

        <Divider className="divider" />

        <Modal
          title="Settings"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={[
            <Button key="ok" type="primary" onClick={handleOk}>
              Ok
            </Button>,
          ]}
        >
          <div className="settingHeader">Templates</div>
          <Checkbox checked={displayRecentTemplates} onChange={onChange}>
            Display recent templates on home screens
          </Checkbox>
        </Modal>
      </div>
    </Container>
  );
};

export default Sidebar;

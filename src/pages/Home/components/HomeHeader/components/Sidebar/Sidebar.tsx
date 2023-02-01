import { QuestionCircleOutlined, SettingOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import { FC } from 'react';
import { SidebarItem } from './components';
import { Container } from './styled-components';

type SidebarProps = {
  onPressOutside: VoidFunction;
};

const Sidebar: FC<SidebarProps> = ({ onPressOutside }) => {
  return (
    <Container onClick={onPressOutside}>
      <div className="sidebar" onClick={e => e.stopPropagation()}>
        <span className="logo">
          <span className="yellow">Yellow</span>
          <span> Docs</span>
        </span>

        <Divider className="divider" />

        <SidebarItem text="Settings" icon={<SettingOutlined />} />
        <SidebarItem text="Help & Feedback" icon={<QuestionCircleOutlined />} />

        <Divider className="divider" />
      </div>
    </Container>
  );
};

export default Sidebar;

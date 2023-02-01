import { QuestionCircleOutlined, SettingOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import { FC, useState } from 'react';
import { SidebarItem } from './components';
import { Container } from './styled-components';
import { Fade } from './types';

type SidebarProps = {
  onPressOutside: VoidFunction;
};

const Sidebar: FC<SidebarProps> = ({ onPressOutside }) => {
  const [anim, setAnim] = useState(Fade.FadeIn);

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

        <SidebarItem text="Settings" icon={<SettingOutlined />} />
        <SidebarItem text="Help & Feedback" icon={<QuestionCircleOutlined />} />

        <Divider className="divider" />
      </div>
    </Container>
  );
};

export default Sidebar;

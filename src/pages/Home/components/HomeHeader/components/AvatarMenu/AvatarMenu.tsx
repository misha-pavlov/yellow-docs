import { ExportOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button } from 'antd';
import { FC, useState } from 'react';
import { Container } from './styled-components';
import { Zoom } from './types';

type AvatarMenuProps = {
  onPressOutside: VoidFunction;
};

const AvatarMenu: FC<AvatarMenuProps> = ({ onPressOutside }) => {
  const [anim, setAnim] = useState(Zoom.ZoomIn);

  const onClick = () => {
    setAnim(Zoom.ZoomOut);
    setTimeout(onPressOutside, 1000);
  };

  return (
    <Container onClick={onClick} anim={anim}>
      <div className="menu" onClick={e => e.stopPropagation()}>
        <div className="icon-row">
          <Avatar
            size={55}
            src="https://hv-hive-drive.s3.amazonaws.com/7driFnaZjDQZndHqs/3ZmvgsLsoHdYEXQMZ/photo_2021-03-01 11.31.59.jpeg"
            icon={<UserOutlined />}
          />

          <div>
            <div className="username">UserName</div>
            <div className="email">UserEmail</div>
          </div>
        </div>

        <Button shape="round" icon={<ExportOutlined />} size="large" danger>
          Sign out
        </Button>
      </div>
    </Container>
  );
};

export default AvatarMenu;

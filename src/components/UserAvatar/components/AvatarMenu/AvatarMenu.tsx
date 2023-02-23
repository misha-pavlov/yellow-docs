import { ExportOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button } from 'antd';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { constants } from '../../../../config';
import { Container } from './styled-components';
import { Bounce } from './types';

type AvatarMenuProps = {
  onPressOutside: VoidFunction;
};

const AvatarMenu: FC<AvatarMenuProps> = ({ onPressOutside }) => {
  const [anim, setAnim] = useState(Bounce.BounceInRight);
  const navigate = useNavigate();

  const onClick = () => {
    setAnim(Bounce.BounceOutRight);
    setTimeout(onPressOutside, 1000);
  };

  const onSignOut = () => {
    localStorage.removeItem(constants.localStorageKeys.token);
    // redirect to login screen
    navigate(constants.routes.Login);
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

        <Button shape="round" icon={<ExportOutlined />} size="large" danger onClick={onSignOut}>
          Sign out
        </Button>
      </div>
    </Container>
  );
};

export default AvatarMenu;

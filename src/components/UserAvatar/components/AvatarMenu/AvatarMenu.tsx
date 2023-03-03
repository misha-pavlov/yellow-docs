import { ExportOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button } from 'antd';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { constants } from '../../../../config';
import { UserType } from '../../../../types/user.types';
import { Container } from './styled-components';
import { Bounce } from './types';

type AvatarMenuProps = {
  currentUser: UserType;
  onPressOutside: VoidFunction;
};

const AvatarMenu: FC<AvatarMenuProps> = ({ currentUser, onPressOutside }) => {
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
          <Avatar size={55} src={currentUser.image} icon={<UserOutlined />} />

          <div>
            <div className="username">
              {currentUser.firstName} {currentUser.lastName}
            </div>
            <div className="email">{currentUser.email}</div>
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

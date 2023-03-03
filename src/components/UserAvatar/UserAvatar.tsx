import { UserOutlined } from '@ant-design/icons';
import { Avatar, Tooltip } from 'antd';
import { FC, useCallback, useMemo, useState } from 'react';
import { useCurrentUserQuery } from '../../store/userApi/user.api';
import { AvatarMenu } from './components';

type UserAvatarProps = {
  className: string;
};

const UserAvatar: FC<UserAvatarProps> = ({ className }) => {
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const { data: currentUser } = useCurrentUserQuery();

  const toggleShowAvatarMenu = useCallback(() => {
    setShowAvatarMenu(prevProps => !prevProps);
  }, []);

  const renderAvatarMenu = useMemo(
    () =>
      showAvatarMenu &&
      currentUser && <AvatarMenu currentUser={currentUser} onPressOutside={toggleShowAvatarMenu} />,
    [currentUser, showAvatarMenu, toggleShowAvatarMenu]
  );

  return (
    <>
      <Tooltip placement="bottom" title={`${currentUser?.firstName} ${currentUser?.lastName}`}>
        <div className={className}>
          <Avatar
            size="large"
            src={currentUser?.image}
            icon={<UserOutlined />}
            onClick={toggleShowAvatarMenu}
          />
        </div>
      </Tooltip>

      {renderAvatarMenu}
    </>
  );
};

export default UserAvatar;

import { UserOutlined } from '@ant-design/icons';
import { Avatar, Tooltip } from 'antd';
import { FC, useCallback, useMemo, useState } from 'react';
import { AvatarMenu } from './components';

type UserAvatarProps = {
  tooltipTitle: string;
  className: string;
};

const UserAvatar: FC<UserAvatarProps> = ({ tooltipTitle, className }) => {
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);

  const toggleShowAvatarMenu = useCallback(() => {
    setShowAvatarMenu(prevProps => !prevProps);
  }, []);

  const renderAvatarMenu = useMemo(
    () => showAvatarMenu && <AvatarMenu onPressOutside={toggleShowAvatarMenu} />,
    [showAvatarMenu, toggleShowAvatarMenu]
  );

  return (
    <>
      <Tooltip placement="bottom" title={tooltipTitle}>
        <div className={className}>
          <Avatar
            size="large"
            src="https://hv-hive-drive.s3.amazonaws.com/7driFnaZjDQZndHqs/3ZmvgsLsoHdYEXQMZ/photo_2021-03-01 11.31.59.jpeg"
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

import { BookTwoTone, MenuOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Input, Tooltip } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import { colors } from '../../../../config';
import { AvatarMenu, Sidebar } from './components';
import { Container } from './styled-components';

const HomeHeader = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);

  const toggleIsCollapsed = useCallback(() => {
    setIsCollapsed(prevProps => !prevProps);
  }, []);

  const toggleShowAvatarMenu = useCallback(() => {
    setShowAvatarMenu(prevProps => !prevProps);
  }, []);

  const renderSidebar = useMemo(
    () => <>{!isCollapsed && <Sidebar onPressOutside={toggleIsCollapsed} />}</>,
    [isCollapsed, toggleIsCollapsed]
  );

  const renderAvatarMenu = useMemo(
    () => <>{showAvatarMenu && <AvatarMenu onPressOutside={toggleShowAvatarMenu} />}</>,
    [showAvatarMenu, toggleShowAvatarMenu]
  );

  return (
    <>
      <Container>
        <div className="align-block">
          <Button
            type="text"
            size="large"
            shape="circle"
            icon={<MenuOutlined />}
            onClick={toggleIsCollapsed}
          />

          <BookTwoTone twoToneColor={colors.yellow600} style={{ fontSize: 28 }} />
        </div>

        <div className="input-block">
          <Input size="large" placeholder="Search" prefix={<SearchOutlined />} bordered={false} />
        </div>

        <Tooltip placement="bottom" title="UserName">
          <div className="avatar">
            <Avatar
              size="large"
              src="https://hv-hive-drive.s3.amazonaws.com/7driFnaZjDQZndHqs/3ZmvgsLsoHdYEXQMZ/photo_2021-03-01 11.31.59.jpeg"
              icon={<UserOutlined />}
              onClick={toggleShowAvatarMenu}
            />
          </div>
        </Tooltip>
      </Container>

      {renderSidebar}
      {renderAvatarMenu}
    </>
  );
};

export default HomeHeader;

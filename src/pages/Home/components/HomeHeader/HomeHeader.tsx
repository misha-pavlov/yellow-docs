import { BookTwoTone, MenuOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Input } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import { colors } from '../../../../config';
import { Sidebar } from './components';
import { Container } from './styled-components';

const HomeHeader = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleIsCollapsed = useCallback(() => {
    setIsCollapsed(prevProps => !prevProps);
  }, []);

  const renderSidebar = useMemo(
    () => <>{!isCollapsed && <Sidebar onPressOutside={toggleIsCollapsed} />}</>,
    [isCollapsed, toggleIsCollapsed]
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

        <div>
          <Avatar
            size="large"
            src="https://hv-hive-drive.s3.amazonaws.com/7driFnaZjDQZndHqs/3ZmvgsLsoHdYEXQMZ/photo_2021-03-01 11.31.59.jpeg"
            icon={<UserOutlined />}
          />
        </div>
      </Container>

      {renderSidebar}
    </>
  );
};

export default HomeHeader;

import {
  ArrowLeftOutlined,
  FileTextOutlined,
  MenuOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Input } from 'antd';
import { FC, useCallback, useMemo, useState } from 'react';
import { UserAvatar } from '../../../../components';
import { Sidebar } from './components';
import { Container } from './styled-components';

type HomeHeaderProps = {
  showOnlyTemplates: boolean;
  toggleShowOnlyTemplates: VoidFunction;
};

const HomeHeader: FC<HomeHeaderProps> = ({ showOnlyTemplates, toggleShowOnlyTemplates }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleIsCollapsed = useCallback(() => {
    setIsCollapsed(prevProps => !prevProps);
  }, []);

  const renderSidebar = useMemo(
    () => !isCollapsed && <Sidebar onPressOutside={toggleIsCollapsed} />,
    [isCollapsed, toggleIsCollapsed]
  );

  return showOnlyTemplates ? (
    <Container>
      <Button
        type="text"
        shape="round"
        icon={<ArrowLeftOutlined />}
        size="large"
        onClick={toggleShowOnlyTemplates}
      >
        Template gallery
      </Button>
    </Container>
  ) : (
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

          <FileTextOutlined className="icon" />
        </div>

        <div className="input-block">
          <Input size="large" placeholder="Search" prefix={<SearchOutlined />} bordered={false} />
        </div>

        <UserAvatar tooltipTitle="username" className="avatar" />
      </Container>

      {renderSidebar}
    </>
  );
};

export default HomeHeader;

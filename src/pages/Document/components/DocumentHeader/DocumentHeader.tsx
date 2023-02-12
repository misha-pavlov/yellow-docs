import { FileTextOutlined, StarOutlined, TeamOutlined } from '@ant-design/icons';
import { Button, Space, Typography } from 'antd';
import { UserAvatar } from '../../../../components';
import { Container } from './styled-components';

const { Text } = Typography;

const DocumentHeader = () => {
  return (
    <Container>
      <Space size={16}>
        <FileTextOutlined className="icon" />

        <Space direction="vertical" size={0}>
          <Space>
            <div className="title">TITLE</div>
            {/* if saved use <StarFilled /> */}
            <Button type="text" size="small" icon={<StarOutlined />} />
          </Space>

          <Space>
            <div className="options">options</div>
            <Text underline  className="options">Last edit was made on 'day data' by 'user'</Text>
          </Space>
        </Space>
      </Space>

      <Space size={16}>
        <Button type="primary" icon={<TeamOutlined />}>
          Share
        </Button>
        <UserAvatar tooltipTitle="docusername" className="avatar" />
      </Space>
    </Container>
  );
};

export default DocumentHeader;

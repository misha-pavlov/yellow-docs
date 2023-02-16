import { FileTextOutlined, StarOutlined, TeamOutlined } from '@ant-design/icons';
import { Button, Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserAvatar } from '../../../../components';
import { constants } from '../../../../config';
import { QuillToolbar } from './components';
import { Container, Wrapper } from './styled-components';

const { Text } = Typography;

const DocumentHeader = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Container align="center">
        <Space size={16}>
          <FileTextOutlined className="icon" onClick={() => navigate(constants.routes.Home)} />

          <Space direction="vertical" size={0}>
            <Space>
              <div className="title">TITLE</div>
              {/* if saved use <StarFilled /> */}
              <Button type="text" size="small" icon={<StarOutlined />} />
            </Space>

            <Space>
              <div className="options">options</div>
              <Text underline className="options">
                Last edit was made on 'day data' by 'user'
              </Text>
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

      <QuillToolbar />
    </Wrapper>
  );
};

export default DocumentHeader;

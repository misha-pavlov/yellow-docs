import { ColumnHeightOutlined, MoreOutlined } from '@ant-design/icons';
import { Button, Divider } from 'antd';
import { Container } from './styled-components';

const TemplatesHeader = () => {
  return (
    <Container>
      <div>Start a new document</div>

      <div className="right-side">
        <Button type="text" icon={<ColumnHeightOutlined />}>
          Template gallery
        </Button>
        <Divider type="vertical" className="divider" />
        <Button type="text" icon={<MoreOutlined />} />
      </div>
    </Container>
  );
};

export default TemplatesHeader;

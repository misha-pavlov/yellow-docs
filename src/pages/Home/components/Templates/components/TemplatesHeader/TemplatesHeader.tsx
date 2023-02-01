import { ColumnHeightOutlined, MoreOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, MenuProps } from 'antd';
import { FC, useState } from 'react';
import { Container } from './styled-components';

type TemplatesHeaderProps = {
  showOnlyTemplates: boolean;
  toggleShowOnlyTemplates: VoidFunction;
};

const items: MenuProps['items'] = [
  {
    label: <span>Hide all templates</span>,
    key: '0',
  },
];

const TemplatesHeader: FC<TemplatesHeaderProps> = ({
  showOnlyTemplates,
  toggleShowOnlyTemplates,
}) => {
  const [isShowDropdown, setIsShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setIsShowDropdown(prevProps => !prevProps);
  };

  return (
    <Container>
      <div>{showOnlyTemplates ? 'Recently used' : 'Start a new document'}</div>

      {!showOnlyTemplates && (
        <div className="right-side">
          <Button type="text" icon={<ColumnHeightOutlined />} onClick={toggleShowOnlyTemplates}>
            Template gallery
          </Button>

          <Divider type="vertical" className="divider" />

          <Dropdown menu={{ items }} trigger={['click']} placement="bottom" open={isShowDropdown}>
            <Button
              type="text"
              icon={<MoreOutlined />}
              onClick={toggleDropdown}
              {...(isShowDropdown && { className: 'active' })}
            />
          </Dropdown>
        </div>
      )}
    </Container>
  );
};

export default TemplatesHeader;

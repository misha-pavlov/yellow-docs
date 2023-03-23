import { ColumnHeightOutlined, MoreOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, MenuProps, Space } from 'antd';
import { FC, useState } from 'react';
import { useUpdateUserSettingsMutation } from '../../../../../../store/userSettingsApi/userSettings.api';
import { Container } from './styled-components';

type TemplatesHeaderProps = {
  showOnlyTemplates: boolean;
  toggleShowOnlyTemplates: VoidFunction;
};

const TemplatesHeader: FC<TemplatesHeaderProps> = ({
  showOnlyTemplates,
  toggleShowOnlyTemplates,
}) => {
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const [updateUserSettingsMutate] = useUpdateUserSettingsMutation();

  const toggleDropdown = () => {
    setIsShowDropdown(prevProps => !prevProps);
  };

  const items: MenuProps['items'] = [
    {
      key: '0',
      label: <span>Hide all templates</span>,
      onClick: () => updateUserSettingsMutate({ newSettings: { displayRecentTemplates: false } }),
    },
  ];

  return (
    <Container align="center">
      <div className="title">{showOnlyTemplates ? 'Recently used' : 'Start a new document'}</div>

      {!showOnlyTemplates && (
        <Space align="center" className="right-side">
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
        </Space>
      )}
    </Container>
  );
};

export default TemplatesHeader;

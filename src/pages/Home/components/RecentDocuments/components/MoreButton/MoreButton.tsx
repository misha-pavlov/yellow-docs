import { DeleteOutlined, FontSizeOutlined, MoreOutlined, SelectOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps } from 'antd';
import { FC } from 'react';

const items: MenuProps['items'] = [
  {
    label: <span>Rename</span>,
    icon: <FontSizeOutlined />,
    // disabled true if user is not an owner in this doc
    disabled: true,
    key: '0',
  },
  {
    label: <span>Remove</span>,
    icon: <DeleteOutlined />,
    key: '1',
  },
  {
    label: <span>Open in new tab</span>,
    icon: <SelectOutlined />,
    key: '2',
  },
];

type MoreButtonProps = {
  isShowDropdown: boolean;
  toggleDropdown: () => void;
};

const MoreButton: FC<MoreButtonProps> = ({ isShowDropdown, toggleDropdown }) => (
  <Dropdown menu={{ items }} trigger={['click']} placement="top" open={isShowDropdown}>
    <Button type="text" size="small" icon={<MoreOutlined />} onClick={toggleDropdown} />
  </Dropdown>
);

export default MoreButton;

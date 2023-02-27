import {
  AlignLeftOutlined,
  DeleteOutlined,
  FontSizeOutlined,
  MoreOutlined,
  SelectOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, MenuProps } from 'antd';
import moment from 'moment';
import { memo, useState } from 'react';
import { useCurrentUserQuery } from '../../../../../../store/userApi/user.api';
import { DocumentType, SortEnum } from '../../../../../../types/document.types';
import { Container } from './styled-components';

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

const Document = ({ doc, sort }: { doc: DocumentType; sort: SortEnum }) => {
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const { data: currentUser } = useCurrentUserQuery();

  const toggleDropdown = () => {
    setIsShowDropdown(prevProps => !prevProps);
  };

  const getDate = () => {
    if (sort === SortEnum.LAST_OPENED_BY_ME) {
      return doc.openHistory.find(history => history.userId === currentUser?._id)?.date;
    }

    return doc.changedAt;
  };

  return (
    <Container>
      <div className="content">content</div>

      <div className="info">
        <div className="title">
          {/* if title.length >= 30 use replace if not just show a title */}
          {doc.title.replace(/^(.{11}[^\s]*).*/, '$1...')}
        </div>

        <div className="sub-title">
          <div className="left">
            <Button type="primary" size="small" icon={<AlignLeftOutlined />} />
            <div className="shared">{doc.visibleFor.length > 1 && <TeamOutlined />}</div>
            <div className="date">{getDate() && moment(getDate()).format('MMMM Do, YYYY')}</div>
          </div>

          <div>
            <Dropdown menu={{ items }} trigger={['click']} placement="top" open={isShowDropdown}>
              <Button type="text" size="small" icon={<MoreOutlined />} onClick={toggleDropdown} />
            </Dropdown>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default memo(Document);

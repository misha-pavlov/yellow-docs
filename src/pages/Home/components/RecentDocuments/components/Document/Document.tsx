import { AlignLeftOutlined, TeamOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import moment from 'moment';
import { memo, useState } from 'react';
import { MoreButton } from '..';
import { useCurrentUserQuery } from '../../../../../../store/userApi/user.api';
import { DocumentType, SortEnum } from '../../../../../../types/document.types';
import { getDate } from '../../helpers';
import { Container } from './styled-components';

const Document = ({ doc, sort }: { doc: DocumentType; sort: SortEnum }) => {
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const { data: currentUser } = useCurrentUserQuery();

  const toggleDropdown = () => {
    setIsShowDropdown(prevProps => !prevProps);
  };

  const date = getDate(sort, doc.openHistory, doc.changedAt, currentUser?._id);

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
            <div className="date">{date && moment(date).format('MMMM Do, YYYY')}</div>
          </div>

          <div>
            <MoreButton isShowDropdown={isShowDropdown} toggleDropdown={toggleDropdown} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default memo(Document);

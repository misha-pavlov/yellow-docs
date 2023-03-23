import { AlignLeftOutlined, TeamOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import moment from 'moment';
import { FC, memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreButton } from '..';
import { constants } from '../../../../../../config';
import { emptyTitle } from '../../../../../../helpers/emptyTitle';
import { useCurrentUserQuery } from '../../../../../../store/userApi/user.api';
import { DocumentType, SortEnum } from '../../../../../../types/document.types';
import { DocumentPaper } from '../../../../../Document/components';
import { getDate } from '../../helpers';
import { Container } from './styled-components';

type DocumentProps = {
  sort: SortEnum;
  doc: DocumentType;
  refetch: () => void;
};

const Document: FC<DocumentProps> = ({ doc, sort, refetch }) => {
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const { data: currentUser } = useCurrentUserQuery();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsShowDropdown(prevProps => !prevProps);
  };

  const date = getDate(sort, doc.openHistory, doc.changedAt, currentUser?._id);

  return (
    <Container>
      <div className="content" onClick={() => navigate(`${constants.routes.Document}/${doc._id}`)}>
        <DocumentPaper content={doc.content} isReadOnly width={1} height={275} />
      </div>

      <div className="info">
        <div className="title">
          {/* if title.length >= 30 use replace if not just show a title */}
          {emptyTitle(doc.title).replace(/^(.{12}[^\s]*).*/, '$1...')}
        </div>

        <div className="sub-title">
          <div className="left">
            <Button type="primary" size="small" icon={<AlignLeftOutlined />} />
            <div className="shared">{doc.visibleFor.length > 1 && <TeamOutlined />}</div>
            <div className="date">{date && moment(date).format('MMMM Do, YYYY')}</div>
          </div>

          <div>
            <MoreButton
              refetch={refetch}
              docTitle={doc.title}
              documentId={doc._id}
              isShowDropdown={isShowDropdown}
              toggleDropdown={toggleDropdown}
              isDisabled={currentUser?._id !== doc.owner}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default memo(Document);

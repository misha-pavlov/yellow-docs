import { FileTextOutlined, StarFilled, StarOutlined, TeamOutlined } from '@ant-design/icons';
import { Button, Space, Typography } from 'antd';
import moment from 'moment';
import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAvatar } from '../../../../components';
import { constants } from '../../../../config';
import { useCurrentUserQuery, useUserByIdQuery } from '../../../../store/userApi/user.api';
import { DocumentType } from '../../../../types/document.types';
import { QuillToolbar } from './components';
import { Container, Wrapper } from './styled-components';

const { Text } = Typography;

const DocumentHeader = ({
  document,
  editDocument,
}: {
  document: DocumentType;
  editDocument: (userId: string) => void;
}) => {
  const navigate = useNavigate();
  const { data: currentUser } = useCurrentUserQuery();
  const { data: userById, isLoading: isLoadingUserById } = useUserByIdQuery({
    userId: document.changedBy,
  });
  const [isFavourite, setIsFavourite] = useState(
    document.favouriteInUsers.includes(currentUser?._id || '')
  );

  return (
    <Wrapper>
      <Container align="center">
        <Space size={16}>
          <FileTextOutlined className="icon" onClick={() => navigate(constants.routes.Home)} />

          <Space direction="vertical" size={0}>
            <Space>
              <div className="title">{document.title}</div>
              <Button
                type="text"
                size="small"
                onClick={() => {
                  setIsFavourite(prevProps => !prevProps);
                  currentUser?._id && editDocument(currentUser._id);
                }}
                icon={isFavourite ? <StarFilled /> : <StarOutlined />}
              />
            </Space>

            <Space>
              {!isLoadingUserById && userById && (
                <Text underline className="options">
                  Last edit was made on {moment(document.changedAt).format('MMMM D, YYYY')} by{' '}
                  {userById.firstName} {userById.lastName}
                </Text>
              )}
            </Space>
          </Space>
        </Space>

        <Space size={16}>
          <Button type="primary" icon={<TeamOutlined />}>
            Share
          </Button>
          <UserAvatar className="avatar" />
        </Space>
      </Container>

      <QuillToolbar />
    </Wrapper>
  );
};

export default memo(DocumentHeader);

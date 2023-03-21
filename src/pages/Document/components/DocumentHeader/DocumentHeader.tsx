import {
  DownOutlined,
  FileTextOutlined,
  StarFilled,
  StarOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Dropdown, Input, List, MenuProps, Modal, Space, Typography } from 'antd';
import moment from 'moment';
import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAvatar } from '../../../../components';
import { constants } from '../../../../config';
import { useCurrentUserQuery, useUserByIdQuery } from '../../../../store/userApi/user.api';
import { DocumentType } from '../../../../types/document.types';
import { QuillToolbar } from './components';
import { Container, Wrapper } from './styled-components';
import { useGetDocumentUsersQuery } from '../../../../store/documentApi/document.api';
import './documentHeader.css';

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
  const { data: documentUsers, isLoading: isLoadingDocumentUsers } = useGetDocumentUsersQuery({
    documentId: document._id,
  });

  const [isFavourite, setIsFavourite] = useState(
    document.favouriteInUsers.includes(currentUser?._id || '')
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Viewer',
    },
    {
      key: '2',
      label: 'Editor',
    },
    {
      key: '4',
      danger: true,
      label: 'Remove access',
    },
  ];

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
          <Button type="primary" icon={<TeamOutlined />} onClick={showModal}>
            Share
          </Button>
          <UserAvatar className="avatar" />
        </Space>
      </Container>

      <QuillToolbar />

      <Modal
        title={`Share "${document.title}"`}
        open={isModalOpen}
        footer={[
          <Button key="ok" type="primary" onClick={handleOk}>
            Done
          </Button>,
        ]}
      >
        <div className="input">
          <Input placeholder="Add people" size="large" />
        </div>

        <Text className="peopleWithAccess">People with access</Text>

        <List
          className="demo-loadmore-list"
          loading={isLoadingDocumentUsers}
          itemLayout="horizontal"
          // loadMore={loadMore}
          dataSource={documentUsers}
          renderItem={item => {
            return (
              <List.Item
                actions={
                  document.owner !== currentUser?._id
                    ? [<div>Owner</div>]
                    : [
                        // TODO: add defaultSelectedKeys: [] if user read only add Viewer flag and etc.
                        <Dropdown
                          menu={{ items, selectable: true }}
                          trigger={['click']}
                          className="dropdown"
                        >
                          <Space>
                            Hover me
                            <DownOutlined />
                          </Space>
                        </Dropdown>,
                      ]
                }
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.image} />}
                  title={<div>{item.email}</div>}
                  description={item.firstName}
                />
              </List.Item>
            );
          }}
        />
      </Modal>
    </Wrapper>
  );
};

export default memo(DocumentHeader);

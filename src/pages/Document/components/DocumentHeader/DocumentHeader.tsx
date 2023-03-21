import {
  DownOutlined,
  FileTextOutlined,
  StarFilled,
  StarOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Dropdown, Input, List, MenuProps, Modal, Space, Typography } from 'antd';
import moment from 'moment';
import { ChangeEvent, memo, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAvatar } from '../../../../components';
import { constants } from '../../../../config';
import {
  useCurrentUserQuery,
  useSearchByEmailQuery,
  useUserByIdQuery,
} from '../../../../store/userApi/user.api';
import { DocumentType, UserAccessValuesEnum } from '../../../../types/document.types';
import { QuillToolbar } from './components';
import { Container, SearchResults, Wrapper } from './styled-components';
import { useGetDocumentUsersQuery } from '../../../../store/documentApi/document.api';
import { useDebounce } from '../../../../hooks';
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
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedValue = useDebounce<string>(searchTerm, 1500);

  const { data: usersByEmail } = useSearchByEmailQuery(
    { searchTerm: debouncedValue },
    { skip: !isModalOpen }
  );

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSelect = (item: string) => {
    console.log('selected item = ', item);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const items: MenuProps['items'] = useMemo(
    () => [
      {
        key: UserAccessValuesEnum.VIEWER,
        label: UserAccessValuesEnum.VIEWER,
      },
      {
        key: UserAccessValuesEnum.EDITOR,
        label: UserAccessValuesEnum.EDITOR,
      },
      {
        key: '3',
        danger: true,
        label: UserAccessValuesEnum.REMOVE_ACCESS,
      },
    ],
    []
  );

  const renderList = useCallback(
    (isSearchResult?: boolean) => {
      return (
        <List
          className="demo-loadmore-list"
          loading={isLoadingDocumentUsers}
          itemLayout="horizontal"
          // loadMore={loadMore}
          dataSource={isSearchResult ? usersByEmail : documentUsers}
          renderItem={item => {
            const itemId = item._id;
            const isOwner = document.owner === itemId;
            const isReadOnly = document.readOnlyMembers.includes(itemId);
            const userAccessType = isReadOnly
              ? UserAccessValuesEnum.VIEWER
              : UserAccessValuesEnum.EDITOR;

            const getActions = () => {
              if (isSearchResult) {
                return [];
              }

              if (isOwner) {
                return [<div>{UserAccessValuesEnum.OWNER}</div>];
              } else {
                return [
                  <Dropdown
                    menu={{ items, selectable: true, defaultSelectedKeys: [userAccessType] }}
                    trigger={['click']}
                    className="dropdown"
                  >
                    <Space>
                      {userAccessType}
                      <DownOutlined />
                    </Space>
                  </Dropdown>,
                ];
              }
            };

            return (
              <List.Item actions={getActions()}>
                <List.Item.Meta
                  avatar={<Avatar src={item.image} />}
                  title={<div>{item.email}</div>}
                  description={`${item.firstName} ${item.lastName}`}
                />
              </List.Item>
            );
          }}
        />
      );
    },
    [
      document.owner,
      document.readOnlyMembers,
      documentUsers,
      isLoadingDocumentUsers,
      items,
      usersByEmail,
    ]
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
        onCancel={handleCancel}
        footer={[
          <Button key="ok" type="primary" onClick={handleOk}>
            Done
          </Button>,
        ]}
      >
        <div className="input">
          <Input placeholder="Add people" size="large" value={searchTerm} onChange={onChange} />
          {searchTerm.length > 3 && <SearchResults>{renderList(true)}</SearchResults>}
        </div>

        <Text className="peopleWithAccess">People with access</Text>
        {renderList()}
      </Modal>
    </Wrapper>
  );
};

export default memo(DocumentHeader);

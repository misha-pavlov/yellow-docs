import {
  DownOutlined,
  FileTextOutlined,
  SaveOutlined,
  StarFilled,
  StarOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Dropdown,
  Input,
  List,
  MenuProps,
  Modal,
  Space,
  Tooltip,
  Typography,
} from 'antd';
import moment from 'moment';
import { ChangeEvent, memo, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// components
import { UserAvatar } from '../../../../components';
import { QuillToolbar } from './components';
// constants
import { constants } from '../../../../config';
// api
import {
  useCurrentUserQuery,
  useSearchByEmailQuery,
  useUserByIdQuery,
} from '../../../../store/userApi/user.api';
import {
  useConvertToMutation,
  useEditDocumentMutation,
  useGetDocumentUsersQuery,
} from '../../../../store/documentApi/document.api';
import { useCreateTemplateMutation } from '../../../../store/templatesApi/templates.api';
// types
import {
  DocumentType,
  UserAccessEnum,
  UserAccessValuesEnum,
} from '../../../../types/document.types';
import { UserType } from '../../../../types/user.types';
// styles
import { Container, SearchResults, Wrapper } from './styled-components';
import './documentHeader.css';
// hooks
import { useDebounce } from '../../../../hooks';
// helpers
import { emptyTitle } from '../../../../helpers/emptyTitle';

const { Text } = Typography;

const DocumentHeader = ({
  document,
  editDocument,
}: {
  document: DocumentType;
  editDocument: ({
    newFavouriteUserId,
    newReadOnlyMemberId,
  }: {
    newFavouriteUserId?: string;
    newReadOnlyMemberId?: string;
  }) => void;
}) => {
  const navigate = useNavigate();

  // STATES
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState(emptyTitle(document.title));

  // QUERIES
  const { data: currentUser } = useCurrentUserQuery();
  const { data: userById, isLoading: isLoadingUserById } = useUserByIdQuery({
    userId: document.changedBy,
  });
  const { data: documentUsers, isLoading: isLoadingDocumentUsers } = useGetDocumentUsersQuery(
    {
      documentId: document._id,
    },
    { pollingInterval: 5000, skip: !isModalOpen }
  );

  // STATES BY QUERIES
  const [isFavourite, setIsFavourite] = useState(
    document.favouriteInUsers.includes(currentUser?._id || '')
  );

  // SEARCH
  const debouncedValue = useDebounce<string>(searchTerm, 1500);

  const { data: usersByEmail } = useSearchByEmailQuery(
    { searchTerm: debouncedValue, documentId: document._id },
    { skip: !isModalOpen }
  );

  // MUTATIONS
  const [convertToMutate] = useConvertToMutation();
  const [editDocumentMutate] = useEditDocumentMutation();
  const [createTemplatesMutate, { isLoading: createTemplateLoading }] = useCreateTemplateMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const toggleShowInput = () => setShowInput(prevProps => !prevProps);

  const onSelect = useCallback(
    (item: UserType, key?: UserAccessValuesEnum) => {
      if (!key) {
        editDocument({ newReadOnlyMemberId: item._id });
        setSearchTerm('');
      }

      if (key === UserAccessValuesEnum.REMOVE_ACCESS) {
        editDocument({ newReadOnlyMemberId: item._id });
      }

      if (key && [UserAccessValuesEnum.EDITOR, UserAccessValuesEnum.VIEWER].includes(key)) {
        const newValue =
          key === UserAccessValuesEnum.EDITOR ? UserAccessEnum.FULL : UserAccessEnum.READ_ONLY;
        convertToMutate({ userId: item._id, documentId: document._id, accessType: newValue });
      }
    },
    [convertToMutate, document._id, editDocument]
  );

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (showInput) {
        setTitle(event.target.value);
      } else {
        setSearchTerm(event.target.value);
      }
    },
    [showInput]
  );

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
        key: UserAccessValuesEnum.REMOVE_ACCESS,
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
                    menu={{
                      items,
                      selectable: true,
                      defaultSelectedKeys: [userAccessType],
                      onSelect: (event: { key: string }) =>
                        onSelect(item, event.key as UserAccessValuesEnum),
                    }}
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
              <List.Item
                actions={getActions()}
                {...(isSearchResult && { onClick: () => onSelect(item) })}
              >
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
      onSelect,
      usersByEmail,
    ]
  );

  const renderTitle = useMemo(() => {
    if (!showInput) {
      return (
        <div className="title" onClick={toggleShowInput}>
          {title}
        </div>
      );
    } else {
      const onClick = (isSave?: boolean) => {
        toggleShowInput();

        if (isSave) {
          editDocumentMutate({ documentId: document._id, newTitle: title });
        } else {
          setTitle(document.title);
        }
      };

      return (
        <Space direction="horizontal">
          <Input placeholder={title} value={title} size="small" onChange={onChange} />
          <Button style={{ width: 80 }} onClick={() => onClick(true)} type="primary" size="small">
            Save
          </Button>
          <Button
            danger
            size="small"
            type="primary"
            style={{ width: 80 }}
            onClick={() => onClick()}
          >
            Close
          </Button>
        </Space>
      );
    }
  }, [showInput, title, onChange, editDocumentMutate, document._id, document.title]);

  return (
    <Wrapper>
      <Container align="center">
        <Space size={16}>
          <FileTextOutlined className="icon" onClick={() => navigate(constants.routes.Home)} />

          <Space direction="vertical" size={0}>
            <Space>
              {renderTitle}
              <Button
                type="text"
                size="small"
                onClick={() => {
                  setIsFavourite(prevProps => !prevProps);
                  currentUser?._id && editDocument({ newFavouriteUserId: currentUser._id });
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
          <Tooltip title="Save as template">
            <Button
              icon={<SaveOutlined />}
              loading={createTemplateLoading}
              onClick={() =>
                createTemplatesMutate({
                  title: `${title} template`,
                  content: document.content,
                })
              }
            />
          </Tooltip>
          <Button type="primary" icon={<TeamOutlined />} onClick={showModal}>
            Share
          </Button>
          <UserAvatar className="avatar" />
        </Space>
      </Container>

      <QuillToolbar />

      <Modal
        title={`Share "${title}"`}
        open={isModalOpen}
        onCancel={handleOk}
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

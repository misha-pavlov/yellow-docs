import { DeleteOutlined, FontSizeOutlined, MoreOutlined, SelectOutlined } from '@ant-design/icons';
import { Button, Dropdown, Form, Input, MenuProps, Modal } from 'antd';
import { FC, useCallback, useMemo, useState } from 'react';
import { constants } from '../../../../../../config';
import {
  useDeleteDocumentMutation,
  useEditDocumentMutation,
} from '../../../../../../store/documentApi/document.api';

type MoreButtonProps = {
  docTitle: string;
  documentId: string;
  isShowDropdown: boolean;
  isDisabled?: boolean;
  toggleDropdown: () => void;
  refetch?: () => void;
};

const MoreButton: FC<MoreButtonProps> = ({
  refetch,
  docTitle,
  documentId,
  isDisabled,
  isShowDropdown,
  toggleDropdown,
}) => {
  const [title, setTitle] = useState(docTitle);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [editDocumentMutate] = useEditDocumentMutation();
  const [deleteDocumentMutate] = useDeleteDocumentMutation();

  const showModal = (isDelete?: boolean) => {
    toggleDropdown();
    isDelete ? setIsDeleteModalOpen(true) : setIsRenameModalOpen(true);
  };

  const handleOk = useCallback(() => {
    if (docTitle !== title) {
      setIsRenameModalOpen(false);
      editDocumentMutate({ documentId, newTitle: title });

      if (refetch) {
        refetch();
      }
    }

    if (isDeleteModalOpen) {
      setIsDeleteModalOpen(false);
      deleteDocumentMutate({ documentId });
    }
  }, [
    deleteDocumentMutate,
    docTitle,
    documentId,
    editDocumentMutate,
    isDeleteModalOpen,
    refetch,
    title,
  ]);

  const handleCancel = (isDelete?: boolean) => {
    isDelete ? setIsDeleteModalOpen(false) : setIsRenameModalOpen(false);
  };

  const items: MenuProps['items'] = [
    {
      label: <span>Rename</span>,
      icon: <FontSizeOutlined />,
      onClick: () => showModal(),
      disabled: isDisabled,
      key: '0',
    },
    {
      label: <span>Remove</span>,
      icon: <DeleteOutlined />,
      onClick: () => showModal(true),
      disabled: isDisabled,
      key: '1',
    },
    {
      label: <span>Open in new tab</span>,
      icon: <SelectOutlined />,
      onClick: () => window.open(`${constants.routes.Document}/1234`, '_blank'),
      key: '2',
    },
  ];

  const renderModal = useMemo(
    () =>
      isDeleteModalOpen ? (
        <Modal
          title="Are you sure delete this document?"
          open={isDeleteModalOpen}
          onOk={handleOk}
          okType="danger"
          okText="Yes"
          cancelText="No"
          onCancel={() => handleCancel(true)}
        >
          <p>You will never can open this document</p>
        </Modal>
      ) : (
        <Modal
          title="Rename"
          open={isRenameModalOpen}
          onOk={handleOk}
          onCancel={() => handleCancel()}
        >
          <Form layout="vertical">
            <Form.Item label="Please enter a new name for the item:">
              <Input
                autoFocus
                value={title}
                placeholder="Doc name"
                onChange={e => setTitle(e.target.value)}
              />
            </Form.Item>
          </Form>
        </Modal>
      ),
    [handleOk, isDeleteModalOpen, isRenameModalOpen, title]
  );

  return (
    <>
      <Dropdown menu={{ items }} trigger={['click']} placement="top" open={isShowDropdown}>
        <Button type="text" size="small" icon={<MoreOutlined />} onClick={toggleDropdown} />
      </Dropdown>
      {renderModal}
    </>
  );
};

export default MoreButton;

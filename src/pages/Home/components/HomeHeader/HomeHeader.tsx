import {
  AlignLeftOutlined,
  ArrowLeftOutlined,
  FileTextOutlined,
  MenuOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import moment from 'moment';
import { ChangeEvent, FC, useCallback, useMemo, useState } from 'react';
import { Owner, UserAvatar } from '../../../../components';
import { useDebounce } from '../../../../hooks';
import { useGetRecentDocumentsQuery } from '../../../../store/documentApi/document.api';
import { DocumentType, OwnedEnum, SortEnum } from '../../../../types/document.types';
import { Sidebar } from './components';
import { Container } from './styled-components';

type HomeHeaderProps = {
  showOnlyTemplates: boolean;
  toggleShowOnlyTemplates: VoidFunction;
};

const HomeHeader: FC<HomeHeaderProps> = ({ showOnlyTemplates, toggleShowOnlyTemplates }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);

  const toggleIsCollapsed = useCallback(() => {
    setIsCollapsed(prevProps => !prevProps);
  }, []);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
  }, []);

  const { data, isLoading, isFetching } = useGetRecentDocumentsQuery(
    {
      owned: OwnedEnum.BY_ANYONE,
      searchTerm: debouncedSearchTerm,
      sort: SortEnum.LAST_OPENED_BY_ME,
    },
    { skip: debouncedSearchTerm.length === 0 }
  );

  const renderSidebar = useMemo(
    () => !isCollapsed && <Sidebar onPressOutside={toggleIsCollapsed} />,
    [isCollapsed, toggleIsCollapsed]
  );

  const renderSearchResults = useMemo(() => {
    if (isLoading || isFetching || !data || data.length === 0 || debouncedSearchTerm.length === 0) {
      return null;
    }

    return (
      <Space direction="vertical" className="searchResults">
        {data.map((doc: DocumentType) => (
          <Space className="searchItem" align="center">
            <Space size={20} align="center">
              <Button type="primary" size="small" icon={<AlignLeftOutlined />} />
              <Space direction="vertical">
                <div>{doc.title}</div>
                <div className="subTitle">
                  <Owner ownerId={doc.owner} />
                </div>
              </Space>
            </Space>

            <div>{moment(doc.changedAt).format('M/DD/YY')}</div>
          </Space>
        ))}
      </Space>
    );
  }, [data, debouncedSearchTerm.length, isFetching, isLoading]);

  return showOnlyTemplates ? (
    <Container>
      <Button
        type="text"
        shape="round"
        icon={<ArrowLeftOutlined />}
        size="large"
        onClick={toggleShowOnlyTemplates}
      >
        Template gallery
      </Button>
    </Container>
  ) : (
    <>
      <Container>
        <Space className="align-block">
          <Button
            type="text"
            size="large"
            shape="circle"
            icon={<MenuOutlined />}
            onClick={toggleIsCollapsed}
          />

          <FileTextOutlined className="icon" />
        </Space>

        <div className="input-block">
          <Input
            allowClear
            size="large"
            bordered={false}
            value={searchTerm}
            placeholder="Search"
            prefix={<SearchOutlined />}
            onChange={handleChange}
          />

          {renderSearchResults}
        </div>

        <UserAvatar tooltipTitle="username" className="avatar" />
      </Container>

      {renderSidebar}
    </>
  );
};

export default HomeHeader;

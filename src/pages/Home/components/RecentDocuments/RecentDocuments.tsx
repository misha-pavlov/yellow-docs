import { TeamOutlined } from '@ant-design/icons';
import { Col, Row, Skeleton, Table } from 'antd';
import moment from 'moment';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useGetRecentDocumentsQuery } from '../../../../store/documentApi/document.api';
import { useCurrentUserQuery } from '../../../../store/userApi/user.api';
import { DocumentType, OwnedEnum, SortEnum } from '../../../../types/document.types';
import { Header, Document, MoreButton, Owner } from './components';
import { getDate } from './helpers';
import { Container } from './styled-components';
import { Slide } from './types';

type RecentDocumentsProps = {
  showOnlyTemplates: boolean;
};

const RecentDocuments: FC<RecentDocumentsProps> = ({ showOnlyTemplates }) => {
  const [anim, setAnim] = useState(Slide.SlideInUp);
  const [showComponent, setShowComponent] = useState(true);
  const [isTable, setIsTable] = useState(false);
  const [isShowMoreMenu, setIsShowMoreMenu] = useState('');
  const [owned, setOwned] = useState(OwnedEnum.BY_ANYONE);
  const [sort, setSort] = useState(SortEnum.LAST_OPENED_BY_ME);

  const { data: currentUser } = useCurrentUserQuery();

  const changeOwned = (newOwend: OwnedEnum) => {
    setOwned(newOwend);
  };

  const changeSort = (newSort: SortEnum) => {
    setSort(newSort);
  };

  const toggleIsTable = () => {
    setIsTable(prevProps => !prevProps);
  };

  const toggleIsShowMoreMenu = useCallback(
    (id: string) => {
      if (id === isShowMoreMenu) {
        setIsShowMoreMenu('');
      } else {
        setIsShowMoreMenu(id);
      }
    },
    [isShowMoreMenu]
  );

  // TODO: ADD AND USE SUBSCRIPTION
  const { data, isLoading, refetch } = useGetRecentDocumentsQuery(
    {
      owned,
      sort,
    },
    { pollingInterval: 10000 }
  );

  // handle show only template mode and animation for hiding and showing recent documents
  useEffect(() => {
    if (showOnlyTemplates) {
      setAnim(Slide.SlideOutDown);
      setTimeout(() => setShowComponent(false), 1000);
    } else if (!showOnlyTemplates && anim === Slide.SlideOutDown) {
      setAnim(Slide.SlideInUp);
      setTimeout(() => setShowComponent(true), 1000);
    }
  }, [anim, showOnlyTemplates]);

  const renderCols = useMemo(() => {
    return data?.map((doc: DocumentType) => (
      <Col span={6} key={doc._id}>
        <Document doc={doc} sort={sort} refetch={refetch} />
      </Col>
    ));
  }, [data, refetch, sort]);

  // table columns
  const columns = useMemo(
    () => [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Owner',
        dataIndex: 'owner',
        key: 'owner',
      },
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: 'More',
        dataIndex: 'more',
        key: 'more',
      },
    ],
    []
  );

  const renderContent = useMemo(() => {
    if (!isTable) {
      return <Row gutter={[40, 40]}>{renderCols}</Row>;
    }

    const mapTableData = data?.map((doc: DocumentType) => {
      const date = getDate(sort, doc.openHistory, doc.changedAt, currentUser?._id);

      return {
        key: doc._id,
        title: (
          <span>
            {doc.title} {doc.visibleFor.length > 1 && <TeamOutlined />}
          </span>
        ),
        owner: <Owner ownerId={doc.owner} />,
        date: date ? moment(date).format('MMMM Do, YYYY') : '',
        more: (
          <MoreButton
            refetch={refetch}
            docTitle={doc.title}
            documentId={doc._id}
            isDisabled={currentUser?._id !== doc.owner}
            isShowDropdown={isShowMoreMenu === doc._id}
            toggleDropdown={() => toggleIsShowMoreMenu(doc._id)}
          />
        ),
      };
    });

    return (
      <Table dataSource={mapTableData} columns={columns} pagination={false} showHeader={false} />
    );
  }, [
    columns,
    currentUser?._id,
    data,
    isShowMoreMenu,
    isTable,
    refetch,
    renderCols,
    sort,
    toggleIsShowMoreMenu,
  ]);

  return showComponent ? (
    <Container anim={anim}>
      <div>
        <Header
          sort={sort}
          owned={owned}
          isTable={isTable}
          changeSort={changeSort}
          changeOwned={changeOwned}
          toggleIsTable={toggleIsTable}
        />

        <div className="wrapper">
          <div className="main-content">
            {isLoading ? <Skeleton.Button active size="large" className="loader" /> : renderContent}
          </div>
        </div>
      </div>
    </Container>
  ) : null;
};

export default RecentDocuments;

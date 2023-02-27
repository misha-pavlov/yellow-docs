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

  const { data, isLoading } = useGetRecentDocumentsQuery({
    owned,
    sort,
  });

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
        <Document doc={doc} sort={sort} />
      </Col>
    ));
  }, [data, sort]);

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
    renderCols,
    sort,
    toggleIsShowMoreMenu,
  ]);

  return showComponent ? (
    <Container anim={anim}>
      <div>
        <Header
          owned={owned}
          changeOwned={changeOwned}
          sort={sort}
          changeSort={changeSort}
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

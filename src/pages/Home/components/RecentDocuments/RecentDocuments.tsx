import { Col, Row, Skeleton } from 'antd';
import { FC, useEffect, useMemo, useState } from 'react';
import { useGetRecentDocumentsQuery } from '../../../../store/documentApi/document.api';
import { DocumentType, OwnedEnum, SortEnum } from '../../../../types/document.types';
import { Header, Document } from './components';
import { Container } from './styled-components';
import { Slide } from './types';

type RecentDocumentsProps = {
  showOnlyTemplates: boolean;
};

const RecentDocuments: FC<RecentDocumentsProps> = ({ showOnlyTemplates }) => {
  const [anim, setAnim] = useState(Slide.SlideInUp);
  const [showComponent, setShowComponent] = useState(true);
  const [owned, setOwned] = useState(OwnedEnum.BY_ANYONE);
  const [sort, setSort] = useState(SortEnum.LAST_OPENED_BY_ME);

  const changeOwned = (newOwend: OwnedEnum) => {
    setOwned(newOwend);
  };

  const changeSort = (newSort: SortEnum) => {
    setSort(newSort);
  };

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

  return showComponent ? (
    <Container anim={anim}>
      <div>
        <Header owned={owned} changeOwned={changeOwned} sort={sort} changeSort={changeSort} />

        <div className="wrapper">
          <div className="main-content">
            {isLoading ? (
              <Skeleton.Button active size="large" className="loader" />
            ) : (
              <Row gutter={[40, 40]}>{renderCols}</Row>
            )}
          </div>
        </div>
      </div>
    </Container>
  ) : null;
};

export default RecentDocuments;

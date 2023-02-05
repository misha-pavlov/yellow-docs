import { Col, Row } from 'antd';
import { FC, useEffect, useMemo, useState } from 'react';
import { Header, Document } from './components';
import { Container } from './styled-components';
import { Slide } from './types';

type RecentDocumentsProps = {
  showOnlyTemplates: boolean;
};

const RecentDocuments: FC<RecentDocumentsProps> = ({ showOnlyTemplates }) => {
  const [anim, setAnim] = useState(Slide.SlideInUp);
  const [showComponent, setShowComponent] = useState(true);

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
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
      <Col span={6}>
        <Document />
      </Col>
    ));
  }, []);

  return showComponent ? (
    <Container anim={anim}>
      <div className="main-content">
        <Header />
        <Row gutter={[40, 40]}>{renderCols}</Row>
      </div>
    </Container>
  ) : null;
};

export default RecentDocuments;

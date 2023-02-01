import { FC, useEffect, useState } from 'react';
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

  return showComponent ? <Container anim={anim}>RecentDocuments</Container> : null;
};

export default RecentDocuments;

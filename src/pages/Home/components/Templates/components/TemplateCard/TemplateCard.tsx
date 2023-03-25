import { PlusCircleOutlined } from '@ant-design/icons';
import { FC, memo } from 'react';
import { DocumentPaper } from '../../../../../Document/components';
import { CardContainer, CardInfoContainer, CardWrapper } from './styled-components';

type TemplateCardProps = {
  title: string;
  content?: string;
  isBlankCard?: boolean;
  onClick: () => void;
};

const TemplateCard: FC<TemplateCardProps> = ({ title, content, isBlankCard, onClick }) => {
  return (
    <CardWrapper onClick={onClick}>
      <CardContainer>
        {isBlankCard || !content ? (
          <div className="plus-block">
            <PlusCircleOutlined />
          </div>
        ) : (
          <DocumentPaper content={content} isReadOnly width={1} height={200} />
        )}
      </CardContainer>

      <CardInfoContainer isBlankCard={isBlankCard}>
        <div className="title">{title}</div>
      </CardInfoContainer>
    </CardWrapper>
  );
};

export default memo(TemplateCard);

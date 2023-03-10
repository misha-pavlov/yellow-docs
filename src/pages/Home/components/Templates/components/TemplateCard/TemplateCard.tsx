import { PlusCircleOutlined } from '@ant-design/icons';
import { FC, memo } from 'react';
import { CardContainer, CardInfoContainer, CardWrapper } from './styled-components';

type TemplateCardProps = {
  title: string;
  subTitle?: string;
  isBlankCard?: boolean;
  onClick: () => void;
};

const TemplateCard: FC<TemplateCardProps> = ({ title, subTitle, isBlankCard, onClick }) => {
  return (
    <CardWrapper onClick={onClick}>
      <CardContainer>
        {isBlankCard ? (
          <div className="plus-block">
            <PlusCircleOutlined />
          </div>
        ) : (
          `Render small cntent`
        )}
      </CardContainer>

      <CardInfoContainer isBlankCard={isBlankCard}>
        <div className="title">{title}</div>
        {subTitle && <div className="sub-title">{subTitle}</div>}
      </CardInfoContainer>
    </CardWrapper>
  );
};

export default memo(TemplateCard);

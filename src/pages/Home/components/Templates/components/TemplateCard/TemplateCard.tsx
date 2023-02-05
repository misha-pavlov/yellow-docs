import { PlusCircleOutlined } from '@ant-design/icons';
import { FC } from 'react';
import { CardContainer, CardInfoContainer, CardWrapper } from './styled-components';

type TemplateCardProps = {
  title: string;
  subTitle?: string;
  isBlankCard?: boolean;
};

const TemplateCard: FC<TemplateCardProps> = ({ title, subTitle, isBlankCard }) => {
  return (
    <CardWrapper>
      <CardContainer>
        {isBlankCard ? (
          <div className="plus-block">
            <PlusCircleOutlined />
          </div>
        ) : (
          `Render small cntent`
        )}
      </CardContainer>

      <CardInfoContainer>
        <div className="title">{title}</div>
        {subTitle && <div className="sub-title">{subTitle}</div>}
      </CardInfoContainer>
    </CardWrapper>
  );
};

export default TemplateCard;

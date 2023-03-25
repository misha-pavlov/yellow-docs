import styled from 'styled-components';
import { colors } from './../../../../../../config/colors';

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CardContainer = styled.div`
  background-color: ${colors.white2};
  width: 150px;
  height: 200px;
  border: 1px solid ${colors.white2};
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    border-color: ${colors.green};
  }

  .plus-block {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    * {
      font-size: 50px;
      color: ${colors.green};
    }
  }
`;

export const CardInfoContainer = styled.div<{ isBlankCard?: boolean }>`
  margin-top: 12px;

  .title {
    font-weight: 500;
    /* for cards which without sub-title */
    ${({ isBlankCard }) => isBlankCard && 'margin-bottom: 13px'}
  }
`;

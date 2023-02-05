import styled from 'styled-components';
import { colors } from '../../../../../../config';

export const Container = styled.div<{ isSticky: boolean }>`
  padding: 20px 0;
  position: sticky;
  top: 64px;
  background-color: ${colors.white2};
  z-index: 1;
  display: flex;
  justify-content: center;
  ${({ isSticky }) => isSticky && `box-shadow: 0 10px 19px -21px ${colors.black};`};

  .header-wrapper {
    width: 75%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .right {
      font-size: 16px;
    }

    .left {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 85px;

      .active {
        background-color: ${colors.white5};
      }

      .icons-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
      }
    }
  }
`;

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
    justify-content: space-between;

    .right {
      font-size: 16px;
    }

    .left {
      justify-content: space-between;

      .active {
        background-color: ${colors.white5};
      }
    }
  }
`;

import styled, { keyframes } from 'styled-components';
import { flipInX } from 'react-animations';
import { colors } from '../../../../config';

const flipAnimation = keyframes`${flipInX}`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 20px;
  background-color: ${colors.white2};
  animation: 1s ${flipAnimation};
  position: sticky;
  top: 0;
  z-index: 3;

  .align-block {
    display: flex;
    align-items: center;
    gap: 16px;

    .icon {
      color: ${colors.yellow600};
      font-size: 28px;
    }
  }

  .input-block {
    width: 50%;
    height: 48px;
    display: flex;
    align-items: center;
    border-radius: 8px;
    background-color: ${colors.white1};
  }

  .avatar {
    cursor: pointer;
  }
`;

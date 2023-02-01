import styled, { keyframes } from 'styled-components';
import { flipInX } from 'react-animations';
import { colors } from '../../../../config';

const flipAnimation = keyframes`${flipInX}`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 20px;
  background-color: ${colors.white2};
  animation: 1s ${flipAnimation};

  .align-block {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .input-block {
    width: 50%;
    height: 48px;
    display: flex;
    align-items: center;
    border-radius: 8px;
    background-color: ${colors.white3};
  }
`;

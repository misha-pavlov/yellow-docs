import styled, { keyframes } from 'styled-components';
import { bounceInRight, bounceOutRight } from 'react-animations';
import { Bounce } from './types';
import { colors } from '../../../../config';

const bounceInRightAnimation = keyframes`${bounceInRight}`;
const bounceOutRightAnimation = keyframes`${bounceOutRight}`;

export const Container = styled.div<{ anim: Bounce }>`
  position: fixed;
  z-index: 6;
  background-color: transparent;
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  animation: 1s
    ${({ anim }) =>
      anim === Bounce.BounceInRight ? bounceInRightAnimation : bounceOutRightAnimation};

  .menu {
    background-color: ${colors.white2};
    width: 350px;
    margin-top: 70px;
    margin-right: 16px;
    border-radius: 25px;
    padding: 16px;

    .icon-row {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 12px;
      margin-bottom: 30px;

      .email {
        font-size: 12px;
      }

      .username {
        font-size: 14px;
        margin-bottom: 5px;
      }
    }
  }
`;

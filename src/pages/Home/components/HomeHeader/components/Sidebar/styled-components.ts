import { fadeInLeft, fadeOutLeft } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import { colors } from '../../../../../../config';
import { Fade } from './types';

const fadeInAnimation = keyframes`${fadeInLeft}`;
const fadeOutAnimation = keyframes`${fadeOutLeft}`;

export const Container = styled.div<{ anim: Fade }>`
  background-color: transparent;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
  animation: 1s ${({ anim }) => (anim === Fade.FadeIn ? fadeInAnimation : fadeOutAnimation)};

  .sidebar {
    background-color: ${colors.white2};
    width: 20%;
    height: 100vh;
    padding-top: 16px;
    -webkit-box-shadow: 8px 0px 18px -9px rgba(66, 68, 90, 1);
    -moz-box-shadow: 8px 0px 18px -9px rgba(66, 68, 90, 1);
    box-shadow: 8px 0px 18px -9px rgba(66, 68, 90, 1);

    .logo {
      font-size: 24px;
      font-weight: 600;
      color: ${colors.gray};
      padding-left: 16px;

      .yellow {
        color: ${colors.yellow600};
      }
    }

    .divider {
      margin-top: 20px;
      margin-bottom: 20px;
      background-color: ${colors.gray}30;
    }
  }
`;

import styled, { keyframes } from 'styled-components';
import { slideInUp, slideOutDown } from 'react-animations';
import { Slide } from './types';
import { colors } from './../../../../config/colors';

const slideInUpAnimation = keyframes`${slideInUp}`;
const slideOutDownAnimation = keyframes`${slideOutDown}`;

export const Container = styled.div<{ anim: Slide }>`
  animation: 1s
    ${({ anim }) => (anim === Slide.SlideInUp ? slideInUpAnimation : slideOutDownAnimation)};
  background-color: ${colors.white2};

  .wrapper {
    width: 100%;
    padding-bottom: 20px;
    display: flex;
    justify-content: center;

    .main-content {
      width: 75%;
    }
  }
`;

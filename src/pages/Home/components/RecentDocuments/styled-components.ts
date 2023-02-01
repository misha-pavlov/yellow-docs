import styled, { keyframes } from 'styled-components';
import { slideInUp, slideOutDown } from 'react-animations';
import { Slide } from './types';

const slideInUpAnimation = keyframes`${slideInUp}`;
const slideOutDownAnimation = keyframes`${slideOutDown}`;

export const Container = styled.div<{ anim: Slide }>`
  animation: 1s
    ${({ anim }) => (anim === Slide.SlideInUp ? slideInUpAnimation : slideOutDownAnimation)};
`;

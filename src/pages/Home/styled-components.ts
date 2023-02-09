import styled, { keyframes } from 'styled-components';
import { rotateIn, flipOutY, slideInDown, slideOutUp } from 'react-animations';
import { colors } from '../../config';
import { Flip, Rotate, Slide } from './types';

const rotateInAnimation = keyframes`${rotateIn}`;
const flipOutYAnimation = keyframes`${flipOutY}`;
const slideInDownAnimation = keyframes`${slideInDown}`;
const slideOutUpAnimation = keyframes`${slideOutUp}`;

export const Container = styled.div<{ floatButtonAnim: Rotate | Flip }>`
  background-color: ${colors.white1};
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  .rotate-button {
    animation: 1s
      ${({ floatButtonAnim }) =>
        floatButtonAnim === Rotate.RotateIn ? rotateInAnimation : flipOutYAnimation};
  }
`;

export const TemplatesModal = styled.div<{ templatesModalAnim: Slide }>`
  background-color: transparent;
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 64px;

  .templates {
    background-color: ${colors.white1};
    width: 100%;
    padding-left: 12.5%;
    animation: 1s
      ${({ templatesModalAnim }) =>
        templatesModalAnim === Slide.SlideInDown ? slideOutUpAnimation : slideInDownAnimation};
  }
`;

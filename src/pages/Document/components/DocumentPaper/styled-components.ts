import styled from 'styled-components';
import { colors } from './../../../../config/colors';

export const Container = styled.div<{ width?: number; height?: number }>`
  width: ${({ width }) => (width ? '100%' : 915)}px;
  height: ${({ height }) => (height ? `${height}px` : '100vh')};
  overflow: hidden;
  cursor: ${({ width, height }) => (width && height ? 'default' : 'pointer')};
  ${({ width, height }) =>
    !(width && height) &&
    `background-color: ${colors.white2};
  -webkit-box-shadow: 0px 0px 30px -18px rgba(66, 68, 90, 1);
  -moz-box-shadow: 0px 0px 30px -18px rgba(66, 68, 90, 1);
  box-shadow: 0px 0px 30px -18px rgba(66, 68, 90, 1);`}

  #toolbar {
    display: none;
  }
`;

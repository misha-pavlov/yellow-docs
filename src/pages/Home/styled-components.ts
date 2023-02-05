import styled from 'styled-components';
import { colors } from '../../config';

export const Container = styled.div`
  background-color: ${colors.white1};
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TemplatesModal = styled.div`
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
  }
`;

import styled from 'styled-components';
import { colors } from './../../../../../../../../config/colors';

export const Container = styled.div`
  padding-left: 16px;
  padding-top: 10px;
  padding-bottom: 10px;
  vertical-align: middle;
  cursor: pointer;
  margin-right: 20px;

  &:hover {
    background-color: ${colors.white3};
    border-bottom-right-radius: 50px;
    border-top-right-radius: 50px;
  }
`;

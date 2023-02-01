import styled from 'styled-components';
import { colors } from '../../../../../../config';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 25px;

  .right-side {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .divider {
      background-color: ${colors.white4};
      height: 30px;
    }
  }
`;

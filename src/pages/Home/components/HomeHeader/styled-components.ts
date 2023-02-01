import styled from 'styled-components';
import { colors } from '../../../../config';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 20px;
  background-color: ${colors.white2};

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

import styled from 'styled-components';
import { colors } from '../../../../../../config';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  .right {
    font-size: 16px;
  }

  .left {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 85px;

    .active {
      background-color: ${colors.white5};
    }

    .icons-row {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }
  }
`;

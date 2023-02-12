import { Space } from 'antd';
import styled from 'styled-components';
import { colors } from '../../../../../../config';

export const Container = styled(Space)`
  padding-bottom: 25px;
  justify-content: space-between;
  width: 100%;

  .title {
    font-size: 16px;
  }

  .right-side {
    justify-content: space-between;

    .divider {
      background-color: ${colors.white4};
      height: 30px;
    }

    .active {
      background-color: ${colors.white5};
    }
  }
`;

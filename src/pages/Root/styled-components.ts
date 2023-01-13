import { Row } from 'antd';
import styled from 'styled-components';
import { colors } from '../../config';

export const Container = styled(Row)`
  height: 100vh;
  background-color: ${colors.lightGrey};

  .ant-spin-dot-item {
    background-color: ${colors.white};
  }

  .ant-spin-text {
    color: ${colors.white}
  }
`;

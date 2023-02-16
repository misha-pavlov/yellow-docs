import { Space } from 'antd';
import styled from 'styled-components';
import { colors } from './../../../../config/colors';

export const Wrapper = styled.div`
  position: sticky;
  top: 0;
  background-color: ${colors.white2};
  -webkit-box-shadow: 0px 7px 30px -18px rgba(66, 68, 90, 1);
  -moz-box-shadow: 0px 7px 30px -18px rgba(66, 68, 90, 1);
  box-shadow: 0px 7px 30px -18px rgba(66, 68, 90, 1);
  z-index: 5;
`;

export const Container = styled(Space)`
  padding: 16px;
  width: 100%;
  justify-content: space-between;

  .icon {
    font-size: 32px;
    color: ${colors.yellow600};
  }

  .title {
    font-weight: 600;
  }

  .options {
    font-size: 13px;
  }

  .avatar {
    cursor: pointer;
  }
`;

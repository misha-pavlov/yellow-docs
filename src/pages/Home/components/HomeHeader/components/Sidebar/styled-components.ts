import styled from 'styled-components';
import { colors } from '../../../../../../config';

export const Container = styled.div`
  background-color: transparent;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;

  .sidebar {
    background-color: ${colors.white2};
    width: 20%;
    height: 100vh;
    padding-top: 16px;
    -webkit-box-shadow: 8px 0px 18px -9px rgba(66, 68, 90, 1);
    -moz-box-shadow: 8px 0px 18px -9px rgba(66, 68, 90, 1);
    box-shadow: 8px 0px 18px -9px rgba(66, 68, 90, 1);

    .logo {
      font-size: 24px;
      font-weight: 600;
      color: ${colors.gray};
      padding-left: 16px;

      .yellow {
        color: ${colors.yellow600};
      }
    }

    .divider {
      margin-top: 20px;
      margin-bottom: 20px;
      background-color: ${colors.gray}30;
    }
  }
`;

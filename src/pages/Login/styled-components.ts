import { Row } from 'antd';
import styled from 'styled-components';
import { colors } from '../../config';

export const Container = styled(Row)`
  height: 100vh;
  background-color: ${colors.lightGrey};
`;

export const LeftSide = styled(Row)`
  width: 50%;
  padding: 50px;
  flex-direction: column;

  .yellowDocs {
    color: ${colors.yellow500};
    font-weight: 700;
    font-size: 24px;
  }

  .somethingLikeText {
    font-size: 18px;
    margin-bottom: 20%;
    color: ${colors.white};
  }

  .icon {
    font-size: 400px;
    color: ${colors.yellow600};
  }
`;

export const RightSide = styled(Row)`
  background-color: ${colors.white};
  width: 50%;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  flex-direction: column;

  .wellcome {
    font-size: 24px;
    padding-top: 50px;
  }
`;

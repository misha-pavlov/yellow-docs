import { colors } from './../../../../config/colors';
import styled from 'styled-components';

export const Container = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
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

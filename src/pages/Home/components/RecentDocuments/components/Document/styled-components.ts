import styled from 'styled-components';
import { colors } from './../../../../../../config/colors';

export const Container = styled.div`
  border: 1px solid ${colors.gray2};
  width: 250px;
  height: 350px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    border-color: ${colors.green};
  }

  .content {
    height: 275px;
    border-bottom: 1px solid ${colors.gray2};
  }

  .info {
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 5px;

    .title {
      font-weight: 500;
    }

    .sub-title {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      .left {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;

        .shared {
          * {
            font-size: 20px;
          }
        }

        .date {
          color: ${colors.gray1};
          font-size: 13px;
        }
      }
    }
  }
`;

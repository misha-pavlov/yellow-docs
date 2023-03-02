import styled, { keyframes } from 'styled-components';
import { flipInX } from 'react-animations';
import { colors } from '../../../../config';

const flipAnimation = keyframes`${flipInX}`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 20px;
  background-color: ${colors.white2};
  animation: 1s ${flipAnimation};
  position: sticky;
  top: 0;
  z-index: 3;

  .icon {
    color: ${colors.yellow600};
    font-size: 28px;
  }

  .input-block {
    width: 50%;
    height: 48px;
    display: flex;
    align-items: center;
    border-radius: 8px;
    background-color: ${colors.white1};

    .searchResults {
      position: absolute;
      top: 64px;
      width: calc(50% - 16px);
      padding: 16px 0;
      background-color: ${colors.white2};
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      -webkit-box-shadow: 0 7px 10px -4px rgba(0, 0, 0, 0.91);
      -moz-box-shadow: 0 7px 10px -4px rgba(0, 0, 0, 0.91);
      box-shadow: 0 7px 10px -4px rgba(0, 0, 0, 0.91);

      .searchItem {
        width: 100%;
        padding: 16px;
        cursor: pointer;
      justify-content: space-between;

        &:hover {
          transition: ease 1s;
          background-color: ${colors.white1};
          border-radius: 8px;
        }

        .subTitle {
          font-size: 11px;
          color: ${colors.gray1};
        }
      }
    }

    .searchResults {
      position: absolute;
      top: 64px;
      width: calc(50% - 16px);
      padding: 16px 0;
      background-color: ${colors.white2};
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      -webkit-box-shadow: 0 7px 10px -4px rgba(0, 0, 0, 0.71);
      -moz-box-shadow: 0 7px 10px -4px rgba(0, 0, 0, 0.71);
      box-shadow: 0 7px 10px -4px rgba(0, 0, 0, 0.71);

      .searchItem {
        padding: 16px;
        cursor: pointer;

        &:hover {
          transition: ease 1s;
          background-color: ${colors.white1};
          border-radius: 8px;
        }
      }
    }

    .searchResults {
      position: absolute;
      top: 64px;
      width: calc(50% - 16px);
      padding: 16px 0;
      background-color: ${colors.white2};
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      -webkit-box-shadow: 0 7px 10px -4px rgba(0, 0, 0, 0.71);
      -moz-box-shadow: 0 7px 10px -4px rgba(0, 0, 0, 0.71);
      box-shadow: 0 7px 10px -4px rgba(0, 0, 0, 0.71);

      .searchItem {
        padding: 16px;
        cursor: pointer;

        &:hover {
          transition: ease 1s;
          background-color: ${colors.white1};
          border-radius: 8px;
        }
      }
    }

    .searchResults {
      position: absolute;
      top: 64px;
      width: calc(50% - 16px);
      padding: 16px 0;
      background-color: ${colors.white2};
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      -webkit-box-shadow: 0 7px 10px -4px rgba(0, 0, 0, 0.71);
      -moz-box-shadow: 0 7px 10px -4px rgba(0, 0, 0, 0.71);
      box-shadow: 0 7px 10px -4px rgba(0, 0, 0, 0.71);

      .searchItem {
        padding: 16px;
        cursor: pointer;

        &:hover {
          transition: ease 1s;
          background-color: ${colors.white1};
          border-radius: 8px;
        }
      }
    }

    .searchResults {
      position: absolute;
      top: 64px;
      width: calc(50% - 16px);
      padding: 16px 0;
      background-color: ${colors.white2};
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      -webkit-box-shadow: 0 7px 10px -4px rgba(0, 0, 0, 0.71);
      -moz-box-shadow: 0 7px 10px -4px rgba(0, 0, 0, 0.71);
      box-shadow: 0 7px 10px -4px rgba(0, 0, 0, 0.71);

      .searchItem {
        padding: 16px;
        cursor: pointer;

        &:hover {
          transition: ease 1s;
          background-color: ${colors.white1};
          border-radius: 8px;
        }
      }
    }

    .searchResults {
      position: absolute;
      top: 64px;
      width: calc(50% - 16px);
      padding: 16px 0;
      background-color: ${colors.white2};
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      -webkit-box-shadow: 0 7px 10px -4px rgba(0, 0, 0, 0.71);
      -moz-box-shadow: 0 7px 10px -4px rgba(0, 0, 0, 0.71);
      box-shadow: 0 7px 10px -4px rgba(0, 0, 0, 0.71);

      .searchItem {
        padding: 16px;
        cursor: pointer;

        &:hover {
          transition: ease 1s;
          background-color: ${colors.white1};
          border-radius: 8px;
        }
      }
    }
  }

  .avatar {
    cursor: pointer;
  }
`;

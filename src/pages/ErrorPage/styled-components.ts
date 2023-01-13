import { Row } from 'antd';
import styled from 'styled-components';
import { colors } from '../../config';

export const Container = styled(Row)`
  height: 100vh;
  background-color: ${colors.white};
  overflow: hidden;

  div {
    text-align: center;
  }

  .ooops {
    color: ${colors.purple};
    font-size: 35px;
    font-weight: 800;
  }

  .pageNotFound {
    color: ${colors.black};
    font-size: 18px;
    font-weight: 600;
  }

  .desc {
    max-width: 375px;
    word-break: keep-all;
  }
`;

export const Line = styled.div<{ ml?: number }>`
  width: 100%;
  left: 50%;
  top: -12%;
  position: absolute;
  transform: rotateZ(40deg);
  --size: 50px;
    --b: 10px;
    --p: 25px;
    --R: calc(55.9px + var(--b) / 2);

    --_g: #0000 calc(99% - var(--b)), #000 calc(101% - var(--b)) 99%, #0000 101%;
    mask: radial-gradient(var(--R) at left 50% bottom calc(-1 * var(--p)), var(--_g))
        calc(50% - 2 * var(--size)) calc(50% - var(--size) / 2 - var(--b) / 2) /
        calc(4 * var(--size)) calc(var(--size) + var(--b)),
      radial-gradient(var(--R) at left 50% top calc(-1 * var(--p)), var(--_g)) 50%
        calc(50% + var(--size) / 2 + var(--b) / 2) / calc(4 * var(--size))
        calc(var(--size) + var(--b));
    background: linear-gradient(90deg, red, blue);
    height: 700px;
`;

import styled from 'styled-components';

export const Container = styled.div<{ isInModal?: boolean }>`
  width: ${({ isInModal }) => (isInModal ? 85.5 : 75)}%;
  padding-top: 25px;
  max-width: 1150px;

  .render-templates {
    margin-bottom: 20px;
  }
`;

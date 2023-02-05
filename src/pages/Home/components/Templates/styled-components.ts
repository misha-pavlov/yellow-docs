import styled from 'styled-components';

export const Container = styled.div<{ isInModal?: boolean }>`
  width: ${({ isInModal }) => (isInModal ? 85.5 : 75)}%;
  padding-top: 25px;

  .render-templates {
    display: flex;
    flex-direction: row;
    gap: 13px;
    margin-bottom: 20px;
  }
`;

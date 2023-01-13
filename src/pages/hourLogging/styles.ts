import styled from 'styled-components';

export const Points = styled.div`
  padding: 20px 0;

  & > *:not(:last-child) {
    opacity: 0.3
  }
  & > * {
    transition: all .1s ease-in-out;
  }
  &:hover > * {
    opacity: 1
  }
`;

export const PointLine = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding: 5px 0;
`;

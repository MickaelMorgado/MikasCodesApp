import styled from 'styled-components';

export const Points = styled.div`
  padding: 20px 0;

  & > *:not(:last-child) {
    opacity: 0.3;
  }
  & > * {
    transition: all 0.1s ease-in-out;
  }
  &:hover > * {
    opacity: 1;
  }
`;

export const PointLine = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding: 5px 0;
`;

export const CheckpointAction = styled.div`
  display: flex;
  align-items: self-start;
  position: fixed;
  bottom: 0;
  background: #111;
  width: 100%;
  padding: 20px 20px;
  z-index: 1;
  left: 65px;
  box-shadow: 0 0 40px black;
  align-items: center;
  gap: 10px;
`;

export const FirstCol = styled.div`
  display: flex;
  width: 200px;
  gap: 10px;
  align-items: center;
`;

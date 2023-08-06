import styled from 'styled-components';

export const Points = styled.div`
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

  & > *:not(:last-child) {
    width: 33.33333%;
  }
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
  max-width: 250px;
  gap: 10px;
  align-items: center;
  padding-right: 20px;
  text-align: center;
`;

export const GeneratedLogDetails = styled.pre`
  padding: 0 20px;
  color: grey;
  font-size: 12px;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const HourLogs = styled.pre`
  padding: 0 20px 60px 20px;
`;

export const Split = styled.div`
  text-align: center;
`;

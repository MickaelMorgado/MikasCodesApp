import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  position: relative;
  padding: 20px;
  align-content: middle;
  min-height: 120px;
`;

export const Action = styled.div`
  display: flex;
  flex-grow: 0;
  flex-direction: column;
`;

export const Content = styled.div`
  flex-grow: 1;
  white-space: break-spaces;
`;

export const Date = styled.span`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 10px;
  color: grey;
  font-size: 12px;
`;

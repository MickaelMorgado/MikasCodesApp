import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  position: relative;
  padding: 20px;
  align-content: middle;
`;

export const Action = styled.div`
  flex-grow: 0;
`;

export const Content = styled.pre`
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

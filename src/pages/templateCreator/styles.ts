import styled from 'styled-components';

export const Pre = styled.pre<{ oneLine: boolean }>`
  border: 1px solid grey;
  border-radius: 5px;
  padding: 25px;
  color: grey;
  max-width: 100%;
  overflow: hidden;

  ${(props) =>
    props.oneLine
      ? 'white-space: nowrap; white-space: inherit;'
      : 'white-space: break-spaces;'}
`;

export const ChildContent = styled.div`
  display: block;
  padding: 0 25px 25px 25px;
`;

export const WrapperGeneratedCode = styled.div`
  position: relative;
`;

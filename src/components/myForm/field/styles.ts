import styled from 'styled-components';

export const MyFormField = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 25px;
  margin-bottom: 15px;
  justify-content: space-between;

  & > label {
    width: 30%;
  }
`;

export const MySelect = styled.div`
  &,
  & > * {
    width: 100%;
  }
`;

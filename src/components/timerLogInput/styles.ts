import { appColor } from 'pages/globalStyles';
import styled from 'styled-components';
import { Enum_TimerLogInputVariant } from '.';

export const TimerLogInput = styled.div``;

export const Input = styled.input`
  width: 70px;
  border: none;
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 15px;
  text-align: center;
  ${({ variant }) => {
    if (variant === Enum_TimerLogInputVariant.end) {
      return `color: ${appColor.red.c1}; background-color: ${appColor.red.c2};`;
    } else {
      return `color: ${appColor.blue.c1}; background-color: ${appColor.blue.c2};`;
    }
  }}
`;

import React from "react";

import * as S from "./styles";

export interface IInvalidMessageProps {
  message: string;
}

export const InvalidMessage = ({ message }: IInvalidMessageProps) => {
  return <S.Message>{message}</S.Message>;
};

export default InvalidMessage;

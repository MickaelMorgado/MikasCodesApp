import React from "react";

import * as S from "./styles";

export interface IPaddedContentProps {
  children: JSX.Element;
}

export const PaddedContent = ({ children }: IPaddedContentProps) => {
  return <S.PaddedContent>{children}</S.PaddedContent>;
};

export default PaddedContent;

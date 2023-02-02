import React from 'react';

import * as S from './styles';

interface IDescription {
  children: JSX.Element;
}

export const Description = ({ children }: IDescription) => {
  return <S.Description>{children}</S.Description>;
};

export default Description;

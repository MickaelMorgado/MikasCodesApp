import React from 'react';
import Description from 'components/description';
import * as S from './styles';

enum Enum_HeaderVariant {
  page,
  section,
}

export interface IHeaderProps {
  headContent: React.ReactElement;
  subContent?: string;
  helperContent?: string;
  variant?: Enum_HeaderVariant;
}

export const RenderHeaderVariant = ({
  variant,
  headContent,
  subContent,
  helperContent,
}: IHeaderProps) => {
  switch (variant) {
    case Enum_HeaderVariant.section:
      return null;
    default:
      return (
        <>
          <div>
            <h2>{headContent}</h2>
            {subContent && (
              <>
                <Description>
                  <>{subContent}</>
                </Description>
                <br />
                <br />
              </>
            )}
          </div>
          {helperContent && (
            <div>
              <Description>
                <>{helperContent}</>
              </Description>
            </div>
          )}
        </>
      );
  }
};

const Header = ({
  headContent,
  subContent,
  helperContent,
  variant = Enum_HeaderVariant.page,
}: IHeaderProps) => {
  return (
    <S.Header>
      <>
        {RenderHeaderVariant({
          variant,
          headContent,
          subContent,
          helperContent,
        })}
      </>
    </S.Header>
  );
};

export default Header;

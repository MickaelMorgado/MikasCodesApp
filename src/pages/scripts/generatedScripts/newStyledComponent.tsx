import React, { useState } from "react";
import { Checkbox, Divider, FormControlLabel, InputLabel, TextField } from "@mui/material";
import MyFormField from "components/myForm/field";

import * as S from "./styles";

export interface INewStyledComponentProps {}

export const NewStyledComponent = ({}: INewStyledComponentProps) => {
  const [toggleOneLine, setToggleOneLine] = useState(false)
  const [componentName, setComponentName] = useState('Default')

  const myFunctions = [
    {
      varName: 'componentName',
      cb: (e: any) => { setComponentName(e.target.value) },
    }
  ]

  return (
  <>
    <S.ChildContent>
      <S.Description>
        Simple snippet to create styled component for your styles.ts file.
      </S.Description>
    </S.ChildContent>
    <Divider light />
    <h4>Parameters:</h4>
    <S.ChildContent>
      {myFunctions.map(({ varName, cb }) => {
        return <MyFormField variableName={varName} callback={cb} />
      })}
    </S.ChildContent>
    <Divider light />
    <h4>Generated Code:</h4>
    <S.ChildContent>
      <FormControlLabel 
        label="Toggle One Line"
        control={<Checkbox onChange={() => { setToggleOneLine(!toggleOneLine)}} />}
      />
<S.Pre oneLine={toggleOneLine}>
{`import styled from "styled-components";

export const ${componentName} = styled.div<\{  \}>\`\`;
`}
</S.Pre>
    </S.ChildContent>
  </>
  );
};

export default NewStyledComponent;

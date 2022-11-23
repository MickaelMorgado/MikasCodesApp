import React, { useState } from "react";
import { Checkbox, Divider, FormControlLabel } from "@mui/material";
import MyFormField from "components/myForm/field";

import * as GS from "../../globalStyles";
import * as S from "./styles";

interface IFormField {
  name: string,
  callBack: (e:any) => void,
  value?: string
}

interface IGeneratedScriptBaseProps {
  description: () => JSX.Element,
  initialFormFields: IFormField[],
  renderedScript: (formFields: IFormField[]) => void
}

export const GeneratedScriptBase:React.FC<IGeneratedScriptBaseProps> = ({
  description,
  initialFormFields,
  renderedScript
}:IGeneratedScriptBaseProps) =>  {
  const [toggleOneLine, setToggleOneLine] = useState(false)
  const [formFields, setFormFields] = useState([...initialFormFields])

  return (
    <>
      <S.ChildContent>
        <S.Description>
          {description()}
        </S.Description>
      </S.ChildContent>
      <Divider light />
      <h4>Parameters:</h4>
      <S.ChildContent>
      {
        formFields.map(({ name }, index) => {
          return <MyFormField
            variableName={name}
            callback={
              (e) => {
                formFields[index].value = e.target.value
                setFormFields([...formFields])
              }
            }
          />
        })
      }
      </S.ChildContent>
      <Divider light />
      <h4>Generated Code:</h4>
      <S.ChildContent>
        <FormControlLabel 
          label="Toggle One Line"
          control={<Checkbox onChange={() => { setToggleOneLine(!toggleOneLine)}} />}
        />
        <S.Pre oneLine={toggleOneLine}>{renderedScript(formFields)}</S.Pre>
      </S.ChildContent>
    </>
  );
}

export default GeneratedScriptBase;

/*



: IGeneratedScriptBaseProps) => {
  const [toggleOneLine, setToggleOneLine] = useState(false)

  const variablesLibrary = {
    ...
  }

  return (
    <>
    <S.ChildContent>
      <S.Description>
        This script allows you to update your project gitmodules with correct branches in case of --remote doesnt work. <br />
        Paste any project .gitmodules content and copy-paste the following generated code into any <GS.BrowserDevTool>browser dev tool</GS.BrowserDevTool> to get terminal code with automatically update submodule with correct remote branches.</S.Description>
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
{`any code content`}
</S.Pre>
    </S.ChildContent>
  </>
  );
};
*/

import React, { useState } from "react";
import {
  Checkbox,
  Divider,
  FormControlLabel
} from "@mui/material";
import Description from "components/description";
import MyFormField, { Enum_MyFormFieldType, IMyFormField } from "components/myForm/field";
import PaddedContent from "components/paddedContent";

import * as S from "./styles";
import VideoPlayer from "components/videoPlayer";

/*
interface IMyFormField {
  name: string,
  callBack: (e:any) => void,
  formFieldType: Enum_MyFormFieldType,
  value?: string
}
*/

interface IGeneratedScriptBaseProps {
  description: () => JSX.Element,
  initialFormFields: IMyFormField[],
  renderedScript: (formFields: IMyFormField[]) => JSX.Element,
  videoUrl? :string
}

export const GeneratedScriptBase:React.FC<IGeneratedScriptBaseProps> = ({
  description,
  initialFormFields,
  renderedScript,
  videoUrl
}:IGeneratedScriptBaseProps) =>  {
  const [toggleOneLine, setToggleOneLine] = useState(false)
  const [formFields, setFormFields] = useState<IMyFormField[]>([...initialFormFields])

  const translateIncomingValueToString = (incomingValue: any, formFieldType: Enum_MyFormFieldType) => {
    switch (formFieldType) {
      case Enum_MyFormFieldType.checkBox:
        return JSON.stringify(incomingValue.target.checked)
      default:
        return incomingValue.target.value
    }
  }

  return (
    <>
      <PaddedContent>
        <>
          <Description>{description()}</Description>
          {videoUrl ? <VideoPlayer src={videoUrl} /> : <></>}
        </>
      </PaddedContent>
      <Divider light />
      {formFields.length > 0 && (
        <>
          <h4>Parameters:</h4>
          <PaddedContent>
            <>
              {formFields
                .map(({
                  formFieldType,
                  name,
                  tooltip,
                  transformationType
                }, index) => <MyFormField
                  key={index}
                  name={name}
                  formFieldType={formFieldType}
                  tooltip={tooltip}
                  transformationType={transformationType}
                  callBack={
                    (e: any) => {
                      const incomingInputValue = translateIncomingValueToString(e, formFieldType)

                      formFields[index].value = incomingInputValue
                      setFormFields([...formFields])
                    }
                  }
                />)
              }
            </>
          </PaddedContent>
          <Divider light />
        </>
      )}
      <h4>Generated Code:</h4>
      <PaddedContent>
        <>
          <FormControlLabel
            label="Toggle One Line"
            control={<Checkbox onChange={() => { setToggleOneLine(!toggleOneLine)}} />}
            />
          <S.Pre oneLine={toggleOneLine}>
            {renderedScript(formFields)}
          </S.Pre>
        </>
      </PaddedContent>
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

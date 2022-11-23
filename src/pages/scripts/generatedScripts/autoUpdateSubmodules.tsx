import React, { useState } from "react";
import { Checkbox, Divider, FormControlLabel, InputLabel, TextField } from "@mui/material";
import MyFormField from "components/myForm/field";

import * as GS from "../../globalStyles";
import * as S from "./styles";

export interface IAutoUpdateSubmodulesProps {}

export const AutoUpdateSubmodules = ({}: IAutoUpdateSubmodulesProps) => {
  const [toggleOneLine, setToggleOneLine] = useState(false)
  const [fileContent, setFileContent] = useState('pastedGitSubmoduleFileTextContent')

  const myFunctions = [
    {
      varName: 'fileContent',
      cb: (e: any) => { setFileContent(e.target.value) },
    }
  ]

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
{`var resultedScript = \`\`
var fileContent = \`${fileContent}\`

fileContent
  .split("[submodule ")
  .forEach(i => {
    var submoduleObject = i.split("\"]")[1]
    if (submoduleObject) {
      var path = submoduleObject.split('path')[1].split('\n')[0].split("= ")[1]
      var url = submoduleObject.split('url')[1].split('\n')[0].split("= ")[1]
      var branch = submoduleObject.split('branch')[1].split('\n')[0].split("= ")[1] == undefined ? "master" : submoduleObject.split('branch')[1].split('\n')[0].split("= ")[1] 
    }
    resultedScript = resultedScript + \`
      cd \${path}
      git checkout \${branch}
      git pull origin \${branch}
      cd ../
    \`
  })

console.log(resultedScript)

`}
</S.Pre>
    </S.ChildContent>
  </>
  );
};

export default AutoUpdateSubmodules;

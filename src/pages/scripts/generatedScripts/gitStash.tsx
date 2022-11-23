import React, { useState } from "react";
import { Checkbox, Divider, FormControlLabel, InputLabel, TextField } from "@mui/material";
import MyFormField from "components/myForm/field";

import * as GS from "../../globalStyles";
import * as S from "./styles";

export interface IGitStashProps {}

export const GitStash = ({}: IGitStashProps) => {
  const [toggleOneLine, setToggleOneLine] = useState(false)
  const [stashName, setStashName] = useState('pastedGitSubmoduleFileTextContent')
  const [untracked, setUntracked] = useState('false')

  const myFunctions = [
    {
      varName: 'stashName',
      cb: (e: any) => { setStashName(e.target.value) },
    },
    {
      varName: 'untracked',
      cb: (e: any) => { setUntracked(e.target.value) },
    }
  ]

  return (
  <>
    <S.ChildContent>
      <S.Description>
        git stash save "stashName"<br />
        git stash --include-untracked<br />
        git stash -u<br />
        git stash save -u "stashName"
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
{untracked == "true"
  ? `git stash save -u \"${stashName}\"`
  : `git stash save \"${stashName}\"`
}
</S.Pre>
    </S.ChildContent>
  </>
  );
};

export default GitStash;

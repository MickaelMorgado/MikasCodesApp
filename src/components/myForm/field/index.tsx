import React from "react";
import { InputLabel, TextField } from "@mui/material";

import * as S from "./styles";

export interface IMyFormFieldProps {
  variableName: string,
  callback: (e: any) => void
}

export const MyFormField = ({
  variableName,
  callback
}: IMyFormFieldProps) => {
  return (
    <S.MyFormField>
      <InputLabel>{variableName}:</InputLabel>
      <TextField
        onKeyUp={(e) => callback(e)}
        placeholder={variableName}
        fullWidth
      >{variableName}</TextField>
    </S.MyFormField>
  );
};

export default MyFormField;

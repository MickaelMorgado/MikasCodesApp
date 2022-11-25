import React from "react";
import { Checkbox, InputLabel, TextField, Tooltip } from "@mui/material";

import * as S from "./styles";

export enum Enum_MyFormFieldType {
  input,
  textArea,
  checkBox
}

export interface IMyFormField {
  name: string,
  formFieldType: Enum_MyFormFieldType,
  callBack: (e: any) => void,
  value?: string,
  tooltip?: string,
}

export const MyFormField = ({
  formFieldType = Enum_MyFormFieldType.input,
  name,
  callBack,
  tooltip
}: IMyFormField) => {

  const renderFieldBasedOnType = (myFormFieldType: Enum_MyFormFieldType) => {
    switch (myFormFieldType) {
      case Enum_MyFormFieldType.input:
        return <TextField
          onKeyUp={(e) => callBack(e)}
          placeholder={name}
          fullWidth
          >{name}</TextField>
      case Enum_MyFormFieldType.textArea:
        return <TextField
          onKeyUp={(e) => callBack(e)}
          placeholder={name}
          fullWidth
          multiline
          maxRows={4}
          >{name}</TextField>
      case Enum_MyFormFieldType.checkBox:
        return <Checkbox
          aria-label={name}
          onChange={(e) => callBack(e)}
        />
    }
  }

  return (
    <>
      <S.MyFormField>
        <InputLabel>{name}:</InputLabel>
        <Tooltip title={tooltip}>
          {renderFieldBasedOnType(formFieldType)}
        </Tooltip>
      </S.MyFormField>
    </>
  );
};

export default MyFormField;

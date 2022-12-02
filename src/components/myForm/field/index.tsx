import React from "react";
import { Checkbox, InputLabel, TextField, Tooltip } from "@mui/material";

import * as S from "./styles";

export enum Enum_MyFormFieldType {
  input,
  textArea,
  checkBox
}

export enum Enum_MyFormFieldTransformationType {
  default,
  noSpaces
}

export interface IMyFormField {
  name: string,
  formFieldType: Enum_MyFormFieldType,
  callBack: (e: any) => void,
  value?: string,
  tooltip?: string,
  transformationType?: Enum_MyFormFieldTransformationType
}

export const MyFormField = ({
  formFieldType = Enum_MyFormFieldType.input,
  name,
  callBack,
  tooltip,
  transformationType = Enum_MyFormFieldTransformationType.default
}: IMyFormField) => {

  const fieldEventModifier = (e: any, transformationType: Enum_MyFormFieldTransformationType) => {
    transformationType == Enum_MyFormFieldTransformationType.noSpaces
    switch (transformationType) {
      case Enum_MyFormFieldTransformationType.noSpaces: {
        e.target.value = e.target.value.replace(/\s/g, '')
        break
      }
      default: {
        break
      }
    }

    return callBack(e)
  }

  const renderFieldBasedOnType = (myFormFieldType: Enum_MyFormFieldType) => {
    switch (myFormFieldType) {
      case Enum_MyFormFieldType.input:
        return <TextField
          onKeyUp={(e) => fieldEventModifier(e, transformationType)}
          placeholder={name}
          fullWidth
          >{name}</TextField>
      case Enum_MyFormFieldType.textArea:
        return <TextField
          onKeyUp={(e) => fieldEventModifier(e, transformationType)}
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

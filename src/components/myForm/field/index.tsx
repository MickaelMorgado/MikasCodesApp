import React, { useState } from 'react';
import {
  Checkbox,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Tooltip,
} from '@mui/material';
import { KeyPairObject } from '../../../utils';
import * as S from './styles';

export enum Enum_MyFormFieldTransformationType {
  default,
  name,
  noSpaces,
  path,
}

export enum Enum_MyFormFieldType {
  checkBox,
  file,
  input,
  select,
  textArea,
}

export interface IMyFormField {
  name: string;
  formFieldType: Enum_MyFormFieldType;
  callback: (
    e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent
  ) => void;
  value?: string;
  options?: KeyPairObject;
  defaultValue?: string;
  tooltip?: string;
  transformationType?: Enum_MyFormFieldTransformationType;
}

export const MyFormField = ({
  formFieldType = Enum_MyFormFieldType.input,
  name,
  callback,
  tooltip,
  transformationType = Enum_MyFormFieldTransformationType.default,
  options,
  defaultValue,
}: IMyFormField) => {
  const [tmpDefaultValue, setTmpDefaultValue] = useState<string | undefined>(
    defaultValue
  );
  const fieldEventModifier = (
    e: any,
    transformationType: Enum_MyFormFieldTransformationType
  ) => {
    switch (transformationType) {
      case Enum_MyFormFieldTransformationType.noSpaces: {
        e.target.value = e.target.value.replace(/\s/g, '');
        return callback(e);
      }
      case Enum_MyFormFieldTransformationType.path: {
        const word = e.target.value;
        const firstLetter = word.charAt(0);
        const firstLetterCap = firstLetter.toUpperCase();
        const remainingLetters = word.slice(1);
        const capitalizedWord = firstLetterCap + remainingLetters;

        e.target.value = capitalizedWord.replaceAll(' ', '\\');
        return callback(e);
      }
      case Enum_MyFormFieldTransformationType.name: {
        const word = e.target.value;
        const firstLetter = word.charAt(0);
        const firstLetterCap = firstLetter.toUpperCase();
        const remainingLetters = word.slice(1);
        const capitalizedWord = firstLetterCap + remainingLetters;
        e.target.value = capitalizedWord.replace(/\s/g, '');

        return callback(e);
      }
      default: {
        // keep updating the new value field based on user typing
        e.target.value = e.target.value;
        return callback(e);
      }
    }
  };

  const generatedSelectOptions = (options: KeyPairObject) => {
    return Object.keys(options).map((item, index) => {
      const { label, value } = options[item];
      return (
        <MenuItem key={index} value={value}>
          {label}
        </MenuItem>
      );
    });
  };

  const renderFieldBasedOnType = (myFormFieldType: Enum_MyFormFieldType) => {
    switch (myFormFieldType) {
      case Enum_MyFormFieldType.checkBox:
        return <Checkbox aria-label={name} onChange={(e) => callback(e)} />;
      case Enum_MyFormFieldType.file:
        return (
          <TextField
            onKeyUp={(e) => fieldEventModifier(e, transformationType)}
            placeholder={name}
            fullWidth
          >
            {name}
          </TextField>
        );
      case Enum_MyFormFieldType.input:
        return (
          <TextField
            onKeyUp={(e) => fieldEventModifier(e, transformationType)}
            placeholder={name}
            defaultValue={tmpDefaultValue}
            fullWidth
          >
            {name}
          </TextField>
        );
      case Enum_MyFormFieldType.select:
        return (
          <S.MySelect>
            <Select
              aria-label={name}
              onChange={(e) => callback(e)}
              defaultValue={tmpDefaultValue}
            >
              {options && generatedSelectOptions(options)}
            </Select>
          </S.MySelect>
        );
      case Enum_MyFormFieldType.textArea:
        return (
          <TextField
            onKeyUp={(e) => fieldEventModifier(e, transformationType)}
            placeholder={name}
            fullWidth
            multiline
            maxRows={4}
            defaultValue={tmpDefaultValue}
          />
        );
    }
  };

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

import React, { useState } from 'react';
import * as S from './styles';
import {
  Checkbox,
  Divider,
  FormControlLabel,
  SelectChangeEvent,
} from '@mui/material';
import Description from 'components/description';
import MyFormField, {
  Enum_MyFormFieldType,
  IMyFormField,
} from 'components/myForm/field';
import PaddedContent from 'components/paddedContent';
import VideoPlayer from 'components/videoPlayer';
import CopyToClipboardButton from 'components/CopyToClipboardButton';

interface IGeneratedScriptBaseProps {
  description: () => JSX.Element;
  initialFormFields: IMyFormField[];
  renderedScript: (formFields: IMyFormField[]) => string;
  videoUrl?: string;
}

export const GeneratedScriptBase: React.FC<IGeneratedScriptBaseProps> = ({
  description,
  initialFormFields,
  renderedScript,
  videoUrl,
}: IGeneratedScriptBaseProps) => {
  const [toggleOneLine, setToggleOneLine] = useState(false);
  const [formFields, setFormFields] = useState<IMyFormField[]>([
    ...initialFormFields,
  ]);

  const translateIncomingEventToString = (
    incomingEvent: any,
    formFieldType: Enum_MyFormFieldType
  ) => {
    const incomingEventTarget = incomingEvent?.target;

    switch (formFieldType) {
      case Enum_MyFormFieldType.checkBox:
        return JSON.stringify(incomingEventTarget.checked);
      default:
        return incomingEventTarget.value;
    }
  };

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
              {formFields.map(
                (
                  {
                    formFieldType,
                    name,
                    tooltip,
                    options,
                    defaultValue,
                    transformationType,
                  },
                  index
                ) => (
                  <MyFormField
                    key={index}
                    name={name}
                    formFieldType={formFieldType}
                    tooltip={tooltip}
                    transformationType={transformationType}
                    options={options}
                    defaultValue={defaultValue}
                    callback={(
                      e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent
                    ) => {
                      const incomingInputValue = translateIncomingEventToString(
                        e,
                        formFieldType
                      );
                      formFields[index].value = incomingInputValue;
                      setFormFields([...formFields]);
                    }}
                  />
                )
              )}
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
            control={
              <Checkbox
                onChange={() => {
                  setToggleOneLine(!toggleOneLine);
                }}
              />
            }
          />
          <S.WrapperGeneratedCode>
            <S.Pre oneLine={toggleOneLine}>{renderedScript(formFields)}</S.Pre>
            <CopyToClipboardButton contentToCopy={renderedScript(formFields)} />
          </S.WrapperGeneratedCode>
        </>
      </PaddedContent>
    </>
  );
};

export default GeneratedScriptBase;

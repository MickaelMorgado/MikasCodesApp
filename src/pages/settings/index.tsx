import React, { useState } from 'react';
import { Button, Divider, FormControl } from '@mui/material';
import MyFormField, { Enum_MyFormFieldType } from 'components/myForm/field';
import * as S from './styles';
import {
  Enum_StorageSlot,
  fallbackSettings,
  getLocalStorageItem,
  setLocalStorageItem,
} from 'utils';
import PaddedContent from 'components/paddedContent';
import Description from 'components/description';

export interface ISettingsProps {}

export const Settings = () => {
  const [settings, setSettings] = useState(
    JSON.parse(getLocalStorageItem(Enum_StorageSlot.settings))
  );

  const udpateSettings = (stgs: string) => {
    setSettings(stgs);
    setLocalStorageItem(Enum_StorageSlot.settings, JSON.stringify(stgs));
  };

  return (
    <>
      <PaddedContent>
        <Description>
          <>
            Here you can set all app global settings (this following structure
            is required) <br />
            <br /> DOCKERCOMPOSE=3,
            <br /> GIT=2,
            <br /> PCNAME=lenovo2019,
            <br /> PROJECTSFOLDER=dengun,
          </>
        </Description>
      </PaddedContent>
      <Divider light />
      <PaddedContent>
        <>
          <br />
          <MyFormField
            name={'Settings'}
            defaultValue={settings}
            value={settings}
            formFieldType={Enum_MyFormFieldType.textArea}
            callback={(e) => {
              udpateSettings(e.target.value);
            }}
          />
        </>
      </PaddedContent>
    </>
  );
};

export default Settings;

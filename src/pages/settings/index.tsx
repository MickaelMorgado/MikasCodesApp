import React, { useEffect, useState } from 'react';
import { Button, Divider, FormControl } from '@mui/material';
import MyFormField, { Enum_MyFormFieldType } from 'components/myForm/field';
import * as S from './styles';
import {
  Enum_StorageSlot,
  getLocalStorageItem,
  setLocalStorageItem,
} from 'utils';
import PaddedContent from 'components/paddedContent';
import Description from 'components/description';

export enum Enum_SettingOption {
  OS = 'OS',
  GIT = 'GIT',
  PCNAME = 'PCNAME',
  DOCKERCOMPOSE = 'DOCKERCOMPOSE',
  PROJECTSFOLDER = 'PROJECTSFOLDER',
  FAVORITEEDITOR = 'FAVORITEEDITOR',
}

const fallbackSettings = `{
OS=0,
DOCKERCOMPOSE=3,
GIT=2,
PCNAME=lenovo2019,
PROJECTSFOLDER=dengun,
FAVORITEEDITOR=subl,
}`;

export interface ISettingsProps {}

// Get all settings from storage:
export const getSettings = (settingOption: Enum_SettingOption) => {
  var settingsFromStorage =
    window.localStorage['settings'] ?? `${fallbackSettings}`;
  var value = settingsFromStorage.split(settingOption + '=')[1]
    ? settingsFromStorage.split(settingOption + '=')[1].split(',')[0]
    : fallbackSettings.split(settingOption + '=')[0].split(',')[0];
  return value;
};

// Get specific commands/code based on user custom preference:
export const getPartialFromSettingsVariable = (
  settingOption: Enum_SettingOption
) => {
  var vfs = getSettings(settingOption);

  switch (settingOption) {
    case Enum_SettingOption.FAVORITEEDITOR: {
      switch (vfs) {
        case 'vscode':
          return 'code';
        case 'sublime':
          return 'subl';
        default:
          return 'subl';
      }
    }
    case Enum_SettingOption.DOCKERCOMPOSE: {
      switch (vfs) {
        case '3':
          return 'docker compose';
        case '2':
          return 'docker-compose';
        default:
          return 'docker compose';
      }
    }
    default:
      return '';
  }
};

export const Settings = () => {
  const [settings, setSettings] = useState(
    JSON.parse(getLocalStorageItem(Enum_StorageSlot.settings))
  );
  const [os, setOS] = useState('0');
  const [dockerVersion, setDockerVersion] = useState('3');
  const [gitVersion, setGitVersion] = useState('2');
  const [pcName, setPCName] = useState('lenovo2019');
  const [projectsFolder, setProjectsFolder] = useState('dengun');
  const [favoriteEditor, setFavoriteEditor] = useState('vscode');

  useEffect(() => {
    updateSettingFromFields();
  }, [os, dockerVersion, gitVersion, pcName, projectsFolder, favoriteEditor]);

  const udpateSettings = (stgs: string) => {
    setSettings(stgs);
    setLocalStorageItem(Enum_StorageSlot.settings, JSON.stringify(stgs));
  };

  const updateSettingFromFields = () => {
    var stgs = `
OS=${os},
DOCKERCOMPOSE=${dockerVersion},
GIT=${gitVersion},
PCNAME=${pcName},
PROJECTSFOLDER=${projectsFolder},
FAVORITEEDITOR=${favoriteEditor},
`;
    console.log(`Set in the following settings: ${stgs}`);
    udpateSettings(stgs);
  };

  const fieldOptions = {
    os: {
      Linux: {
        label: 'Linux',
        value: '0',
      },
      Windows: {
        label: 'Windows',
        value: '1',
      },
      Mac: {
        label: 'Mac',
        value: '2',
      },
    },
    dockercompose: {
      v2: {
        label: 'V2',
        value: '2',
      },
      v3: {
        label: 'V3',
        value: '3',
      },
    },
    git: {
      v2: {
        label: 'V2',
        value: '2',
      },
    },
    editor: {
      sublime: {
        label: 'Sublime Text',
        value: 'subl',
      },
      vscode: {
        label: 'Visual Studio Code',
        value: 'vscode',
      },
    },
  };

  return (
    <>
      <PaddedContent>
        <Description>
          <>
            Here you can set all app global settings (this following structure
            is required) <br />
            {fallbackSettings}
            <br />
            <br /> Your current settings are:
            <br />
            <br /> OS={os},
            <br /> DOCKERCOMPOSE={dockerVersion},
            <br /> GIT={gitVersion},
            <br /> PCNAME={pcName},
            <br /> PROJECTSFOLDER={projectsFolder},
            <br /> FAVORITEEDITOR={favoriteEditor},
          </>
        </Description>
      </PaddedContent>
      <Divider light />
      <PaddedContent>
        <>
          <h2>App Settings:</h2>
          <MyFormField
            name={'Operating System'}
            defaultValue={getSettings(Enum_SettingOption.OS)}
            formFieldType={Enum_MyFormFieldType.select}
            callback={(e) => {
              setOS(e.target.value);
            }}
            options={fieldOptions.os}
          />
          <MyFormField
            name={'Docker Compose Version'}
            defaultValue={getSettings(Enum_SettingOption.DOCKERCOMPOSE)}
            formFieldType={Enum_MyFormFieldType.select}
            callback={(e) => {
              setDockerVersion(e.target.value);
            }}
            options={fieldOptions.dockercompose}
          />
          <MyFormField
            name={'Git Version'}
            defaultValue={getSettings(Enum_SettingOption.GIT)}
            formFieldType={Enum_MyFormFieldType.select}
            callback={(e) => {
              setGitVersion(e.target.value);
            }}
            options={fieldOptions.git}
          />
          <MyFormField
            name={'Favorite Editor'}
            defaultValue={getSettings(Enum_SettingOption.FAVORITEEDITOR)}
            formFieldType={Enum_MyFormFieldType.select}
            callback={(e) => {
              setFavoriteEditor(e.target.value);
            }}
            options={fieldOptions.editor}
          />
          <MyFormField
            name={'PC Username'}
            defaultValue={getSettings(Enum_SettingOption.PCNAME)}
            formFieldType={Enum_MyFormFieldType.input}
            callback={(e) => {
              setPCName(e.target.value);
            }}
            tooltip="Username of your PC"
          />
          <MyFormField
            name={'Projects Folder'}
            defaultValue={getSettings(Enum_SettingOption.PROJECTSFOLDER)}
            formFieldType={Enum_MyFormFieldType.input}
            callback={(e) => {
              setProjectsFolder(e.target.value);
            }}
            tooltip="Starting from 'Home' folder (Linux)"
          />
        </>
      </PaddedContent>
    </>
  );
};

export default Settings;

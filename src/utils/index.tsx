import { v4 as uuidv4 } from 'uuid';
import InvalidMessage from 'components/invalidMessage';

export const randomizedId = () => {
  return uuidv4();
};

export enum Enum_StorageSlot {
  notes = 'notes',
  hourLogs = 'hour logs',
  settings = 'settings',
}

export enum Enum_SettingOption {
  GIT = 'GIT',
  PCNAME = 'PCNAME',
  DOCKERCOMPOSE = 'DOCKERCOMPOSE',
  PROJECTSFOLDER = 'PROJECTSFOLDER',
  FAVORITEEDITOR = 'FAVORITEEDITOR',
}

export const fallbackSettings = `{
DOCKERCOMPOSE=3,
GIT=2,
PCNAME=lenovo2019,
PROJECTSFOLDER=dengun,
}`;

export const getLocalStorageItem = (storageSlot: Enum_StorageSlot) => {
  return window.localStorage[storageSlot] == undefined
    ? '[]'
    : window.localStorage[storageSlot];
};

export const setLocalStorageItem = (
  storageSlot: Enum_StorageSlot,
  value: string
) => {
  window.localStorage.setItem(storageSlot, value);
};

export const getSettings = (settingOption: Enum_SettingOption) => {
  var obj = window.localStorage['settings'] ?? `${fallbackSettings}`;
  var value = obj.split(settingOption + '=')[1]
    ? obj.split(settingOption + '=')[1].split(',')[0]
    : fallbackSettings.split(settingOption + '=')[1].split(',')[0];
  return value;
};

// Validations:
export const validation = {
  isValid: (array: any[]) => array.length > 0,
  invalidMessage: (message: string) => <InvalidMessage message={message} />,
};

// Format Date:
export const enum Enum_FormatDate {
  default,
  timeOnly,
  exactTime,
}

export const decimalizeTime = (time: number) => {
  return `${time < 10 ? '0' + time : time}`;
};
interface IFormatDateOptions {
  format: Enum_FormatDate;
}
export const formatDate = (date: Date, options?: IFormatDateOptions) => {
  const dt = new Date(date);
  let formatedDate = undefined;

  switch (options?.format) {
    case Enum_FormatDate.timeOnly:
      formatedDate =
        decimalizeTime(dt.getHours()) + ':' + decimalizeTime(dt.getMinutes());
      break;
    case Enum_FormatDate.exactTime:
      formatedDate =
        decimalizeTime(dt.getHours()) +
        ':' +
        decimalizeTime(dt.getMinutes()) +
        ':' +
        decimalizeTime(dt.getSeconds());
      break;
    default:
      formatedDate =
        dt.getDate() +
        '-' +
        (dt.getMonth() + 1) +
        '-' +
        dt.getFullYear() +
        ' ' +
        dt.getHours() +
        ':' +
        dt.getMinutes();
      break;
  }

  return `${formatedDate}`;
};

export type KeyPairObject = {
  [key: string]: {
    label: string;
    value: string;
  };
};

export const sortBy: KeyPairObject = {
  orderAZ: {
    label: 'Content [A-Z]',
    value: 'orderAZ',
  },
  orderZA: {
    label: 'Content [Z-A]',
    value: 'orderZA',
  },
  dateASC: {
    label: 'Ascending Date',
    value: 'dateASC',
  },
  dateDESC: {
    label: 'Descending Date',
    value: 'dateDESC',
  },
};

export const RenderReactElementFromMap = (
  children: JSX.Element,
  index: number
) => {
  return <div key={index}>{children}</div>;
};

export default randomizedId;

import { v4 as uuidv4 } from 'uuid';
import InvalidMessage from 'components/invalidMessage';

export const randomizedId = () => {
  return `${uuidv4()}`;
};

export enum Enum_StorageSlot {
  notes = 'notes',
  hourLogs = 'hour logs',
  settings = 'settings',
}

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

// Validations:
export const validation = {
  isValid: (array: any[]) => array.length > 0,
  invalidMessage: (message: string) => <InvalidMessage message={message} />,
};

/*
export enum Enum_ValidType {
  string,
  array,
}
Example of setting types:
  export const isValid = <T extends Enum_ValidType>(
    type: T,
    argument: T extends Enum_ValidType.string
      ? string
      : T extends Enum_ValidType.array
      ? any[]
      : never
  ): boolean => {
    switch (type) {
      case Enum_ValidType.string:
        return argument !== '';
      case Enum_ValidType.array:
        return argument.length > 0;
      default:
        return false;
    }
  };
*/
export const isValid = (argument: any): boolean => {
  switch (typeof argument) {
    case 'string':
      return argument !== '';
    case 'object':
      return Array.isArray(argument) ? argument.length > 0 : true;
    default:
      return argument !== undefined;
  }
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

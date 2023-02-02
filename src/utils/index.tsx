import react from 'react';
import { v4 as uuidv4 } from 'uuid';
import InvalidMessage from 'components/invalidMessage';
import { React } from 'pages/globalStyles';
import React from 'react';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import internal from 'stream';

export const randomizedId = () => {
  return uuidv4();
};

export enum Enum_StorageSlot {
  notes = 'notes',
  hourLogs = 'hour logs',
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

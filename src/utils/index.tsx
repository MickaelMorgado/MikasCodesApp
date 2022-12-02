import { v4 as uuidv4 } from 'uuid'
import InvalidMessage from 'components/invalidMessage';

export const randomizedId = () => {
  return uuidv4()
};

export enum Enum_StorageSlot {
  notes = 'notes'
}

export const getLocalStorageItem = (storageSlot: Enum_StorageSlot) => {
  return window.localStorage[storageSlot] == undefined ? "[]" : window.localStorage[storageSlot]
}

export const setLocalStorageItem = (storageSlot: Enum_StorageSlot, value: string) => {
  window.localStorage.setItem(storageSlot, value)
}

// Validations:
export const validation = {
  isValid: (array: any[]) => array.length > 0,
  invalidMessage: (message: string) => <InvalidMessage message={message} />
}

// Format Date:
export const formatDate = (date: Date) => {
  const dt = new Date(date)
  const formatedDate = dt.getDate() + "-" + (dt.getMonth()+1) + "-" + dt.getFullYear() + " " + dt.getHours() + ":" + dt.getMinutes();

  return `${formatedDate}`
}

export default randomizedId;

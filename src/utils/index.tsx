import { v4 as uuidv4 } from 'uuid'

export const randomizedId = () => {
  return uuidv4()
};

export enum Enum_StorageSlot {
  notes = 'notes'
}

export const getLocalStorageItem = (storageSlot: Enum_StorageSlot) => {
  return window.localStorage[storageSlot]
}

export const setLocalStorageItem = (storageSlot: Enum_StorageSlot, value: string) => {
  window.localStorage.setItem(storageSlot, value)
}

export default randomizedId;

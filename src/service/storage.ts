
export enum StorageType {
  LOCAL,
  SESSION
}

type SetItemType = (type: StorageType, key: string, value: any) => void
type GetItemType = (key: string) => any
type DeleteItemType = (type: StorageType, key: string) => void
type ClearType = () => void

interface IStorage {
  setItem: SetItemType
  getItem: GetItemType
  removeItem: DeleteItemType
  clear: ClearType
}

const storageService: IStorage = {
  setItem(type: StorageType, key: string, value: any) {
    if (!isWindow()) return
    if (type == StorageType.LOCAL) {
      localStorage.setItem(key, value)
    } else {
      sessionStorage.setItem(key, value)
    }
  },
  getItem(key: string) {
    if (!isWindow()) return null
    return window.localStorage.getItem(key) ?? window.sessionStorage.getItem(key)
  },
  removeItem(type: StorageType, key: string) {
    if (!isWindow()) return
    if (type == StorageType.LOCAL) {
      localStorage.removeItem(key)
    } else {
      sessionStorage.removeItem(key)
    }
  },
  clear() {
    if (!isWindow()) return
    localStorage.clear()
    sessionStorage.clear()
  },
}

function isWindow(): boolean {
  return typeof window !== 'undefined'
}

export default storageService
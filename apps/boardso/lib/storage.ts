import { stringToJSON } from "../utils"

const storage = typeof window !== "undefined" ? localStorage : undefined
export default storage

export const getStorageItem = (value: string) => stringToJSON(storage?.getItem(value))

export const setStorageItem = (value: string, data: any) => {
    if (typeof data === "string") storage?.setItem(value, data)
    else storage?.setItem(value, JSON.stringify(data))
}

export const removeStorageItem = (value: string) => storage?.removeItem(value)


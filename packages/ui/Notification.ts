import { toast, type ToastOptions } from "react-toastify"

export const notification = (type: ToastOptions["type"], message: string) => toast(message, { type: type })

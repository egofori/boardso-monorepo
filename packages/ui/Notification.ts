import { toast, type ToastOptions } from "react-toastify"

export const notification = (type: ToastOptions["type"], message: string, options?: ToastOptions) => toast(message, { type, ...options })

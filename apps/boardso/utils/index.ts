import { useValue } from "@/lib/hooks/useValue"
import { getStorageItem } from "@/lib/storage"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { notification } from "ui"

export * from "./constants"

// converts stringified JSON object to object
export const stringToJSON = (value: string | null | undefined) => (value ? JSON.parse(value) : null)

export const stringToHref = (type: string, value: string) => {
  switch (type) {
    case "EMAIL":
      return `mailto:${value}`
    case "PHONE":
      return `tel:${value}`
    default:
      return value
  }
}

export const useProtectedRoute = () => {
  const isLoggedIn = useValue(getStorageItem("isLoggedIn"))
  const router = useRouter()

  useEffect(() => {
    if (isLoggedIn !== undefined) {
      if (!isLoggedIn) {
        notification("info", "Users must be logged in to access this page")
        router.push("/login")
      }
    }
  }, [isLoggedIn, router])
}

export const getStatusColor = (status: string) => {
  const colors: { [x: string]: string } = {
    active: "#16a34a",
    success: "#16a34a",
    true: "#16a34a",
    pending: "#f59e0b",
    failed: "#dc2626",
    disabled: "#737373",
    false: "#dc2626",
    expired: "#dc2626"
  }

  return colors[status]
}

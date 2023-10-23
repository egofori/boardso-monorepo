"use client"

import Loader from "@/components/Loader"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get the action to complete.
  const mode = searchParams.get("mode")
  // Get the one-time code from the query parameter.
  const actionCode = searchParams.get("oobCode") || ""

    useEffect(() => {
    // Handle the user management action.
    switch (mode) {
      case "resetPassword":
        router.replace(`/new-password?mode=${mode}&oobCode=${actionCode}`)
        break
      case "verifyEmail":
        router.replace(`/email-confirmation?mode=${mode}&oobCode=${actionCode}`)
        break
      default:
        router.replace("/login")
    }
  }, [actionCode, mode, router])

  return <Loader size="40px" className="m-auto" />
}

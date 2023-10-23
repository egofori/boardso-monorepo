"use client"

import Loader from "@/components/Loader"
import { firebaseAuth } from "@/utils/firebase"
import { applyActionCode } from "firebase/auth"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { UIButton, UICard, UITypography } from "ui"

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [confirmed, setConfirmed] = useState(false)

  // Get the action to complete.
  const mode = searchParams.get("mode")
  // Get the one-time code from the query parameter.
  const actionCode = searchParams.get("oobCode") || ""

  // Handle the user management action.
  useEffect(() => {
    if (mode === "verifyEmail") {
      applyActionCode(firebaseAuth, actionCode)
        .then(() => {
          setConfirmed(true)
          setLoading(false)
        })
        .catch(() => {
          setLoading(false)
        })
    } else {
      router.back()
    }
  }, [actionCode, mode, router])

  return (
    <main className="relative flex flex-col justify-center items-center">
      {loading ? (
        <Loader size="40px" />
      ) : (
        <UICard className="w-[410px] p-10 m-auto rounded-2xl">
          {confirmed ? (
            <>
              <UITypography variant="h3" className="text-tertiary-800 text-center mb-3">
                Congratulations!
              </UITypography>
              <div className="flex flex-col gap-6 text-center">
                <UITypography>
                  Your email address has been successfully verified. Log in to continue.
                </UITypography>
                <Link href="/login">
                  <UIButton>Go to log in page</UIButton>
                </Link>
              </div>
            </>
          ) : (
            <>
              <UITypography variant="h3" className="text-tertiary-800 text-center mb-3">
                An error occurred!
              </UITypography>
              <div className="flex flex-col gap-6 text-center">
                <UITypography>
                  We could not verify your email. Try logging in to initiate another email
                  verification.
                </UITypography>
                <Link href="/login">
                  <UIButton>Go to log in page</UIButton>
                </Link>
              </div>
            </>
          )}
        </UICard>
      )}
    </main>
  )
}

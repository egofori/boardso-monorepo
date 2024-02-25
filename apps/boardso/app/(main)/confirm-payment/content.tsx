"use client"

import { useVerifyTransaction } from "@/services/hooks/transactions"
import { VerifyTransaction } from "@/types/Transaction"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { UIButton, UICard, UITypography, notification } from "ui"

export default function Content() {
  const searchParams = useSearchParams()

  const router = useRouter()

  const reference = searchParams.get("reference")

  const { data, isLoading, error, mutate }: { data: VerifyTransaction; [x: string]: any } =
    useVerifyTransaction(reference)

  useEffect(() => {
    if (error) notification("error", "Could not verify your payment. Please contact us for help.")
    if (data) {
      notification("info", data.message)
      if(data.status === "success") router.push("/profile?t=1")
    }
  }, [error, data, router])

  useEffect(() => {
    if(!reference) router.back()
  }, [reference, router])

  return (
    <main className="layout-wrapper flex flex-col justify-center items-center h-[calc(100%-83px)]">
      <UICard className="auth-card">
        <UITypography variant="h3" className="auth-card-title mb-3">
          Confirm Payment
        </UITypography>
        <div className="flex flex-col gap-6">
          <UITypography variant="paragraph">
            Payment should be confirmed automatically, if not click on the button below to confirm.
          </UITypography>
          <UIButton loading={isLoading} onClick={() => mutate()}>I have paid</UIButton>
        </div>
      </UICard>
    </main>
  )
}

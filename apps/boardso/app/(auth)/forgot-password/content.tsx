"use client"

import {
  UIButton,
  UICard,
  UIForm,
  UIInput,
  UITypography,
  useZodForm,
  UIFieldError,
  hasError,
  notification,
} from "ui"
import { object, string } from "zod"
import { sendPasswordResetEmail } from "firebase/auth"
import { firebaseAuth } from "@/utils/firebase"
import { useState } from "react"

export default function Content() {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [email, setEmail] = useState("")

  const forgotPasswordSchema = object({
    email: string().min(1, { message: "Invalid email" }).email({ message: "Invalid email" }).trim(),
  })

  const form = useZodForm({
    schema: forgotPasswordSchema,
    mode: "all",
  })

  const onSubmit = (data: any) => {
    setLoading(true)
    sendPasswordResetEmail(firebaseAuth, data.email)
      .then(() => {
        setEmail(data.email)
        setLoading(false)
        setSent(true)
        form.reset()
        notification("success", "Reset password email sent successfully")
      })
      .catch(() => {
        setLoading(false)
        setSent(false)
        notification(
          "error",
          "Could not send reset password email. Check if the email address provided is correct and try again"
        )
      })
  }

  return (
    <main className="auth-main">
      <UICard className="auth-card flex flex-col gap-3">
        {sent ? (
          <>
            <UITypography variant="h3" className="auth-card-title">
              Email Delivered!
            </UITypography>
            <UITypography className="text-center">
              Instructions to reset your password has been sent to <b>{email}</b>.
            </UITypography>
            <UIButton onClick={() => setSent(false)} className="w-min m-auto">
              Ok
            </UIButton>
          </>
        ) : (
          <>
            <UITypography variant="h3" className="auth-card-title">
              Reset Password
            </UITypography>
            <UITypography>
              Enter your account&apos;s email to proceed with the password reset.
            </UITypography>
            <UIForm form={form} onSubmit={onSubmit} className="flex flex-col gap-6">
              <div>
                <UIInput
                  placeholder="Email"
                  type="email"
                  {...form.register("email")}
                  error={hasError(form, "email")}
                />
                <UIFieldError name="email" />
              </div>
              <UIButton type="submit" loading={loading}>
                Send reset password email
              </UIButton>
            </UIForm>
          </>
        )}
      </UICard>
    </main>
  )
}

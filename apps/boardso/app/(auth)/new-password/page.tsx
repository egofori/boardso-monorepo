"use client"

import {
  UIButton,
  UICard,
  UIForm,
  UITypography,
  useZodForm,
  UIFieldError,
  hasError,
  UIPasswordInput,
  notification,
} from "ui"
import { object, string } from "zod"
import { useResetPassword } from "@/services/hooks"
import { useRouter, useSearchParams } from "next/navigation"
import {
  confirmPasswordReset,
  signInWithEmailAndPassword,
  signOut,
  verifyPasswordResetCode,
} from "firebase/auth"
import { firebaseAuth } from "@/utils/firebase"
import { useEffect, useState } from "react"

export default function Page() {
  const [loading, setLoading] = useState(false)
  const { trigger: resetPasswordTrigger } = useResetPassword()

  const resetPasswordSchema = object({
    password: string().min(1, { message: "Password is required" }),
  })

  const form = useZodForm({
    schema: resetPasswordSchema,
    mode: "all",
  })

  const router = useRouter()

  const searchParams = useSearchParams()

  // Get the action to complete.
  const mode = searchParams.get("mode")
  // Get the one-time code from the query parameter.
  const actionCode = searchParams.get("oobCode") || ""

  // Handle the user management action.
  useEffect(() => {
    if (mode !== "resetPassword") {
      router.replace("/login")
    }
  }, [actionCode, mode, router])

  const onSubmit = (data: any) => {
    setLoading(true)
    verifyPasswordResetCode(firebaseAuth, actionCode)
      .then((email) => {
        // Save the new password.
        confirmPasswordReset(firebaseAuth, actionCode, data.password)
          .then(() => {
            signInWithEmailAndPassword(firebaseAuth, email, data.password)
              .then(({ user }) => {
                user
                  .getIdToken()
                  .then((idToken: any) => {
                    resetPasswordTrigger(
                      {
                        password: data.password,
                        token: idToken,
                      },
                      () => {
                        setLoading(false)
                        notification(
                          "success",
                          "Password reset successfully. You can now log in with your new password"
                        )
                        form.reset()
                        router.push("/login")
                        signOut(firebaseAuth)
                      },
                      (error: any) => {
                        setLoading(false)
                        notification(
                          "error",
                          error.response?.data?.message ||
                            "Error occurred during sign in. Please try again"
                        )
                        signOut(firebaseAuth)
                      }
                    )
                  })
                  .catch(() => {
                    setLoading(false)
                    signOut(firebaseAuth)
                    notification("error", "Error occurred during password reset. Please try again")
                  })
              })
              .catch(() => {
                setLoading(false)
                notification("error", "Error occurred during password reset. Please try again")
              })
          })
          .catch(() => {
            setLoading(false)
            notification(
              "error",
              "Error occurred during confirmation. The code might have expired or the password is too weak"
            )
          })
      })
      .catch(() => {
        setLoading(false)
        notification("error", "Invalid or expired action code. Initiate another password reset")
      })
  }

  return (
    <main className="relative flex flex-col justify-between">
      <UICard className="w-[410px] p-10 m-auto rounded-2xl flex flex-col gap-3">
        <UITypography variant="h3" className="text-tertiary-800 text-center">
          New Password
        </UITypography>
        <UITypography>Set a new password for your account.</UITypography>
        <UIForm form={form} onSubmit={onSubmit} className="flex flex-col gap-6">
          <div>
            <UIPasswordInput
              placeholder="Password"
              name="password"
              error={hasError(form, "password")}
            />
            <UIFieldError name="password" />
          </div>
          <UIButton type="submit" loading={loading}>
            Reset password
          </UIButton>
        </UIForm>
      </UICard>
    </main>
  )
}

"use client"

import Link from "next/link"
import {
  UIButton,
  UICard,
  UIDivider,
  UIForm,
  UIInput,
  UITypography,
  useZodForm,
  UIFieldError,
  hasError,
  notification,
  UIPasswordInput,
} from "ui"
import { FcGoogle } from "react-icons/fc"
import { IoPhonePortrait } from "react-icons/io5"
import { object, string } from "zod"
import { useSignIn, useSignInSocial } from "@/services/hooks"
import { useRouter } from "next/navigation"
import {
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth"
import { firebaseAuth } from "@/utils/firebase"
import { useState } from "react"

export default function Page() {
  const { isLoading, trigger } = useSignIn()
  const provider = new GoogleAuthProvider()

  const [googleLoading, setGoogleLoading] = useState(false)
  const { trigger: signInWithGoogleTrigger } = useSignInSocial()

  const signInSchema = object({
    email: string().min(1, { message: "Invalid email" }).email({ message: "Invalid email" }),
    password: string().min(1, { message: "Password is required" }),
  })

  const form = useZodForm({
    schema: signInSchema,
    mode: "all",
  })

  const router = useRouter()

  const onSubmit = (data: any) => {
    signInWithEmailAndPassword(firebaseAuth, data.email, data.password).then((userCredential) => {
      if (userCredential.user.emailVerified) {
        trigger(
          {
            email: data.email,
            password: data.password,
          },
          () => {
            form.reset()
            router.push("/")
          },
          (error: any) => {
            notification("error", error.response?.data?.message || "Error occurred during sign in")
          }
        )
      } else {
        sendEmailVerification(userCredential.user).then(() => {
          notification("success", "Verification email sent")
          signOut(firebaseAuth)
        })
      }
    })
  }

  const onSignInWithGoogle = () => {
    setGoogleLoading(true)
    signInWithPopup(firebaseAuth, provider)
      .then((result) => {
        const user = result.user
        // get firebase idToken
        user
          .getIdToken()
          .then((idToken: any) => {
            signInWithGoogleTrigger(
              {
                email: user.email,
                token: idToken,
              },
              () => {
                setGoogleLoading(false)
                notification("success", "Sign in successful")
                router.push("/")
              },
              (error: any) => {
                setGoogleLoading(false)
                notification(
                  "error",
                  error.response?.data?.message || "Error occurred during sign in"
                )
              }
            )
          })
          .catch(() => {
            setGoogleLoading(false)
            notification("error", "Error occurred during sign up. Try again")
          })
      })
      .catch(() => {
        setGoogleLoading(false)
        notification("error", "Error occurred during sign up. Try again")
      })
  }

  return (
    <main className="relative flex flex-col justify-between">
      <UICard className="w-[410px] p-10 m-auto rounded-2xl">
        <UITypography variant="h3" className="text-tertiary-800 text-center mb-3">
          Log In
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
          <div>
            <UIPasswordInput
              placeholder="Password"
              name="password"
              error={hasError(form, "password")}
            />
            <UIFieldError name="password" />
            <Link href="/forgot-password" className="text-right text-sm link mt-2 font-light">
              Forgot password?
            </Link>
          </div>
          <UIButton type="submit" loading={isLoading}>
            LOG IN
          </UIButton>
        </UIForm>
        <UIDivider className="my-3">or</UIDivider>
        <div className="flex gap-2 mb-3">
          <UIButton
            color="white"
            className="flex items-center justify-center gap-1 border hover:brightness-[0.98]"
            fullWidth
            onClick={onSignInWithGoogle}
            loading={googleLoading}
            icon={<FcGoogle size="20px" />}
          >
            Google
          </UIButton>
          <UIButton
            color="blue"
            className="flex items-center justify-center gap-1 hover:brightness-95"
            fullWidth
            icon={<IoPhonePortrait size="15px" />}
          >
            Phone
          </UIButton>
        </div>
        <UITypography className="text-sm mt-3 text-center font-medium">
          New here?{" "}
          <Link href="/signup" className="text-primary-400 hover:text-primary-300">
            Create an account
          </Link>
        </UITypography>
      </UICard>
    </main>
  )
}

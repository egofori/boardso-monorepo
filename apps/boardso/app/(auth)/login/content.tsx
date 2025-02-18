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

export default function Content() {
  const [emailLoading, setEmailLoading] = useState(false)
  const { trigger } = useSignIn()
  const provider = new GoogleAuthProvider()

  const [googleLoading, setGoogleLoading] = useState(false)
  const { trigger: signInWithGoogleTrigger } = useSignInSocial()

  const signInSchema = object({
    email: string().min(1, { message: "Invalid email" }).email({ message: "Invalid email" }).trim(),
    password: string().min(1, { message: "Password is required" }),
  })

  const form = useZodForm({
    schema: signInSchema,
    mode: "all",
  })

  const router = useRouter()

  const onSubmit = (data: any) => {
    setEmailLoading(true)
    signInWithEmailAndPassword(firebaseAuth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user
        if (user.emailVerified) {
          user.getIdToken().then((idToken: any) => {
            trigger(
              {
                email: data.email,
                password: data.password,
                token: idToken,
              },
              async () => {
                setEmailLoading(false)
                form.reset()
                notification("success", "Sign in successful")
                router.push("/")
              },
              (error: any) => {
                setEmailLoading(false)
                notification(
                  "error",
                  error.response?.data?.message || "Error occurred during sign in"
                )
              }
            )
          })
        } else {
          setEmailLoading(false)
          sendEmailVerification(userCredential.user)
            .then(async () => {
              notification("success", "Verification email sent")
              try {
                await signOut(firebaseAuth)
              } catch {}
            })
            .catch(async () => {
              try {
                await signOut(firebaseAuth)
              } catch {}
              notification("error", "Could not send verification email. Please try again")
            })
        }
      })
      .catch(() => {
        setEmailLoading(false)
        notification("error", "Invalid credentials")
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
    <main className="auth-main">
      <UICard className="auth-card">
        <UITypography variant="h3" className="auth-card-title mb-3">
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
          <UIButton type="submit" loading={emailLoading}>
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

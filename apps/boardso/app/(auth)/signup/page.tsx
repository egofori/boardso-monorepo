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
import { useRegister, useRegisterSocial } from "@/services/hooks"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { VerifyEmail } from "./VerifyEmail"
import { firebaseAuth } from "@/utils/firebase"
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  deleteUser,
} from "firebase/auth"

export default function Page() {
  const router = useRouter()
  const provider = new GoogleAuthProvider()
  const [verifyEmail, setVerifyEmail] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [email, setEmail] = useState("")
  const { trigger } = useRegister()
  const { trigger: signUpWithGoogleTrigger } = useRegisterSocial()

  const signUpSchema = object({
    firstName: string().min(1, { message: "Invalid first name" }).trim(),
    lastName: string().min(1, { message: "Invalid last name" }).trim(),
    email: string().min(1, { message: "Invalid email" }).email({ message: "Invalid email" }).trim(),
    password: string().min(8, {
      message: "Password must be more than 8 characters",
    }),
  })

  const form = useZodForm({
    schema: signUpSchema,
    mode: "all",
  })

  const onSubmit = (data: any) => {
    setLoading(true)
    setEmail(data.email)
    createUserWithEmailAndPassword(firebaseAuth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user
        user
          .getIdToken()
          .then((idToken: any) => {
            trigger(
              {
                firstName: data.firstName,
                lastName: data.lastName,
                password: data.password,
                email: data.email,
                token: idToken,
              },
              () => {
                setLoading(false)
                form.reset()
                sendEmailVerification(userCredential.user)
                  .then(() => {
                    setVerifyEmail(true)
                    notification("success", "Verification email sent")
                    signOut(firebaseAuth)
                  })
                  .catch(() => {
                    signOut(firebaseAuth)
                    notification(
                      "error",
                      "Could not send verification email. Try logging in to initiate another email verification"
                    )
                  })
              },
              (error: any) => {
                signOut(firebaseAuth)
                setLoading(false)
                notification(
                  "error",
                  error.response?.data?.message || "Error occurred during sign up"
                )
              }
            )
          })
          .catch(() => {
            setLoading(false)
            notification("error", "Error occurred during sign up")
          })
      })
      .catch((err) => {
        setLoading(false)
        switch (err?.code) {
          case "auth/email-already-in-use":
            notification("error", "User already exists")
            break
          default:
            notification("error", "Error occurred during sign up")
            break
        }
      })
  }

  const onSignUpWithGoogle = () => {
    setGoogleLoading(true)
    signInWithPopup(firebaseAuth, provider)
      .then((result) => {
        const user = result.user
        const names = user.displayName?.split(" ") || []
        const firstName = names[0] || null
        let lastName: string | null = names.reduce((prev, cur, index) => {
          // exclude first name
          if (index === 0) return prev
          return `${prev} ${cur}`
        }, "")
        if (lastName === "") lastName = null

        if (user.email !== null && firstName !== null && lastName !== null) {
          // get firebase idToken
          user
            .getIdToken()
            .then((idToken) => {
              signUpWithGoogleTrigger(
                {
                  firstName,
                  lastName,
                  email: user.email,
                  token: idToken,
                },
                (response: any) => {
                  setGoogleLoading(false)
                  if (response.data && user.emailVerified) {
                    notification("success", "Sign up successful")
                    router.push("/")
                  } else {
                    setEmail(user.email || "")
                    sendEmailVerification(user)
                      .then(() => {
                        setVerifyEmail(true)
                        notification("success", "Verification email sent")
                        signOut(firebaseAuth)
                      })
                      .catch(() => {
                        signOut(firebaseAuth)
                        notification(
                          "error",
                          "Could not send verification email. Try logging in to initiate another email verification"
                        )
                      })
                  }
                },
                (error: any) => {
                  signOut(firebaseAuth)
                  setGoogleLoading(false)
                  notification(
                    "error",
                    error.response?.data?.message || "Error occurred during sign up"
                  )
                }
              )
            })
            .catch(() => {
              setGoogleLoading(false)
              notification("error", "Error occurred during sign up. Try again")
            })
        } else {
          deleteUser(user)
            .then(() => {
              setGoogleLoading(false)
              notification(
                "error",
                "Not enough details were provided to complete the sign up process"
              )
            })
            .catch(() => {
              setGoogleLoading(false)
            })
        }
      })
      .catch(() => {
        setGoogleLoading(false)
        notification("error", "Error occurred during sign up. Try again")
      })
  }

  return (
    <main className="relative flex flex-col justify-between px-6">
      <UICard className="w-full max-w-[410px] p-5 sm:p-10 m-auto rounded-2xl">
        {verifyEmail ? (
          <VerifyEmail email={email} ok={() => setVerifyEmail(false)} />
        ) : (
          <>
            <UITypography
              variant="h3"
              className="text-tertiary-800 text-center mb-3 text-[25px] sm:text-[30px]"
            >
              New Account
            </UITypography>
            <UIForm form={form} onSubmit={onSubmit} className="flex flex-col gap-6">
              <div>
                <UIInput
                  placeholder="First name"
                  type="text"
                  {...form.register("firstName")}
                  error={hasError(form, "firstName")}
                />
                <UIFieldError name="firstName" />
              </div>
              <div>
                <UIInput
                  placeholder="Last name"
                  type="text"
                  {...form.register("lastName")}
                  error={hasError(form, "lastName")}
                />
                <UIFieldError name="lastName" />
              </div>
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
              </div>
              <UIButton type="submit" loading={loading}>
                SIGN UP
              </UIButton>
            </UIForm>
            <UIDivider className="my-3">or</UIDivider>
            <div className="flex gap-2 mb-3">
              <UIButton
                color="white"
                className="flex items-center justify-center gap-1 border hover:brightness-[0.98]"
                fullWidth
                onClick={onSignUpWithGoogle}
                icon={<FcGoogle size="20px" />}
                loading={googleLoading}
              >
                Google
              </UIButton>
            </div>
            <UITypography className="[&>a]:text-primary-500 hover:[&>a]:text-primary-400 text-xs">
              By continuing you agree to our <Link href="#">Terms of service</Link> and{" "}
              <Link href="#">Privacy Policy</Link>
            </UITypography>
            <UITypography className="text-sm mt-3 text-center font-medium">
              Already have an account?{" "}
              <Link href="/login" className="link">
                Log in
              </Link>
            </UITypography>
          </>
        )}
      </UICard>
    </main>
  )
}

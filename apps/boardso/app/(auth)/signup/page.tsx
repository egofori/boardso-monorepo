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
import { useRegister } from "@/services/hooks"
import { useRouter } from "next/navigation"

export default function Page() {
  const router = useRouter()
  const { isLoading, trigger } = useRegister()

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
    trigger(
      {
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        email: data.email,
      },
      () => {
        form.reset()
        router.push("/")
      },
      (error: any) => {
        notification("error", error.response?.data?.message || "Error occurred during sign up")
      }
    )
  }

  return (
    <main className="relative flex flex-col justify-between">
      <UICard className="w-[410px] p-10 m-auto rounded-2xl">
        <UITypography variant="h3" className="text-tertiary-800 text-center mb-3">
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
          <UIButton type="submit" loading={isLoading}>
            SIGN UP
          </UIButton>
        </UIForm>
        <UIDivider className="my-3">or</UIDivider>
        <div className="flex gap-2 mb-3">
          <UIButton
            color="white"
            className="flex items-center justify-center gap-1 border hover:brightness-[0.98]"
            fullWidth
          >
            <FcGoogle size="20px" />
            Google
          </UIButton>
          <UIButton
            color="blue"
            className="flex items-center justify-center gap-1 hover:brightness-95"
            fullWidth
          >
            <IoPhonePortrait size="15px" />
            Phone
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
      </UICard>
    </main>
  )
}

"use client"

import Link from "next/link";
import { UIButton, UICard, UIDivider, UIForm, UIInput, UITypography, useZodForm, UIFieldError, hasError, notification, UIPasswordInput } from "ui";
import { FcGoogle } from "react-icons/fc"
import { IoPhonePortrait } from "react-icons/io5"
import { object, string } from "zod";
import { useSignIn } from "@/services/hooks";
import { useRouter } from "next/navigation";

export default function Page() {
  const { isLoading, trigger } = useSignIn()

  const signInSchema = object({
    "email": string().min(1, { message: "Invalid email" }).email({ message: "Invalid email"}),
    "password": string().min(1, { message: "Password is required" }),
  });

  const form = useZodForm({
		schema: signInSchema,
    mode: "all"
  });

  const router = useRouter()
  
  const onSubmit = (data: any) => {
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
        notification("error", error.response?.data?.message|| "Error occurred during sign in")
      }
    )
  }

  return (
    <main className="relative flex flex-col justify-between">
      <UICard className="w-[410px] p-10 m-auto rounded-2xl">
        <UITypography variant="h3" className="text-tertiary-800 text-center mb-3">Log In</UITypography>
        <UIForm form={form} onSubmit={onSubmit} className="flex flex-col gap-6">
          <div>
            <UIInput placeholder="Email" type="email" {...form.register("email")} error={hasError(form, "email")} />
            <UIFieldError name="email" />
          </div>
          <div>
            <UIPasswordInput placeholder="Password" name="password" error={hasError(form, "password")} />
            <UIFieldError name="password" />
            <Link href="/forgot-password" className="text-right text-sm link mt-2 font-light">Forgot password?</Link>
          </div>
          <UIButton type="submit" loading={isLoading}>LOG IN</UIButton>
        </UIForm>
        <UIDivider className="my-3">or</UIDivider>
        <div className="flex gap-2 mb-3">
          <UIButton color="white" className="flex items-center justify-center gap-1 border hover:brightness-[0.98]" fullWidth>
            <FcGoogle size="20px" />Google
          </UIButton>
          <UIButton color="blue" className="flex items-center justify-center gap-1 hover:brightness-95" fullWidth>
            <IoPhonePortrait size="15px" />Phone
          </UIButton>
        </div>
        <UITypography className="text-sm mt-3 text-center font-medium">New here?{" "}<Link href="/signup" className="text-primary-400 hover:text-primary-300">Create an account</Link></UITypography>
      </UICard>
    </main>
  )
}

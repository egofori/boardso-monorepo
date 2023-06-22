"use client"

import Link from "next/link";
import { UIButton, UICard, UIDivider, UIForm, UIInput, UITypography, useZodForm, UIFieldError, hasError } from "ui";
import { FcGoogle } from "react-icons/fc"
import { IoPhonePortrait } from "react-icons/io5"
import { object, string } from "zod";

export default function Page() {
  const signUpSchema = object({
    "first-name": string().min(1, { message: "Invalid first name"}),
    "last-name": string().min(1, { message: "Invalid last name"}),
    "email": string().min(1).email({ message: "Invalid email"}),
    "password": string().min(8, { message: "Password must be more than 8 characters" }),
  });
  const form = useZodForm({
		schema: signUpSchema,
    mode: "all"
	});
  return (
    <main className="relative flex flex-col justify-between">
      <UICard className="w-[410px] p-10 m-auto rounded-2xl">
        <UITypography variant="h3" className="text-tertiary-800 text-center mb-3">New Account</UITypography>
        <UIForm form={form} className="flex flex-col gap-6">
          <div>
            <UIInput label="First name" type="text" {...form.register("first-name")} error={hasError(form, "first-name")} />
            <UIFieldError name="first-name" />
          </div>
          <div>
            <UIInput label="Last name" type="text" {...form.register("last-name")} error={hasError(form, "last-name")} />
            <UIFieldError name="last-name" />
          </div>
          <div>
            <UIInput label="Email" type="email" {...form.register("email")} error={hasError(form, "email")} />
            <UIFieldError name="email" />
          </div>
          <div>
            <UIInput label="Password" type="password" {...form.register("password")} error={hasError(form, "password")} />
            <UIFieldError name="password" />
          </div>
          <UIButton type="submit" >SIGN UP</UIButton>
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
        <UITypography className="[&>a]:text-primary-500 hover:[&>a]:text-primary-400 text-xs">
          By continuing you agree to our {" "}
          <Link href="#">Terms of service</Link>
          {" "} and {" "}
          <Link href="#">Privacy Policy</Link>
        </UITypography>
        <UITypography className="text-sm mt-3 text-center font-medium">Already have an account?{" "}<Link href="/login" className="link">Log in</Link></UITypography>
      </UICard>
    </main>
  )
}

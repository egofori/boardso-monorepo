"use client"

import React from "react"
import {
  hasError,
  UIAvatar,
  UIButton,
  UICard,
  UICardBody,
  UICardHeader,
  UIFieldError,
  UIForm,
  UIIconButton,
  UIInput,
  UIRating,
  UITypography,
  useZodForm,
} from "ui"
import { object, string } from "zod"
import { AiFillEdit } from "react-icons/ai"

export const owner = {
  first_name: "Evans Gyan",
  last_name: "Ofori",
  email: "evansgyan@gmail.com",
  phone_number: {
    zip_code: "+233",
    number: "54879839393",
  },
  uid: "abrewa_nana",
  password: "passwword",
  profile_image:
    "https://images.unsplash.com/photo-1541951991883-a34a3024c94a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
  full_name: "Abrewa Nana",
  contacts: [
    {
      name: "Website",
      value: ["www.myweb.com"],
    },
    {
      name: "Phone",
      value: ["+233546040677"],
    },
    {
      name: "Email",
      value: ["evans@koo.com"],
    },
    {
      name: "WhatsApp",
      value: ["https://chat.whatsapp.com/+233546040677"],
    },
  ],
  rating: "4.5",
  about: "I am who I am. You can't define me. I have already defined myself. Whether you like it or not I am who I am."
}

export default function Page() {
  const profileSchema = object({
    "first-name": string().min(1, { message: "Invalid first name" }),
    "last-name": string().min(1, { message: "Invalid last name" }),
    email: string().min(1).email({ message: "Invalid email" }),
    password: string().min(8, {
      message: "Password must be more than 8 characters",
    }),
    phone: string(),
  })

  const form = useZodForm({
    schema: profileSchema,
    mode: "all",
    defaultValues: {
      "first-name": owner.first_name,
      "last-name": owner.last_name,
      email: owner.email,
      password: owner.password,
      phone: `${owner.phone_number.zip_code}${owner.phone_number.number}`,
    }
  })

  return (
    <main>
      <UICard className="mx-auto my-5 max-w-3xl p-10 bg-white">
        <UITypography
          variant="h3"
          className="text-tertiary-800 text-center mb-3"
        >
          My Profile
        </UITypography>
        <UICardHeader className="m-0 shadow-none flex flex-col gap-3 justify-center items-center ">
          <UIAvatar
            src={owner.profile_image}
            alt="avatar"
            size="xl"
            className="w-[120px] h-[120px]"
          />
          <div className="flex flex-row gap-1 items-center">
            <UIRating value={4} ratedColor="amber" readonly />
            <UITypography className="font-bold">{owner.rating} Rated</UITypography>
          </div>
        </UICardHeader>
        <UICardBody>
          <UIForm form={form} className="flex flex-col gap-6">
            <div>
              <UIInput
                label="First name"
                type="text"
                {...form.register("first-name")}
                error={hasError(form, "first-name")}
              />
              <UIFieldError name="first-name" />
            </div>
            <div>
              <UIInput
                label="Last name"
                type="text"
                {...form.register("last-name")}
                error={hasError(form, "last-name")}
              />
              <UIFieldError name="last-name" />
            </div>
            <div>
              <div className="relative w-full">
                <UIInput
                  label="Email"
                  type="email"
                  {...form.register("email")}
                  error={hasError(form, "email")}
                  className="pr-10"
                  disabled
                />
                <UIIconButton
                  color="white"
                  className="absolute right-[2px] top-[2px] border rounded"
                >
                  <AiFillEdit className="text-[20px]" />
                </UIIconButton>
              </div>
              <UIFieldError name="email" />
            </div>
            <div>
              <div className="relative w-full">
                <UIInput
                  label="Password"
                  type="password"
                  {...form.register("password")}
                  error={hasError(form, "password")}
                  className="pr-10"
                  disabled
                />
                <UIIconButton
                  color="white"
                  className="absolute right-[2px] top-[2px] border rounded"
                >
                  <AiFillEdit className="text-[20px]" />
                </UIIconButton>
              </div>
              <UIFieldError name="password" />
            </div>
            <div>
              <div className="relative w-full">
                <UIInput
                  label="Phone"
                  {...form.register("phone")}
                  error={hasError(form, "phone")}
                  className="pr-10"
                  disabled
                />
                <UIIconButton
                  color="white"
                  className="absolute right-[2px] top-[2px] border rounded"
                >
                  <AiFillEdit className="text-[20px]" />
                </UIIconButton>
              </div>
              <UIFieldError name="phone" />
            </div>
            <div className="flex gap-8">
              <UIButton variant="outlined" className="w-full">
                CANCEL
              </UIButton>
              <UIButton type="submit" className="w-full">
                SUBMIT
              </UIButton>
            </div>
          </UIForm>
        </UICardBody>
      </UICard>
    </main>
  )
}

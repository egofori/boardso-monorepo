"use client"

import { Navbar } from "@material-tailwind/react"
import Link from "next/link"
import React, { useState } from "react"
import {
  UIButton,
  UIDivider,
  UIForm,
  UIIconButton,
  UIInput,
  UIMenu,
  UIMenuHandler,
  UIMenuItem,
  UIMenuList,
  UITypography,
  useZodForm,
} from "ui"
import CountryDropdown from "@/components/CountryDropdown"
import { BiBookmarks, BiLogOut, BiPlus, BiSearch } from "react-icons/bi"
import { usePathname, useRouter } from "next/navigation"
import { MdAccountCircle } from "react-icons/md"
import { RiSettings4Line } from "react-icons/ri"
import { stringToObject } from "../../../utils"
import { useLogOut } from "@/services/hooks"
import { object, string } from "zod"

function ProfileMenu() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { trigger } = useLogOut()
  const user = stringToObject(localStorage?.getItem("userInfo"))

  const logOut = () =>
    trigger(() => {
      setOpen(false)
      router.push("/")
    })

  return (
    <UIMenu
      dismiss={{
        itemPress: false,
      }}
      open={open}
      handler={setOpen}
      allowHover
    >
      <UIMenuHandler>
        <UIIconButton color="white" variant="text" className="rounded-full !ring-4 !ring-gray-100">
          <MdAccountCircle color="#1e293b" className="w-[40px] h-[40px]" />
        </UIIconButton>
      </UIMenuHandler>
      <UIMenuList className="max-w-[230px]">
        <div className="text-center outline-none">
          <UITypography className="font-medium text-ellipsis">
            {user?.firstName} {user?.lastName}
          </UITypography>
          <UIButton
            variant="text"
            size="sm"
            className="normal-case font-normal"
            onClick={() => router.push(`/${user?.username}`)}
          >
            View profile
          </UIButton>
        </div>
        <UIDivider type="horizontal" className="my-1" />
        <UIMenuItem className="flex flex-row gap-1">
          <RiSettings4Line />
          Settings
        </UIMenuItem>
        <UIMenuItem className="flex flex-row gap-1">
          <BiBookmarks />
          Saved billboards
        </UIMenuItem>
        <UIDivider type="horizontal" className="my-1" />
        <UIMenuItem
          color="red"
          className="flex flex-row gap-1 text-deep-orange-500 hover:!text-deep-orange-500"
          onClick={logOut}
        >
          <BiLogOut />
          Log out
        </UIMenuItem>
      </UIMenuList>
    </UIMenu>
  )
}

export default function Header() {
  const pathname = usePathname()

  const isLoggedIn = stringToObject(localStorage.getItem("isLoggedIn"))

  const router = useRouter()

  const searchSchema = object({
    search: string(),
  })

  const form = useZodForm({
    schema: searchSchema,
    mode: "all",
  })

  const onSubmit = (data: any) => {
    router.push(`billboards?search=${data.search}`)
  }
  return (
    <Navbar className="sticky inset-0 z-10 h-max rounded-none max-w-full px-0">
      <div className="layout-wrapper flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Link href="/" className="font-bold text-4xl text-tertiary-800">
            boardso
          </Link>
          <CountryDropdown />
        </div>
        <div className="flex flex-row items-center gap-3">
          {pathname !== "/billboards" && pathname !== "/" && (
            <UIForm form={form} onSubmit={onSubmit} className="relative">
              <UIInput
                className="placeholder:!text-slate-500 !w-[110px] focus:!w-[200px] pl-10 !bg-slate-400/10 rounded-full !border-transparent focus:border-[1px] focus:!border-slate-200"
                placeholder="Search"
                size="md"
                {...form.register("search")}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <BiSearch size="22px" className="text-slate-500" />
              </div>
            </UIForm>
          )}
          {pathname !== "/add-billboard" && pathname !== "/" ? (
            <Link href="/add-billboard">
              <UIButton
                variant="text"
                color="teal"
                className="text-base  rounded-full flex items-center"
              >
                <BiPlus fontSize="25px" />
                Add Billboard
              </UIButton>
            </Link>
          ) : (
            <></>
          )}
          {isLoggedIn ? (
            <ProfileMenu />
          ) : (
            <div className="flex gap-2 text-tertiary-800 hover:[&>a]:text-teal-400">
              <Link href="/login" className="">
                Log in
              </Link>
              <UITypography as="span">/</UITypography>
              <Link href="/signup">Sign up</Link>
            </div>
          )}
        </div>
      </div>
    </Navbar>
  )
}

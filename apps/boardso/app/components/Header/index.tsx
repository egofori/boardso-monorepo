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
  UITooltip,
  UITypography,
  notification,
  useZodForm,
} from "ui"
import CountryDropdown from "@/components/CountryDropdown"
import { BiBookmarks, BiLogOut, BiPlus, BiSearch } from "react-icons/bi"
import { usePathname, useRouter } from "next/navigation"
import { MdAccountCircle } from "react-icons/md"
import { RiDashboardLine } from "react-icons/ri"
import { useLogOut } from "@/services/hooks"
import { object, string } from "zod"
import { getStorageItem } from "@/lib/storage"
import { useValue } from "@/lib/hooks/useValue"
import { VscSignIn } from "react-icons/vsc"
import Logo from "../Logo"
import { useGetUserProfile } from "@/services/hooks/users"
import { User } from "@/types/User"
import { useDisableAddBillboard } from "@/utils/hooks"

function ProfileMenu() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { trigger } = useLogOut()
  const { data: user }: { data: User | null; [x: string]: any } = useGetUserProfile()

  const logOut = () =>
    trigger(() => {
      setOpen(false)
      router.push("/")
      notification("success", "You are logged out")
    })

  const closeMenu = () => setOpen(false)

  return (
    <UIMenu open={open} handler={setOpen} allowHover>
      <UIMenuHandler>
        <UIIconButton color="white" variant="text" className="rounded-full !ring-4 !ring-gray-100">
          <MdAccountCircle color="#1e293b" className="w-[40px] h-[40px]" />
        </UIIconButton>
      </UIMenuHandler>
      <UIMenuList className="max-w-[230px]">
        {user ? (
          <>
            <div className="text-center outline-none">
              <UITypography className="font-medium text-ellipsis">
                {user?.firstName} {user?.lastName}
              </UITypography>
              <Link href="/profile">
                <UIButton variant="text" size="sm" className="normal-case font-normal" onClick={closeMenu}>
                  View profile
                </UIButton>
              </Link>
            </div>
            <UIDivider type="horizontal" className="my-1" />
            <Link href={`/${user?.username}`}>
              <UIMenuItem className="flex flex-row gap-1" onClick={closeMenu}>
                <RiDashboardLine />
                Dashboard
              </UIMenuItem>
            </Link>
            <Link href="/profile?t=2">
              <UIMenuItem className="flex flex-row gap-1" onClick={closeMenu}>
                <BiBookmarks />
                Saved billboards
              </UIMenuItem>
            </Link>
            <UIDivider type="horizontal" className="my-1" />
          </>
        ) : (
          <></>
        )}
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

function AuthMenu() {
  const [open, setOpen] = useState(false)

  return (
    <UIMenu open={open} handler={setOpen} allowHover>
      <UIMenuHandler>
        <UIIconButton
          color="white"
          variant="text"
          className="p-2 rounded-full border-2 border-[#1e293b]"
        >
          <VscSignIn color="#1e293b" className="text-[25px]" />
        </UIIconButton>
      </UIMenuHandler>
      <UIMenuList className="!w-[100px]">
        <Link href="/login">
          <UIMenuItem>Log in</UIMenuItem>
        </Link>
        <Link href="/signup">
          <UIMenuItem>Sign up</UIMenuItem>
        </Link>
      </UIMenuList>
    </UIMenu>
  )
}

export default function Header() {
  const pathname = usePathname()

  const isLoggedIn = useValue(getStorageItem("isLoggedIn"))

  const router = useRouter()

  const disableAddBillboard = useDisableAddBillboard()

  const searchSchema = object({
    search: string(),
  })

  const form = useZodForm({
    schema: searchSchema,
    mode: "all",
  })

  const onSubmit = (data: any) => {
    router.push(`/billboards?search=${data.search}`)
  }

  return (
    <Navbar className="sticky inset-0 z-10 h-max rounded-none max-w-full px-0">
      <div className="layout-wrapper flex justify-between items-center gap-4">
        <div className="flex gap-1 items-start">
          <Link href="/" className="font-bold text-4xl text-tertiary-800">
            <Logo />
          </Link>
          <CountryDropdown />
        </div>
        <div className="flex flex-row items-center gap-2 sm:gap-3 overflow-hidden">
          {pathname !== "/billboards" && pathname !== "/" && (
            <>
              <UIForm form={form} onSubmit={onSubmit} className="relative hidden md:block">
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
              <UITooltip content="Click to search">
                <Link href="/billboards">
                  <UIIconButton
                    color="white"
                    className="!bg-slate-400/10 rounded-full !border-transparent focus:border-[1px] focus:!border-slate-200 block md:hidden"
                  >
                    <BiSearch size="22px" className="text-slate-500" />
                  </UIIconButton>
                </Link>
              </UITooltip>
            </>
          )}
          {pathname !== "/add-billboard" && pathname !== "/" ? (
            <UITooltip content={disableAddBillboard ? "Subscribe/upgrade to add more billboard listings" : "Add billboard"}>
              <Link href="/add-billboard">
                <UIButton
                  variant="text"
                  className="text-base rounded-full p-2 [&>span]:!mr-0 bg-teal-500/10 md:bg-transparent"
                  icon={<BiPlus fontSize="25px" />}
                  disabled={disableAddBillboard}
                >
                  <span className="md:block hidden">Add Billboard</span>
                </UIButton>
              </Link>
            </UITooltip>
          ) : (
            <></>
          )}
          {isLoggedIn ? (
            <ProfileMenu />
          ) : (
            <>
              <div className="md:hidden block">
                <AuthMenu />
              </div>
              <div className="md:flex hidden gap-2 text-tertiary-800 hover:[&>a]:text-teal-400">
                <Link href="/login" className="">
                  Log in
                </Link>
                <UITypography as="span">/</UITypography>
                <Link href="/signup">Sign up</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </Navbar>
  )
}

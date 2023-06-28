"use client"

import { Navbar } from "@material-tailwind/react"
import Link from "next/link"
import React from "react"
import { UIInput, UITypography } from "ui"
import CountryDropdown from "@/components/CountryDropdown"
import { BiSearch } from "react-icons/bi"
import { usePathname } from "next/navigation"

export default function Header() {
  const pathname = usePathname()

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
          {(pathname !== "/billboards" && pathname !== "/") && (
            <div className="relative">
              <UIInput
                className="placeholder:!text-slate-500 !w-[110px] focus:!w-[200px] pl-10 !bg-slate-400/10 rounded-full !border-transparent focus:border-[1px] focus:!border-slate-200"
                placeholder="Search"
                size="md"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <BiSearch size="22px" className="text-slate-500" />
              </div>
            </div>
          )}
          <div className="flex gap-2 text-tertiary-800 hover:[&>a]:text-teal-400">
            <Link href="/login" className="">
              Log in
            </Link>
            <UITypography as="span">/</UITypography>
            <Link href="/signup">Sign up</Link>
          </div>
        </div>
      </div>
    </Navbar>
  )
}

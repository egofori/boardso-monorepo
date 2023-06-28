"use client"

import { UIInput, UIButton } from "ui"
import { BiSearch } from "react-icons/bi"
import { twMerge } from "tailwind-merge"

export default function SearchInput({ className }: { className: string }) {
  return (
    <div className={twMerge("relative max-w-[600px] w-[95%]", className)}>
      <UIInput className="pl-10 pr-20 bg-white" placeholder="Type to search" />
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <BiSearch size="22px" className="text-slate-400" />
      </div>
      <UIButton size="sm" color="teal" className="!absolute right-[6px] top-[6px] rounded">
        SEARCH
      </UIButton>
    </div>
  )
}

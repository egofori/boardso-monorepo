"use client"

import { UIInput, UIIconButton } from "ui"
import { BiSearch } from "react-icons/bi"
import { IoCloseSharp } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

export default function SearchInput({ className }:{ className: string}) {
  return (
    <div className={twMerge("relative max-w-[600px] w-[95%]", className)}>
      <UIInput
        className="pl-10 pr-12"
        placeholder="Type to search"
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <BiSearch size="22px" className="text-slate-400" />
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center pr-4">
        <UIIconButton className="rounded-full bg-transparent border-2 border-slate-400 w-[25px] h-[25px] shadow-none">
          <IoCloseSharp size="16px" className="text-slate-400" />
        </UIIconButton>
      </div>
    </div>
  )
}

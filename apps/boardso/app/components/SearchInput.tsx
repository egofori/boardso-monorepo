"use client"

import { UIInput, UIButton, UIForm, useZodForm } from "ui"
import { BiSearch } from "react-icons/bi"
import { twMerge } from "tailwind-merge"
import { object, string } from "zod"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SearchInput({ className }: { className: string }) {
  const router = useRouter()
  const [showAllButton, setShowAllButton] = useState<boolean>(true)

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
    <UIForm
      form={form}
      onSubmit={onSubmit}
      className={twMerge("relative max-w-[600px] w-full", className)}
    >
      <UIInput
        containerProps={{ className: "h-[52px]" }}
        className="h-[52px] pl-12 pr-[95px] bg-white !border-0 focus:!border-0 transition-none !text-[16px]"
        placeholder="Type to search"
        {...form.register("search")}
        onFocus={() => setShowAllButton(false)}
        onBlur={() => setShowAllButton(true)}
      />
      <div className="absolute inset-y-0 left-0 flex items-center justify-center pl-4 pointer-events-none">
        <BiSearch size="28px" className="text-slate-400" />
      </div>

      <UIButton
        size="sm"
        color="teal"
        className="!absolute right-[10px] top-[10px] rounded"
        type="submit"
      >
        {form.watch("search") ? "SEARCH" : showAllButton ? "ALL" : "SEARCH"}
      </UIButton>
    </UIForm>
  )
}

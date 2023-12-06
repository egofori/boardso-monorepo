"use client"

import { UIInput, UIButton, UIForm, useZodForm } from "ui"
import { BiSearch } from "react-icons/bi"
import { twMerge } from "tailwind-merge"
import { object, string } from "zod"
import { useRouter } from "next/navigation"

export default function SearchInput({ className }: { className: string }) {
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
    <UIForm
      form={form}
      onSubmit={onSubmit}
      className={twMerge("relative max-w-[600px] w-full", className)}
    >
      <UIInput
        containerProps={{ className: "h-[52px]"}}
        className="h-[52px] pl-10 pr-[90px] bg-white !border-0 focus:!border-0 transition-none"
        placeholder="Type to search"
        {...form.register("search")}
      />
      <div className="absolute inset-y-0 left-0 flex items-center justify-center pl-4 pointer-events-none">
        <BiSearch size="22px" className="text-slate-400" />
      </div>

      <UIButton
        size="sm"
        color="teal"
        className="!absolute right-[10px] top-[10px] rounded"
        type="submit"
      >
        {form.watch("search") ? "SEARCH" : "ALL"}
      </UIButton>
    </UIForm>
  )
}

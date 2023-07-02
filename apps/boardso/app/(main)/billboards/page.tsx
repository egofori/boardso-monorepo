"use client"

import BillboardCard from "@/components/BillboardCard"
import { useState } from "react"
import { BiSearch } from "react-icons/bi"
import {
  UIDropdownButton,
  UIInput,
  UITypography,
  UIRange,
  UIButton,
  UIMenuList,
  UIMenuItem,
  useZodForm,
  hasError,
  UIForm,
  UIFieldError,
  UIDivider,
  UIMenu,
  UIMenuHandler,
} from "ui"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6"
import { BsCaretDownFill } from "react-icons/bs"
import { twMerge } from "tailwind-merge"
import { object, number, string } from "zod"
import { IoCloseSharp } from "react-icons/io5"

export default function Page() {
  const searchSchema = object({
    search: string(),
    width: number({
      coerce: true,
      invalid_type_error: "Invalid dimension value",
    }).gt(0, "Invalid dimension value"),
    height: number({
      coerce: true,
      invalid_type_error: "Invalid dimension value",
    }).gt(0, "Invalid dimension value"),
    amount: number({
      coerce: true,
      invalid_type_error: "Invalid price value",
    }),
  })

  const form = useZodForm({
    schema: searchSchema,
    mode: "all",
  })

  const unitsOfMeasurement = [
    { label: "feet", value: "FEET" },
    { label: "meters", value: "METERS" },
  ]

  const menu = (data: Array<any>, onClick: Function) => (
    <UIMenuList className="max-h-[500px] max-w-[100px] rounded-xl">
      {data.map((row: any) => (
        <UIMenuItem key={row.value} onClick={() => onClick(row)}>
          <UITypography className="text-tertiary-800">{row.label}</UITypography>
        </UIMenuItem>
      ))}
    </UIMenuList>
  )

  const [more, setMore] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)

  const [selectedUnitOfMeasurement, setSelectedUnitOfMeasurement] = useState(
    unitsOfMeasurement[0]
  )

  const DimensionField = () => (
    <div className="flex flex-col w-full">
      <div className="flex">
        <UIInput
          type="text"
          placeholder="width"
          {...form.register("width")}
          error={hasError(form, "width")}
          className="rounded-r-none"
        />
        <UIDropdownButton
          menu={menu(unitsOfMeasurement, setSelectedUnitOfMeasurement)}
          className="border border-l-0 border-gray-200 rounded-l-none bg-slate-100 py-1 px-2"
        >
          <UITypography className="font-normal normal-case">
            {selectedUnitOfMeasurement.label}
          </UITypography>
        </UIDropdownButton>
      </div>
      <div className="h-4">
        <UIFieldError name="width" />
      </div>
    </div>
  )

  return (
    <main>
      <div className="w-full py-10 bg-white">
        <div className="layout-wrapper">
          <UIForm form={form} className="flex flex-col justify-between gap-6">
            <div className="flex flex-col justify-between items-center gap-3 md:flex-row">
              <div className="relative w-full md:w-[calc(100%-500px)]">
                <UIInput
                  className="pl-10 bg-white"
                  placeholder="Type to search"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <BiSearch size="22px" className="text-slate-400" />
                </div>
              </div>
              <div className="flex flex-row gap-3">
                <UIMenu
                  open={openMenu}
                  handler={setOpenMenu}
                  dismiss={{
                    itemPress: false,
                  }}
                >
                  <UIMenuHandler>
                    <UIButton
                      color="white"
                      size="sm"
                      className="flex gap-1 items-center active:brightness-95 border border-gray-200"
                      onClick={() => setMore(!more)}
                    >
                      <UITypography className="normal-case">
                        Choose location
                      </UITypography>
                      <BsCaretDownFill
                        className={twMerge(
                          more ? "rotate-180" : "rotate-0",
                          "flex-shrink-0 text-xs"
                        )}
                      />
                    </UIButton>
                  </UIMenuHandler>
                  <UIMenuList className=" rounded-xl">
                    <UIInput
                      containerProps={{
                        className: "mb-2",
                      }}
                      placeholder="Enter a place..."
                    />
                    <div className="flex flex-row justify-center mb-2 w-full">
                      <UIDivider type="horizontal" className="w-[80%]" />
                    </div>
                  </UIMenuList>
                </UIMenu>
                <UIDropdownButton
                  className="border border-gray-200"
                  size="sm"
                  menu={
                    <UIMenuList className="max-h-[500px] max-w-[100px] rounded-xl">
                      <UIMenuItem>
                        <UITypography className="text-tertiary-800">
                          Static billboard
                        </UITypography>
                      </UIMenuItem>
                      <UIMenuItem>
                        <UITypography className="text-tertiary-800">
                          Digital billboard
                        </UITypography>
                      </UIMenuItem>
                    </UIMenuList>
                  }
                >
                  <UITypography className="normal-case">
                    Billboard type
                  </UITypography>
                </UIDropdownButton>
                <UIButton
                  color="teal"
                  variant="text"
                  size="sm"
                  className="flex gap-1 items-center active:brightness-95"
                  onClick={() => setMore(!more)}
                >
                  <UITypography className="normal-case">
                    More filters
                  </UITypography>
                  <BsCaretDownFill
                    className={twMerge(
                      more ? "rotate-180" : "rotate-0",
                      "flex-shrink-0 text-xs"
                    )}
                  />
                </UIButton>
              </div>
            </div>
            {more && (
              <div className="flex flex-row gap-4 justify-between">
                <div className="flex flex-col justify-start items-start gap-3">
                  <label>Price range</label>
                  <UIRange className="max-w-[500px]" min={100} max={10000} />
                  <div className="flex flex-row items-center gap-6">
                    <div className="flex flex-row items-center gap-2">
                      <UITypography>Min:</UITypography>
                      <UIInput />
                    </div>
                    <div className="flex flex-row items-center gap-1">
                      <UITypography>Max:</UITypography>
                      <UIInput />
                    </div>
                  </div>
                </div>
                <UIDivider type="vertical" />
                <div className="flex flex-col justify-start items-start gap-3">
                  <label>Dimension</label>
                  <div className="flex items-center gap-2">
                    <DimensionField />
                    <div className="h-8 w-8 -mt-4">
                      <IoCloseSharp className="text-3xl text-slate-500" />
                    </div>
                    <DimensionField />
                  </div>
                </div>
              </div>
            )}
          </UIForm>
        </div>
      </div>
      <div className="layout-wrapper flex flex-col gap-7 py-7">
        <div className="flex flex-row items-center justify-between">
          <UITypography className="text-slate-800 text-lg">
            Showing <b>1 - 10</b> of <b>53</b> billboards
          </UITypography>
          <UIDropdownButton
            color="amber"
            variant="text"
            size="sm"
            onClick={(e) => setMore(!more)}
          >
            <UITypography className="normal-case">Sort</UITypography>
          </UIDropdownButton>
        </div>
        <div className="grid grid-flow-row grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((billboard, i) => (
            <BillboardCard key={i} />
          ))}
        </div>
        <div className="flex flex-row gap-3 justify-end">
          <UIButton
            size="md"
            variant="outlined"
            color="blue-gray"
            className="flex flex-row items-center gap-1"
          >
            <FaAngleLeft />
            Previous
          </UIButton>
          <UIButton
            variant="outlined"
            color="blue-gray"
            className="flex flex-row items-center gap-1"
          >
            Next
            <FaAngleRight />
          </UIButton>
        </div>
      </div>
    </main>
  )
}

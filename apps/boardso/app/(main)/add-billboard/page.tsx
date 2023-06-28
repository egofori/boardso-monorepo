"use client"

import { useState } from "react"
import { BiPlus } from "react-icons/bi"
import { IoCloseSharp, IoLocationSharp } from "react-icons/io5"
import {
  hasError,
  UIButton,
  UICard,
  UIDropdownButton,
  UIFieldError,
  UIForm,
  UIIconButton,
  UIInput,
  UIMenuItem,
  UIMenuList,
  UIOption,
  UISelect,
  UITextarea,
  UITooltip,
  UITypography,
  useZodForm,
} from "ui"
import { object, number, string } from "zod"

export default function Page() {
  const billboardTypes = [
    { label: "Static billboard", value: "STATIC" },
    { label: "Digital billboard", value: "DIGITAL" },
  ]

  const unitsOfMeasurement = [
    { label: "feet", value: "FEET" },
    { label: "meters", value: "METERS" },
  ]

  const currencies = [
    { label: "GHS", value: "GHS" },
    { label: "$", value: "DOLLARS" },
  ]

  const periods = [
    { label: "/month", value: "PER_MONTH" },
    { label: "/year", value: "PER_YEAR" },
  ]
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0])

  const [selectedPeriod, setSelectedPeriod] = useState(periods[0])

  const [selectedUnitOfMeasurement, setSelectedUnitOfMeasurement] = useState(
    unitsOfMeasurement[0]
  )

  const [selectedBillboardType, setSelectedBillboardType] = useState(
    billboardTypes[0]
  )

  const signUpSchema = object({
    title: string().min(1, { message: "Title must not be empty" }),
    width: number({
      coerce: true,
      invalid_type_error: "Invalid dimension value",
    }).gt(0, "Invalid dimension value"),
    height: number({
      coerce: true,
      invalid_type_error: "Invalid dimension value",
    }).gt(0, "Invalid dimension value"),
    description: string().optional(),
    amount: number({
      coerce: true,
      invalid_type_error: "Invalid price value",
    }).gt(0, "Invalid price value"),
  })

  const form = useZodForm({
    schema: signUpSchema,
    mode: "all",
  })

  const menu = (data: Array<any>, onClick: Function) => (
    <UIMenuList className="max-h-[500px] max-w-[100px] rounded-xl">
      {data.map((row: any) => (
        <UIMenuItem key={row.value} onClick={() => onClick(row)}>
          <UITypography className="text-tertiary-800">{row.label}</UITypography>
        </UIMenuItem>
      ))}
    </UIMenuList>
  )

  return (
    <main className="layout-wrapper">
      <UICard className="mx-auto my-5 max-w-3xl p-10 bg-white">
        <UITypography
          variant="h3"
          className="text-tertiary-800 text-center mb-3"
        >
          Add Billboard
        </UITypography>
        <UIForm form={form} className="flex flex-col gap-6 mt-8">
          <div>
            <label>Add images</label>
            <div className="pb-4 h-[262px] w-full flex flex-row gap-6 overflow-x-auto">
              {[].map((image, i) => (
                <div
                  key={i}
                  className="relative rounded-lg h-full w-full min-w-[256px] bg-cover overflow-hidden group"
                  style={{
                    backgroundImage: `url('${"https://images.unsplash.com/photo-1541951991883-a34a3024c94a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"}')`,
                  }}
                >
                  <UIIconButton className="!absolute rounded-full bg-slate-800/80 right-1 top-1 peer z-[1] hidden group-hover:block active:block">
                    <IoCloseSharp className="text-slate-100 text-lg" />
                  </UIIconButton>
                  <div className="absolute w-full h-full hover:bg-slate-800/10 peer-hover:bg-slate-800/10" />
                </div>
              ))}
              <UITooltip content="Click to add images">
                <label
                  htmlFor="dropzone-file"
                  className="overflow-hidden flex flex-col items-center justify-center gap-3 w-full h-full min-w-[256px] rounded-lg cursor-pointer bg-primary-100 hover:brightness-[0.98] active:brightness-90"
                >
                  <div className="bg-primary-200 rounded-full p-1">
                    <BiPlus className="text-primary-400 text-7xl" />
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    multiple
                    accept="image/*"
                  />
                </label>
              </UITooltip>
            </div>
          </div>
          <div>
            <label>Title</label>
            <UIInput error={hasError(form, "title")} />
            <UIFieldError name="title" />
          </div>
          <div>
            <label>Price</label>
            <div className="flex items-center gap-2">
              <div className="flex flex-col w-full">
                <div className="flex">
                  <UIDropdownButton
                    menu={menu(currencies, setSelectedCurrency)}
                    className="border border-r-0 border-blue-gray-200 rounded-r-none bg-slate-100 py-1 px-2"
                  >
                    <UITypography className="font-normal normal-case">
                      {selectedCurrency.label}
                    </UITypography>
                  </UIDropdownButton>
                  <UIInput
                    type="text"
                    placeholder="amount"
                    {...form.register("amount")}
                    error={hasError(form, "amount")}
                    className="rounded-l-none rounded-r-none"
                  />
                  <UIDropdownButton
                    menu={menu(periods, setSelectedPeriod)}
                    className="border border-l-0 border-blue-gray-200 rounded-l-none bg-slate-100 py-1 px-2"
                  >
                    <UITypography className="font-normal normal-case">
                      {selectedPeriod.label}
                    </UITypography>
                  </UIDropdownButton>
                </div>
                <div className="h-4">
                  <UIFieldError name="width" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <label>Type</label>
            <UISelect
              placeholder="Select billboard type"
              value={selectedBillboardType.value}
            >
              {billboardTypes.map((data) => (
                <UIOption
                  key={data.value}
                  value={data.value}
                  onClick={() => setSelectedBillboardType(data)}
                >
                  {data.label}
                </UIOption>
              ))}
            </UISelect>
          </div>
          <div>
            <label>Dimension</label>
            <div className="flex items-center gap-2">
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
                    menu={menu(
                      unitsOfMeasurement,
                      setSelectedUnitOfMeasurement
                    )}
                    className="border border-l-0 border-blue-gray-200 rounded-l-none bg-slate-100 py-1 px-2"
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
              <div className="h-8 w-8 -mt-4">
                <IoCloseSharp className="text-3xl text-slate-500" />
              </div>
              <div className="flex flex-col w-full">
                <div className="flex">
                  <UIInput
                    type="text"
                    placeholder="height"
                    {...form.register("height")}
                    error={hasError(form, "height")}
                    className="rounded-r-none"
                  />
                  <UIDropdownButton
                    menu={menu(
                      unitsOfMeasurement,
                      setSelectedUnitOfMeasurement
                    )}
                    className="border border-l-0 border-blue-gray-200 rounded-l-none bg-slate-100 py-1 px-2"
                  >
                    <UITypography className="font-normal normal-case">
                      {selectedUnitOfMeasurement.label}
                    </UITypography>
                  </UIDropdownButton>
                </div>
                <div className="h-4">
                  <UIFieldError name="height" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <label>Description</label>
            <UITextarea error={hasError(form, "description")} />
            <UIFieldError name="description" />
          </div>
          <UITooltip
            content="Click to add location"
            dismiss={{ enabled: true }}
          >
            <div>
              <label>Choose location</label>
              <div className="overflow-hidden flex flex-col items-center justify-center gap-3 w-full h-64 rounded-lg cursor-pointer bg-secondary-100 hover:brightness-[0.98] active:brightness-90">
                <div className="bg-secondary-200 rounded-full p-3">
                  <IoLocationSharp className="text-secondary-400 text-6xl" />
                </div>
              </div>
            </div>
          </UITooltip>
          <div className="flex gap-8">
            <UIButton variant="outlined" className="w-full">
              CANCEL
            </UIButton>
            <UIButton type="submit" className="w-full">
              SUBMIT
            </UIButton>
          </div>
        </UIForm>
      </UICard>
    </main>
  )
}

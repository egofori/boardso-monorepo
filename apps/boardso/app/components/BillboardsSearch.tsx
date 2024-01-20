"use client"

import { useEffect, useMemo, useState } from "react"
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
import { BsCaretDownFill } from "react-icons/bs"
import { twMerge } from "tailwind-merge"
import { object, number, string, literal } from "zod"
import { IoCloseSharp } from "react-icons/io5"
import { useSearchLocations } from "@/services/hooks"
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation"
import { billboardTypes, currencies, unitsOfMeasurement } from "@/utils/constants"
import Loader from "@/components/Loader"

export function BillboardsSearch({ params, setParams }: { params: any; setParams: Function }) {
  const { owner: username } = useParams()

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  // retrieve billboard type from the url query
  const getSelectedType = useMemo(
    () => billboardTypes.filter((type) => type.value === searchParams.get("type"))[0],
    [searchParams]
  )

  // retrieve billboard dimension unit from the url query
  const getSelectedUnitOfMeasurement = useMemo(() => {
    const dimensionUnit = billboardTypes.filter(
      (type) => type.value === searchParams.get("dimensionUnit")
    )[0]
    return dimensionUnit ?? unitsOfMeasurement[0]
  }, [searchParams])

  // retrieve billboard location from the url query
  const getLocation = useMemo(() => searchParams.get("location") ?? "", [searchParams])

  // retrieve the currency from the url query
  const getSelectedCurrency = useMemo(() => {
    const currency = currencies.filter((type) => type.value === searchParams.get("currency"))[0]
    return currency ?? currencies[0]
  }, [searchParams])

  const [selectedType, setSelectedType] = useState<any>(getSelectedType)
  const [locationSearch, setLocationSearch] = useState<string>(getLocation)
  const [moreOpen, setMoreOpen] = useState(false)
  const [locationMenuOpen, setLocationMenuOpen] = useState(false)
  const [selectedUnitOfMeasurement, setSelectedUnitOfMeasurement] = useState(
    getSelectedUnitOfMeasurement
  )
  const [selectedCurrency, setSelectedCurrency] = useState(getSelectedCurrency)

  // price range
  const [minPrice, setMinPrice] = useState<number>(100)
  const [maxPrice, setMaxPrice] = useState<number>(10000)

  const { data: locationsData, isLoading: locationsLoading } = useSearchLocations(locationSearch)

  const locations: string[] = locationsData ?? []

  useEffect(() => {
    setParams({ ...params, type: selectedType?.value })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedType])

  useEffect(() => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))

    for (let key in params) {
      if (params[key]) current.set(key, params[key])
      else current.delete(key)
    }

    const search = current.toString()
    const query = search ? `?${search}` : ""
    router.replace(`${pathname}${query}`)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  const searchSchema = object({
    search: string(),
    width: number({
      coerce: true,
      invalid_type_error: "Invalid dimension value",
    })
      .gt(0, "Invalid dimension value")
      .optional()
      .or(literal("")),
    height: number({
      coerce: true,
      invalid_type_error: "Invalid dimension value",
    })
      .gt(0, "Invalid dimension value")
      .optional()
      .or(literal("")),
  })

  const form = useZodForm({
    schema: searchSchema,
    mode: "all",
    defaultValues: {
      search: searchParams.get("search") || "",
    },
  })

  const onSubmit = (data: any) => {
    setParams({
      ...params,
      search: data.search,
      width: data.width !== "" ? data.width : undefined,
      height: data.height !== "" ? data.height : undefined,
      dimensionUnit: selectedUnitOfMeasurement.value,
      minPrice,
      maxPrice,
      currency: selectedCurrency.value,
    })
  }

  // dimension unit menu
  const dimensionUnitMenu = (data: Array<any>, onClick: Function) => (
    <UIMenuList className="max-h-[500px] max-w-[100px] rounded-xl">
      {data.map((row: any) => (
        <UIMenuItem key={row.value} onClick={() => onClick(row)}>
          <UITypography className="text-tertiary-800">{row.label}</UITypography>
        </UIMenuItem>
      ))}
    </UIMenuList>
  )

  const DimensionField = ({ name }: { name: "width" | "height" }) => (
    <div className="flex flex-col w-full">
      <div className="flex">
        <UIInput
          type="text"
          placeholder={name}
          {...form.register(name)}
          error={hasError(form, name)}
          className="rounded-r-none"
        />
        <UIDropdownButton
          menu={dimensionUnitMenu(unitsOfMeasurement, setSelectedUnitOfMeasurement)}
          className="border border-l-0 border-gray-200 rounded-l-none bg-slate-100 py-1 px-2"
        >
          <UITypography className="font-normal normal-case">
            {selectedUnitOfMeasurement.label}
          </UITypography>
        </UIDropdownButton>
      </div>
      <div className="h-4">
        <UIFieldError name={name} />
      </div>
    </div>
  )

  const currenciesMenu = (data: Array<any>, onClick: Function) => (
    <UIMenuList className="max-h-[500px] max-w-[100px] rounded-xl">
      {data.map((row: any) => (
        <UIMenuItem key={row.value} onClick={() => onClick(row)}>
          <UITypography className="text-tertiary-800">{row.label}</UITypography>
        </UIMenuItem>
      ))}
    </UIMenuList>
  )

  return (
    <UIForm form={form} onSubmit={onSubmit} className="flex flex-col justify-between gap-6">
      <div className="flex flex-col justify-between items-center gap-3 md:flex-row">
        <div className="relative w-full md:wg-[calc(100%-450px)]">
          <UIInput
            className="pl-10 bg-white"
            placeholder="Search billboards"
            {...form.register("search")}
            error={hasError(form, "search")}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <BiSearch size="22px" className="text-slate-400" />
          </div>
        </div>
        <div className="flex flex-row gap-3 flex-wrap sm:flex-nowrap w-full sm:w-max justify-center">
          <UIMenu
            open={locationMenuOpen}
            handler={setLocationMenuOpen}
            dismiss={{
              itemPress: false,
            }}
          >
            <UIMenuHandler>
              <UIButton
                color="white"
                size="sm"
                className="flex gap-1 items-center active:brightness-95 border border-gray-200 w-full sm:w-max sm:max-w-[232px]"
              >
                <UITypography className="normal-case  overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {params?.location && params?.location !== ""
                    ? params.location
                    : "Choose location"}
                </UITypography>
                <BsCaretDownFill
                  className={twMerge(
                    locationMenuOpen ? "rotate-180" : "rotate-0",
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
                type="text"
                name="location"
                value={locationSearch}
                onChange={(e: any) => {
                  const value = e.target.value
                  if (value === "") setParams({ ...params, location: "" })
                  setLocationSearch(value)
                }}
              />
              {locations.length > 0 ? (
                <div className="flex flex-row justify-center mb-2 w-full">
                  <UIDivider type="horizontal" className="w-[80%]" />
                </div>
              ) : (
                <></>
              )}
              {locationsLoading ? (
                <div className="flex flex-row items-center justify-center w-full">
                  <Loader size="20px" />
                </div>
              ) : (
                <div>
                  {locations.map((location) => (
                    <UIMenuItem
                      key={location}
                      onClick={() => {
                        setParams({ ...params, location })
                        setLocationSearch(location)
                        setLocationMenuOpen(false)
                      }}
                    >
                      {location}
                    </UIMenuItem>
                  ))}
                </div>
              )}
            </UIMenuList>
          </UIMenu>
          <UIDropdownButton
            className="border border-gray-200 w-full sm:w-max"
            size="sm"
            menu={
              <UIMenuList className="max-h-[500px] max-w-[100px] rounded-xl">
                <UIMenuItem
                  onClick={() => {
                    setSelectedType(undefined)
                  }}
                >
                  <UITypography className="text-tertiary-800">None</UITypography>
                </UIMenuItem>
                {billboardTypes.map((type) => (
                  <UIMenuItem
                    key={type.value}
                    onClick={() => {
                      setSelectedType(type)
                    }}
                  >
                    <UITypography className="text-tertiary-800">{type.label}</UITypography>
                  </UIMenuItem>
                ))}
              </UIMenuList>
            }
          >
            <UITypography className="normal-case">
              {selectedType ? selectedType.label : "Billboard type"}
            </UITypography>
          </UIDropdownButton>
          <UIButton size="md" type="submit" className="hidden sm:block">
            Search
          </UIButton>
        </div>
      </div>
      <div className="flex flex-row justify-end">
        <UIButton
          color="teal"
          variant="text"
          size="sm"
          className="flex gap-1 items-center active:brightness-95"
          onClick={() => setMoreOpen(!moreOpen)}
        >
          <UITypography className="normal-case">More filters</UITypography>
          <BsCaretDownFill
            className={twMerge(moreOpen ? "rotate-180" : "rotate-0", "flex-shrink-0 text-xs")}
          />
        </UIButton>
      </div>
      {moreOpen && (
        <div className={twMerge("flex gap-4 justify-between flex-col md:flex-row 2xl:flex-col")}>
          <div className="flex flex-col justify-start items-start gap-3 w-full">
            <div className="flex flex-row gap-1">
              <label>Price range</label>
              <UIDropdownButton
                menu={currenciesMenu(currencies, setSelectedCurrency)}
                className="px-2 py-0 hover:shadow-sm items-center"
                color="white"
              >
                <UITypography className="font-normal normal-case">
                  {selectedCurrency.label}
                </UITypography>
              </UIDropdownButton>
            </div>
            <div className="w-full">
              <UIRange
                className="max-wb-[500px]"
                min={100}
                max={10000}
                defaultValue={[100, 10000]}
                onChange={(value: number[]) => {
                  setMinPrice(value[0])
                  setMaxPrice(value[1])
                }}
              />
            </div>
            <div className="flex flex-row justify-between items-center w-full">
              <UITypography>100</UITypography>
              <div className="flex flex-row gap-2 bg-slate-700 text-white rounded-lg p-1">
                <UITypography>{minPrice}</UITypography> <UITypography>-</UITypography>{" "}
                <UITypography>{maxPrice}</UITypography>
              </div>
              <UITypography>10000</UITypography>
            </div>
          </div>
          <UIDivider type="vertical" className="hidden sm:block" />
          <div className="flex flex-col justify-start items-start gap-3 w-full">
            <label>Dimension</label>
            <div className="flex items-center gap-2">
              <DimensionField name="width" />
              <div className="h-8 w-8 -mt-4">
                <IoCloseSharp className="text-3xl text-slate-500" />
              </div>
              <DimensionField name="height" />
            </div>
          </div>
        </div>
      )}
      <UIButton size="md" type="submit" className="block sm:hidden">
        Search
      </UIButton>
    </UIForm>
  )
}

"use client"

import { UITypography, UIMenuItem, UIMenuList, UIDropdownButton } from "ui"
import { useGetCountries } from "@/services/useAPI"
import Image from "next/image"
import { useCallback, useState } from "react"

export default function CountryDropdown() {
  const { data: countries } = useGetCountries()
  const [selectedCountry, setSelectedCountry] = useState("GH")

  const countryData: any = useCallback(
    () => countries?.find((data: any) => data?.cca2 === selectedCountry),
    [countries, selectedCountry]
  )

  const menu = countries && (
    <UIMenuList className="max-h-[500px] max-w-[100px] rounded-xl">
      {countries.map((data: any) => (
        <UIMenuItem
          key={data.name.common}
          className="flex gap-2 items-baseline"
          onClick={() => setSelectedCountry(data.cca2)}
        >
          <Image src={data.flags.svg} alt={data.cca2} width={20} height={20} />
          <UITypography className="text-tertiary-800">
            {data?.name.common}
          </UITypography>
        </UIMenuItem>
      ))}
    </UIMenuList>
  )
  return (
    countries && (
      <UIDropdownButton
        menu={menu}
        className="flex gap-1 px-2 py-0 hover:shadow-sm items-center"
        color="white"
      >
        <Image
          src={countryData()?.flags?.svg}
          alt={countryData()?.cca2}
          width={20}
          height={20}
        />
        <UITypography className="font-bold text-tertiary-800">
          {" "}
          {countryData()?.cca2}
        </UITypography>
      </UIDropdownButton>
    )
  )
}

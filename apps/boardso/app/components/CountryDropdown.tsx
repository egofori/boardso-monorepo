"use client"

import { UITypography, UIMenuItem, UIMenuList, UIDropdownButton, UIButton } from "ui"
import Image from "next/image"
import { useCallback, useState } from "react"
import { useGetCountries, useGetCurrentCountry } from "@/services/hooks"
import { useMemo } from "react"

export default function CountryDropdown() {
  const { data, isLoading } = useGetCountries()
  const { data: currentCountry, isLoading: currentCountryLoading } = useGetCurrentCountry()

  const countries = useMemo(() => data ?? [], [data])

  const countryData: any = useCallback(
    () => countries?.find((data: any) => data?.cca2 === currentCountry?.country_code),
    [countries, currentCountry]
  )

  return countryData() ? (
    <div
      className="flex gap-1 px-2 py-0 items-center"
      color="white"
    >
      <Image src={countryData()?.flags?.svg} alt={countryData()?.cca2} width={20} height={20} />
      <UITypography className="font-bold text-tertiary-800"> {countryData()?.cca2}</UITypography>
    </div>
  ) : (
    <></>
  )
}

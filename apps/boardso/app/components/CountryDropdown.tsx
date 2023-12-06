"use client"

import { UITypography } from "ui"
import Image from "next/image"
import { useCallback } from "react"
import { useGetCountries, useGetCurrentCountry } from "@/services/hooks"
import { useMemo } from "react"

export default function CountryDropdown() {
  const { data: countries } = useGetCountries()
  const { data: currentCountry } = useGetCurrentCountry()

  // const countries = useMemo(() => data ?? [], [data])

  const countryData: any = useMemo(
    () => countries?.find((data: any) => data?.cca2 === currentCountry?.country_code),
    [countries, currentCountry]
  )

  return countryData ? (
    <div
      className="flex gap-1 items-center"
      color="white"
    >
      <Image src={countryData?.flags?.svg} alt={countryData?.cca2} width={15} height={15} />
      <UITypography className="font-bold text-tertiary-800 text-xs"> {countryData?.cca2}</UITypography>
    </div>
  ) : (
    <></>
  )
}

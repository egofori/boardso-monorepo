import useAPIGet from "@/lib/hooks/useAPIGet"
import useSWRInfinite from "swr/infinite"

export const useGetCountries = () => {
  const value = useAPIGet("https://restcountries.com/v3.1/all?fields=name,cca2,flags,currencies")
  return value
}

export const useGetCurrentCountry = () => {
  const value = useAPIGet("https://ipapi.co/json/")
  return value
}

export const useGetImages = (imageURLs: string[]) => {
  const fetcher = (data: any) =>
    fetch(data, { headers: { Origin: process.env["NEXT_PUBLIC_FRONTEND_BASE_URL"] } }).then((res) => res.blob())
  return useSWRInfinite((index: number) => imageURLs[index], fetcher, {
    initialSize: imageURLs.length,
    parallel: true,
  })
}
export * from "./auth"
export * from "./billboards"

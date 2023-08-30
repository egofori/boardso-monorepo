import useAPIGet from "@/lib/hooks/useAPIGet"

export const useGetCountries = () => {
  const value = useAPIGet("https://restcountries.com/v3.1/all?fields=name,cca2,flags")
  return value
}

export * from "./auth"
export * from "./billboard"

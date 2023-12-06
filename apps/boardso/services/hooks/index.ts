import useAPIGet from "@/lib/hooks/useAPIGet"
import { useEffect, useState } from "react"

export const useGetCountries = () => {
  const value = useAPIGet("https://restcountries.com/v3.1/all?fields=name,cca2,flags,currencies")
  return value
}

export const useGetCurrentCountry = () => {
  const value = useAPIGet("https://ipapi.co/json/")
  return value
}

export const useGetImages = (imageURLs: string[]) => {
  const [imagesData, setImagesData] = useState<any[]>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)

  const fetcher = async (data: any) => {
    let domain = new URL(data).hostname.replace("www.", "")

    if (domain === "storage.cloud.google.com") {
      return new Promise(async (resolve, reject) => {
        var xhr = new XMLHttpRequest()
        xhr.open("GET", data, true)
        xhr.responseType = "blob"
        xhr.onload = () => {
          if (xhr.readyState == XMLHttpRequest.DONE) {
            resolve(xhr.response)
          } else {
            reject()
          }
        }

        xhr.send()
      })
    } else {
      return await fetch(data).then((res) => res.blob())
    }
  }

  useEffect(() => {
    setIsLoading(true)
    Promise.all(imageURLs.map((url) => fetcher(url)))
      .then((res) => {
        setIsLoading(false)
        setImagesData(res)
        setError(null)
      })
      .catch((err) => {
        setIsLoading(false)
        setError(err)
      })
  }, [imageURLs])

  return { isLoading, data: imagesData, error }
}

export * from "./auth"
export * from "./billboards"

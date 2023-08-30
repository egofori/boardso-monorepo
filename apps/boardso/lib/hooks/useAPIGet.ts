import useSWR from "swr"
import apiClient from "../apiClient"
import { AxiosRequestConfig } from "axios";

type ParamsType = { url: string | null; config?: AxiosRequestConfig<any> } | string | null

const useAPIGet = (options: ParamsType) => {
  const fetcher = async (data: { url: string; config?: any } | string) => {
    if (data === null || typeof data === "string")
      return apiClient.get(data).then((res) => res.data)
    else return apiClient.get(data.url, data.config).then((res) => res.data)
  }
  const value = useSWR(options, fetcher)

  return value
}

export default useAPIGet

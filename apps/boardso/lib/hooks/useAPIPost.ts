import { useState } from "react"
import apiClient from "../apiClient"

const useAPIPost = (url: string) => {
  const [data, setData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)

  const trigger = (
    options?: { data?: any; config?: any } | null,
    onSuccess?: Function,
    onFailure?: Function
  ) => {
    setIsLoading(true)
    setData(null)
    setError(null)

    apiClient
      .post(url, options?.data, options?.config)
      .then((response) => {
        setData(response)
        setIsLoading(false)
        onSuccess && onSuccess(response)
      })
      .catch((error) => {
        setError(error)
        setIsLoading(false)
        onFailure && onFailure(error)
      })
  }

  return { data, isLoading, error, trigger }
}

export default useAPIPost

import { useState } from "react"
import apiClient from "../apiClient"

const useAPIDelete = (url: string) => {
  const [data, setData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)

  const trigger = (
    config?: any,
    onSuccess?: Function,
    onFailure?: Function
  ) => {
    setIsLoading(true)
    setData(null)
    setError(null)

    apiClient
      .delete(url, config)
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

export default useAPIDelete

import useAPIPost from "@/lib/hooks/useAPIPost"
import { removeStorageItem, setStorageItem } from "@/lib/storage"
import { useState } from "react"
import uniqueString from "unique-string"

export const useRegister = () => {
  const { trigger: registerTrigger, ...rest } = useAPIPost("/auth/local/sign-up")

  const trigger: any = async (data: any, onSuccess?: Function, onFailure?: Function) => {
    registerTrigger(
      {
        data: { username: uniqueString(), ...data },
        config: {
          headers: {
            Authorization: "",
          },
        },
      },
      (response: any) => {
        setStorageItem("accessToken", response.data.token)
        setStorageItem("userInfo", response.data.user)
        setStorageItem("isLoggedIn", true)
        onSuccess && onSuccess(response)
      },
      onFailure
    )
  }

  return { trigger, ...rest }
}

export const useSignIn = () => {
  const { trigger, ...rest } = useAPIPost("/auth/local/sign-in")

  const signInTrigger: any = async (data: any, onSuccess?: Function, onFailure?: Function) => {
    trigger(
      {
        data,
        config: {
          headers: {
            Authorization: "",
          },
        },
      },
      (response: any) => {
        setStorageItem("accessToken", response.data.token)
        setStorageItem("userInfo", response.data.user)
        setStorageItem("isLoggedIn", true)
        onSuccess && onSuccess(response)
      },
      onFailure
    )
  }

  return { trigger: signInTrigger, ...rest }
}

export const useLogOut = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const trigger = (onSuccess?: Function) => {
    setIsLoading(true)
    // reset local storage
    removeStorageItem("accessToken")
    removeStorageItem("userInfo")
    removeStorageItem("isLoggedIn")
    setIsLoading(false)

    if(onSuccess) onSuccess()
  }

  return { isLoading, trigger }
}

export const useChangePassword = () => useAPIPost("auth/change-password")

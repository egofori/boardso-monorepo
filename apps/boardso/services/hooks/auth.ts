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
      onSuccess,
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
    removeStorageItem("isLoggedIn")
    setIsLoading(false)

    if (onSuccess) onSuccess()
  }

  return { isLoading, trigger }
}

export const useChangePassword = () => useAPIPost("auth/change-password")

export const useRegisterSocial = () => {
  const { trigger: registerTrigger, ...rest } = useAPIPost("/auth/social/sign-up")

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
        if (response.data) {
          setStorageItem("accessToken", response.data.token)
          setStorageItem("isLoggedIn", true)
        }
        onSuccess && onSuccess(response)
      },
      onFailure
    )
  }

  return { trigger, ...rest }
}

export const useSignInSocial = () => {
  const { trigger, ...rest } = useAPIPost("/auth/social/sign-in")

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
        setStorageItem("isLoggedIn", true)
        onSuccess && onSuccess(response)
      },
      onFailure
    )
  }

  return { trigger: signInTrigger, ...rest }
}

export const useResetPassword = () => {
  const { trigger, ...rest } = useAPIPost("/auth/reset-password")

  const resetPasswordTrigger: any = async (data: any, onSuccess?: Function, onFailure?: Function) => {
    trigger(
      {
        data,
        config: {
          headers: {
            Authorization: "",
          },
        },
      },
      onSuccess,
      onFailure
    )
  }

  return { trigger: resetPasswordTrigger, ...rest }
}

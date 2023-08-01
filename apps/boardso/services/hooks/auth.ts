import useAPIGet from "@/lib/hooks/useAPIGet"
import useAPIPost from "@/lib/hooks/useAPIPost"
import { useState } from "react"
import uniqueString from "unique-string"

export const useGetCountries = () => {
  const value = useAPIGet("https://restcountries.com/v3.1/all?fields=name,cca2,flags")
  return value
}

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
        localStorage.setItem("accessToken", JSON.stringify(response.data.token))
        localStorage.setItem("userInfo", JSON.stringify(response.data.user))
        localStorage.setItem("isLoggedIn", "true")
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
        localStorage.setItem("accessToken", JSON.stringify(response.data.token))
        localStorage.setItem("userInfo", JSON.stringify(response.data.user))
        localStorage.setItem("isLoggedIn", "true")
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
    localStorage.removeItem("accessToken")
    localStorage.removeItem("userInfo")
    localStorage.setItem("isLoggedIn", "false")
    setIsLoading(false)

    if(onSuccess) onSuccess()
  }

  return { isLoading, trigger }
}

import useAPIGet from "@/lib/hooks/useAPIGet"
import useAPIPatch from "@/lib/hooks/useAPIPatch"
import useAPIPost from "@/lib/hooks/useAPIPost"
import { getStorageItem, setStorageItem } from "@/lib/storage"

export const useGetUser = (username: string) => useAPIGet({ url: `/users/${username}` })

export const useGetUserProfile = () => useAPIGet({ url: "/users" })

export const useUpdateUser = () => {
  const { trigger, ...rest } = useAPIPatch("/users")

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
        const userInfo = getStorageItem("userInfo") || {}
        setStorageItem("userInfo", {
          ...userInfo,
          username: response.data.username,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
        })
        onSuccess && onSuccess(response)
      },
      onFailure
    )
  }
  return { trigger: signInTrigger, ...rest }
}

export const useGetContacts = () => useAPIGet("/contacts")

export const useAddContacts = () => useAPIPost("/contacts")

export const useEditContacts = (id: number | undefined) => useAPIPatch(`/contacts/${id}`)

export const useUpdateProfilePicture = () => useAPIPatch(`/users/profile-image`)

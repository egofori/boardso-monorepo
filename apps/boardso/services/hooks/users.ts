import useAPIDelete from "@/lib/hooks/useAPIDelete"
import useAPIGet from "@/lib/hooks/useAPIGet"
import useAPIPatch from "@/lib/hooks/useAPIPatch"
import useAPIPost from "@/lib/hooks/useAPIPost"
import { useLogOut } from "./auth"
import { useValue } from "@/lib/hooks/useValue"
import { getStorageItem } from "@/lib/storage"

export const useGetUser = (username: string) => useAPIGet({ url: `/users/${username}` })

export const useGetUserProfile = () => {
  const isLoggedIn = useValue(getStorageItem("isLoggedIn"))

  return useAPIGet(isLoggedIn ? "/users" : null)
}

export const useUpdateUser = () =>  useAPIPatch("/users")

export const useGetContacts = () => useAPIGet("/contacts")

export const useAddContacts = () => useAPIPost("/contacts")

export const useEditContact = (id: number | undefined) => useAPIPatch(`/contacts/${id}`)

export const useDeleteContact = () => {
  const { trigger: deleteContactTrigger, ...rest } = useAPIDelete()

  const trigger = (id: number | undefined, onSuccess: any, onFailure: any) => {
    deleteContactTrigger({ url: `/contacts/${id}`}, onSuccess, onFailure)
  }

  return { trigger, ...rest}
}

export const useUpdateProfilePicture = () => useAPIPatch("/profile-images")

export const useRemoveProfilePicture = () => useAPIDelete("/profile-images")

export const useDeleteUser = () => {
  const { trigger, isLoading, ...rest } = useAPIDelete("users")
  const { trigger: deleteLogOut, isLoading: deleteLoading } = useLogOut()

  const deleteUser: any = (config: any, onSuccess?: Function, onFailure?: Function) =>
    trigger(
      config,
      (response: any) => {
        deleteLogOut()
        if (onSuccess) onSuccess(response)
      },
      onFailure
    )

  return { trigger: deleteUser, isLoading: isLoading || deleteLoading, ...rest }
}

export const useGetUserStatus = () => {
  const isLoggedIn = useValue(getStorageItem("isLoggedIn"))

  return useAPIGet(isLoggedIn ? "/users/status" : null)
}

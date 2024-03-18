import { useGetUserStatus } from "@/services/hooks/users"
import { UserStatus } from "@/types/User"
import { AxiosError } from "axios"

export const useDisableAddBillboard = () => {
  const { data, isLoading, error }: { data: UserStatus; error: AxiosError; isLoading: boolean } =
    useGetUserStatus()

  if (isLoading || error) {
    return false
  } else if (data) {
    return data.billboardCount >= data.maxFreeListings && !data.isSubscriptionActive
  }
}

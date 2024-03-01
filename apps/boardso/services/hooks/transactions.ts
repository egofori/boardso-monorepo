import useAPIGet from "@/lib/hooks/useAPIGet";
import useAPIPost from "@/lib/hooks/useAPIPost";

export const useGetTransactions = () => useAPIGet("/transactions")

export const useInitializeTransaction = () => useAPIPost("/transactions/initialize-transaction-with-plan")

export const useVerifyTransaction = (reference: string | null) => useAPIGet(reference && `/transactions/verify-transaction/${reference}`)

export const useGetPlans = () => useAPIGet("/plans")

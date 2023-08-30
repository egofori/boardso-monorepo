import useAPIPost from "@/lib/hooks/useAPIPost"

export const useAddBillboard = () => useAPIPost("/billboards/add")

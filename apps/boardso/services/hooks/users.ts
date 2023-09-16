import useAPIGet from "@/lib/hooks/useAPIGet";

export const useGetUser = (username: string) => useAPIGet({ url: `/users/${username}` })

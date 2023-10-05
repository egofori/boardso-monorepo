import useAPIDelete from "@/lib/hooks/useAPIDelete"
import useAPIGet from "@/lib/hooks/useAPIGet"
import useAPIPost from "@/lib/hooks/useAPIPost"

export const useAddBillboard = () => useAPIPost("/billboards/add")

export const useSearchBillboards = (params?: any) =>
  useAPIGet({
    url: "/billboards",
    config: {
      params,
    },
  })

export const useSearchLocations = (search: string | null) =>
  useAPIGet({
    url: "/billboard-locations/search",
    config: {
      params: { search },
    },
  })

export const useGetBillboard = (slug: string) => useAPIGet({ url: `/billboards/${slug}` })

export const useGetBookmarks = (params?: any) =>
  useAPIGet({
    url: "/bookmarks",
    config: {
      params,
    },
  })

export const useSaveBillboard = (billboardId: number | undefined | null) =>
  useAPIPost(`/bookmarks/${billboardId}`)

export const useRemoveBookmark = (billboardId: number | undefined | null) =>
  useAPIDelete(`/bookmarks/${billboardId}`)

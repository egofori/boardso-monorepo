import useAPIDelete from "@/lib/hooks/useAPIDelete"
import useAPIGet from "@/lib/hooks/useAPIGet"
import useAPIPost from "@/lib/hooks/useAPIPost"
import useAPIPatch from "@/lib/hooks/useAPIPatch"

export const useAddBillboard = () => useAPIPost("/billboards/add")

export const useEditBillboard = (id: number | null | undefined) => useAPIPatch(`/billboards/${id}`)

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

export const useGetBillboard = (params: { slug?: string; uid?: string }) => {
  const { slug, uid } = params

  return useAPIGet(slug || uid ? { url: `/billboards/billboard`, config: { params } } : null)
}

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

export const useGetPopularPlaces = () =>
  useAPIGet({
    url: "/billboard-locations/popular-places",
  })

export const useLocationBillboards = (location: string | null) =>
  useAPIGet({
    url: "/billboard-locations/billboards",
    config: {
      params: { location },
    },
  })

export const useDeleteBillboard = (billboardId: number | undefined | null) =>
  useAPIDelete(`/billboards/${billboardId}`)

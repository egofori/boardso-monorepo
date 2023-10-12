export * from "./Modal"
export * from "./Billboard"

export interface Pagination {
  results: any[]
  previous: { offset: number; limit: number } | null
  next: { offset: number; limit: number } | null
  count: number
}

export interface LocationCoordinates {
  lat: number
  lng: number
}

import { Billboard } from "@/types/Billboard"
import { MetadataRoute } from "next"

// Google's limit is 50,000 URLs per sitemap
const maxURLs = 50000

export async function generateSitemaps() {
  const baseURL = process.env["NEXT_PUBLIC_API_BASE_URL"]

  const billboardsResponse = await fetch(
    `${baseURL}/billboards?${new URLSearchParams({ limit: "1" }).toString()}`
  ).then((res) => res.json())

  const count = billboardsResponse?.count || 0

  const idCount = Math.ceil(count / maxURLs)

  let ids = []

  for (let index = 0; index < idCount; index++) {
    ids.push({ id: index })
  }

  // Fetch the total number of billboards and calculate the number of sitemaps needed
  return ids
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const baseURL = process.env["NEXT_PUBLIC_API_BASE_URL"]
  const frontendBaseURL = process.env["NEXT_PUBLIC_FRONTEND_BASE_URL"]
  const params = {
    offset: id * maxURLs,
    limit: maxURLs,
  } as any

  const billboardsResponse = await fetch(
    `${baseURL}/billboards?${new URLSearchParams(params).toString()}`
  ).then((res) => res.json())

  const billboards: Billboard[] = billboardsResponse?.results || []

  return billboards.map((billboard) => ({
    url: `${frontendBaseURL}/billboards/${billboard.slug}`,
    lastModified: billboard.updateAt,
  }))
}

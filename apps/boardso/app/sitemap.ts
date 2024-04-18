import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseURL = process.env["NEXT_PUBLIC_API_BASE_URL"]

  return [
    {
      url: baseURL,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseURL}/login`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseURL}/signup`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseURL}/billboards`,
      lastModified: new Date().toISOString(),
    },
  ]
}

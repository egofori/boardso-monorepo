import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://boardso.com",
    },
    {
      url: "https://boardso.com/login",
    },
    {
      url: "https://boardso.com/signup",
    },
    {
      url: "https://boardso.com/billboards",
    },
  ]
}

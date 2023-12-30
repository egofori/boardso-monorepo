import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/action/",
        "/email-confirmation/",
        "/forgot-password/",
        "/new-password/",
        "/add-billboard/",
        "/edit-billboard/",
        "/profile/",
      ],
    },
    sitemap: "https://acme.com/sitemap.xml",
  }
}

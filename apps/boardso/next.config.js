/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ["ui"],
    images: { domains: ["images.unsplash.com", "storage.googleapis.com"] },
    rewrites: async () => {
        return [
          {
            source: '/privacy-policy',
            destination: '/privacy-policy.html',
          },
          {
            source: "/terms-of-service",
            destination: "/terms-of-service.html"
          }
        ]
    },
}

module.exports = nextConfig

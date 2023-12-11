/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ["ui"],
    images: { domains: ["images.unsplash.com", "storage.googleapis.com"]}
}

module.exports = nextConfig

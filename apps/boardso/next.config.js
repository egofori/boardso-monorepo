/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ["ui"],
    images: { domains: ["images.unsplash.com"]}
}

module.exports = nextConfig

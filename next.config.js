/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['fantsy-net.web.app', 'firebasestorage.googleapis.com'],
  }
}

module.exports = nextConfig

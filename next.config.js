/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['@stripe/firestore-stripe-payments']); 
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['fantsy-net.web.app', 'firebasestorage.googleapis.com'],
  }
}

const nextTM = withTM()


module.exports = nextConfig


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
        backend: 'http://127.0.0.1:8000/',
      }
}

module.exports = nextConfig

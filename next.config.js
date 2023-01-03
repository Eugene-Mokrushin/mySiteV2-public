/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['i.ibb.co', 'my-site-eugene-mk.s3.eu-central-1.amazonaws.com'],
  }
}

module.exports = nextConfig

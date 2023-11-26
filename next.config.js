/** @type {import('next').NextConfig} */

require('dotenv').config()

const nextConfig = {
  env: {
    API_BASE: 'http://localhost:3000',
    DB_LOCAL_URI: process.env.DB_LOCAL_URI,
    DB_URI: process.env.DB_URI,
    // Next-Auth
    NEXTAUTH_URL: 'http://localhost:3000',
    NEXTAUTH_SECRET: 'FDRESCEWNFIEFJDAIFJEQOFN', // random
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
}

module.exports = nextConfig

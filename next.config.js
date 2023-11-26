/** @type {import('next').NextConfig} */

require('dotenv').config()

const nextConfig = {
  env: {
    API_BASE: 'http://localhost:3000',
    DB_LOCAL_URI: process.env.DB_LOCAL_URI,
    DB_URI: process.env.DB_URI,
    // Next-Auth
    NEXTAUTH_URL: 'http://localhost:3000',
    NEXTAUTH_SECRET: 'qr85fBm4upvKE8vYr5igf3a4rYM0MmiEbYRkI8bWbgE=', // openssl rand -base64 32
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */

require('dotenv').config()

const nextConfig = {
  env: {
    DB_LOCAL_URI: process.env.DB_LOCAL_URI,
    DB_URI: process.env.DB_URI,
  },
}

module.exports = nextConfig

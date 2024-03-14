/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    API_URL_WS: process.env.API_URL_WS,
  },
};

export default nextConfig;

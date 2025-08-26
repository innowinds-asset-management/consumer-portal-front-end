/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // disable server rendering
  reactStrictMode: false,
  images: { unoptimized: true } 
};

module.exports = nextConfig;

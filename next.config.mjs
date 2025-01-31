/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // base
  basePath: '/morocco',
  assetPrefix: '/morocco/',
};

export default nextConfig;

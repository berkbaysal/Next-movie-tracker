/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;

module.exports = {
  images: {
    domains: ['www.themoviedb.org', 'image.tmdb.org', 'img.youtube.com', 'i.ytimg.com'],
  },
};

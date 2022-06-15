/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  images: {
    domains: [
      "b.thumbs.redditmedia.com",
      "a.thumbs.redditmedia.com",
    ],
  },
  nextConfig,
};

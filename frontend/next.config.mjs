/** @type {import('next').NextConfig} */

const nextConfig = {
  // experimental: {
  //   // appDocumentPreloading: true,

  // },

  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
      },
      {
        hostname: "ui-avatars.com",
      },
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "unsplash.com",
      },
      {
        hostname: "openweathermap.org",
      },
    ],
  },
};

export default nextConfig;

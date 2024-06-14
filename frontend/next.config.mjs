/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";
const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  cacheStartUrl: true,
  dynamicStartUrl: true,

  reloadOnOnline: true,
  swcMinify: true,
  disable: false,
  workboxOptions: {
    disableDevLogs: true,
  },
});
const nextConfig = {
  // experimental: {
  //   // appDocumentPreloading: true,

  // },
  output: "export",
  //dont optimize images
  reactStrictMode: false,
  images: {
    unoptimized: true,
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
        hostname: "source.unsplash.com",
      },
      {
        hostname: "openweathermap.org",
      },
      {
        hostname: "randomuser.me",
      },
    ],
  },
};

export default withPWA(nextConfig);

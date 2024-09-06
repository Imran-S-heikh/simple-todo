import pwa from "@ducanh2912/next-pwa";
import { svgHandler } from "./loaders.mjs";

const withPWA = pwa({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    svgHandler(config);
    return config;
  },
};

export default withPWA(nextConfig);

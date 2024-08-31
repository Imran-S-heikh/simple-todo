import pwa from "next-pwa";

const withPWA = pwa({
  dest: "public",
  disable: false,
});

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withPWA(nextConfig);

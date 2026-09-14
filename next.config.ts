import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "web-ikvpd32y6hh5.up-de-fra1-k8s-1.apps.run-on-seenode.com",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;

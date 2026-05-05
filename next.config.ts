import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/v0/b/banani-prod.appspot.com/o/**",
      },
    ],
  },
  allowedDevOrigins: ["http://127.0.0.1:3000", "http://localhost:3000"]
};

export default nextConfig;

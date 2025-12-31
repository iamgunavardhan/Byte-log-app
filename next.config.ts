import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    cacheComponents: false,
    images:{
        remotePatterns:[
            {
                hostname:"images.pexels.com",
                protocol:"https",
                port:"",
            },
            {
                hostname:"artful-gerbil-141.convex.cloud",
                protocol:"https",
                port:""
            }
        ],
    },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@maquina/shared", "@maquina/database"],
  serverExternalPackages: ["postgres"],
};

export default nextConfig;

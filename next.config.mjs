/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
      },
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // hostname: "saasecomerce.s3.ap-south-1.amazonaws.com",
        hostname: "trosoft.s3.ap-southeast-2.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;

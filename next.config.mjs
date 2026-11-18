/** @type {import('next').NextConfig} */
const nextConfig = {
  // iOS and many crawlers request these fixed paths without reading the
  // <link rel="apple-touch-icon"> tag; serve the generated app/apple-icon.js.
  async rewrites() {
    return [
      { source: "/apple-touch-icon.png", destination: "/apple-icon" },
      { source: "/apple-touch-icon-precomposed.png", destination: "/apple-icon" },
    ];
  },
};

export default nextConfig;

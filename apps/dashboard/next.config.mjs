/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/figma/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*', // TODO: Perhaps set figma origin instead?
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type',
          },
        ],
      },
    ];
  },
};

export default nextConfig;

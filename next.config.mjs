/** @type {import('next').NextConfig} */
const nextConfig = {

    async redirects(){
      return [
        {
          source:"/sign-in",
          destination: "/api/auth/login",
          permanent: true,
        },
        {
          source:"/sign-up",
          destination: "/api/auth/register",
          permanent: true,
        }
      ]
    },
    images: {
        domains: ['utfs.io'], // Add the domain of your image URLs here
      },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    env: {
        NEXT_PUBLIC_API_URL:"http://localhost:3000/api",
        NEXT_PUBLIC_AUTH_API_URL:"http://localhost:3000/api/auth",
        NEXT_PUBLIC_JOKE_API_URL:"http://localhost:3000/api/jokes",
        // vaiables for mock user
        NEXT_PUBLIC_MOCK_USER_EMAIL:"admin@gmail.com",
        NEXT_PUBLIC_MOCK_USER_PASSWORD:"qweqwe",
    },
};

export default nextConfig;

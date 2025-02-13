import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "replicate.delivery"
            },
            {
                protocol: "https",
                hostname: "moohnyrevdbteuszlpyi.supabase.co"
            }
            ,
            {
                protocol: "https",
                hostname: "qwkccrpysbnsdqfweqki.supabase.co"
            }
        ]
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                path: false,
                util: false
            };
        }
        return config;
    },
};

export default withNextIntl(nextConfig);

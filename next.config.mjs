import Nextra from "nextra";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const withNextra = Nextra({
  theme: "./theme/theme.tsx",
  themeConfig: "./theme/theme.config.tsx",
  readingTime: true,
});

export default withNextra(nextConfig);

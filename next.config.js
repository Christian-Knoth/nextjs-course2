/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.wetterauer-zeitung.de', 'www.gruppenunterkuenfte.de']
  },
};

module.exports = nextConfig;

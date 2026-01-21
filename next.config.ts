/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "https://i.pinimg.com/736x/8e/c9/35/8ec935aa2b69f6b4f1a2ee49a151bb1e.jpg",
      },
      {
        protocol: "https",
        hostname: "https://i.pinimg.com/736x/8e/c9/35/8ec935aa2b69f6b4f1a2ee49a151bb1e.jpg",
      },
      {
        protocol: "https",
        hostname: "https://i.pinimg.com/736x/8e/c9/35/8ec935aa2b69f6b4f1a2ee49a151bb1e.jpg",
      },
      {
        protocol: "https",
        hostname: "sweetshop-app\public\sweets\rasagulla.jpg",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      }
    ],
  },
};

module.exports = nextConfig;

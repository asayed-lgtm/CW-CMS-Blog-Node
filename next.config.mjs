/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export is optional — Cloudways runs a real Node server, so we
  // use standard SSG (getStaticParams/generateStaticParams) with `next start`
  // rather than `output: 'export'`. This keeps the option open to add
  // dynamic/CMS-driven routes later without switching modes.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.ctfassets.net" }, // Contentful images, if you swap in the real CMS
      { protocol: "https", hostname: "picsum.photos" }
    ]
  }
};

export default nextConfig;

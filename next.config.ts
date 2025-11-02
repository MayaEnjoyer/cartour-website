/** @type {import('next').NextConfig} */
const isGhPages = process.env.NEXT_PUBLIC_GH_PAGES === 'true';
const repo = 'cartour-website';

const basePath = isGhPages ? `/${repo}` : undefined;
const assetPrefix = isGhPages ? `/${repo}/` : undefined;

module.exports = {
    // Force fully-static output for GitHub Pages:
    output: 'export',
    images: { unoptimized: true }, // required for next/image in static export
    trailingSlash: true,           // safest on GH Pages (folders with index.html)
    basePath,
    assetPrefix,
    reactStrictMode: true,
};

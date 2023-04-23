const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: false,
});

const nextConfig = {
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  reactStrictMode: true,
  output: "export",
};

module.exports = withBundleAnalyzer(nextConfig);

// module.exports = {
//   reactStrictMode: true,
//   images: {
//     unoptimized: true,
//   },
// };

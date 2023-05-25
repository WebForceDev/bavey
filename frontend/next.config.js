/** @type {import('next').NextConfig} */
const path = require('path');



// This function get webpack aliases from json file
function getWebpackAliasesFromPaths(configPaths) {
  const alias = Object.entries(configPaths).reduce(
    (webpackAliases, [configAlias, configPathList]) => {
      const [aliasKey] = configAlias.split("/");
      const [relativePathToDir] = configPathList[0].split("/*");
      return {
        ...webpackAliases,
        [aliasKey]: path.resolve(__dirname, relativePathToDir),
      };
    },
    {}
  );
  return alias;
}

const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [process.env['IMAGE_SERVER'], 'localhost'],
    loader: 'custom'
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    config.resolve.alias['@shared'] = path.join(__dirname, '@shared');
    config.resolve.alias['@entities'] = path.join(__dirname, '@entities');
    config.resolve.alias['@features'] = path.join(__dirname, '@features');
    config.resolve.alias['@widgets'] = path.join(__dirname, '@widgets');
    config.resolve.alias['@page'] = path.join(__dirname, '@page');
    config.resolve.alias['@public'] = path.join(__dirname, '@public');

    return config;
  }
};

module.exports = nextConfig;

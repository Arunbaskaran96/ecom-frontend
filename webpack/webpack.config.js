const commonConfig = require("./webpack.common");
const { merge } = require("webpack-merge");
module.exports = (envVar) => {
  const { env } = envVar;
  const currentConfig = require(`./webpack.${env}.js`);
  const mergedConfig = merge(commonConfig, currentConfig);
  return mergedConfig;
};

const { merge } = require("webpack-merge");
const webpack = require("webpack");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const path = require("path");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "sof",
    projectName: "crm",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    externals: [],
    plugins: [
      new webpack.DefinePlugin({
        ENV: JSON.stringify("non-prod"),
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src/"),
      },
    },
  });
};

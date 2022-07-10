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
    externals: ["react", "react-dom", "@mui/material"],
    plugins: [
      new webpack.DefinePlugin({
        ENV: JSON.stringify("prod"),
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src/"),
      },
    },
  });
};

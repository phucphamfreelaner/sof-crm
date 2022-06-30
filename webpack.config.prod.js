const { merge } = require("webpack-merge");
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
    externals: [
      "react",
      "react-dom",
      "react-router-dom",
      "react-router",
      "@mui/material",
      "@sof/mui",
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src/"),
      },
    },
  });
};

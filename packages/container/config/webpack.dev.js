const { merge } = require("webpack-merge");
const webpack = require("webpack");

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  devtool: "source-map",

  output: {
    publicPath: "http://localhost:8080/",
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  devServer: {
    port: 8080,
    historyApiFallback: true,
    open: true,
    hot: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: "marketing@http://localhost:8081/remoteEntry.js",
      },
      shared: packageJson.dependencies,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

module.exports = merge(commonConfig, devConfig);

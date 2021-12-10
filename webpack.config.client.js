const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const LoadablePlugin = require('@loadable/webpack-plugin')
module.exports = {
  name: "client",
  entry: {
    client: path.resolve(__dirname, "client/client.tsx"),
  },
  mode: "production",
  output: {
    path: path.resolve(__dirname + "/dist/static"),
    filename: "[name].[contenthash].js",
    publicPath: "",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            "presets": [
                "@babel/typescript",
                "@babel/react"
            ],
            "plugins": [
              "@babel/proposal-class-properties",
              "@babel/proposal-object-rest-spread",
              "@loadable/babel-plugin"
            ]
          }
        }
      },
    ],
  },
  target: "web",
  plugins: [new CleanWebpackPlugin(), new WebpackManifestPlugin(), new LoadablePlugin()],
};

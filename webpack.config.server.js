const nodeExternals = require("webpack-node-externals");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
// const LoadablePlugin = require('@loadable/webpack-plugin')
module.exports = {
  name: "server",
  entry: {
    server: path.resolve(__dirname, "server", "server.tsx"),
  },
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: [".ts", ".tsx"],
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
  target: "node",
  node: {
    __dirname: false,
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ context: "server", from: "views", to: "views" }],
    }),
    // new LoadablePlugin()
  ],
};

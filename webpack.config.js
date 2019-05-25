const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve("build"),
    publicPath: "/",
    filename: "./js/bundle.js",
  },
  devServer: {
    open: true,
    port: 3003,
    historyApiFallback: true,
  },
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {},
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve("./public/index.html"),
    }),
    new CopyPlugin([{ from: "./public/favicon.ico" }, { from: "./public/layout.jpg" }, { from: "./public/manifest.json" }]),
  ],
};

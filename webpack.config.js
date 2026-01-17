const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "src/js/index.js"),
  output: {
    filename: "js/bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "",
  },
  devServer: {
    static: path.resolve(__dirname, "dist"),
    port: 8080,
    open: true,
    hot: true,
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },

      {
        test: /\.scss$/i,
        use: [
          {
          loader: MiniCssExtractPlugin.loader,
          options: { publicPath: "../"},
          },
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },

      {
        test: /\.(woff2?|ttf|eot|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "font/[name][ext]",
        },
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "css/main.css",
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "src/image", to: "image" }],
    }),
  ],
};

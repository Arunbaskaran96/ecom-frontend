const path = require("path");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "..", "./src/index.jsx"),
  resolve: {
    extensions: [".jsx", ".js"],
  },
  devServer: {
    hot: true,
  },

  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(?:jpg|png|svg|gif)$/,
        type: "asset/resource",
      },
    ],
  },
};

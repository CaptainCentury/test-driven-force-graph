var path = require("path");

module.exports = {
  mode: "development",
  entry: {
    "force-graph": "./src/components/force-graph.js",
    example: "./src/index.js",
  },
  output: {
    path: path.join(__dirname, "dist", "assets"),
    chunkFilename: "[id].js",
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }],
  },
  devtool: "source-map",
};

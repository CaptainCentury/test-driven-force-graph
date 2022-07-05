var path = require("path");

module.exports = {
  entry: {
    "force-graph": "./src/components/force-graph.tsx",
    example: "./src/index.tsx",
  },
  output: {
    path: path.join(__dirname, "dist", "assets"),
    chunkFilename: "[id].js",
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devtool: "inline-source-map",
};

"use strict";

module.exports = {
  transform: {
    "\\.jsx?$": "babel-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)"],
  setupFiles: ["./src/tests/setup-tests.js"],
  setupFilesAfterEnv: ["./src/tests/setup-framework.js"],
  // transform: {
  //   "^.+\\.jsx$": "babel-jest",
  //   "^.+\\.js$": "babel-jest",
  // },
  //   moduleNameMapper: {
  //     d3: "./node_modules/d3/dist/d3.min.js",
  //   },
};

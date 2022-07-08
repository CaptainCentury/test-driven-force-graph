"use strict";

module.exports = {
  transform: {
    "\\.js$": "babel-jest",
    "\\.jsx$": "babel-jest",
    "\\.ts$": "babel-jest",
    "\\.tsx$": "babel-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)"],
  setupFiles: ["./src/tests/setup-tests.js"],
  setupFilesAfterEnv: ["./src/tests/setup-framework.js"],
  moduleNameMapper: {
    "two-lines-data": "../tests/__mocks__/two-lines-data.ts",
  },
  //   moduleNameMapper: {
  //     d3: "./node_modules/d3/dist/d3.min.js",
  //   },
};

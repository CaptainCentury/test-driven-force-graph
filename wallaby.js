module.exports = function (wallaby) {
  return {
    testFramwork: "jest",

    env: {
      type: "node",
    },

    tests: ["./src/tests/**/*.test.js"],

    files: ["**/*.js", "!node_modules/**/*", "!**/*/*.tests.js", "!**/.*"],

    compilers: {
      "**/*.js": wallaby.compilers.babel(),
    },
  };
};

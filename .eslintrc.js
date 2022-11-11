module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:storybook/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  ignorePatterns: ["dist/", "docs", "**/*.tsv", "**/webpack.config.js"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  env: {
    browser: true,
    node: true,
  },
};

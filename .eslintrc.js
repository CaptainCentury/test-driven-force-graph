module.exports = {
  extends: ["eslint:recommended", "plugin:react/recommended"],
  ignorePatterns: ["dist/", "**/*.tsv"],
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

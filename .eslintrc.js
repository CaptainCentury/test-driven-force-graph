module.exports = {
  extends: ["eslint:recommended", "plugin:react/recommended"],
  ignorePatterns: ["dist/"],
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

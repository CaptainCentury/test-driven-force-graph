module.exports = {
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaVersion: 8,
    sourceType: "module",
  },
  env: {
    browser: true,
    node: true,
  },
};

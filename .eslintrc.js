const path = require("path");

module.exports = {
  extends: [
    "airbnb",
    "prettier",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: [
    "react",
    "prettier",
  ],
  globals: {
    graphql: true,
    browser: true,
    window: true,
    document: true,
  },
  settings: {
    "import/resolver": {
      webpack: {
        config: {
          resolve: {
            modules: [
              path.resolve(__dirname, "./src"),
              path.resolve(__dirname, "./node_modules"),
            ],
          },
        },
      },
    },
  },
  rules: {
    "prettier/prettier": "error",
    "import/no-extraneous-dependencies": "off",
    "react/jsx-filename-extension": "off",
    "react/jsx-one-expression-per-line": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "react/prop-types": "off",
    "import/prefer-default-export": "off",
  },
};

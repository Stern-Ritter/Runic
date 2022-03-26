module.exports = {
  root: true,
  env: {
    "react-native/react-native": true,
  },
  extends: [
    "airbnb-base",
    "plugin:jest/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react", "react-native"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: "./tsconfig.json",
  },
  rules: {
    "max-len": [
      "error",
      {
        ignoreComments: true,
        code: 100,
      },
    ],
    "import/prefer-default-export": "off",
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "import/no-extraneous-dependencies": "off",
    "class-methods-use-this": "off",
    "default-param-last": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "no-underscore-dangle": [
      "error",
      { allow: ["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] },
    ],
    "lines-between-class-members": [
      "error",
      "always",
      { exceptAfterSingleLine: true },
    ],
    "no-await-in-loop": "off",
    "no-restricted-syntax": [
      "error",
      "ForInStatement",
      "LabeledStatement",
      "WithStatement",
    ],
    "no-param-reassign": ["error", { props: false }],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};

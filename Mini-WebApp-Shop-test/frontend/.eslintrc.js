module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "plugin:prettier/recommended",
    "plugin:tailwindcss/recommended",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": "off",
    "no-debugger": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "vue/no-unused-components": "off",
    "vue/multi-word-component-names": "off",
    "vue/no-unused-vars": "off",
    "vue/valid-template-root": "off",
    "vue/require-v-for-key": "off",
    "vue/valid-v-for": "off",
    "vue/no-parsing-error": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "prettier/prettier": "off",
  },

  plugins: [
    "tailwindcss",
    // "@typescript-eslint",
    "prettier",
  ],
  ignorePatterns: ["node_modules"],
};

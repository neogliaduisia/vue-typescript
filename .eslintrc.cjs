/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '^_',
      },
    ],
    curly: ['error', 'all'],
    'require-await': 'error',
    'vue/no-v-html': 'off',
    'vue/valid-define-props': 'error',
    'vue/valid-define-emits': 'error',
    'vue/no-export-in-script-setup': 'error',
    'vue/script-setup-uses-vars': 'warn',
    'vue/valid-v-memo': 'error',
  },
};

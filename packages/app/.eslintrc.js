module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  extends: ['airbnb', 'airbnb/hooks', 'plugin:@typescript-eslint/recommended', 'prettier'],
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'no-console': 'off',
    'no-shadow': 'off',
    'no-use-before-define': 'off',

    '@typescript-eslint/explicit-module-boundary-types': 'off',

    // TODO: fix import plugin rules
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
  },
  overrides: [
    {
      files: ['**/__tests__/*.ts', '**/*.spec.ts'],
      env: {
        jest: true,
      },
    },
  ],
};

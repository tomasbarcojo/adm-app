module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname
  },
  plugins: [
    'react',
    'prettier',
    'jsx-a11y',
    'react-hooks',
    '@typescript-eslint'
  ],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-floating-promises': 'off'
  }
};

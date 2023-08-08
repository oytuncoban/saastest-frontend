module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 0,
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto',
      },
    ],
    'no-console': 0,
    'import/extensions': 0,
    'import/no-extraneous-dependencies': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'react/jsx-curly-brace-presence': 0,
    'import/no-named-as-default': 'warn',
    '@typescript-eslint/no-explicit-any': 0,
    'react/jsx-props-no-spreading': 0,
  },
  ignorePatterns: [
    '.eslintrc.cjs',
    'vite.config.ts',
    'tailwind.config.cjs',
    'postcss.config.cjs',
  ],
};

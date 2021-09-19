module.exports = {
  extends: ['react-app', 'plugin:prettier/recommended', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'warn',
    'max-params': ['warn', 2],
    'padding-line-between-statements': [
      'warn',
      { blankLine: 'always', prev: '*', next: 'if' },
      { blankLine: 'always', prev: '*', next: 'return' },
    ],
    'max-len': ['warn', { code: 120, ignorePattern: 'import*' }],
    'no-case-declarations': 'off',
  },
  ignorePatterns: ['node_modules', 'build', '*.svg', '*.html', '*.json'],
};

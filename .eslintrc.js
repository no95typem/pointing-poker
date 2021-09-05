module.exports = {
  extends: ['react-app', 'plugin:prettier/recommended', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'warn',
    'max-params': ['warn', 2],
  },
  ignorePatterns: ['node_modules', 'build'],
};

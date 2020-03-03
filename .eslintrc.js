module.exports = {
  env: {
    browser: true,
    amd: true,
    node: true,
    'jest/globals': true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/typescript'],
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    quotes: ['error', 'single', 'avoid-escape'],
    eqeqeq: ['error', 'always']
  },
  plugins: ['jest']
}

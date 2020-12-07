module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 9,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    es6: true
  },
  globals: {

  },
  plugins: [
    'vue'
  ],
  extends: [
    'standard',
    'plugin:vue/essential'
  ],
  rules: {
    semi: [
      'error',
      'always'
    ],
    'space-before-function-paren': 0,
    'prefer-const': 0,
    eqeqeq: 0
  }
};

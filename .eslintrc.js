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
    es6: true,
    node: true
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
    eqeqeq: 0,
    'vue/comment-directive': 0,
    'dot-notation': 0,
    'prefer-promise-reject-errors': 0
  }
};

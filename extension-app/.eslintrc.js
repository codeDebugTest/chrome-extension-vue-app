// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'vue', 'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // fix unused var error for JSX custom tags
    'vue/jsx-uses-vars': 2,
    'no-throw-literal': 0,

    'semi': ['error', 'always'],
    'indent': ['error', 4, {SwitchCase: 1}],
    'space-before-function-paren': ['error', {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
    }],
    'brace-style': ['error', 'stroustrup'],
    'operator-linebreak': ['error', 'before'],
    'eol-last': 'error',
    'no-new': 0,
    'no-else-return': 0,
    'padded-blocks': 0,
    'no-fallthrough': 'off',
    'default-case': 'error'
  }
}

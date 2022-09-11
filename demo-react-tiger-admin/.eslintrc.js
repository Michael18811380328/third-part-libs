module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:all',
    'react-app', //  react帮配置好了一些语法，譬如箭头函数
    'airbnb',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/no-extraneous-dependencies': 0,
    'import/extensions': 'off',
    'import/no-unresolved': 0,
    'default-param-last': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', 'tsx'] }], // 关闭airbnb对于jsx必须写在jsx文件中的设置
    'react/prop-types': 'off', // 关闭airbnb对于必须添加prop-types的校验
    'react/destructuring-assignment': [
      1,
      'always',
      {
        ignoreClassFields: false,
      },
    ],
    'react/jsx-one-expression-per-line': 'off', // 关闭要求一个表达式必须换行的要求，和Prettier冲突了
    'react/jsx-wrap-multilines': 0, // 关闭要求jsx属性中写jsx必须要加括号，和Prettier冲突了
    'react/jsx-first-prop-new-line': [1, 'multiline-multiprop'],
    'react/prefer-stateless-function': [0, { ignorePureComponents: true }],
    'jsx-a11y/no-static-element-interactions': 'off', // 关闭非交互元素加事件必须加 role
    'jsx-a11y/click-events-have-key-events': 'off', // 关闭click事件要求有对应键盘事件
    'no-bitwise': 'off', // 不让用位操作符，不知道为啥，先关掉
    'react/jsx-indent': [2, 2],
    'react/jsx-no-undef': [2, { allowGlobals: true }],
    'jsx-control-statements/jsx-use-if-tag': 0,
    'react/no-array-index-key': 0,
    'react/jsx-props-no-spreading': 0,
    'no-var': 'error',
    semi: ['error', 'never'],
    quotes: [2, 'single'],
    eqeqeq: [
      'warn',
      'always',
      {
        null: 'ignore',
      },
    ],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'import/prefer-default-export': 'off',
    'object-curly-newline': 0,
    'max-len': ['error', { code: 280 }],
    'linebreak-style': ['off', 'windows'],
    'no-alert': 'off',
    'no-console': 'off',
    'no-debugger': 'off',
    'no-unused-expressions': 'off',
    'arrow-body-style': [0, 'never'],
    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/label-has-for': 0,
    'react/require-default-props': 0,
    'react/default-props-match-prop-types': 0,
    'jsx-a11y/alt-text': 0,
    camelcase: 0,
    'react-hooks/exhaustive-deps': 'off',
    'global-require': 0,
    'import/no-dynamic-require': 0,
    'no-param-reassign': 0,
    'sort-imports': 'off',
    'import/order': 'off',
    'no-plusplus': [0, { allowForLoopAfterthoughts: true }], // 允许单目运算符
    '@typescript-eslint/no-unused-vars': ['error'],
    'react/function-component-definition': 'off',
    'react/no-unstable-nested-components': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'react/jsx-no-bind': 'off',
    'no-unsafe-optional-chaining': 'off',
    'react/jsx-no-constructed-context-values': 'off',
    'class-methods-use-this': 0,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: [
        '@typescript-eslint',
        // 'plugin:@typescript-eslint/recommended'
      ],
    },
  ],
}

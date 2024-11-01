module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-css-modules',
    'stylelint-config-rational-order',
    'stylelint-config-prettier',
  ],
  plugins: ['stylelint-declaration-block-no-ignored-properties'],
  rules: {
    // 不加非标准的前缀，如-webkit-box，关闭
    'value-no-vendor-prefix': null,
    // 禁止低优先级的选择器出现在高优先级的选择器之后，关闭
    'no-descending-specificity': null,
    // url函数必须带上引号, http://stylelint.cn/user-guide/rules/function-url-quotes/
    'function-url-quotes': 'always',
    // 属性值必须带上引号 http://stylelint.cn/user-guide/rules/selector-attribute-quotes/
    'selector-attribute-quotes': 'always',
    // font或font-family不允许缺少通用字体，关闭
    'font-family-no-missing-generic-family-keyword': null, // iconfont
    // 不允许存在两个冲突的属性
    'plugin/declaration-block-no-ignored-properties': true,
    // 不允许有未知的单位，过滤一下小程序的rpx
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
    // 指定关键字采用小写，http://stylelint.cn/user-guide/rules/value-keyword-case/
    'value-keyword-case': ['lower', { ignoreProperties: ['composes'] }],
    // class选择器必须采用 kebab-case 格式命名 https://github.com/stylelint/stylelint-config-standard/blob/480566337e15e4cd722bf63b5551ebdf55b1ba92/index.js#L129-L134
    'selector-class-pattern': [
      '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
      {
        severity: 'warning',
        message: 'Expected class selector to be kebab-case',
      },
    ],
    // id选择器必须采用 kebab-case 格式命名
    'selector-id-pattern': [
      '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
      {
        severity: 'warning',
        message: 'Expected id selector to be kebab-case',
      },
    ],
    // keyframes关键帧必须采用 kebab-case 格式命名
    'keyframes-name-pattern': [
      '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
      {
        severity: 'warning',
        message: 'Expected keyframe name to be kebab-case',
      },
    ],
    // rgba(0,0,0,10%)会变成rgb(0 0 0 / 10%)，造成less编译问题
    'color-function-notation': 'legacy',
  },
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'],
  overrides: [
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss',
    },
    {
      files: ['**/*.less'],
      customSyntax: 'postcss-less',
    },
  ],
};

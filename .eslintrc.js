const path = require('path');

const parserOptions = {
  ecmaFeatures: {
    jsx: true,
  },
  babelOptions: {
    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-transform-class-properties', { loose: true }],
    ],
  },
  requireConfigFile: false,
};

const airbnb = {
  rules: {
    // 不允许对函数参数重新赋值
    'no-param-reassign': 'warn',
    // 不同分支的语句，应该都有return
    'consistent-return': 'warn',
    // promise的 reject 最好是Error
    'prefer-promise-reject-errors': 'off',
    // 不允许空的块，但允许空的cache
    'no-empty': ['error', { allowEmptyCatch: true }],
    // 优先使用default export
    'import/prefer-default-export': 'off',
    // import允许不带后缀
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        mjs: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    // 不允许使用continue
    'no-continue': 'warn',
    // 不允许使用for-in、for-of语法
    'no-restricted-syntax': [
      'warn',
      {
        message:
          'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
        selector: 'ForInStatement',
      },
      {
        message:
          'iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.',
        selector: 'ForOfStatement',
      },
      {
        message:
          'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
        selector: 'LabeledStatement',
      },
      {
        message:
          '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
        selector: 'WithStatement',
      },
    ],
    // 不允许无效的表达式
    'no-unused-expressions': [
      'warn',
      {
        allowShortCircuit: true, // 允许 callback && callback() 这种表达式
        allowTaggedTemplates: false,
        allowTernary: true, // 允许 a ? b() : c() 这种表达式
        enforceForJSX: false,
      },
    ],
    // 不允许下划线
    'no-underscore-dangle': 'off',
  },
};

const react = {
  rules: {
    // 函数组件必须使用函数声明来定义
    'react/function-component-definition': 'off',
    // 无状态组件推荐用函数
    'react/prefer-stateless-function': 'warn',
    // 非必填属性需要默认值
    // 函数组件一般用函数的默认参数，但是这个规则识别不智能，用forwardRef包一层就不识别，所以干脆忽略
    'react/require-default-props': 'off',
    // 不允许index作为key
    'react/no-array-index-key': 'warn',
    // 组件props需定义
    'react/prop-types': 'warn',
    // 不允许object、array、any的 props 类型
    'react/forbid-prop-types': 'off',
    // button必须有 type 属性
    'react/button-has-type': 'off',
    // props必须用解构取值
    'react/destructuring-assignment': 'off',
    // 不允许在组件里新建组件，会一直重新渲染
    'react/no-unstable-nested-components': ['warn', { allowAsProps: true }],
    // 一个表达式换一行
    'react/jsx-one-expression-per-line': 'off',
    // 不允许...props
    'react/jsx-props-no-spreading': 'off',
    // jsx必须写在.jsx文件中
    'react/jsx-filename-extension': 'off',
    // jsx必须引用React
    'react/react-in-jsx-scope': 'off',
    // jsx标记React已使用，避免no-unused-vars报错，一般与上一条规则同时关闭，但为了兼容这里新老jsx运行时，这里保持打开
    'react/jsx-uses-react': 'error',

    // img标签必须有alt属性
    'jsx-a11y/alt-text': 'warn',
    // label标签必须有 for 属性
    'jsx-a11y/label-has-for': 'off',
    // 点击事件必须绑定keydown、keyUp或 keyPress事件，方便不能用鼠标的人
    'jsx-a11y/click-events-have-key-events': 'off',
    // 不允许静态标签交互
    'jsx-a11y/no-static-element-interactions': 'off',
    // a标签 href 属性不能带 hash
    'jsx-a11y/href-no-hash': 'off',
    // label标签必须有相应的 control
    'jsx-a11y/label-has-associated-control': 'off',
    // 鼠标事件必须有对应的键盘事件
    'jsx-a11y/mouse-events-have-key-events': 'off',
  },
};

const typescript = {
  rules: {
    // 不允许@ts-ignore等注释
    '@typescript-eslint/ban-ts-comment': [
      'warn',
      {
        'ts-ignore': 'allow-with-description',
      },
    ],
    // 命名规范
    '@typescript-eslint/naming-convention': [
      'warn',
      // Allow camelCase variables (23.2), PascalCase variables (23.8), and UPPER_CASE variables (23.10)
      {
        selector: 'variable',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow', // 允许前置下划线
      },
      // Allow camelCase functions (23.2), and PascalCase functions (23.8)
      {
        selector: 'function',
        format: ['camelCase', 'PascalCase'],
      },
      // Airbnb recommends PascalCase for classes (23.3), and although Airbnb does not make TypeScript recommendations, we are assuming this rule would similarly apply to anything "type like", including interfaces, type aliases, and enums
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
    ],
    '@typescript-eslint/no-unused-expressions': [
      'warn',
      {
        allowShortCircuit: true, // 允许 callback && callback() 这种表达式
        allowTaggedTemplates: false,
        allowTernary: true, // 允许 a ? b() : c() 这种表达式
        enforceForJSX: false,
      },
    ],
  },
};

module.exports = {
  parserOptions,
  // 指定解析器，支持非ts项目的校验
  parser: '@babel/eslint-parser',
  extends: [
    'airbnb', // eslint eslint-plugin-react eslint-plugin-react-a11y eslint-plugin-import 的规则集合, 设置了最佳实践
    'plugin:react-hooks/recommended', // eslint-plugin-react-hooks 规则
    'plugin:jest/recommended', // eslint-plugin-jest， jest测试框架支持
    'prettier', // eslint-config-prettier 风格采用prettier的配置
  ],
  // 指定环境，这样可以使用环境的全局变量
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
    jest: true,
    jasmine: true,
  },
  plugins: ['@babel', 'jest', 'react-hooks'],
  settings: {
    'import/extensions': ['.ts', '.tsx', '.js', '.jsx', '.d.ts'],
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: [
          path.join(process.cwd(), './tsconfig.json'),
          path.join(process.cwd(), './jsconfig.json'),
          path.join(process.cwd(), './packages/**/tsconfig.json'),
        ],
      },
    },
  },
  rules: {
    ...airbnb.rules,
    ...react.rules,
    ...typescript.rules,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        // 需要tsconfig.json的路径，可覆盖
        project: ['./tsconfig.json'],
      },
      extends: [
        'airbnb', // eslint eslint-plugin-react eslint-plugin-react-a11y eslint-plugin-import 的规则集合, 设置了最佳实践
        'airbnb-typescript', // 增加了typescript支持
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript',
        'plugin:react-hooks/recommended', // eslint-plugin-react-hooks 规则
        'plugin:jest/recommended', // eslint-plugin-jest， jest测试框架支持
        'prettier', // eslint-config-prettier 风格采用prettier的配置
      ],
      rules: {
        ...airbnb.rules,
        ...react.rules,
        ...typescript.rules,
      },
    },
  ],
};

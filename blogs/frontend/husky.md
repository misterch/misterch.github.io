---
title: git工作流规范（husky+lint-staged）
date: 2023-08-08
tags:
 - git
 - husky
 - eslint
 - 自动化
---
## eslint配置

* eslint
* @babel/eslint-parser：是一个babel parser解析器，lint所有有效的babel代码
* @typescript-eslint/parser：是typescript parser解析器
* @typescript-eslint/eslint-plugin：是typescript插件，包含ts代码检查规则
* vue-eslint-parser：是一个 `.vue`文件解析器，对vue文件中 `<template>`进行lint
* eslint-plugin-vue：lint所有vue语法的规则的插件
* eslint-plugin-import：供对ES6+ import/export语法的支持
* eslint-plugin-node：添加对node的eslint支持
* eslint-plugin-prettier：格式化js，html，css，json等语言

配置typescript、vue、jsx的语法检测，prettier作为格式化代码规则

### 配置.eslintrc.*

```js
// @see https://eslint.bootcss.com/docs/rules/

module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
        jest: true,
    },
    /* 使用vue-eslint-parser对vue文件中template 进行lint*/
    parser: 'vue-eslint-parser',
    /** 优先级低于 parser 的语法解析配置 */
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        parser: '@typescript-eslint/parser',
        jsxPragma: 'React',
        ecmaFeatures: {
            jsx: true,
        },
    },
    /* 继承已有的规则 */
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-essential',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    plugins: ['vue', '@typescript-eslint'],
    /*
     * "off" 或 0    ==>  关闭规则
     * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
     * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
     */
    rules: {
        // eslint（https://eslint.bootcss.com/docs/rules/）
        'no-var': 'error', // 要求使用 let 或 const 而不是 var
        'no-multiple-empty-lines': ['warn', { max: 1 }], // 不允许多个空行
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-unexpected-multiline': 'error', // 禁止空余的多行
        'no-useless-escape': 'off', // 禁止不必要的转义字符

        // typeScript (https://typescript-eslint.io/rules)
        '@typescript-eslint/no-unused-vars': 'error', // 禁止定义未使用的变量
        '@typescript-eslint/prefer-ts-expect-error': 'error', // 禁止使用 @ts-ignore
        '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-namespace': 'off', // 禁止使用自定义 TypeScript 模块和命名空间。
        '@typescript-eslint/semi': 'off',

        // eslint-plugin-vue (https://eslint.vuejs.org/rules/)
        'vue/multi-word-component-names': 'off', // 要求组件名称始终为 “-” 链接的单词
        'vue/script-setup-uses-vars': 'error', // 防止<script setup>使用的变量<template>被标记为未使用
        'vue/no-mutating-props': 'off', // 不允许组件 prop的改变
        'vue/attribute-hyphenation': 'off', // 对模板中的自定义组件强制执行属性命名样式
    },
}
```

:::tip

Q：parser和parserOptions.parser指定解析器的区别

A：`parser`默认解析器是 `espree`，这里指定 `vue-eslint-parser`作为**主要解析器** ，它将处理 `.vue`文件，尤其是 `<template>`标签

这个解析器的自定义选项（parserOptions）指定使用 `@typescript-eslint/parser`解析器对 `.vue`文件中的 `<script>`标记进行 lint

:::

parserOptions.parser可以指定为一个对象

```json
"parser": "vue-eslint-parser",
"parserOptions": {
  "parser":{
     // Script parser for `<script>`
    "js":"espree",
    // Script parser for `<script lang="ts">`
    "ts":"@typescript-eslint/parser",
    //解析模板中的vue语法（指令，mustache）
    "<template>": "espree",
  }
}
```

### 配置package.json

```json
{
  "script":{
    "lint": "eslint src",
    "fix": "eslint src --fix",
  }
}
```

执行命令后就能对指定目录下的代码进行语法检测或者修复

## prettier配置

需要安装一下两个插件

* eslint-plugin-prettier：将prettier配置成一个eslint插件，让其当做一个linter规则来运行
* eslint-config-prettier：包含了eslint规则，用于关闭eslint有关代码格式化的配置

### 配置 `.eslintrc.*`

```json
{
  extends: [
    "plugin:prettier/recommended"
  ]
}
```

```json
{
  "singleQuote": true,
  "semi": false,
  "bracketSpacing": true,
  "htmlWhitespaceSensitivity": "ignore",
  "endOfLine": "auto",
  "trailingComma": "all",
  "tabWidth": 2
}

```

### 配置package.json

```json
{
  "script":{
    "format": "prettier --write \"./**/*.{html,vue,ts,js,json,md}\"",
  }
}
```

执行该命令后，就会把所有符合要求的代码进行格式化

## stylelint配置

安装相关插件

```bash
pnpm add sass sass-loader postcss postcss-scss postcss-html stylelint-config-prettier stylelint-config-recess-order stylelint-scss stylelint-config-recommended-scss stylelint-config-standard-scss stylelint-config-standard stylelint-config-standard-vue stylelint-order -D
```

```

```

* stylelint
* stylelint-config-standard：stylelint拓展插件，最基本的检查规则
* stylelint-config-prettier：配饰stylelint和prettier兼容
* stylelint-config-recess-order：配置stylelint css属性书写顺序
* stylelint-order
* 检查scss语法
  `postcss-scss`：检查指定文件的样式，如 `.scss`，`.vue`，`.html`，`.css`
  `stylelint-scss`、`stylelint-config-recommended-scss`
* 检查.vue文件的样式书写：
  需要安装postcss-html，配置应用到.vue文件
  安装 `stylelint-config-standard-vue`
  只是对.vue文件的样式生效，仍需结合 `stylelint-config-html`使用，包中有 `stylelint-config-html/vue`检查.vue文件的template
  与scss一起使用，包中含有scss的规则 `stylelint-config-standard-vue/scss`

### 配置 .stylelintrc.*

```js
// @see https://stylelint.bootcss.com/

module.exports = {
    extends: [
        'stylelint-config-standard', // 配置stylelint拓展插件
        'stylelint-config-html/vue', // 配置 vue 中 template 样式格式化
        'stylelint-config-standard-scss', // 配置stylelint scss插件
        'stylelint-config-recommended-vue/scss', // 配置 vue 中 scss 样式格式化
        'stylelint-config-recess-order', // 配置stylelint css属性书写顺序插件,
        'stylelint-config-prettier', // 配置stylelint和prettier兼容
    ],
    overrides: [
        {
            files: ['**/*.(scss|css|vue|html)'],
            customSyntax: 'postcss-scss',
        },
        {
            files: ['**/*.(html|vue)'],
            customSyntax: 'postcss-html',
        },
    ],
    ignoreFiles: [
        '**/*.js',
        '**/*.jsx',
        '**/*.tsx',
        '**/*.ts',
        '**/*.json',
        '**/*.md',
        '**/*.yaml',
    ],
    /**
     * null  => 关闭该规则
     * always => 必须
     */
    rules: {
        'value-keyword-case': null, // 在 css 中使用 v-bind，不报错
        'no-descending-specificity': null, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
        'function-url-quotes': 'always', // 要求或禁止 URL 的引号 "always(必须加上引号)"|"never(没有引号)"
        'no-empty-source': null, // 关闭禁止空源码
        'selector-class-pattern': null, // 关闭强制选择器类名的格式
        'property-no-unknown': null, // 禁止未知的属性(true 为不允许)
        'block-opening-brace-space-before': 'always', //大括号之前必须有一个空格或不能有空白符
        'value-no-vendor-prefix': null, // 关闭 属性值前缀 --webkit-box
        'property-no-vendor-prefix': null, // 关闭 属性前缀 -webkit-mask
        'selector-pseudo-class-no-unknown': [
            // 不允许未知的选择器
            true,
            {
                ignorePseudoClasses: ['global', 'v-deep', 'deep'], // 忽略属性，修改element默认样式的时候能使用到
            },
        ],
    },
}
```

## commitlint配置

```bash
pnpm add @commitlint/config-conventional @commitlint/cli -D
```

* @commitlint/cli
* @commitlint/config-conventional

### 配置commitlint.config.cjs

```js
module.exports = {
    extends: ['@commitlint/config-conventional'],
    // 校验规则
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'feat',
                'fix',
                'docs',
                'style',
                'refactor',
                'perf',
                'test',
                'chore',
                'revert',
                'build',
            ],
        ],
        'type-case': [0],
        'type-empty': [0],
        'scope-empty': [0],
        'scope-case': [0],
        'subject-full-stop': [0, 'never'],
        'subject-case': [0, 'never'],
        'header-max-length': [0, 'always', 72],
    },
}
```

### 配置package.json

```json
{
  "script":{
     "commitlint": "commitlint --config commitlint.config.cjs -e -V",
  }
}
```

配置后，配合husky在提交commit填写commit信息的时候，就需要使用配置中的规则，否则无法正常提交

### commitizen

使用commitizen工具可以帮助我们编写符合规范的commit信息

安装 `pnpm add commitizen -D`

使用`commitizen`安装`cz-conventional-changelog`，并且初始化`cz-conventional-changelog`

```bash
pnpx commitizen init cz-conventional-changelog --pnpm --save-dev --save-exact
```

完成后，package.json中有相关commitizen的配置信息

```json
{
  "script":{
    //自己配置commit
    "commit": "cz"
  },
  "config":{
    "commitizen":{
      "path":"./node_module/cz-conventional-changelog"
    }
  }
}
```

## 配置husky

虽然在项目中已经集成好了代码检查工具并配置好了，但是需要每次手动去执行命令才会格式化代码，很麻烦

而且如果没有格式化就提交到远程仓库中，那么这个规范也就没有用了

需要强制让开发者按照代码规范来提交代码，就可以使用husky

> husky是在代码提交之前触发git hook来完成提交前的事情，如代码格式化

安装husky `pnpm add husky -D`

初始化husky `npx husky-init`，会在根目录下生成一个**.husky**目录，在这个目录下会有一个**pre-commit**文件，这个文件里面的命令在我们执行commit的时候就会执行

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm run format
```

这里的意思是在commit前先执行 `pnpm run format`，格式化后才提交代码到远程仓库

### commitlint检查提交commit信息是否符合规范

新建一个 `commit-msg`钩子文件

` npx husky add .husky/commit-msg`

在填写完commit信息时执行 `commit-msg`钩子检测书写的commit是否符合规则

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm run commitlint
```

## 参考链接

[尚硅谷Vue项目实战硅谷甄选，vue3项目+TypeScript前端项目一套通关](https://www.bilibili.com/video/BV1Xh411V7b5)

[vue-eslint-parser: 用于 .vue文件的ESLint自定义解析器。 - 我爱学习网 (5axxw.com)](https://www.5axxw.com/wiki/content/pu4u1a)
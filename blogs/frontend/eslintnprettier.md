---
title: 在前端项目中配置ESLint和Prettier规范代码，并配置vscode自动修复
date: 2023-08-08
categories:
 - 代码规范
tags:
 - eslint
 - prettier
 - vscode
 - 插件
---
## ESLint

### ESLint作用

`ESLint`用来检查代码质量和风格的工具，检查代码中不符合规则的地方，部分问题支持自动修复

- 代码检查检查代码中存在的错误，如**未声明变量**、**声明但未使用变量**、**修改const变量**
- 代码格式化
  统一代码风格，如不加分号、字符串使用单引号、使用tab或者空格等

### ESLint中的核心概念

#### env

根据不同环境，eslint判断某些全局成员是否可用，避免在代码中使用不存在的成员

| 环境    | 说明                                                         |
| ------- | ------------------------------------------------------------ |
| browser | 浏览器环境中的全局变量                                       |
| node    | 全局变量和node.js作用域                                      |
| es6     | 开启除了modules以外的所有ecmascript6特性，会自动设置ecmaVersion解析器选项为6 |



#### parser

将代码转换为 eslint 能理解的 AST 语法树。

parser是解析器，其功能对应编译原理中的词法分析、语法分析。

#### parserOptions解析器配置

##### ecmaVersion

影响的只是语法**检测**，不代表一些语法是否可用，需要根据**env**来定义

##### sourceType

可选项有`script`和`module`，当设置`module`时，`ecmaVersion`不能低于2015版本

#### plugins

eslint本身有些规则，但无法包含所有规则，因此eslint支持自定义规则，针对某种语法自定义的那些规则称之为eslint插件

:bangbang:  注意`plugins`提供了检查和修复能力，但只是加载了插件，引入了额外自定义的 `rules`，但并没有将这些规则应用上，需要配置 `extends`或者 `rules`才能够应用规则

一般插件命名为：`eslint-plugin-xxx`

在配置插件时，一般会省略eslint-plugin，如 `eslint-plugin-vue`，配置时只需写vue就可

#### rules

可以单独设置某些规则

如果需要使用某些eslint插件中的规则，可以先在`plugins`中配置插件，然后在`rules`中使用插件中的规则

例如安装`eslint-plugin-react`，配置`plugin:['react']`，再配置`'rules':{'react/jsx-uses-react': 2}`

#### extends

extends可以看成是一个配置方案的最佳实践，里面是别人配置好了的eslint规则配置，通过extends来继承别人的配置

如果规则冲突，位置靠后的覆盖前面的

一般命名为： `eslint-config-`开头

配置 `extends`时，可以省略 `eslint-config-`

如果是插件中的config，则写成 `plugin:plugin-name/config-name`

例如`eslint-plugin-react`这是eslint插件，里面有导出预设config，无需再`plugins`中引入插件，直接在`extends`中使用该插件的config，这样配置`plugin:react/recommended`

#### overrides

若要对某些文件进行更细致的定制化，则在 `overrides`字段中进行配置

```js
{
  // ...
  overrides: [
    {
      files: ["*.js","*.spec.js"],
      excludeFiles: ['*.test.js']
      rules: {
        "no-unused-expressions": "off"
      }
    }
  ]
}
```

#### root

设置配置文件的目录

设置为false或没有配置时，会一直寻找 `.eslintrc.*`和 `package.json`，直到文件系统的根目录

为true时，则停止在父级目录中寻找

### 项目中配置 .eslintrc.js

#### 检测vue的插件

检测vue的语法校验需要安装这些插件 `eslint-plugin-vue`

#### 检测Typescript的插件

检测Typescript语法需要安装 `@typescript-eslint`

#### 检测所有babel code

需要使用 `@babel/eslint-parser`

`pnpm add -D eslint-plugin-vue eslint-plugin-import eslint-plugin-node @babel/eslint-parser`

#### 具体配置

使用：在 `plugins`中引入插件的规则，在 `extends`中使用插件的规则使其生效，`rules`中可对插件的规则进行自定义配置

```js
module.export = {
  // 继承的规则，用来检测代码质量和格式化代码
  extends:[
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: 'vue-eslint-parser',
  // 比parser优先级低
  parserOptions:{
    ecmaVersion:'latest',
    sourceType: 'module',
    parser:'@typescript-eslint/parser',
    jsxPragma: 'React',
    ecmaFeatures:{
      jsx:true
    }
  },
  rules:{
    // eslint规则
    // typescript规则
    // eslint-plugin-vue
  }
}
```

:::tip

Q：parser和parserOptions.parser指定解析器的区别

A：`parser`默认解析器是 `espree`，这里指定 `vue-eslint-parser`作为**主要解析器** ，它将处理 `.vue`文件，尤其是 `<template>`标签

parserOptions是传给vue-eslint-parser的参数

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

### 在vscode中开启ESLint检测和修复问题代码

1. vscode安装 `eslint`插件
2. 在用户级别或者项目级别的 `setting.json`中开启 `eslint`

```js
{
  "eslint.enable": true
}
```

3. 在项目中安装 `eslint`并初始化

```bash
# 安装eslint到开发依赖
npm i -D eslint
# 初始化eslint，在项目根目录创建.eslintrc文件
npx eslint --init
```

***目前只是开启了检查代码，没有自动修复有问题的代码***

4. 开启vscode保存时修复问题代码

```js
{
  "editor.codeActionOnSave": {
    // 使用eslint来fix和格式化代码
    "source.fixAll.eslint": true,
    // 使用所有提供的格式化工具进行格式化
    //"source.fixAll": true
  }
}
```

在vue项目中出现 `.html`文件出现错误 `vue/comment-directive`，原因是eslint-plugin-vue仅能linting `.vue`而不能linting `.html`

这里通过配置使用vue处理器对.html文件进行检查

或者关闭这个报错误的规则

```js
overrides: [
    {
      files: ['*.html'],
      processor: 'vue/.vue',
    },
  ], 
```

## Prettier

### Prettier作用

Prettier可以对代码进行格式化，不会对代码进行潜在问题检查
Prettier可对多种语言进行格式化，如 `vue`,`react`,`html`,`css`,`scss`,`json`,`jsx`等

### 项目中配置 .eslintrc.js

:::tip

eslint和prettier由规则上冲突的部分，`eslint-config-prettier`可以关闭eslint由关代码格式化的规则，使用prettier的规则来格式化

[ESLint和Prettier的冲突](#eslint和prettier的冲突)

:::

需要安装 `eslint-plugin-prettier`和 `eslint-config-prettier`

```js
module.exports = {
  extends:[
    // ...
    "plugin:prettier/recommended"
  ]
}
```

`plugin:prettier/recommended`做了以下事情

```js
{
  "extends": ["prettier"], // 使用eslinst-config-prettier中的配置项
  "plugins": ["prettier"], // 注册该prettier插件
  "rules": {
    "prettier/prettier": "error", // 在eslint中运行prettier，并启用该插件提供的规则
    "arrow-body-style": "off", // 关闭规则
    "prefer-arrow-callback": "off" // 关闭规则
  }
}
```

在项目根目录下创建 `.prettierrc.json`自定义检查规则

```json
{
  "singleQuote": true,
  "semi": false,
  "bracketSameLine": true,
  "htmlWhitespaceSensitivity": "ignore",
  "endOfLine": "auto",
  "trailingComma": "all",
  "tabWidth": 2,
  // 解决<!doctype html>报错
  "overrides": [
    {
      "files": [
        "*.html"
      ],
      "options": {
        "parser": "html"
      }
    },
    //以vue解析器解析nvue文件
    {
      "files": "*.nvue",
      "options": {
        "parser": "vue"
      }
    }
  ]
}
```

### 在vscode中启用Prettier

> 无需在项目中安装prettier，只需在vscode中安装并设置为默认格式化器或者在指定语言中设置默认格式化器

1. 在vscode中安装 `prettier`插件
2. 在用户级别或者项目级别的 `setting.json`中设置编辑器的默认格式化器

```js
{
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

指定语言设置默认格式化器

```js
{
  "[javascript]" {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

此时虽然启用了 `prettier`，但保存文件时没有对文件进行格式化，仍需要一下操作

```js
{
  // 开启保存文件自动格式化代码
  "editor.formatOnSave": true,
  // 默认的代码格式化工具
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  // 开启后，要求根目录下的有.prettierrc或者.editorconfig文件，覆盖prettier扩展中的默认配置
  // 如果根目录下没有改配置文件，不会自动格式化
  "prettier.requireConfig": true // 需要Prettier的配置文件

  // 没有开启，则不要求，若根目录下有配置文件则以配置文件为准
  //"prettier.requireConfig": false
}
```

## ESLint和Prettier的冲突

### 原因

ESLint和Prettier都可以对代码进行格式化

- 两者重叠的格式化规则不一致
- vscode同时开启了两者的格式化

```json
{
  // 保存时格式化代码
  "editor.formatOnSave": true,
  // 使用prettier格式化代码
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "prettier.requireConfig": true,
  "eslint.enable": true, // eslint开启
  "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true // 代码保存使用eslint格式化代码
    }
}
```

### 以和为贵，eslint和prettier和谐相处

`eslint`检测代码质量 `prettier`对多种语言进行格式化

- 对于两者重叠的格式化规则，要保持规则一致
- 或者使用共同作用的语言中一种进行格式化

#### 对于两者重叠的格式化规则

> 使用ESLint作为代码格式化工具，关闭可能与Prettier有冲突的格式化规则，把Prettier当做一个linter规则
> 需要在项目中安装这些依赖包

- `eslint-config-prettier`此包包含了eslint规则，用于关闭eslint有关代码格式化的配置
- `eslint-plugin-prettier`
  将Prettier配置成一个eslint插件，让其当做一个linter规则来运行

> eslint-plugin-prettier需要在项目中安装prettier依赖

在项目的 `.eslintrc`配置文件中设置prettier插件

```js
{
  "extends":["plugin:prettier/recommended"]
}
```

这样配置好后，两者就能协同格式化代码，eslint进行格式化时会忽略跟prettier重叠的格式化规则，交由prettier来格式化

#### 使用共同作用的语言中一种进行格式化

1. 项目中开启保存时使用默认prettier格式化器格式化所有代码

```js
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
}
```

2. 针对部分语言代码（如js，ts，jsx）**关闭**使用prettier格式化来格式化

```js
{
  "[javascript]": { 
    "editor.formatOnSave": false 
  }
}
```

3. 开启eslint来格式化js,ts,jsx代码

```js
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true 
  }
}
```

因为在.eslintrc配置文件中已经配置使用prettier的格式化规则来linting代码，所以其实仍然使用的prettier来格式化代码，但也使用eslint来检查代码质量

## 完整的.eslintrc配置

```js
module.export = {
  env: {
    browser: true,
    es2021: true,
    //解决defineEmits、defineProps等宏报错
    'vue/setup-compiler-macros': true,
  }
  // 继承的规则，用来检测代码质量和格式化代码
  extends:[
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  parser: 'vue-eslint-parser',
  // 比parser优先级低
  parserOptions:{
    ecmaVersion:'latest',
    sourceType: 'module',
    parser:'@typescript-eslint/parser',
    jsxPragma: 'React',
    ecmaFeatures:{
      jsx:true
    }
  },
  rules:{
    // eslint规则
    // typescript规则
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/prefer-ts-expect-error': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/semi': 'off',
    // eslint-plugin-vue
    'vue/multi-word-component-names': 'off',
    'vue/script-setup-uses-vars': 'error'
    'vue/no-mutating-props': 'off'
    'vue/attribute-hyphenation': 'off',
  }
}

```

## 完整的vscode配置

```js
{
  // 保存时对项目所有语言（除针对的语言外）的代码使用prettier格式化
  "editor.formatOnSave": true, 
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  //针对共用的语言如JS、TS和JSX关闭文件保存自动格式化功能，通过eslint来做这件事 
  "[javascript]": { 
    "editor.formatOnSave": false 
  }, 
  "[javascriptreact]": {
    "editor.formatOnSave": false
  },
  "[typescript]": {
    "editor.formatOnSave": false
  },
  //使用eslint对代码进行检查和格式化
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true 
  }
}
```

## 一些出现的问题

### 'module' is not defined

在`eslintrc`配置文件中设置`env.node=true`

### 保存没有自动格式化

原因是`eslintrc`配置没有被应用到

留意`package.json`的`type`（commonjs和module）的设置，以及`eslintrc`配置文件的后缀（cjs和mjs）。

## 参考链接

[通关前端工程化（一）ESLint全方位解析，让你不再面向搜索引擎配置 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/554396222)

[vue-eslint-parser: 用于 .vue文件的ESLint自定义解析器。 - 我爱学习网 (5axxw.com)](https://www.5axxw.com/wiki/content/pu4u1a)

[Eslint 核心概念 &amp; 自定义 plugin 开发 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/486351487)

[实现在 VSCode 中无痛开发 nvue：语法高亮、代码提示、eslint 配置及插件Patch - 掘金 (juejin.cn)](https://juejin.cn/post/7233196954402373690#heading-7)

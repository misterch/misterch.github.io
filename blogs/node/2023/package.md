---
title: package.json中字段的含义及作用
date: 2023-08-08
tags:
 - npm
---
## main/module

```json
{
  "main": './dist/index.cjs',
  "module": './src/main.mjs'
}
```

main：对应commonjs引入方式，即 `require/module.exports `并指定程序入口文件

module：对应esmodule引入方式，即 `import/export`并指定程序入口文件

## type

描述该文件所在目录根目录中 `.js`文件和无拓展名文件的处理方式

值为`esmodule`，当做**ES模块处理**

值为`commonjs`，当做**commonjs模块**

没有定义该字段时，当做`commonjs`模块处理

> 但，如果文件为mjs或者cjs时，则按照相对应的规范处理模块

## exports

最重要的三个作用：

1. 作用域包
2. 子路径模式
3. 支持条件导出

### 作用域包

exports和main字段是**互斥**的，如果同时定义了 `exports`和 `main`，在node大于等于12.7.0中exports会覆盖main

注意！！！exports字段生效，package中为导出的文件，是不能引用的，main则可以随意引用包里面的文件，这就是exports作用域包

当定义了exports字段，所有**子路径都会被封闭**

### 子路径模式

子路径被封闭了，但是如果我们需要导出某些子路径时，如按需导入，就需要子路径模式，做路径映射

```json
"exports":{
  ".":"index.js",
  "./subpath.js":"./subpath.js"
}
```

这样就可以导入除了入口文件之外的包里面的其他已定义子路径的文件

### 条件导出

```json
"exports":{
  ".":{
    "import":"./index.mjs",
    "require":"./dist/index.cjs",
    "types": "./dist/index.d.ts"
  },
  "./plus":{
    "import":"./plus/index.mjs",
    "require":"./dist/plus/index.cjs",
    "types": "./dist/plus/index.d.ts"
  }
}
```

### 生成一式两份CJS和MJS

使用**tsup**可以零配置结合Typescript使用，可以同时生成mjs和cjs格式文件

```bash
tsup src/index.ts --format cjs,esm
```

### 发布ESM和CJS并存的package

以前的包模板这样的

```json
{
  "name":"test",
  "main":"./dist/index.js",
  "module":"./dist/index.mjs",
  "types":"./dist/index.d.ts"
}
```

 :::tip

`types`字段可以省略，TS默认以main指定的文件夹路径为准，把文件后缀改成 `.d.ts`查找声明文件

:::

将来会这样

```json
{
  "name": "calculator",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "require": "./dist/index.js",
      "import": "./dist/index.mjs",
      "types": "./dist/index.d.ts"  
    },
    "./plus":{
       "require":"./dist/plus/index.js",
       "import":"./dist/plus/index.mjs",
       "types":"./dist/plus/index.d.ts"
     }
  },
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts --clean",
    "watch": "npm run build -- --watch src",
    "prepublishOnly": "npm run build"
  }
}

```

## name

命名规范：

* 同一作用域内的包，可以用 `.`或者 `_`作为开始字符
* 不能使用**大写字**母命名
* 不能带有不安全的url字符

私源npm包命名：

格式：@[scope]/[name]

scope：私源

name：包名


## fiels

声明有哪些文件，需要作为依赖项，保存下来

执行`npm publish`进行发布的时候，就会将`files`中的依赖文件也一起上传到npm

## bin

工具性质的npm包，一定要有bin字段，对外暴露脚本命令

用于生成npm包脚手架工具，当使用者安装这个包后，bin指定的命令就会注册，就可以在命令行工具中使用


## unpkg

CDN方式下，引入当前npm包的链接。


## workspaces

`monorepo`类型的项目，需要用到 `workspaces`。它可以告知其他工具，当前项目的工作区间在哪里。

## 参考链接

[高级前端必须掌握的package.json字段知识 - 掘金 (juejin.cn)](https://juejin.cn/post/7108985001529573412)

[发布一个 ESM 和 CJS 并存的 package - 掘金 (juejin.cn)](https://juejin.cn/post/7037386586899611684)

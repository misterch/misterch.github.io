---
title: Typescript使用模块化
date: 2023-11-30
categories:
 - typescript
tags:
 - 模块化
---

## 涉及到的配置

| 配置名称            | 含义                         |
| ------------------- | ---------------------------- |
| module              | 设置编译结果中使用的模块标准 |
| moduleResolution    | 设置解析模块的模式           |
| noImplicitUseStrict | 编译结果中不包含“use strict” |
| removeComments      | 编译结果已出注释             |
| noEmitOnError       | 错误时不生成编译结果         |
| esModuleInterop     | 启用es模块化交互非es模块导出 |

## TS中使用的模块化标准

在TS中，导入和导出模块，统一使用ES6的模块化标准

## 编译结果中的模块化

`compilerOptions.module`配置编译结果使用的模块化标准

- ES6：没有区别
- commonjs：导出的声明会变成`exports`的属性，默认导出变成exports的default属性

## 在TS中使用commonjs标准模块

例如`fs`是使用`commonjs`模块标准写的，使用`module.exports = {}`导出，如果使用ES6模块标准默认引入，将会报错

```ts
import fs from 'fs'
fs.readFileSync()
```

编译结果：`fs.default.readFileSync()`

### 正确方式1

正确引入`commonjs`模块标准的模块

```ts
import {readFileSync} from 'fs'
readFileSync()

//或者
import * as fs from 'fs'
fs.readFileSync()
```

### 正确方式2

如果一定要使用`import fs from 'fs'`，需要配置`tsconfig`的`compilerOptions.esModuleInterrop:true`

## 在TS中书写commonjs模块化代码

`module.exports={}`将没有办法获得类型检查，要获得类型检查要使用`export = {}`

```ts
//在TS中使用commonjs方法导出模块，将无法获得类型检查
module.exports = {
  name:'ben',
  fn(){
    console.log('hello fn')
  }
}
//正确导出
export = {
  name:'ben',
  fn(){
    console.log('hello fn')
  }
}
```

使用`commonjs`标准导入`import myModule = require('./myModule')`

需要开启`esModuleInterop`

```ts
//使用ES6导入
import myModule from './myModule'

//依然使用commonjs导入
import myModule = require('./myModule')
```

## 模块解析

从什么位置寻找模块

配置`compilerOptions.moduleResolution`

TS中有两种模块解析策略

- classic
- node
  - 相对路径`require('./module')`：当前目录->package.json的main字段->module当成文件夹查找main字段->module当成文件夹查找index.js->
  - 非相对路径`require('module')`：逐级`node_modules`寻找
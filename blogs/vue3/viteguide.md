---
title: Vite入门
date: 2023-07-23
tags:
 - vite
categories:
 - vite
---

## Vite依赖预构建

:::tip esmodule

直接使用`esmodule`，即`<script type="module"></script>`处理模块化资源加载的时候，路径要么是**绝对路径**要么是**相对路径**

Q：为什么`esmodule`对于导入**非绝对路径和相对路径**的资源时不搜寻`node_modules`?

A：因为如果当这个模块里面引用了其他模块，其他模块又引用了其他模块，这会导致过多的**http请求**

:::

使用`vite`加载模块时，遇到有**非绝对路径和相对路径**的引用，会尝试路径补全

```js
import vue from "vue"
// vite遇到这种路径，会进行路径补全
import vue from "/node_modules/vue"
```

查找依赖的过程是自当前目录依次向上查找的过程，直到查找到根目录（非项目根目录）或者查找到依赖为止，否则报错。

### 依赖预构建

vite首先找到对应的依赖，然后调用**esbuild**将其他规范（CMD、UMD、CommonJS等）的代码转换成esbuild规范，然后放到node_modules/.vite/deps下，同时对esmodule规范的各个模块进行统一集成

vite解决了3个问题：

1. 各种规范的第三方包用**esbuild**统一为**esmodule规范**
2. 对路径的处理上直接使用.vite/deps,不管依赖是在项目中还是在开发环境的用户根目录中，方便路径重写
3. 解决网络多包传输的性能问题(这就是esmodule不支持从node_modules目录加载模块的原因)，vite会对esmodule的各个引用模块统一集成到一个或几个模块中，减少**http请求**

:::tip

`import`会发起http请求

vite依赖预加载就是预先将被import的模块**复制**到一个模块中，这样就能减少http请求

:::

## Vite配置文件提示及开发环境

### 代码提示

```js
/*
* @type import("vite").UserConfig 
*/
const viteConfig = {...}
```

```js
import {UserConfig} from 'vite'
//传入一个配置对象
export default UserConfig({})
//传入一个函数
export default UserConfig((config)=>{
  if(config.command==='build'){
    
  }else if(config.command==='serve'){
    
  }
})
```

### 开发环境配置

根据开发环境和生产环境加载指定的配置文件

```js
//vite.config.js

import base from "./vite.base.config.js"
import dev from "./vite.dev.config.js"
import prod from "./vite.prod.config.js"
const envResolver = {
  "build":()=>{
    return {...base,...prod}
  },
  "serve":()=>{
    return {...base,...dev}
  }
}
```


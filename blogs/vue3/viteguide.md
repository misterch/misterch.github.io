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

## Vite配置文件及环境区分

### 配置文件的代码提示

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

### 环境配置

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

## 环境变量配置

> 环境变量：根据当前代码环境产生值的变化的变量

环境：

* 开发环境
* 测试环境
* 预发布环境
* 灰度环境
* 生产环境

:::tip

`Vite`使用`dotenv`第三方库来读取`.env`开头的文件，解析文件中的环境变量，并将其注入到`process.env`对象中，但vite考虑到和其他配置的一些冲突（**root，envDir**），不会直接注入到`preocess.env`中

使用vite内置的`loadEnv`方法来读取不同环境下加载相应的`.env`文件，返回环境变量对象

:::

:::tip

Q：`vite.config.js`是在`node`环境中执行的，为什么可以以`esmodule`规范导入导出？

A：vite在读取这个配置文件的时候会交给node去解析文件语法，将`esmodule`规范替换成`commonjs`规范

:::

```js
//vite.config.js
import {UserConfig,loadEnv} from 'vite'
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
export default UserConfig((config)=>{
  if(config.command==='build'){
    
  }else if(config.command==='serve'){
    const env = loadEnv(config.mode,process.cwd())
  }
  return envResolver[config.command]()
})
```

`precess.cwd()`返回当前node进程的工作目录，在哪个目录下执行node就返回目录的地址

`loadEnv(mode,envDir,prefixes)`

* `mode`：根据执行`vite`命令传入给`--mode`选项的**参数值**
* `envDir`：`.env`文件所在的目录

* `prefixes`：默认`.env`

```json
"script":{
  "dev":"vite", //默认vite --mode development
  "test":"vite --mode test"
  "build":"vite build --mode production"
}
```

:::tip

vite这样处理环境变量

所有环境都用到的env文件：`.env`

开发环境默认env文件：`.env.development`

生产环境默认env文件：`.env.production`

浏览器：`import.meta.env`获取环境变量

node：`process.env`获取环境变量

vite：loadEnv()根据环境加载环境变量再与`process.env`结合返回环境变量对象

:::

### 客户端环境

vite会将环境变量注入到`import.meta.env`中

但默认会对环境变量拦截，对以`VITE_`开头的环境变量才会最终加载到环境变量中

如果想以自定义为其他名称，可以通过`envPrefix`来配置

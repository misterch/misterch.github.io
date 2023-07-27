---
title: Vite指南
date: 2023-07-23
tags:
 - vite
 - postcss
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

vite首先找到对应的依赖，然后调用**esbuild**将其他规范（`CMD`、`UMD`、`CommonJS`等）的代码转换成`esmodule`规范，然后放到`node_modules/.vite/deps`下，同时对esmodule规范的各个模块进行统一集成

vite解决了3个问题：

1. 各种规范的第三方包用**esbuild**统一为`esmodule`规范
2. 对路径的处理上直接使用.vite/deps,不管依赖是在项目中还是在开发环境的用户根目录中，方便路径重写
3. 解决网络多包传输的性能问题(这就是esmodule不支持从`node_modules`目录加载模块的原因)，`vite`会对`esmodule`的各个引用模块统一集成到一个或几个模块中，**减少http请求**

:::tip

`import`会发起http请求

vite依赖预加载就是预先将被`import`的模块**复制**到一个模块中，这样就能减少http请求

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

## vite开发服务器原理分析

[Vite 原理分析 - 掘金 (juejin.cn)](https://juejin.cn/post/6881078539756503047)

### vite如何让浏览器识别.vue文件

:::tip

设置`Content-Type:application/javascript`，让浏览器以解析js文件一样解析vue文件

vite通过插件`@vitejs/plugin-vue`处理`.vue`文件，将vue模板中的template，script，style抽取出来分别处理

最终将处理好的js代码覆盖掉vue文件中的vue模板内容，然后让浏览器以js形式解析vue文件

:::

### vite中如何处理css

vite天生支持css文件处理

处理流程：

1. vite读取到js文件引入的css文件或者vue文件中`<style>`标签内的内容
2. 创建`style`标签，将css文件或vue文件的`<style>`标签的内容复制到创建的style标签里
3. 将style标签插入到`index.html`的`head`中
4. 将vite读取到的css内容替换成js脚本，方便HMR（热更新）或者css模块化
5. vite服务器将.css文件也设置成`Content-Type:application/javascript`，让浏览器以js形式解析css文件

#### css模块化

可以在js文件或者vue文件中以模块化对象形式使用模块化的css

vite约定`css/less/scss`文件以`xxx.module.css`形式命名来开启css模块化

模块化处理流程：

1. `xxx.module.css`形式命名来开启css模块化
2. vite将css文件中所有类名进行一定规则的替换（给类型加上一个唯一的哈希值），类名一样也不怕被覆盖
3. 将原有类名与处理后的类型做一个映射{main:"_main_u7391_1"}
4. 将处理后的css内容插入到style标签再插入到head标签中
5. 将css模块化文件里的内容替换成js脚本
6. 将创建的映射对象再脚本中默认导出

## css配置（modules）

css的modules配置最终交给PostCss modules处理

### modules.localsConvention

设置映射对象的类的key值展示方式

* camelCase
* camelCaseOnly
* dashes
* dashesOnly

### modules.scoprBehaviour

配置当前模块化行为是模块化还是全局化

* local：开启模块化，每个类都有哈希值是其模块化标志
* global：全局样式

### moduels.generateScopeName

`generateScopeName:string|((name:string,filename:string,css:string))=>string`

配置类名以指定的方式命名

`[name],[ext],[path],[folder],[query],[contenthash]`

`[<hashType>:contenthash:<digestType>:<length>]`

* `[contenthash:md5:5]`

`[<hashType>:hash:<digestType>:<length>]`

* `[hash:sha256:6]`

### modules.hashPrefix

生成hash时会根据hashPrefix设置的值去计算出最终的hash值

### modules.globalModulesPaths

`globalModulesPaths:string[]`

命名为`xxx.modules.css`的文件不参与模块化

## css配置（preprocessOptions）

配置css预处理器的全局参数

```js
module.exports = {
  preprocessOptions:{
  	less:{},
  	scss:{}
	}
}
```

## css配置（postcss）

vite对postcss有非常良好的支持

postcss类似于babel，可以对css降级支持低版本浏览器等其他高级功能

postcss的插件

- `postcss-preset-env`：支持css变量和一些未来的css语法，自动补全（autoprefixer）

vite会从两个地方寻找postcss配置

- `vite.config.js`的css.postcss
- 项目根目录下的`postcss.config.js`

```js
//postcss.config.js
module.exports = {
  //...
}
```

### importFrom—全局定义

#### 场景

现在使用css一般会创建一个css文件设置一些**全局css变量**

```css
:root{
  --mainColor: #333;
  --mainBgColor: #ececec
}
```

使用css变量需要考虑兼容性问题，使用`postcss`去做兼容处理，使用`postcss-preset-env`预设可以更加方便处理css代码

当把这个全局css变量文件在项目中全局引入使用

```vue
//app.vue
<style>
  import "./cssVars.css";
  test:{
    color:var(--mainColor);
  }
</style>
```

编译后会发现，postcss并没有帮我们做兼容处理

```css
/*正常编译*/
test{
  color: #333;
  color:var(--mainColor);
}
/*实际编译*/
test{
  color:var(--mainColor);
}
```

#### 解决方法

使用`postcss-preset-env`插件配置`importFrom`告诉postcss全局变量需要

```js
const postcssPresetEnv = require('postcss-preset-env')
const path = require('path')
module.exports = {
  plugins:[
    postcssPresetEnv({
      'importFrom': path.resolve(__dirname,"./cssVars.css")
    })
  ]
};

```

#### 总结

全局定义的 `媒体查询`、`自定义属性`、`自定义选择`、`环境变量`等等，不管是 css、 js、json、方法还是传递的对象都需要通过 `importFrom` 配置项具名导入进来。

**注意：**

1. 如果css变量定义在当前文件中，并在当前文件中使用时，是不需要配置`importFrom`的

2. 如果css变量文件有多个，`importFrom`支持数组形式

## 静态资源

除了动态API以外（服务器需要动态处理的资源），基本上所有其他资源都被认为是静态资源（包括图片，视频，html，css，js）

### resolve.alias

配置别名，优化深层级文件的引用

```js
defineConfig({
  resolve:{
    alias:{
      "@":path.resolve(__dirname,"./src"),
      "@assets": path.resolve(__dirname,"./src/assets")
    }
  }
})
```

这样在文件中引入别的资源时可以使用别名代替`../../`

[vite-aliases](https://github.com/Subwaytime/vite-aliases)插件可以自动生成别名

### 获取svg源码

加载资源时可以在路径后面接收参数，参数告诉vite以什么格式返回文件内容

可接收的参数

- url，默认
- raw，返回文件内的源码

通过`raw`方式获取svg源码内容，就可以操作`svg`，例如可以修改svg的颜色

```js
import logo from './logo.svg?raw'

logo.onmouseenter = function(){
  this.style.fill = "red"
}
document.body.appendChild(logo)
```

### base

开发或生产环境服务的公共基础路径，默认`/`，配置成绝对路径后，无论在哪里都能正常访问资源

指定了公共路径，所有资源的路径都会根据此配置重写

### outDir

打包输出的文件夹名称

### assetsDir

静态资源输出的文件夹名称

### hash

vite打包后的每个资源文件都会加上一个hash值，这个hash值是唯一的。

作用：浏览器是有一个缓存机制，当读到一个同名的资源时，会尝试从浏览器缓存查找该文件，找到就会使用缓存文件，而hash就能更好地控制浏览器缓存

hash是根据文件名和文件内容计算出来的，只要文件内容没有变化，hash就不会变化

打包生成的文件名可以通过`build.rollupOptions.output.assetFileNames`来配置

### 处理成base64

当指定了资源大小，只要资源**小于**设定值，就会将资源转换成base64

`build.rollupOptions.assetsInlineLimit`

```js
defineConfig({
  build:{
    outDir: "testDist",
    assetsDir: "static",
    rollupOptions:{
      output:{
        assetFileNames:"[name].[hash].[ext]"
      }
    },
    assetsInlineLimit: 4096 //小于4kb
  }
})
```

## vite插件原理

> vite插件一般是一个**函数**，函数**返回一个配置对象**

插件是在vite的生命周期的不同阶段做不同的事情

插件是在vite执行配置文件之前去改写配置文件

## vite独有钩子

Vite 插件也可以提供钩子来服务于特定的 Vite 目标。这些钩子会被 Rollup 忽略。

### config

`config`返回一个配置对象

插件的配置要与`vite.config.js`的其他配置结合产生最终的配置

```js
const plugin = ()=>{
  return {
    name:'插件名字',
    config:(config,env)=>{
      //config：vite的配置信息
      //env：环境变量
      return {
        
      }
    }
  }
}
```

### transformIndexHtml

类型：function | object

转换`index.html`的专用钩子

```js
const htmlPlugin = (html,ctx)=>{
  //ctx是当前整个请求的执行上下文
}
```

### configureServer

#### vite-plugin-mock

简单的方式：直接写死一两个数据

- 缺陷
  - 无法做海量数据测试
  - 无法获取一些标准数据
  - 无法感知http的异常

mockjs数据：模拟海量数据，模拟接口

:::tip

`vite-plugin-mock`是对请求进行拦截。

在开发环境中，如果没有配置请求域名，一般请求会向本地开发服务器（即本地的vite开发服务器）发出请求，该插件相当于利用本地开发服务器模拟了接口，插件能根据配置对请求进行拦截处理，使用指定文件夹内设置的mock数据

`vite-plugin-mock`是利用vite的`configureServer(server)`钩子开发的

:::

```js
axios({
	method:'post',
  url: process.env.NODE_ENV === 'development' ? '/mock/getUser': 'https://www.myapi.com/api/getUser'
})
```

[Mock.js (mockjs.com)](http://mockjs.com/)

`vite-plugin-mock`的使用

1. 安装`npm install -D vite-plugin-mock`

2. 配置`vite.config.js`

   ```js
   //在vite.config.js配置该插件
   module.exports = defineConfig({
   	plugins:[
   		vitePluginMock()
   	]
   })
   ```

   

3. `vite-plugin-mock`默认会从项目根目录的`/mock`目录查找mock数据

   这主要是在node环境下才会使用到的，所以一般要以`commonjs`规范书写

   ```js
   // /mock/index.js
   import mockJS from 'mockjs'
   const userList = mockJS.mock({
     //生成100
     "data|100":[{
       name:"@cname",//随机中文名
       "id|+1":1 //自增，每次+1
     }]
   })
   module.exports = [
     {
       method:'post',
       url:'/api/users',
       response:({body})=>{
         return {
           code:200,
           msg:"success",
           data:[...userList]
         }
       }
     }
   ]
   ```

   

4. 在项目中，开发环境下就可以按照正常的网络请求获取mock数据

#### configResolved

整个配置文件解析完后执行的钩子

## 参考资料

[Vite世界指南（带你从0到1深入学习 vite）](https://www.bilibili.com/video/BV1GN4y1M7P5)
